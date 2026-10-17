import React from 'react';
import { Wind } from 'lucide-react';

interface WindCompassWidgetProps {
  speedKmH: number;
  directionDegrees: number;
  gustsKmH: number;
}

export const WindCompassWidget: React.FC<WindCompassWidgetProps> = ({
  speedKmH,
  directionDegrees,
  gustsKmH,
}) => {
  // Convert speed to knots (1 knot = 1.852 km/h)
  const speedKnots = (speedKmH / 1.852).toFixed(1);

  // Hebrew cardinal directions
  const getHebrewDirection = (deg: number): { name: string; code: string } => {
    const d = (deg % 360 + 360) % 360;
    if (d >= 337.5 || d < 22.5) return { name: 'צפונית', code: 'N' };
    if (d >= 22.5 && d < 67.5) return { name: 'צפון-מזרחית', code: 'NE' };
    if (d >= 67.5 && d < 112.5) return { name: 'מזרחית', code: 'E' };
    if (d >= 112.5 && d < 157.5) return { name: 'דרום-מזרחית', code: 'SE' };
    if (d >= 157.5 && d < 202.5) return { name: 'דרומית', code: 'S' };
    if (d >= 202.5 && d < 247.5) return { name: 'דרום-מערבית', code: 'SW' };
    if (d >= 247.5 && d < 292.5) return { name: 'מערבית', code: 'W' };
    return { name: 'צפון-מערבית', code: 'NW' };
  };

  const dirInfo = getHebrewDirection(directionDegrees);

  return (
    <div className="flex flex-col h-full justify-between items-center py-1">
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
        <Wind className="w-3.5 h-3.5 text-cyan-400" />
        <span>מצפן רוח דינמי</span>
      </div>

      {/* Rotating Physical Compass */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Outer Bezel Dial with Cardinal Markers */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-700/80 bg-slate-900/60 shadow-inner flex items-center justify-center">
          {/* Degree Ticks */}
          <div className="absolute inset-1 rounded-full border border-dashed border-slate-800 pointer-events-none" />

          {/* Compass labels */}
          <span className="absolute top-1 text-[10px] font-bold font-mono text-cyan-400">N</span>
          <span className="absolute bottom-1 text-[10px] font-bold font-mono text-slate-400">S</span>
          <span className="absolute right-1 text-[10px] font-bold font-mono text-slate-400">E</span>
          <span className="absolute left-1 text-[10px] font-bold font-mono text-slate-400">W</span>
        </div>

        {/* Rotating Needle Layer */}
        <div
          className="relative w-28 h-28 flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${directionDegrees}deg)` }}
        >
          {/* Compass Needle */}
          <div className="relative w-2 h-full flex flex-col items-center justify-between pointer-events-none">
            {/* North Point (Glow Arrow) */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[24px] border-b-cyan-400 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />

            {/* South Point (Muted Arrow) */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[24px] border-t-slate-600" />
          </div>

          {/* Center Pivot Pin */}
          <div className="absolute w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
          </div>
        </div>

        {/* Live Degree Angle in Center Overlay */}
        <div className="absolute -bottom-2 bg-slate-950/90 px-2 py-0.5 rounded-full border border-slate-700 text-[10px] font-mono text-cyan-300 font-bold">
          {directionDegrees}° {dirInfo.code}
        </div>
      </div>

      {/* Speed & Direction Readouts */}
      <div className="mt-4 text-center">
        <div className="text-xl font-mono font-bold text-white flex items-baseline justify-center gap-1">
          <span>{speedKmH}</span>
          <span className="text-xs text-slate-400 font-sans">קמ״ש</span>
          <span className="text-xs text-slate-500 font-mono">({speedKnots} kn)</span>
        </div>

        <div className="text-xs text-slate-300 mt-0.5 font-medium">
          {dirInfo.name} ({dirInfo.code})
        </div>

        <div className="text-[11px] font-mono text-slate-400 mt-1 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
          משבים עד: <span className="text-amber-400 font-bold">{gustsKmH}</span> קמ״ש
        </div>
      </div>
    </div>
  );
};
