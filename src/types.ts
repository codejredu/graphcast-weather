/**
 * GraphCast Weather Engine - Data Models and Interfaces
 */

export interface LocationItem {
  id: number;
  name: string;
  nameHe?: string;
  country: string;
  countryCode: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  timezone: string;
  isCoastal?: boolean;
}

export type WeatherCategory = 'clear' | 'partly-cloudy' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog';

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  weatherCode: number;
  weatherDescription: string;
  weatherCategory: WeatherCategory;
  isDay: boolean;
  windSpeed: number; // km/h
  windDirection: number; // degrees 0-360
  windGusts: number; // km/h
  surfacePressure: number; // hPa
  cloudCover: number; // %
  precipitation: number; // mm
  uvIndex: number;
  visibilityKm: number;
}

export interface WaveData {
  hasData: boolean;
  waveHeight: number; // in meters
  waveHeightFeet: number;
  waveDirection: number; // degrees
  wavePeriod: number; // seconds
  surfSuitability: 'רגוע מאוד' | 'תנאים אידיאליים' | 'גלים בינוניים' | 'ים גבוה / מסוכן' | 'סוער מאוד';
  ratingTier: 'calm' | 'ideal' | 'moderate' | 'rough' | 'extreme';
}

export interface DailyForecast {
  date: string;
  formattedDate: string; // e.g. "20/10"
  dayName: string; // e.g. "היום", "מחר", "יום 3"
  dayOfWeek: string; // e.g. "יום שלישי"
  dayIndex: number; // 1 to 10
  minTemp: number;
  maxTemp: number;
  weatherCode: number;
  weatherDescription: string;
  weatherCategory: WeatherCategory;
  windSpeed: number;
  windSpeedMax?: number;
  windDirection: number;
  windDirectionCode: string;
  humidity: number;
  pressure: number;
  waveHeight: number;
  precipitationSum?: number;
  precipitationProbability: number;
  precipitationType: 'rain' | 'snow' | 'none';
  surfCondition: string;
  isCoastal: boolean;
}

export interface HourlyPoint {
  time: string;
  formattedTime: string;
  temperature: number;
  humidity: number;
  precipitationProb: number;
  weatherCode: number;
  windSpeed: number;
}

export interface WeatherPayload {
  location: LocationItem;
  current: CurrentWeather;
  wave: WaveData;
  daily: DailyForecast[];
  hourly: HourlyPoint[];
  lastUpdated: string;
  localTime: string;
  localDate: string;
  localDayOfWeek: string;
  utcOffset: string;
}

export interface SimulationStep {
  id: number;
  timeWindow: [number, number]; // seconds [start, end]
  phaseName: string;
  phaseCode: 'era5_ingest' | 'grid_to_mesh' | 'gnn_processor' | 'mesh_to_grid' | 'rollout_eval';
  title: string;
  description: string;
  metric: string;
  subsystem: string;
}
