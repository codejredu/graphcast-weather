import React from 'react';
import { Waves, Navigation, Clock, Activity, Anchor } from 'lucide-react';
import { WaveData } from '../types';

interface WaveHeightGaugeProps {
  waveData: WaveData;
  cityName: string;
}

export const WaveHeightGauge: React.FC<WaveHeightGaugeProps> = ({ waveData, cityName }) => {
  if (!waveData.hasData) {
    return null;
  }

  // Max wave height on horizontal rail: 4.0 meters
  const maxRailMeters = 3.5;
  const clampedHeight = Math.min(maxRailMeters, waveData.waveHeight);
  const positionPercent = (clampedHeight / maxRailMeters) * 100;

  const getTierColor = (tier: WaveData['ratingTier']) => {
    switch (tier) {
      case 'calm':
        return {
          bar: 'from-blue-500 to-cyan-400',
          text: 'text-cyan-300',
          badge: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
        };
      case 'ideal':
        return {
          bar: 'from-emerald-500 to-teal-400',
          text: 'text-emerald-300',
          badge: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
        };
      case 'moderate':
        return {
          bar: 'from-amber-500 to-yellow-400',
          text: 'text-amber-300',
          badge: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
        };
      case 'rough':
      case 'extreme':
        return {
          bar: 'from-rose-600 to-orange-500',
          text: 'text-rose-300',
          badge: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
        };
    }
  };

  const colors = getTierColor(waveData.ratingTier);

  return (
    <div className="w-full glass-panel-glow-cyan rounded-2xl p-5 border border-cyan-500/30 relative overflow-hidden">
      {/* Decorative wave background lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <path
            d="M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50 L 400 100 L 0 100 Z"
            fill="currentColor"
            className="text-cyan-400"
          />
        </svg>
      </div>

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              מד גובה גלים דינמי · עיר חוף ({cityName})
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>תנאי ים וגלישה עדכניים</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${colors.badge} font-medium`}>
                {waveData.surfSuitability}
              </span>
            </div>
          </div>
        </div>

        {/* Marine quick stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-slate-900/70 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>מחזור גל: {waveData.wavePeriod} שניות</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/70 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" style={{ transform: `rotate(${waveData.waveDirection}deg)` }} />
            <span>כיוון: {waveData.waveDirection}°</span>
          </div>
        </div>
      </div>

      {/* Primary Horizontal Gauge Rail */}
      <div className="relative pt-6 pb-4 px-2 z-10">
        {/* Floating Bubble for Current Height */}
        <div
          className="absolute top-0 transform -translate-x-1/2 transition-all duration-700 pointer-events-none flex flex-col items-center"
          style={{ left: `${Math.max(6, Math.min(94, positionPercent))}%` }}
        >
          <div className="bg-cyan-500 text-slate-950 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg shadow-cyan-500/50 flex items-center gap-1 whitespace-nowrap">
            <span>{waveData.waveHeight} מטר</span>
            <span className="text-[10px] text-slate-800 font-normal">({waveData.waveHeightFeet} ft)</span>
          </div>
          <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45 -mt-0.5" />
        </div>

        {/* Rail Track */}
        <div className="relative h-4 bg-slate-800/90 rounded-full p-0.5 border border-slate-700/80 shadow-inner overflow-hidden">
          {/* Animated Water Wave Progress Fill */}
          <div
            className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-700 relative`}
            style={{ width: `${Math.max(4, positionPercent)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* Tick Marks along Rail */}
        <div className="relative flex justify-between mt-2 text-[10px] font-mono text-slate-400">
          <div className="flex flex-col items-center">
            <div className="w-px h-1.5 bg-slate-600 mb-0.5" />
            <span>0.0 מטר (פלטה)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-px h-1.5 bg-slate-600 mb-0.5" />
            <span>0.8 מ׳ (גלישה קלה)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-px h-1.5 bg-slate-600 mb-0.5" />
            <span>1.8 מ׳ (גלים בינוניים)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-px h-1.5 bg-slate-600 mb-0.5" />
            <span>2.8 מ׳ (ים גבוה)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-px h-1.5 bg-slate-600 mb-0.5" />
            <span>3.5+ מ׳ (סוער)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
