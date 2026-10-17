import React, { useEffect, useRef, useState } from 'react';
import { Layers, RotateCcw, Zap, Globe, Eye } from 'lucide-react';
import { LocationItem } from '../types';

interface GraphCastMeshGlobeProps {
  location: LocationItem;
  isRunningSimulation: boolean;
  simulationProgress: number; // 0 to 100
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const GraphCastMeshGlobe: React.FC<GraphCastMeshGlobeProps> = ({
  location,
  isRunningSimulation,
  simulationProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<'mesh' | 'message_passing' | 'pressure_levels'>('mesh');
  const [activePressureLevel, setActivePressureLevel] = useState<number>(500); // 500 hPa
  const [isHovered, setIsHovered] = useState(false);

  // Rotation angles (radians)
  const rotationRef = useRef<{ lat: number; lon: number }>({
    lat: (location.latitude * Math.PI) / 180,
    lon: (-location.longitude * Math.PI) / 180 + Math.PI / 2,
  });
  const targetRotationRef = useRef<{ lat: number; lon: number }>({
    lat: (location.latitude * Math.PI) / 180,
    lon: (-location.longitude * Math.PI) / 180 + Math.PI / 2,
  });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update target rotation when location changes
  useEffect(() => {
    targetRotationRef.current = {
      lat: (location.latitude * Math.PI) / 180,
      lon: (-location.longitude * Math.PI) / 180 + Math.PI / 2,
    };
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Build icosahedron vertices for GraphCast M0 multi-mesh
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawIcosahedronNodes: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ].map((p) => {
      const len = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      return { x: p.x / len, y: p.y / len, z: p.z / len };
    });

    // Subdivide once to generate realistic GraphCast M1/M2 mesh nodes
    const meshNodes: Point3D[] = [...rawIcosahedronNodes];
    const meshEdges: [number, number][] = [];

    // Find nearest neighbor pairs to form triangular mesh edges
    for (let i = 0; i < rawIcosahedronNodes.length; i++) {
      for (let j = i + 1; j < rawIcosahedronNodes.length; j++) {
        const p1 = rawIcosahedronNodes[i];
        const p2 = rawIcosahedronNodes[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
        if (dist < 1.1) {
          meshEdges.push([i, j]);
          // Subdivide midpoint onto sphere
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2;
          const mz = (p1.z + p2.z) / 2;
          const mLen = Math.sqrt(mx * mx + my * my + mz * mz);
          meshNodes.push({ x: mx / mLen, y: my / mLen, z: mz / mLen });
        }
      }
    }

    // Connect midpoints
    const baseCount = rawIcosahedronNodes.length;
    for (let i = baseCount; i < meshNodes.length; i++) {
      for (let j = i + 1; j < meshNodes.length; j++) {
        const p1 = meshNodes[i];
        const p2 = meshNodes[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
        if (dist < 0.65) {
          meshEdges.push([i, j]);
        }
      }
    }

    // Latitude & Longitude grid lines (ERA5 0.25° grid simulation)
    const latRings = [-60, -30, 0, 30, 60];
    const lonMeridians = [0, 45, 90, 135, 180, 225, 270, 315];

    // Main render loop
    const render = () => {
      time += 0.02;

      // Smooth interpolation toward target rotation if not dragging
      if (!isDraggingRef.current) {
        rotationRef.current.lat += (targetRotationRef.current.lat - rotationRef.current.lat) * 0.05;
        rotationRef.current.lon += (targetRotationRef.current.lon - rotationRef.current.lon) * 0.05;

        // Auto gentle drift when idle
        if (!isHovered && !isRunningSimulation) {
          targetRotationRef.current.lon += 0.002;
        }
      }

      // Faster spinning pulse during active 60s prediction
      if (isRunningSimulation) {
        targetRotationRef.current.lon += 0.02;
      }

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      const rotLat = rotationRef.current.lat;
      const rotLon = rotationRef.current.lon;

      const cosLat = Math.cos(rotLat);
      const sinLat = Math.sin(rotLat);
      const cosLon = Math.cos(rotLon);
      const sinLon = Math.sin(rotLon);

      // 3D coordinate projection function
      const project = (x: number, y: number, z: number, rOffset = 0) => {
        // Rotate around Y axis (longitude)
        const x1 = x * cosLon + z * sinLon;
        const y1 = y;
        const z1 = -x * sinLon + z * cosLon;

        // Rotate around X axis (latitude)
        const x2 = x1;
        const y2 = y1 * cosLat - z1 * sinLat;
        const z2 = y1 * sinLat + z1 * cosLat;

        const effectiveRadius = radius + rOffset;
        return {
          px: cx + x2 * effectiveRadius,
          py: cy - y2 * effectiveRadius,
          pz: z2,
          visible: z2 > -0.15,
          scale: (z2 + 2) / 3,
        };
      };

      // 1. Draw glowing atmospheric halo / rim glow
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.35);
      if (isRunningSimulation) {
        haloGrad.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        haloGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.25)');
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        haloGrad.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
        haloGrad.addColorStop(0.75, 'rgba(6, 182, 212, 0.15)');
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Globe Sphere Body (deep space obsidian glass)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#0f172a');
      sphereGrad.addColorStop(0.65, '#090d16');
      sphereGrad.addColorStop(1, '#020617');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.clip(); // clip contents inside the sphere

      // 3. Draw Latitude Rings
      latRings.forEach((latDeg) => {
        const radLat = (latDeg * Math.PI) / 180;
        const rRing = Math.cos(radLat);
        const yRing = Math.sin(radLat);
        const steps = 48;
        ctx.beginPath();
        let first = true;
        for (let s = 0; s <= steps; s++) {
          const theta = (s / steps) * Math.PI * 2;
          const x = rRing * Math.cos(theta);
          const z = rRing * Math.sin(theta);
          const p = project(x, yRing, z);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.px, p.py);
              first = false;
            } else {
              ctx.lineTo(p.px, p.py);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = latDeg === 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(148, 163, 184, 0.08)';
        ctx.lineWidth = latDeg === 0 ? 1.5 : 0.8;
        ctx.stroke();
      });

      // 4. Draw Longitude Meridians
      lonMeridians.forEach((lonDeg) => {
        const radLon = (lonDeg * Math.PI) / 180;
        const steps = 36;
        ctx.beginPath();
        let first = true;
        for (let s = -steps / 2; s <= steps / 2; s++) {
          const lat = (s / (steps / 2)) * (Math.PI / 2);
          const x = Math.cos(lat) * Math.sin(radLon);
          const y = Math.sin(lat);
          const z = Math.cos(lat) * Math.cos(radLon);
          const p = project(x, y, z);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.px, p.py);
              first = false;
            } else {
              ctx.lineTo(p.px, p.py);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // 5. Draw GraphCast Icosahedral Multi-Mesh Edges
      meshEdges.forEach(([i, j], edgeIdx) => {
        const p1 = project(meshNodes[i].x, meshNodes[i].y, meshNodes[i].z);
        const p2 = project(meshNodes[j].x, meshNodes[j].y, meshNodes[j].z);

        if (p1.visible && p2.visible) {
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);

          const depth = (p1.pz + p2.pz) / 2;
          const alpha = Math.max(0.1, depth * 0.45);

          if (isRunningSimulation) {
            // Pulsing cyan & violet during GNN execution
            const pulse = Math.sin(time * 6 + edgeIdx) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.8 + pulse * 0.3})`;
            ctx.lineWidth = 1.2;
          } else if (viewMode === 'pressure_levels') {
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.6})`;
            ctx.lineWidth = 0.9;
          } else {
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.55})`;
            ctx.lineWidth = 1;
          }
          ctx.stroke();

          // Message Passing particle packets moving along edges
          if (viewMode === 'message_passing' || isRunningSimulation) {
            const speed = isRunningSimulation ? 3.5 : 1.2;
            const progress = ((time * speed + edgeIdx * 0.35) % 1);
            const packetX = p1.px + (p2.px - p1.px) * progress;
            const packetY = p1.py + (p2.py - p1.py) * progress;

            ctx.fillStyle = isRunningSimulation ? '#a855f7' : '#06b6d4';
            ctx.beginPath();
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 6. Draw Mesh Nodes (Graph Vertices)
      meshNodes.forEach((node, nodeIdx) => {
        const p = project(node.x, node.y, node.z);
        if (p.visible) {
          const nodePulse = Math.sin(time * 3 + nodeIdx) * 0.5 + 0.5;
          const r = 2.2 + nodePulse * 1.2;

          ctx.fillStyle = isRunningSimulation
            ? '#ec4899'
            : viewMode === 'pressure_levels'
            ? '#f59e0b'
            : '#38bdf8';
          ctx.beginPath();
          ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 7. If Pressure Levels mode, draw elevated atmospheric shell ring
      if (viewMode === 'pressure_levels') {
        const altOffset = (1000 - activePressureLevel) * 0.035; // 0 to 35px offset
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, radius + altOffset, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore(); // Restore unclipped context for overlays outside sphere

      // 8. Draw Target City Pin & Radar Wave
      const targetLatRad = (location.latitude * Math.PI) / 180;
      const targetLonRad = (location.longitude * Math.PI) / 180;
      const targetX = Math.cos(targetLatRad) * Math.sin(targetLonRad);
      const targetY = Math.sin(targetLatRad);
      const targetZ = Math.cos(targetLatRad) * Math.cos(targetLonRad);

      const targetProj = project(targetX, targetY, targetZ, 4);

      if (targetProj.pz > -0.05) {
        const pinX = targetProj.px;
        const pinY = targetProj.py;

        // Radar ripple
        const ringTime = (time * 1.5) % 1;
        const ringRadius = 8 + ringTime * 28;
        const ringAlpha = 1 - ringTime;

        ctx.strokeStyle = `rgba(239, 68, 68, ${ringAlpha * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pinX, pinY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Pin center dot
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pinX, pinY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pin border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // City Label HUD
        const labelText = location.name;
        const coordText = `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`;

        ctx.font = 'bold 12px Heebo, sans-serif';
        const textWidth = ctx.measureText(labelText).width;
        const boxWidth = Math.max(textWidth + 24, 100);
        const boxHeight = 40;

        const boxX = pinX + 14;
        const boxY = pinY - 20;

        // Pointer line
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pinX, pinY);
        ctx.lineTo(boxX, boxY + 20);
        ctx.stroke();

        // Glass HUD Box
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 6);
        ctx.fill();
        ctx.stroke();

        // Text inside HUD
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'right';
        ctx.fillText(labelText, boxX + boxWidth - 10, boxY + 16);

        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(coordText, boxX + boxWidth - 10, boxY + 31);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [location, isRunningSimulation, viewMode, activePressureLevel, isHovered]);

  // Mouse interaction for rotating the 3D Globe
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    // Update target rotation
    targetRotationRef.current.lon += dx * 0.008;
    targetRotationRef.current.lat += dy * 0.008;
    // Limit pitch to prevent upside down
    targetRotationRef.current.lat = Math.max(-1.4, Math.min(1.4, targetRotationRef.current.lat));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetTargetFocus = () => {
    targetRotationRef.current = {
      lat: (location.latitude * Math.PI) / 180,
      lon: (-location.longitude * Math.PI) / 180 + Math.PI / 2,
    };
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
    >
      {/* Top Header HUD overlay */}
      <div className="absolute top-0 inset-x-0 p-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
            Icosahedral Multi-Mesh Grid (M0-M6)
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            · 40,962 Nodes · 3.2M Directed Edges
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/60 text-xs">
          <button
            onClick={() => setViewMode('mesh')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'mesh' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>רשת הגרף</span>
          </button>
          <button
            onClick={() => setViewMode('message_passing')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'message_passing'
                ? 'bg-purple-500/20 text-purple-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Message Passing</span>
          </button>
          <button
            onClick={() => setViewMode('pressure_levels')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'pressure_levels'
                ? 'bg-amber-500/20 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>37 שכבות לחץ</span>
          </button>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={750}
        height={480}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Bottom Controls & Info Ribbon */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-3">
          <button
            onClick={resetTargetFocus}
            title="מרכז גלובוס על המיקום הנבחר"
            className="pointer-events-auto p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>מרכז עיר</span>
          </button>

          {viewMode === 'pressure_levels' && (
            <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400 px-1 font-mono">מפלס:</span>
              {[850, 500, 200].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActivePressureLevel(lvl)}
                  className={`px-2 py-0.5 rounded font-mono ${
                    activePressureLevel === lvl
                      ? 'bg-amber-500/30 text-amber-300 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl} hPa
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live coordinate readout */}
        <div className="text-right text-xs font-mono text-slate-400 bg-slate-900/70 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm">
          <span>רזולוציה: 0.25° (~28km)</span>
          <span className="mx-2 text-slate-600">|</span>
          <span className="text-cyan-400">ERA5 Baseline</span>
        </div>
      </div>

      {/* Simulation execution active badge */}
      {isRunningSimulation && (
        <div className="absolute top-14 left-4 z-20 bg-purple-950/80 border border-purple-500/50 rounded-lg p-2.5 backdrop-blur-md text-xs flex items-center gap-2 text-purple-200 animate-pulse">
          <Zap className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <div className="font-semibold">מעבד ריצת GNN פעילה...</div>
            <div className="text-[11px] text-purple-300 font-mono">
              התקדמות: {Math.round(simulationProgress)}% · TPU v4
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
