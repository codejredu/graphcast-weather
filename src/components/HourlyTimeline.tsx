import React from 'react';
import { Clock, Droplets, Wind } from 'lucide-react';
import { HourlyPoint } from '../types';

interface HourlyTimelineProps {
  hourly: HourlyPoint[];
}

export const HourlyTimeline: React.FC<HourlyTimelineProps> = ({ hourly }) => {
  if (!hourly || hourly.length === 0) return null;

  const points = hourly.slice(0, 24);
  const temps = points.map((p) => p.temperature);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = Math.max(1, maxTemp - minTemp);

  return (
    <div className="w-full glass-panel rounded-3xl p-6 border border-slate-700/60 shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white">התפתחות אטמוספרית ב-24 השעות הקרובות</h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          צעדי זמן: 1 שעה · לחות, גשם ורוח
        </div>
      </div>

      {/* Horizontal Scrollable Hourly Cards */}
      <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
        {points.map((pt, idx) => {
          const heightRatio = (pt.temperature - minTemp) / tempRange;

          return (
            <div
              key={pt.time}
              className={`flex-shrink-0 w-20 p-3 rounded-2xl border text-center transition-all ${
                idx === 0
                  ? 'bg-cyan-950/40 border-cyan-500/40'
                  : 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-800'
              }`}
            >
              <div className="text-xs font-mono text-slate-400 mb-1">{pt.formattedTime}</div>

              {/* Dynamic Temperature Dot with vertical relative positioning */}
              <div className="h-14 flex items-end justify-center my-1 relative">
                <div
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/50 absolute transition-all"
                  style={{ bottom: `${heightRatio * 75 + 10}%` }}
                />
              </div>

              <div className="text-base font-mono font-bold text-white mb-2">
                {pt.temperature}°
              </div>

              {/* Rain prob */}
              <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-sky-300">
                <Droplets className="w-2.5 h-2.5" />
                <span>{pt.precipitationProb}%</span>
              </div>

              {/* Wind speed */}
              <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-400 mt-1">
                <Wind className="w-2.5 h-2.5" />
                <span>{pt.windSpeed}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
