import React from 'react';

interface VerticalThermometerProps {
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  apparentTemp?: number;
}

export const VerticalThermometer: React.FC<VerticalThermometerProps> = ({
  currentTemp,
  minTemp,
  maxTemp,
  apparentTemp,
}) => {
  // Normalize scale from -10°C to 45°C
  const scaleMin = -10;
  const scaleMax = 45;
  const range = scaleMax - scaleMin;

  const clampPercent = (val: number) => {
    const clamped = Math.max(scaleMin, Math.min(scaleMax, val));
    return ((clamped - scaleMin) / range) * 100;
  };

  const currentPercent = clampPercent(currentTemp);
  const minPercent = clampPercent(minTemp);
  const maxPercent = clampPercent(maxTemp);

  // Dynamic color depending on current temperature
  const getTempColor = (t: number) => {
    if (t <= 5) return 'from-blue-600 via-cyan-400 to-sky-300';
    if (t <= 20) return 'from-cyan-500 via-teal-400 to-emerald-400';
    if (t <= 28) return 'from-teal-400 via-amber-400 to-orange-400';
    return 'from-amber-500 via-orange-500 to-rose-500';
  };

  return (
    <div className="flex flex-col h-full justify-between items-center py-1">
      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
        מדחום אנכי
      </div>

      <div className="relative flex items-center justify-center h-48 w-24">
        {/* Min / Max Labels & Pointer Ticks on Right */}
        <div className="absolute right-0 inset-y-0 flex flex-col justify-between py-1 text-right text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-rose-400/80" />
            <span className="text-rose-400 font-bold">{maxTemp}° מקס</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-0.5 bg-cyan-400/80" />
            <span className="text-cyan-400 font-bold">{minTemp}° מינ</span>
          </div>
        </div>

        {/* Central Vertical Thermometer Tube */}
        <div className="relative w-4 h-44 bg-slate-800/80 rounded-full p-0.5 border border-slate-700/80 shadow-inner flex flex-col justify-end overflow-hidden">
          {/* Temperature Fluid Column */}
          <div
            className={`w-full rounded-full bg-gradient-to-t ${getTempColor(
              currentTemp
            )} transition-all duration-700 ease-out shadow-sm`}
            style={{ height: `${currentPercent}%` }}
          />

          {/* Scale Measurement Ticks (Inside Tube Background) */}
          <div className="absolute inset-y-2 inset-x-0 flex flex-col justify-between pointer-events-none opacity-40">
            {[40, 30, 20, 10, 0].map((tick) => (
              <div key={tick} className="w-full h-px bg-white/40" />
            ))}
          </div>
        </div>

        {/* Bulb at base */}
        <div className="absolute bottom-0 w-7 h-7 rounded-full bg-slate-800 border border-slate-700 p-1 flex items-center justify-center -mb-2 shadow-md">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr ${getTempColor(
              currentTemp
            )} animate-pulse`}
          />
        </div>

        {/* Floating Indicator Bubble for Current Temperature */}
        <div
          className="absolute left-1 transform -translate-y-1/2 transition-all duration-700 flex items-center gap-1 pointer-events-none"
          style={{ bottom: `${currentPercent * 0.85 + 5}%` }}
        >
          <div className="bg-slate-900/90 border border-slate-700 text-white text-xs font-mono font-bold px-1.5 py-0.5 rounded shadow-lg">
            {currentTemp}°
          </div>
          <div className="w-2 h-0.5 bg-white/70" />
        </div>
      </div>

      {apparentTemp !== undefined && (
        <div className="text-[11px] font-mono text-slate-400 mt-3 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
          מורגש כמו <span className="text-slate-200 font-bold">{apparentTemp}°</span>
        </div>
      )}
    </div>
  );
};
