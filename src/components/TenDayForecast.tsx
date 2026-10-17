import React from 'react';
import { Calendar, Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Droplets, Wind } from 'lucide-react';
import { DailyForecast } from '../types';

interface TenDayForecastProps {
  daily: DailyForecast[];
}

export const TenDayForecast: React.FC<TenDayForecastProps> = ({ daily }) => {
  const getSmallIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-5 h-5 text-amber-400" />;
    if (code <= 3) return <Cloud className="w-5 h-5 text-slate-300" />;
    if (code >= 51 && code <= 65) return <CloudRain className="w-5 h-5 text-sky-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-5 h-5 text-cyan-200" />;
    if (code >= 95) return <CloudLightning className="w-5 h-5 text-purple-400" />;
    return <Cloud className="w-5 h-5 text-slate-300" />;
  };

  // Find min and max across all 10 days to normalize visual temperature bars
  const allMins = daily.map((d) => d.minTemp);
  const allMaxs = daily.map((d) => d.maxTemp);
  const globalMin = Math.min(...allMins, 0);
  const globalMax = Math.max(...allMaxs, 35);
  const globalRange = Math.max(1, globalMax - globalMin);

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-7 border border-slate-700/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">תחזית ל-10 ימים (GraphCast 240h Roll-out)</h3>
            <p className="text-xs text-slate-400 font-mono">
              ניבוי רציף בצעדים אוטורגרסיביים של 6 שעות על גבי רשת האיקוסהדרון
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
          רזולוציה אופקית: 0.25° (~28 ק״מ)
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
        {daily.slice(0, 10).map((day, idx) => {
          // Temperature bar calculation
          const leftOffset = ((day.minTemp - globalMin) / globalRange) * 100;
          const barWidth = Math.max(12, ((day.maxTemp - day.minTemp) / globalRange) * 100);

          return (
            <div
              key={day.date}
              className={`p-3 rounded-2xl border flex flex-col justify-between items-center text-center transition-all duration-200 ${
                idx === 0
                  ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/50 hover:bg-slate-850 border-slate-800'
              }`}
            >
              <div className="text-xs font-bold text-slate-200 mb-1">{day.dayName}</div>
              <div className="text-[10px] font-mono text-slate-500 mb-2">
                {day.date.split('-').slice(1).join('/')}
              </div>

              <div className="my-2 p-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
                {getSmallIcon(day.weatherCode)}
              </div>

              <div className="text-xs text-slate-300 font-medium my-1 h-8 flex items-center justify-center text-center line-clamp-2">
                {day.weatherDescription}
              </div>

              {/* Temperatures */}
              <div className="w-full mt-2 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between items-baseline text-xs font-mono mb-1">
                  <span className="text-white font-bold">{day.maxTemp}°</span>
                  <span className="text-slate-400">{day.minTemp}°</span>
                </div>

                {/* Relative Horizontal Range Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400"
                    style={{
                      left: `${Math.max(0, Math.min(85, leftOffset))}%`,
                      width: `${Math.max(15, Math.min(100, barWidth))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Precipitation & Wind badges */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-1 border-t border-slate-800/50">
                <div className="flex items-center gap-0.5 text-sky-400">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{day.precipitationSum}m</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400">
                  <Wind className="w-2.5 h-2.5" />
                  <span>{day.windSpeedMax}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
