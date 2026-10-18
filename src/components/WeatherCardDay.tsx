import React from 'react';
import { DailyForecast } from '../types';

interface WeatherCardDayProps {
  forecast: DailyForecast;
  isSelected?: boolean;
  isScanning?: boolean;
  scanIndex?: number;
  onClick?: () => void;
}

export const WeatherCardDay: React.FC<WeatherCardDayProps> = ({
  forecast,
  isSelected = false,
  isScanning = false,
  scanIndex = 0,
  onClick,
}) => {
  // 3D-styled Weather Icon
  const renderWeatherIcon = () => {
    switch (forecast.weatherCategory) {
      case 'clear':
        return (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* 3D Glowing Sun */}
            <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-yellow-200 shadow-[0_0_25px_rgba(251,191,36,0.9)] animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 border border-amber-300/40 rounded-full animate-spin-slow" />
            </div>
            {/* Rays */}
            <div className="absolute w-14 h-14">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#f59e0b]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#f59e0b]" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-amber-300 rounded-full shadow-[0_0_8px_#f59e0b]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-amber-300 rounded-full shadow-[0_0_8px_#f59e0b]" />
            </div>
          </div>
        );

      case 'partly-cloudy':
      case 'cloudy':
        return (
          <div className="relative w-20 h-16 flex items-center justify-center">
            {/* Sun in background */}
            <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
            {/* Fluffy 3D Cloud */}
            <div className="relative z-10 w-16 h-10 mt-2">
              <div className="absolute bottom-0 left-1 w-14 h-7 rounded-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-[0_4px_12px_rgba(0,0,0,0.5)] border-t border-white/80" />
              <div className="absolute -top-2 left-3 w-8 h-8 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 border-t border-white" />
              <div className="absolute -top-1 left-8 w-6 h-6 rounded-full bg-gradient-to-b from-slate-100 to-slate-300" />
            </div>
          </div>
        );

      case 'rain':
        return (
          <div className="relative w-20 h-16 flex items-center justify-center">
            <div className="relative z-10 w-16 h-9">
              <div className="absolute bottom-0 left-1 w-14 h-7 rounded-full bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 shadow-md border-t border-slate-300/60" />
              <div className="absolute -top-2 left-3 w-8 h-8 rounded-full bg-gradient-to-b from-slate-300 to-slate-500" />
              <div className="absolute -top-1 left-8 w-6 h-6 rounded-full bg-gradient-to-b from-slate-300 to-slate-500" />
            </div>
            {/* Raindrops */}
            <div className="absolute bottom-0 inset-x-3 flex justify-around">
              <span className="w-1 h-3 bg-cyan-400 rounded-full transform -rotate-12 animate-bounce" />
              <span className="w-1 h-3 bg-cyan-400 rounded-full transform -rotate-12 animate-bounce delay-100" />
              <span className="w-1 h-3 bg-cyan-400 rounded-full transform -rotate-12 animate-bounce delay-200" />
            </div>
          </div>
        );

      case 'storm':
        return (
          <div className="relative w-20 h-16 flex items-center justify-center">
            <div className="relative z-10 w-16 h-9">
              <div className="absolute bottom-0 left-1 w-14 h-7 rounded-full bg-gradient-to-b from-slate-600 to-purple-950 border-t border-purple-400/40" />
              <div className="absolute -top-2 left-3 w-8 h-8 rounded-full bg-gradient-to-b from-slate-500 to-purple-900" />
            </div>
            {/* Lightning bolt */}
            <div className="absolute -bottom-1 z-20 text-yellow-300 text-sm filter drop-shadow-[0_0_8px_#fde047]">
              ⚡
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-lg" />
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full max-w-[340px] sm:max-w-[360px] mx-auto rounded-[36px] p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'ring-2 ring-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.4)] scale-[1.02]'
          : 'hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]'
      } ${isScanning ? 'animate-neural-pulse' : ''}`}
      style={{
        background: 'rgba(15, 23, 42, 0.48)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
      }}
    >
      {/* Option 1: Atmospheric Laser Sweep Beam during calculation */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 rounded-[36px]">
          {/* Laser beam with neon core */}
          <div
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent blur-sm animate-scan-sweep flex items-center justify-center"
            style={{ animationDelay: `${scanIndex * 90}ms` }}
          >
            <div className="w-1 h-full bg-cyan-200 shadow-[0_0_12px_#38bdf8,0_0_24px_#06b6d4]" />
          </div>

          {/* AI Calculation Tag on the card */}
          <div
            className="absolute top-3 left-4 px-2 py-0.5 rounded-full bg-slate-950/90 border border-cyan-400/80 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse"
            style={{ animationDelay: `${scanIndex * 90}ms` }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">חישוב GNN...</span>
          </div>
        </div>
      )}

      {/* Background ambient particles / glow */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle sparkling star speckles */}
      <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#ffffff] animate-ping" />
      <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8] opacity-80" />

      {/* ========================================================= */}
      {/* 1. TOP ROW: Weather 3D Icon (Left) & Date Pill + Day Name (Right) */}
      {/* ========================================================= */}
      <div className="relative z-10 flex items-start justify-between mb-2.5">
        {/* Left: Weather Icon & Rain/Snow chance tag */}
        <div className="flex flex-col items-start pt-0.5">
          {renderWeatherIcon()}

          {/* Rain / Snow chance indicator + Precipitation mm */}
          <div className="text-[10px] font-mono font-medium text-cyan-200 bg-slate-900/85 px-2 py-0.5 rounded-full border border-cyan-500/40 flex items-center gap-1 mt-1 shadow-sm">
            <span>{forecast.precipitationType === 'snow' ? '❄️' : '🌧️'}</span>
            <span>סיכוי: {forecast.precipitationProbability}%</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 font-bold tracking-tight">
              צפי: {forecast.precipitationSum !== undefined ? `${forecast.precipitationSum} מ"מ` : '0 מ"מ'}
            </span>
          </div>
        </div>

        {/* Right: Date Capsule & Day Name */}
        <div className="flex flex-col items-end">
          {/* Golden Date Pill - Compact font */}
          <div
            className="px-2.5 py-0.5 rounded-lg flex items-center justify-center font-bold tracking-tight text-xs sm:text-sm font-mono shadow-inner"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.85))',
              border: '1.5px solid rgba(251, 191, 36, 0.5)',
              boxShadow: '0 0 12px rgba(251, 191, 36, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
              color: '#fef08a',
              textShadow: '0 0 6px rgba(250, 204, 21, 0.5)',
            }}
          >
            {forecast.formattedDate}
          </div>

          {/* Day Label (e.g. "יום 4" or "היום" / "מחר") */}
          <div className="text-[11px] font-bold text-slate-200 mt-0.5 font-mono tracking-wide pr-1 flex items-center gap-1">
            <span>{forecast.dayName}</span>
            <span className="text-[10px] text-slate-400 font-sans font-normal">({forecast.dayOfWeek})</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SECOND ROW: Temperature Pill (Cold min on left, Hot max on right) */}
      {/* ========================================================= */}
      <div
        className="relative z-10 w-full mb-2.5 px-3 py-1.5 rounded-xl flex items-center justify-between"
        style={{
          background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.18), rgba(15, 23, 42, 0.65), rgba(245, 158, 11, 0.18))',
          border: '1.5px solid rgba(251, 191, 36, 0.45)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Left Side: Cold / Min Temp with Snowflake Thermometer */}
        <div className="flex items-center gap-1.5">
          {/* Icy Blue Snowflake Thermometer Icon */}
          <div className="relative w-4 h-7 flex items-center justify-center">
            {/* Snowflake badge at bulb */}
            <div className="absolute -left-1 bottom-0 text-[8px] text-cyan-300 filter drop-shadow-[0_0_3px_#38bdf8]">
              ❄️
            </div>
            {/* Thermometer Stem */}
            <div className="w-1.5 h-6 rounded-full border border-sky-300/80 bg-slate-900/80 p-0.5 flex flex-col justify-end shadow-[0_0_6px_rgba(56,189,248,0.5)]">
              <div className="w-full h-1/2 rounded-full bg-gradient-to-t from-sky-400 to-cyan-300" />
            </div>
          </div>

          {/* Min Temp Value - Smaller Compact Font */}
          <span
            className="text-xs sm:text-sm font-bold font-mono tracking-tight"
            style={{
              color: '#38bdf8',
              textShadow: '0 0 6px rgba(56, 189, 248, 0.5)',
            }}
          >
            {forecast.minTemp}°C
          </span>
        </div>

        {/* Center Divider: Sparkle Star */}
        <div className="flex flex-col items-center justify-center px-1">
          <div className="w-px h-5 bg-gradient-to-b from-transparent via-amber-300/60 to-transparent relative flex items-center justify-center">
            {/* 4-point glitter star */}
            <div className="w-1.5 h-1.5 bg-amber-200 rotate-45 shadow-[0_0_6px_#fef08a]" />
          </div>
        </div>

        {/* Right Side: Warm / Max Temp with Golden Sun Thermometer */}
        <div className="flex items-center gap-1.5">
          {/* Max Temp Value - Smaller Compact Font */}
          <span
            className="text-xs sm:text-sm font-bold font-mono tracking-tight"
            style={{
              color: '#f59e0b',
              textShadow: '0 0 6px rgba(245, 158, 11, 0.5)',
            }}
          >
            {forecast.maxTemp}°C
          </span>

          {/* Golden Sun Thermometer Icon */}
          <div className="relative w-4 h-7 flex items-center justify-center">
            {/* Thermometer Stem */}
            <div className="w-1.5 h-6 rounded-full border border-amber-400/90 bg-slate-900/80 p-0.5 flex flex-col justify-end shadow-[0_0_6px_rgba(245,158,11,0.5)]">
              <div className="w-full h-3/4 rounded-full bg-gradient-to-t from-amber-500 to-yellow-300" />
            </div>
            {/* Sun badge at bulb */}
            <div className="absolute -right-1 bottom-0 text-[8px] text-amber-300 filter drop-shadow-[0_0_3px_#f59e0b]">
              ☀️
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. THIRD ROW: Wind Capsule (Compass + NW + Speed + LARGE BREEZE ICON) */}
      {/* ========================================================= */}
      <div
        className="relative z-10 w-full mb-2.5 px-3 py-1.5 rounded-xl flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.8))',
          border: '1.5px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Left Side: Metallic Realistic Compass & Direction Code */}
        <div className="flex items-center gap-2">
          {/* Realistic Metallic Compass Rose */}
          <div className="relative w-7 h-7 rounded-full border border-slate-400/70 bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-900 shadow-[0_0_8px_rgba(0,0,0,0.6)] flex items-center justify-center p-0.5">
            {/* Outer ring ticks */}
            <div className="absolute inset-0.5 rounded-full border border-dashed border-slate-500/40" />

            {/* Rotating Needle */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-700"
              style={{ transform: `rotate(${forecast.windDirection}deg)` }}
            >
              {/* Cyan/Blue North Tip */}
              <div className="absolute top-0.5 w-0 h-0 border-l-[2.5px] border-l-transparent border-r-[2.5px] border-r-transparent border-b-[8px] border-b-cyan-400 filter drop-shadow-[0_0_3px_#38bdf8]" />
              {/* Golden South Tip */}
              <div className="absolute bottom-0.5 w-0 h-0 border-l-[2.5px] border-l-transparent border-r-[2.5px] border-r-transparent border-t-[8px] border-t-amber-400" />
              {/* Center Pin */}
              <div className="w-1 h-1 rounded-full bg-slate-200 border border-slate-600 shadow-sm z-10" />
            </div>
          </div>

          {/* Direction Code (e.g. "NW") - Smaller font */}
          <span className="text-xs sm:text-sm font-bold font-mono text-slate-100 tracking-wider">
            {forecast.windDirectionCode}
          </span>
        </div>

        {/* Center Vertical Divider Line */}
        <div className="w-px h-5 bg-slate-600/50" />

        {/* Right Side: Wind Speed Number & LARGE Cyan Wind Breeze Icon */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-tight">
            {forecast.windSpeed}
          </span>

          {/* Large, Glowing Wind Icon */}
          <div className="text-cyan-300 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.85)] flex items-center">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.7 7.7A2.5 2.5 0 1 1 20 10H2" />
              <path d="M14.7 13.7A2.5 2.5 0 1 1 17 16H2" />
              <path d="M9.7 19.7A2.5 2.5 0 1 1 12 22H2" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. FOURTH ROW: 3 Capsules (Humidity, Rain/Snow Chance & Predicted mm, Barometer) */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full mb-2.5 grid grid-cols-3 gap-1.5">
        {/* 1. Humidity (Droplet + 28%) */}
        <div
          className="px-1.5 py-1 rounded-xl flex flex-col items-center justify-center gap-0.5"
          style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(15, 23, 42, 0.8))',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          }}
          title={`לחות יחסית: ${forecast.humidity}%`}
        >
          <div className="flex items-center gap-1">
            <span className="text-[10px] filter drop-shadow-[0_0_3px_#38bdf8]">💧</span>
            <span className="text-xs font-bold font-mono text-cyan-200 tracking-tight">
              {forecast.humidity}%
            </span>
          </div>
          <span className="text-[9px] text-slate-400 font-sans">לחות</span>
        </div>

        {/* 2. Rain / Snow Chance & Predicted mm Capsule */}
        <div
          className="px-1.5 py-1 rounded-xl flex flex-col items-center justify-center gap-0.5"
          style={{
            background: forecast.precipitationType === 'snow'
              ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(15, 23, 42, 0.8))'
              : 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(15, 23, 42, 0.8))',
            border: forecast.precipitationType === 'snow'
              ? '1.5px solid rgba(192, 132, 252, 0.45)'
              : '1.5px solid rgba(34, 211, 238, 0.45)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          }}
          title={`סיכוי: ${forecast.precipitationProbability}% | צפי כמות משקעים: ${forecast.precipitationSum ?? 0} מ"מ`}
        >
          <div className="flex items-center gap-1">
            <span className="text-[10px] filter drop-shadow-[0_0_3px_#38bdf8]">
              {forecast.precipitationType === 'snow' ? '❄️' : '🌧️'}
            </span>
            <span className="text-xs font-bold font-mono text-sky-200 tracking-tight">
              {forecast.precipitationProbability}%
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold text-amber-300 tracking-tight">
            צפי {forecast.precipitationSum ?? 0} מ"מ
          </span>
        </div>

        {/* 3. Barometric Pressure (Vintage Barometer + 1018) */}
        <div
          className="px-1.5 py-1 rounded-xl flex flex-col items-center justify-center gap-0.5"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.22), rgba(15, 23, 42, 0.8))',
            border: '1.5px solid rgba(45, 212, 191, 0.35)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          }}
          title={`לחץ ברומטרי: ${forecast.pressure} hPa`}
        >
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-50 border border-amber-700/60 flex items-center justify-center relative overflow-hidden shrink-0">
              <div className="w-2 h-0.5 bg-rose-700 origin-left transform rotate-45 shadow-sm" />
            </div>
            <span className="text-xs font-bold font-mono text-teal-200 tracking-tight">
              {forecast.pressure}
            </span>
          </div>
          <span className="text-[9px] text-slate-400 font-sans">hPa</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. FIFTH ROW: Surf Conditions Capsule (Wave + תנאי גלישה + Surfer) */}
      {/* ========================================================= */}
      <div
        className="relative z-10 w-full px-3 py-1.5 rounded-xl flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.85))',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Left: 3D Ocean Wave Swirl Icon */}
        <div className="text-base filter drop-shadow-[0_0_6px_rgba(56,189,248,0.8)] animate-pulse">
          🌊
        </div>

        {/* Center: "תנאי גלישה" text + Optional height - Smaller font */}
        <div className="text-center">
          <div
            className="text-xs sm:text-sm font-bold text-white tracking-wide"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
          >
            {forecast.isCoastal ? 'תנאי גלישה' : 'מזג אוויר יבשתי'}
          </div>
          {forecast.isCoastal && forecast.waveHeight > 0 && (
            <div className="text-[9px] font-mono text-cyan-300">
              גובה גלים: {forecast.waveHeight} מטר
            </div>
          )}
        </div>

        {/* Right: Surfer on Wave Icon */}
        <div className="text-base filter drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]">
          🏄
        </div>
      </div>
    </div>
  );
};
