import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CircularGaugeWidgetProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  icon: LucideIcon;
  colorScheme: 'cyan' | 'purple' | 'amber' | 'emerald';
  statusText?: string;
  description?: string;
}

export const CircularGaugeWidget: React.FC<CircularGaugeWidgetProps> = ({
  label,
  value,
  unit,
  min,
  max,
  icon: Icon,
  colorScheme,
  statusText,
  description,
}) => {
  const radius = 42;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  // Partial gauge arc: 240 degrees (leaving bottom 120 open)
  const arcLength = circumference * (240 / 360);
  const normalizedValue = Math.max(min, Math.min(max, value));
  const progressRatio = (normalizedValue - min) / (max - min);
  const strokeDashoffset = arcLength * (1 - progressRatio);

  const colors = {
    cyan: {
      stroke: '#06b6d4',
      bgGlow: 'rgba(6, 182, 212, 0.15)',
      text: 'text-cyan-400',
    },
    purple: {
      stroke: '#a855f7',
      bgGlow: 'rgba(168, 85, 247, 0.15)',
      text: 'text-purple-400',
    },
    amber: {
      stroke: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      text: 'text-amber-400',
    },
    emerald: {
      stroke: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      text: 'text-emerald-400',
    },
  }[colorScheme];

  return (
    <div className="flex flex-col h-full justify-between items-center py-1">
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
        <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
        <span>{label}</span>
      </div>

      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* SVG Circular Arc */}
        <svg className="w-full h-full transform rotate-[150deg]" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(51, 65, 85, 0.6)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Progress Filled Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-2xl font-mono font-bold text-white tracking-tight">
            {value}
          </div>
          <div className="text-[11px] font-mono text-slate-400">{unit}</div>
        </div>

        {/* Bottom Min / Max Readout */}
        <div className="absolute bottom-1 inset-x-4 flex justify-between text-[9px] font-mono text-slate-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-2 text-center">
        {statusText && (
          <div className={`text-xs font-semibold ${colors.text}`}>
            {statusText}
          </div>
        )}
        {description && (
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
