import React from 'react';
import { 
  Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, 
  Droplets, Gauge, Eye, ShieldAlert, Sparkles, Cpu
} from 'lucide-react';
import { WeatherPayload } from '../types';
import { VerticalThermometer } from './VerticalThermometer';
import { WindCompassWidget } from './WindCompassWidget';
import { CircularGaugeWidget } from './CircularGaugeWidget';

interface CurrentWeatherCardProps {
  weather: WeatherPayload;
  onLaunchPrediction: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  onLaunchPrediction,
}) => {
  const { current, location, daily } = weather;
  const todayForecast = daily[0] || { minTemp: current.temperature - 4, maxTemp: current.temperature + 4 };

  // Weather icon selector
  const getWeatherIcon = (category: string, isDay: boolean) => {
    switch (category) {
      case 'clear':
        return isDay ? (
          <Sun className="w-12 h-12 text-amber-400 animate-spin-slow" />
        ) : (
          <Moon className="w-12 h-12 text-cyan-200" />
        );
      case 'partly-cloudy':
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-slate-300" />;
      case 'rain':
        return <CloudRain className="w-12 h-12 text-sky-400" />;
      case 'storm':
        return <CloudLightning className="w-12 h-12 text-purple-400" />;
      case 'snow':
        return <CloudSnow className="w-12 h-12 text-cyan-100" />;
      default:
        return <Sun className="w-12 h-12 text-amber-400" />;
    }
  };

  // Dynamic backlight glow class based on weather & day/night
  const getGlowEffectClass = () => {
    if (current.weatherCategory === 'storm') return 'glass-panel-glow-purple';
    if (!current.isDay) return 'glass-panel-glow-cyan';
    if (current.temperature > 28) return 'glass-panel-glow-amber';
    return 'glass-panel-glow-cyan';
  };

  // Humidity status descriptor
  const getHumidityStatus = (hum: number) => {
    if (hum < 30) return 'יבש במיוחד';
    if (hum <= 60) return 'תנאים נוחים';
    if (hum <= 80) return 'לחות בינונית';
    return 'לחות גבוהה / מעיק';
  };

  // Pressure status descriptor
  const getPressureStatus = (pres: number) => {
    if (pres < 1008) return 'שקע ברומטרי';
    if (pres > 1018) return 'רמה ברומטרית';
    return 'לחץ ברומטרי תקין';
  };

  return (
    <div className={`w-full rounded-3xl p-6 sm:p-8 ${getGlowEffectClass()} transition-all duration-500 relative overflow-hidden`}>
      {/* Dynamic ambient gradient glow layer */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Location header & local time readout */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6 relative z-10 border-b border-slate-700/50 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
              {location.country} {location.admin1 ? `· ${location.admin1}` : ''}
            </span>
            <span className="text-xs text-slate-500 font-mono">({location.timezone})</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{location.name}</span>
            {location.isCoastal && (
              <span className="text-xs font-normal text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/40 font-mono">
                עיר חוף ים
              </span>
            )}
          </h1>
        </div>

        {/* Local Time and Date Card */}
        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-700/80 text-left min-w-[200px] shadow-sm">
          <div className="text-[11px] font-mono text-slate-400">זמן ותאריך מקומי ביעד</div>
          <div className="text-2xl font-mono font-bold text-cyan-300 tracking-tight flex items-center justify-between">
            <span>{weather.localTime}</span>
            <span className="text-xs text-slate-400 font-normal ml-2">{weather.utcOffset}</span>
          </div>
          <div className="text-xs text-slate-300 mt-0.5">
            {weather.localDayOfWeek}, {weather.localDate}
          </div>
        </div>
      </div>

      {/* Central Temperature and Condition Area */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-inner">
            {getWeatherIcon(current.weatherCategory, current.isDay)}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl sm:text-7xl font-extrabold text-white font-mono tracking-tight">
                {current.temperature}
              </span>
              <span className="text-3xl text-cyan-400 font-mono font-light">°C</span>
            </div>

            <div className="text-lg font-bold text-slate-200 mt-1 flex items-center gap-2">
              <span>{current.weatherDescription}</span>
              <span className="text-xs font-mono text-slate-400">
                (מורגש כמו {current.apparentTemperature}°C)
              </span>
            </div>
          </div>
        </div>

        {/* Launch GraphCast 60s Simulation CTA */}
        <div className="flex flex-col items-end">
          <button
            onClick={onLaunchPrediction}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-slate-950" />
            <span>הרצת ניבוי GraphCast ב-60 שניות</span>
            <Sparkles className="w-4 h-4 text-slate-950" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 mt-1.5">
            עיבוד 40 שנות ERA5 על TPU v4 בודד
          </span>
        </div>
      </div>

      {/* 4 Dedicated Precision Widgets Grid (Thermometer, Wind Compass, Humidity, Barometer) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {/* 1. Vertical Thermometer Card */}
        <div className="glass-panel-subtle rounded-2xl p-4 border border-slate-700/60 shadow-sm flex flex-col justify-between min-h-[260px]">
          <VerticalThermometer
            currentTemp={current.temperature}
            minTemp={todayForecast.minTemp}
            maxTemp={todayForecast.maxTemp}
            apparentTemp={current.apparentTemperature}
          />
        </div>

        {/* 2. Wind Compass Card */}
        <div className="glass-panel-subtle rounded-2xl p-4 border border-slate-700/60 shadow-sm flex flex-col justify-between min-h-[260px]">
          <WindCompassWidget
            speedKmH={current.windSpeed}
            directionDegrees={current.windDirection}
            gustsKmH={current.windGusts}
          />
        </div>

        {/* 3. Humidity Circular Gauge Card */}
        <div className="glass-panel-subtle rounded-2xl p-4 border border-slate-700/60 shadow-sm flex flex-col justify-between min-h-[260px]">
          <CircularGaugeWidget
            label="לחות יחסית"
            value={current.relativeHumidity}
            unit="%"
            min={0}
            max={100}
            icon={Droplets}
            colorScheme="cyan"
            statusText={getHumidityStatus(current.relativeHumidity)}
            description={`כיסוי עננים: ${current.cloudCover}%`}
          />
        </div>

        {/* 4. Barometric Pressure Circular Gauge Card */}
        <div className="glass-panel-subtle rounded-2xl p-4 border border-slate-700/60 shadow-sm flex flex-col justify-between min-h-[260px]">
          <CircularGaugeWidget
            label="לחץ ברומטרי"
            value={current.surfacePressure}
            unit="hPa"
            min={960}
            max={1040}
            icon={Gauge}
            colorScheme="amber"
            statusText={getPressureStatus(current.surfacePressure)}
            description="מדד פני שטח"
          />
        </div>
      </div>

      {/* Atmospheric secondary metrics strip */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-400 relative z-10">
        <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-0.5">מדד קרינת UV</div>
          <div className="text-white font-bold text-sm">{current.uvIndex} מתוך 12</div>
        </div>

        <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-0.5">משקעים נוכחיים</div>
          <div className="text-white font-bold text-sm">{current.precipitation} מ״מ</div>
        </div>

        <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-0.5">טווח ראות</div>
          <div className="text-white font-bold text-sm">{current.visibilityKm} ק״מ</div>
        </div>

        <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
          <div className="text-slate-500 mb-0.5">גובה מעל פני הים</div>
          <div className="text-white font-bold text-sm">{location.elevation ?? 20} מטר</div>
        </div>
      </div>
    </div>
  );
};
