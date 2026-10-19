import React from 'react';
import { getPressureForCountry, PressureInfo } from '../utils/pressureUtils';

interface BarometerGaugeProps {
  pressureHpa: number;
  countryCode?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BarometerGauge: React.FC<BarometerGaugeProps> = ({
  pressureHpa,
  countryCode = 'IL',
  size = 'sm',
  className = '',
}) => {
  const pressureInfo: PressureInfo = getPressureForCountry(pressureHpa, countryCode);

  if (size === 'sm') {
    // 28px diameter gauge - exactly matching the compass size (w-7 h-7)
    return (
      <div
        className={`relative w-7 h-7 rounded-full border border-teal-400/70 bg-gradient-to-tr from-slate-900 via-teal-950/80 to-slate-900 shadow-[0_0_8px_rgba(20,184,166,0.45)] flex items-center justify-center p-0.5 shrink-0 ${className}`}
        title={`לחץ ברומטרי: ${pressureInfo.valueString} ${pressureInfo.unit} (${pressureInfo.unitHebrew}) · ${pressureInfo.statusHebrew}`}
      >
        {/* Outer dashed dial calibration track */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-teal-500/40" />

        {/* 'L' (Low / שקע) marker on left, 'H' (High / רמה) marker on right */}
        <span className="absolute left-[3px] top-1/2 -translate-y-1/2 text-[6px] font-black font-mono text-cyan-400 leading-none select-none">
          L
        </span>
        <span className="absolute right-[3px] top-1/2 -translate-y-1/2 text-[6px] font-black font-mono text-amber-400 leading-none select-none">
          H
        </span>

        {/* Top 1013 standard calibration mark */}
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-teal-300 rounded-full" />

        {/* Dynamic Rotating Barometer Needle */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${pressureInfo.needleAngle}deg)` }}
        >
          {/* Golden Aneroid Needle Tip pointing UP */}
          <div className="absolute top-0.5 w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[9px] border-b-amber-400 filter drop-shadow-[0_0_3px_#fbbf24]" />

          {/* Counterbalance tail pointing DOWN */}
          <div className="absolute bottom-1 w-0.5 h-1.5 bg-slate-400 rounded-full" />

          {/* Center Brass Rivet Pin */}
          <div className="w-1.5 h-1.5 rounded-full bg-amber-300 border border-amber-700 shadow-sm z-10" />
        </div>
      </div>
    );
  }

  // Large size ('lg') for detailed hero view (e.g. 64px diameter)
  return (
    <div
      className={`relative w-16 h-16 rounded-full border-2 border-teal-400/80 bg-gradient-to-tr from-slate-950 via-teal-950 to-slate-900 shadow-[0_0_18px_rgba(20,184,166,0.5)] flex items-center justify-center p-1 shrink-0 ${className}`}
      title={`ברומטר: ${pressureInfo.valueString} ${pressureInfo.unit} · ${pressureInfo.statusHebrew}`}
    >
      {/* Outer dial calibration ring with ticks */}
      <div className="absolute inset-1 rounded-full border border-dashed border-teal-400/50" />

      {/* Dial calibration labels: L (שקע) and H (רמה) */}
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <span className="text-[8px] font-black font-mono text-cyan-300">L</span>
        <span className="text-[6px] text-cyan-400 font-sans">שקע</span>
      </div>

      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <span className="text-[8px] font-black font-mono text-amber-300">H</span>
        <span className="text-[6px] text-amber-400 font-sans">רמה</span>
      </div>

      {/* Top 1013 standard sea level indicator notch */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-1 h-1.5 bg-teal-300 rounded-full shadow-[0_0_4px_#2dd4bf]" />
        <span className="text-[5px] text-teal-300 font-mono">1013</span>
      </div>

      {/* Rotating Aneroid Needle */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
        style={{ transform: `rotate(${pressureInfo.needleAngle}deg)` }}
      >
        {/* Needle Body */}
        <div className="absolute top-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[20px] border-b-amber-400 filter drop-shadow-[0_0_5px_#f59e0b]" />
        {/* Tail counterbalance */}
        <div className="absolute bottom-2 w-1 h-3 bg-slate-400 rounded-full" />
        {/* Center Pivot Pin */}
        <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 border border-amber-800 shadow-md z-10 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-amber-900" />
        </div>
      </div>
    </div>
  );
};
