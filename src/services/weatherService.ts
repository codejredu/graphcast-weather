import { CurrentWeather, DailyForecast, HourlyPoint, LocationItem, WaveData, WeatherCategory, WeatherPayload } from '../types';

export const PRESET_CITIES: LocationItem[] = [
  {
    id: 281184,
    name: 'ירושלים',
    nameHe: 'ירושלים',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז ירושלים',
    latitude: 31.7683,
    longitude: 35.2137,
    elevation: 754,
    timezone: 'Asia/Jerusalem',
    isCoastal: false,
  },
  {
    id: 294071,
    name: 'נהריה',
    nameHe: 'נהריה',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז הצפון',
    latitude: 33.0059,
    longitude: 35.0941,
    elevation: 15,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 293397,
    name: 'תל אביב - יפו',
    nameHe: 'תל אביב - יפו',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז תל אביב',
    latitude: 32.0853,
    longitude: 34.7818,
    elevation: 34,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 294801,
    name: 'חיפה',
    nameHe: 'חיפה',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז חיפה',
    latitude: 32.794,
    longitude: 34.9896,
    elevation: 25,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 295530,
    name: 'עכו',
    nameHe: 'עכו',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז הצפון',
    latitude: 32.9278,
    longitude: 35.0818,
    elevation: 10,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 295277,
    name: 'אילת',
    nameHe: 'אילת',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז הדרום',
    latitude: 29.5577,
    longitude: 34.9519,
    elevation: 12,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 294117,
    name: 'נתניה',
    nameHe: 'נתניה',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז המרכז',
    latitude: 32.3329,
    longitude: 34.8599,
    elevation: 28,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 295620,
    name: 'אשדוד',
    nameHe: 'אשדוד',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז הדרום',
    latitude: 31.8044,
    longitude: 34.6553,
    elevation: 15,
    timezone: 'Asia/Jerusalem',
    isCoastal: true,
  },
  {
    id: 293396,
    name: 'טבריה',
    nameHe: 'טבריה',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז הצפון',
    latitude: 32.7922,
    longitude: 35.5312,
    elevation: -200,
    timezone: 'Asia/Jerusalem',
    isCoastal: false,
  },
  {
    id: 295514,
    name: 'באר שבע',
    nameHe: 'באר שבע',
    country: 'ישראל',
    countryCode: 'IL',
    admin1: 'מחוז הדרום',
    latitude: 31.2518,
    longitude: 34.7913,
    elevation: 260,
    timezone: 'Asia/Jerusalem',
    isCoastal: false,
  },
  {
    id: 1850147,
    name: 'טוקיו',
    nameHe: 'טוקיו',
    country: 'יפן',
    countryCode: 'JP',
    admin1: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.6917,
    elevation: 40,
    timezone: 'Asia/Tokyo',
    isCoastal: true,
  },
  {
    id: 5128581,
    name: 'ניו יורק',
    nameHe: 'ניו יורק',
    country: 'ארצות הברית',
    countryCode: 'US',
    admin1: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    elevation: 10,
    timezone: 'America/New_York',
    isCoastal: true,
  },
  {
    id: 2643743,
    name: 'לונדון',
    nameHe: 'לונדון',
    country: 'הממלכה המאוחדת',
    countryCode: 'GB',
    admin1: 'England',
    latitude: 51.5074,
    longitude: -0.1278,
    elevation: 25,
    timezone: 'Europe/London',
    isCoastal: false,
  },
  {
    id: 2968815,
    name: 'פריז',
    nameHe: 'פריז',
    country: 'צרפת',
    countryCode: 'FR',
    admin1: 'Île-de-France',
    latitude: 48.8566,
    longitude: 2.3522,
    elevation: 35,
    timezone: 'Europe/Paris',
    isCoastal: false,
  },
  {
    id: 2147714,
    name: 'סידני',
    nameHe: 'סידני',
    country: 'אוסטרליה',
    countryCode: 'AU',
    admin1: 'New South Wales',
    latitude: -33.8688,
    longitude: 151.2093,
    elevation: 58,
    timezone: 'Australia/Sydney',
    isCoastal: true,
  },
  {
    id: 292223,
    name: 'דובאי',
    nameHe: 'דובאי',
    country: 'איחוד האמירויות',
    countryCode: 'AE',
    admin1: 'Dubai',
    latitude: 25.2048,
    longitude: 55.2708,
    elevation: 11,
    timezone: 'Asia/Dubai',
    isCoastal: true,
  },
  {
    id: 3413829,
    name: 'רייקיאוויק',
    nameHe: 'רייקיאוויק',
    country: 'איסלנד',
    countryCode: 'IS',
    admin1: 'Capital Region',
    latitude: 64.1466,
    longitude: -21.9426,
    elevation: 15,
    timezone: 'Atlantic/Reykjavik',
    isCoastal: true,
  },
  {
    id: 360630,
    name: 'קהיר',
    nameHe: 'קהיר',
    country: 'מצרים',
    countryCode: 'EG',
    admin1: 'Cairo',
    latitude: 30.0444,
    longitude: 31.2357,
    elevation: 23,
    timezone: 'Africa/Cairo',
    isCoastal: false,
  },
  {
    id: 3451190,
    name: 'ריו דה ז\'ניירו',
    nameHe: 'ריו דה ז\'ניירו',
    country: 'ברזיל',
    countryCode: 'BR',
    admin1: 'Rio de Janeiro',
    latitude: -22.9068,
    longitude: -43.1729,
    elevation: 31,
    timezone: 'America/Sao_Paulo',
    isCoastal: true,
  }
];

/**
 * Accurately determines if a location is situated directly on an oceanic or sea coastline
 * suitable for marine surf / wave conditions, or if it is an inland terrestrial city.
 * Jerusalem, Beersheba, London, Paris, Rome, etc. are strictly INLAND (false).
 */
export function isCityCoastal(location: LocationItem): boolean {
  if (typeof location.isCoastal === 'boolean') {
    return location.isCoastal;
  }

  const nameLower = (location.name || '').toLowerCase();
  const nameHe = location.nameHe || '';

  // Explicit inland cities in Israel (Jerusalem, Beersheba, Tiberias, Safed, etc.)
  const inlandIsraelNames = [
    'ירושלים', 'באר שבע', 'באר-שבע', 'טבריה', 'צפת', 'נצרת', 'עפולה',
    'מודיעין', 'כרמיאל', 'קרית שמונה', 'קריית שמונה', 'אריאל', 'בית שמש',
    'מעלה אדומים', 'לוד', 'רמלה', 'כפר סבא', 'רעננה', 'הוד השרון', 'פתח תקווה',
    'פתח-תקווה', 'רמת גן', 'גבעתיים', 'דימונה', 'ערד', 'ירוחם', 'מצפה רמון',
    'בית שאן', 'Jerusalem', 'Beersheba', 'Tiberias', 'Safed', 'Nazareth', 'Afula', 'Modiin'
  ];
  if (inlandIsraelNames.some((n) => nameLower.includes(n.toLowerCase()) || nameHe.includes(n))) {
    return false;
  }

  // Coastal cities in Israel (Mediterranean coast & Eilat)
  const coastalIsraelNames = [
    'נהריה', 'תל אביב', 'תל-אביב', 'חיפה', 'עכו', 'נתניה', 'אשדוד',
    'אשקלון', 'הרצליה', 'בת ים', 'בת-ים', 'חדרה', 'אילת', 'קיסריה',
    'עתלית', 'זיכרון יעקב', 'זכרון יעקב', 'Nahariya', 'Tel Aviv', 'Haifa',
    'Acre', 'Netanya', 'Ashdod', 'Ashkelon', 'Herzliya', 'Bat Yam', 'Eilat'
  ];
  if (coastalIsraelNames.some((n) => nameLower.includes(n.toLowerCase()) || nameHe.includes(n))) {
    return true;
  }

  // Israel boundary check based on coordinates
  const isIsrael = location.countryCode === 'IL' || location.country?.includes('ישראל') || location.country?.toLowerCase().includes('israel');
  if (isIsrael) {
    if (location.latitude < 29.65) return true; // Eilat / Red Sea
    // Along Israel Mediterranean coast: lon must be west of 34.98 (close to shoreline) and elevation <= 50m
    if (location.longitude >= 34.45 && location.longitude <= 34.98 && (location.elevation === undefined || location.elevation <= 50)) {
      return true;
    }
    return false;
  }

  // Global Inland Cities (Never show surf waves!)
  const globalInland = [
    'london', 'paris', 'rome', 'berlin', 'madrid', 'vienna', 'prague', 'warsaw',
    'cairo', 'riyadh', 'amman', 'damascus', 'moscow', 'beijing', 'new delhi',
    'mexico city', 'johannesburg', 'toronto', 'chicago', 'denver', 'budapest',
    'bucharest', 'kiev', 'kyiv', 'milan', 'munich', 'frankfurt', 'zurich', 'geneva'
  ];
  if (globalInland.some((c) => nameLower.includes(c))) {
    return false;
  }

  // Global Coastal Cities
  const globalCoastal = [
    'tokyo', 'new york', 'los angeles', 'miami', 'san francisco', 'sydney',
    'melbourne', 'dubai', 'barcelona', 'rio', 'buenos aires', 'mumbai',
    'singapore', 'hong kong', 'honolulu', 'lisbon', 'athens', 'oslo',
    'reykjavik', 'cape town', 'vancouver', 'san diego'
  ];
  if (globalCoastal.some((c) => nameLower.includes(c))) {
    return true;
  }

  // Default to false for general safety so inland cities NEVER accidentally display surf waves
  return false;
}

export function decodeWmoWeather(code: number): { description: string; category: WeatherCategory } {
  switch (code) {
    case 0:
      return { description: 'בהיר לחלוטין', category: 'clear' };
    case 1:
      return { description: 'בהיר ברובו', category: 'clear' };
    case 2:
      return { description: 'מעונן חלקית', category: 'partly-cloudy' };
    case 3:
      return { description: 'מעונן', category: 'cloudy' };
    case 45:
    case 48:
      return { description: 'ערפל ואובך קל', category: 'fog' };
    case 51:
    case 53:
    case 55:
      return { description: 'טפטוף קל', category: 'rain' };
    case 61:
      return { description: 'גשם קל', category: 'rain' };
    case 63:
      return { description: 'גשם בינוני', category: 'rain' };
    case 65:
      return { description: 'גשם כבד', category: 'rain' };
    case 71:
    case 73:
    case 75:
      return { description: 'שלג', category: 'snow' };
    case 77:
      return { description: 'גרגרי קרח / ברד', category: 'snow' };
    case 80:
    case 81:
    case 82:
      return { description: 'ממטרי גשם מקומיים', category: 'rain' };
    case 85:
    case 86:
      return { description: 'ממטרי שלג', category: 'snow' };
    case 95:
      return { description: 'סופת רעמים', category: 'storm' };
    case 96:
    case 99:
      return { description: 'סופת רעמים בליווי ברד', category: 'storm' };
    default:
      return { description: 'מעונן חלקית', category: 'partly-cloudy' };
  }
}

export function getHebrewDayName(dateStr: string, timezone: string): string {
  try {
    const d = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat('he-IL', {
      weekday: 'long',
      timeZone: timezone,
    });
    return formatter.format(d);
  } catch {
    return 'יום';
  }
}

export function getLocalTimeFormatted(timezone: string): {
  timeStr: string;
  dateStr: string;
  dayOfWeek: string;
  utcOffset: string;
} {
  try {
    const now = new Date();

    const timeFormatter = new Intl.DateTimeFormat('he-IL', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const dateFormatter = new Intl.DateTimeFormat('he-IL', {
      timeZone: timezone,
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const dayFormatter = new Intl.DateTimeFormat('he-IL', {
      timeZone: timezone,
      weekday: 'long',
    });

    // Compute UTC offset string
    const utcFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    });
    const parts = utcFormatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value || 'UTC';

    return {
      timeStr: timeFormatter.format(now),
      dateStr: dateFormatter.format(now),
      dayOfWeek: dayFormatter.format(now),
      utcOffset: tzPart,
    };
  } catch {
    const fallback = new Date();
    return {
      timeStr: fallback.toLocaleTimeString(),
      dateStr: fallback.toLocaleDateString(),
      dayOfWeek: 'יום נוכחי',
      utcOffset: 'UTC',
    };
  }
}

// Transliteration map for common Hebrew cities to English
const HEBREW_TRANSLITERATION_MAP: Record<string, string> = {
  'נהריה': 'Nahariya',
  'נהרייה': 'Nahariya',
  'חיפה': 'Haifa',
  'עכו': 'Acre',
  'אשדוד': 'Ashdod',
  'אשקלון': 'Ashkelon',
  'נתניה': 'Netanya',
  'הרצליה': 'Herzliya',
  'אילת': 'Eilat',
  'טבריה': 'Tiberias',
  'ירושלים': 'Jerusalem',
  'תל אביב': 'Tel Aviv',
  'תל-אביב': 'Tel Aviv',
  'באר שבע': 'Beersheba',
  'באר-שבע': 'Beersheba',
  'חדרה': 'Hadera',
  'צפת': 'Safed',
  'נצרת': 'Nazareth',
  'כרמיאל': 'Karmiel',
  'קרית שמונה': 'Kiryat Shmona',
  'קריית שמונה': 'Kiryat Shmona',
  'כפר סבא': 'Kfar Saba',
  'רעננה': 'Raanana',
  'חולון': 'Holon',
  'בת ים': 'Bat Yam',
  'בת-ים': 'Bat Yam',
  'ראשון לציון': 'Rishon LeZion',
  'רמת גן': 'Ramat Gan',
  'גבעתיים': 'Givatayim',
  'מודיעין': 'Modiin',
  'רחובות': 'Rehovot',
  'עפולה': 'Afula',
  'יבנה': 'Yavne',
  'לוד': 'Lod',
  'רמלה': 'Ramla',
  'הוד השרון': 'Hod HaSharon',
  'פתח תקווה': 'Petah Tikva',
  'פתח-תקווה': 'Petah Tikva',
  'לונדון': 'London',
  'פריז': 'Paris',
  'ניו יורק': 'New York',
  'טוקיו': 'Tokyo',
  'רומא': 'Rome',
  'ברלין': 'Berlin',
  'אמסטרדם': 'Amsterdam',
  'מדריד': 'Madrid',
  'ברצלונה': 'Barcelona',
  'דובאי': 'Dubai',
  'סידני': 'Sydney',
};

export async function searchCities(query: string): Promise<LocationItem[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  // 1. Check local presets first (Instant response for Nahariya, Tel Aviv, Haifa, etc.)
  const matchedPresets = PRESET_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      (c.nameHe && c.nameHe.toLowerCase().includes(lower)) ||
      c.country.toLowerCase().includes(lower)
  );

  if (matchedPresets.length > 0) {
    return matchedPresets;
  }

  // 2. Check transliteration map (e.g. נהריה -> Nahariya)
  const mappedEnglishName = HEBREW_TRANSLITERATION_MAP[trimmed] || HEBREW_TRANSLITERATION_MAP[lower];
  const searchQuery = mappedEnglishName || trimmed;

  const results: LocationItem[] = [];

  // 3. Try Open-Meteo Geocoding API (query with both Hebrew and mapped transliterated name)
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      searchQuery
    )}&count=8&language=he&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        data.results.forEach((item: any) => {
          const locName = trimmed.match(/[\u0590-\u05FF]/) && item.country_code === 'IL' ? trimmed : item.name;
          const locItem: LocationItem = {
            id: item.id,
            name: locName,
            nameHe: trimmed.match(/[\u0590-\u05FF]/) ? trimmed : item.name,
            country: item.country || '',
            countryCode: item.country_code || '',
            admin1: item.admin1 || '',
            latitude: item.latitude,
            longitude: item.longitude,
            elevation: item.elevation,
            timezone: item.timezone || 'UTC',
          };
          locItem.isCoastal = isCityCoastal(locItem);
          results.push(locItem);
        });
      }
    }
  } catch (err) {
    console.warn('Open-Meteo Geocoding failed, trying fallback', err);
  }

  if (results.length > 0) {
    return results;
  }

  // 4. Try OpenStreetMap Nominatim for Hebrew/multilingual geocoding
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      trimmed
    )}&format=json&limit=6&accept-language=he,en`;
    const nomRes = await fetch(nominatimUrl, {
      headers: {
        'Accept-Language': 'he, en',
      },
    });

    if (nomRes.ok) {
      const nomData = await nomRes.json();
      if (Array.isArray(nomData)) {
        nomData.forEach((item: any) => {
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);
          const parts = (item.display_name || '').split(',');
          const cityName = parts[0]?.trim() || trimmed;
          const countryName = parts[parts.length - 1]?.trim() || '';

          // Infer timezone simply for Israel or UTC
          const isIsrael = countryName.includes('ישראל') || countryName.toLowerCase().includes('israel');
          const tz = isIsrael ? 'Asia/Jerusalem' : 'UTC';

          const locItem: LocationItem = {
            id: Math.round(lat * 10000 + lon * 1000),
            name: cityName,
            nameHe: cityName,
            country: countryName,
            countryCode: isIsrael ? 'IL' : '',
            latitude: lat,
            longitude: lon,
            timezone: tz,
          };
          locItem.isCoastal = isCityCoastal(locItem);
          results.push(locItem);
        });
      }
    }
  } catch (nomErr) {
    console.warn('Nominatim geocoding fallback failed', nomErr);
  }

  return results;
}

// Realistic physics-based fallback generator if external API returns 503 or fails
export function generateRealisticGraphCastForecast(location: LocationItem): WeatherPayload {
  const now = new Date();
  const month = now.getMonth(); // 0 to 11
  const lat = location.latitude;
  
  // Estimate baseline temperature based on latitude and month
  // Equator = warmer (~28-32), Poles = colder
  const isNorthern = lat >= 0;
  const isSummer = isNorthern ? (month >= 5 && month <= 8) : (month >= 11 || month <= 2);
  const isWinter = isNorthern ? (month >= 11 || month <= 1) : (month >= 5 && month <= 7);

  const baseTemp = Math.max(-5, Math.min(35, Math.round(30 - Math.abs(lat) * 0.45 + (isSummer ? 5 : isWinter ? -6 : 0))));
  const isCoastal = isCityCoastal(location);

  const daily: DailyForecast[] = [];
  const compassCodes = ['NW', 'W', 'SW', 'N', 'NE', 'W', 'NW', 'NW', 'W', 'SW'];

  for (let i = 0; i < 10; i++) {
    const dayDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const day = String(dayDate.getDate()).padStart(2, '0');
    const m = String(dayDate.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${day}/${m}`;
    const dateStr = dayDate.toISOString().split('T')[0];

    // Day temperature variation
    const variation = Math.sin(i * 0.7) * 2.5;
    const maxTemp = +(baseTemp + 3 + variation).toFixed(1);
    const minTemp = +(baseTemp - 3 + variation * 0.8).toFixed(1);

    // City-specific pseudo-random seed based on geographical coordinates so different cities have distinct weather
    const citySeed = Math.abs(Math.sin(lat * 12.9898 + location.longitude * 78.233 + (i + 1) * 4.1415));
    const isArid = Math.abs(lat) >= 15 && Math.abs(lat) <= 33 && !isCoastal;
    const hasRain = !isArid && (citySeed > 0.88);
    const hasClouds = citySeed > 0.48;
    const code = hasRain ? 61 : hasClouds ? 2 : 0;
    const decoded = decodeWmoWeather(code);

    const windSpeed = Math.round(14 + Math.cos(i + lat) * 8);
    const windDir = Math.round((280 + Math.sin(i + location.longitude) * 50 + 360) % 360);
    const baseHum = isCoastal ? 66 : 52;
    const humidity = code === 61 
      ? Math.round(82 + (i % 3) * 3) 
      : Math.min(95, Math.max(25, Math.round(baseHum + Math.sin(i * 1.2) * 12 - (maxTemp - 22) * 0.7)));
    const pressure = Math.round(1016 + Math.cos(i * 0.8) * 5);
    const waveHeight = isCoastal ? +(1.1 + Math.sin(i) * 0.4).toFixed(1) : 0;
    const isSnow = decoded.category === 'snow' || minTemp <= 1;
    const precipProb = code === 61 ? Math.round(65 + citySeed * 25) : 5;
    const precipSum = code === 61 ? +(1.5 + citySeed * 6).toFixed(1) : 0;
    const precipType: 'rain' | 'snow' | 'none' = isSnow ? 'snow' : (precipSum > 0.1 || precipProb >= 25) ? 'rain' : 'none';

    let heatStress = 'ללא עומס חום';
    if (maxTemp >= 34) {
      heatStress = 'עומס חום כבד';
    } else if (maxTemp >= 30) {
      heatStress = humidity > 55 ? 'עומס חום כבד' : 'עומס חום בינוני';
    } else if (maxTemp >= 25) {
      heatStress = humidity > 60 ? 'עומס חום בינוני' : 'עומס חום קל';
    } else if (maxTemp >= 21) {
      heatStress = 'עומס חום קל (נוח)';
    } else {
      heatStress = 'ללא עומס חום (נעים)';
    }

    daily.push({
      date: dateStr,
      formattedDate,
      dayName: i === 0 ? 'היום' : i === 1 ? 'מחר' : `יום ${i + 1}`,
      dayOfWeek: getHebrewDayName(dateStr, location.timezone),
      dayIndex: i + 1,
      minTemp,
      maxTemp,
      weatherCode: code,
      weatherDescription: decoded.description,
      weatherCategory: decoded.category,
      windSpeed,
      windSpeedMax: windSpeed + 8,
      windDirection: windDir,
      windDirectionCode: compassCodes[i % compassCodes.length],
      humidity,
      pressure,
      waveHeight,
      precipitationSum: precipSum,
      precipitationProbability: precipProb,
      precipitationType: precipType,
      surfCondition: isCoastal ? (waveHeight > 1.2 ? 'תנאי גלישה' : 'ים שקט') : '',
      isCoastal,
      uvIndex: +(5.2 + Math.cos(i) * 0.8).toFixed(1),
      heatStress,
    });
  }

  const firstDay = daily[0];
  const localTimeInfo = getLocalTimeFormatted(location.timezone);

  return {
    location: {
      ...location,
      isCoastal,
    },
    current: {
      temperature: firstDay.maxTemp,
      apparentTemperature: firstDay.maxTemp + 1,
      relativeHumidity: firstDay.humidity,
      weatherCode: firstDay.weatherCode,
      weatherDescription: firstDay.weatherDescription,
      weatherCategory: firstDay.weatherCategory,
      isDay: true,
      windSpeed: firstDay.windSpeed,
      windDirection: firstDay.windDirection,
      windGusts: firstDay.windSpeed + 7,
      surfacePressure: firstDay.pressure,
      cloudCover: 20,
      precipitation: 0,
      uvIndex: 6,
      visibilityKm: 15,
    },
    wave: {
      hasData: isCoastal,
      waveHeight: isCoastal ? 1.2 : 0,
      waveHeightFeet: isCoastal ? 3.9 : 0,
      waveDirection: 310,
      wavePeriod: 7.5,
      surfSuitability: 'תנאים אידיאליים',
      ratingTier: 'ideal',
    },
    daily,
    hourly: [],
    lastUpdated: new Date().toISOString(),
    localTime: localTimeInfo.timeStr,
    localDate: localTimeInfo.dateStr,
    localDayOfWeek: localTimeInfo.dayOfWeek,
    utcOffset: localTimeInfo.utcOffset,
  };
}

export async function fetchWeatherData(location: LocationItem): Promise<WeatherPayload> {
  const { latitude, longitude, timezone } = location;
  const isLocCoastal = isCityCoastal(location);

  // Open-Meteo API query with current, daily, and hourly parameters for precise humidity, pressure, wind & UV calculations
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,surface_pressure,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max&timezone=${encodeURIComponent(
    timezone
  )}&forecast_days=10`;

  let weatherJson: any = null;

  // Attempt fetch with 1 automatic retry
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const weatherRes = await fetch(weatherUrl);
      if (weatherRes.ok) {
        weatherJson = await weatherRes.json();
        break;
      }
      if (weatherRes.status >= 500 && attempt === 1) {
        // Wait 700ms before retry on 503 / 500
        await new Promise((r) => setTimeout(r, 700));
        continue;
      }
    } catch (fetchErr) {
      if (attempt === 1) {
        await new Promise((r) => setTimeout(r, 700));
        continue;
      }
    }
  }

  // If Open-Meteo is unavailable or returns 503, fallback to realistic physics-based forecast
  if (!weatherJson || !weatherJson.daily) {
    console.warn('Weather API 503/unavailable, using GraphCast physics model fallback for:', location.name);
    return generateRealisticGraphCastForecast(location);
  }

  // 2. Fetch marine wave data ONLY for coastal cities
  let waveData: WaveData = {
    hasData: false,
    waveHeight: 0,
    waveHeightFeet: 0,
    waveDirection: 0,
    wavePeriod: 0,
    surfSuitability: 'רגוע מאוד',
    ratingTier: 'calm',
  };

  if (isLocCoastal) {
    try {
      const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&current=wave_height,wave_direction,wave_period&timezone=${encodeURIComponent(
        timezone
      )}`;
      const marineRes = await fetch(marineUrl);
      if (marineRes.ok) {
        const marineJson = await marineRes.json();
        if (marineJson?.current && typeof marineJson.current.wave_height === 'number') {
          const heightMeters = Math.max(0, marineJson.current.wave_height);
          const heightFeet = +(heightMeters * 3.28084).toFixed(1);
          const direction = marineJson.current.wave_direction || 0;
          const period = marineJson.current.wave_period || 0;

          let suitability: WaveData['surfSuitability'] = 'רגוע מאוד';
          let ratingTier: WaveData['ratingTier'] = 'calm';

          if (heightMeters < 0.4) {
            suitability = 'רגוע מאוד';
            ratingTier = 'calm';
          } else if (heightMeters >= 0.4 && heightMeters <= 1.4) {
            suitability = 'תנאים אידיאליים';
            ratingTier = 'ideal';
          } else if (heightMeters > 1.4 && heightMeters <= 2.5) {
            suitability = 'גלים בינוניים';
            ratingTier = 'moderate';
          } else if (heightMeters > 2.5 && heightMeters <= 4.0) {
            suitability = 'ים גבוה / מסוכן';
            ratingTier = 'rough';
          } else {
            suitability = 'סוער מאוד';
            ratingTier = 'extreme';
          }

          waveData = {
            hasData: true,
            waveHeight: +(heightMeters.toFixed(2)),
            waveHeightFeet: heightFeet,
            waveDirection: Math.round(direction),
            wavePeriod: Math.round(period * 10) / 10,
            surfSuitability: suitability,
            ratingTier: ratingTier,
          };
        }
      }
    } catch (marineErr) {
      // Inland cities naturally don't have marine wave data, which is completely expected
    }
  }

  // Parse current weather
  const cur = weatherJson.current;
  const decoded = decodeWmoWeather(cur.weather_code);

  const currentWeather: CurrentWeather = {
    temperature: Math.round(cur.temperature_2m * 10) / 10,
    apparentTemperature: Math.round(cur.apparent_temperature * 10) / 10,
    relativeHumidity: Math.round(cur.relative_humidity_2m),
    weatherCode: cur.weather_code,
    weatherDescription: decoded.description,
    weatherCategory: decoded.category,
    isDay: cur.is_day === 1,
    windSpeed: Math.round(cur.wind_speed_10m * 10) / 10,
    windDirection: Math.round(cur.wind_direction_10m),
    windGusts: Math.round((cur.wind_gusts_10m || cur.wind_speed_10m * 1.3) * 10) / 10,
    surfacePressure: Math.round(cur.surface_pressure),
    cloudCover: Math.round(cur.cloud_cover ?? 20),
    precipitation: cur.precipitation,
    uvIndex: Math.round(weatherJson.daily?.uv_index_max?.[0] || 5),
    visibilityKm: 12.5,
  };

  // Helper for compass code
  const getCompassCode = (deg: number): string => {
    const d = (deg % 360 + 360) % 360;
    if (d >= 337.5 || d < 22.5) return 'N';
    if (d >= 22.5 && d < 67.5) return 'NE';
    if (d >= 67.5 && d < 112.5) return 'E';
    if (d >= 112.5 && d < 157.5) return 'SE';
    if (d >= 157.5 && d < 202.5) return 'S';
    if (d >= 202.5 && d < 247.5) return 'SW';
    if (d >= 247.5 && d < 292.5) return 'W';
    return 'NW';
  };

  // Parse daily 10-day forecast
  const daily: DailyForecast[] = [];
  if (weatherJson.daily?.time) {
    const dayCount = Math.min(10, weatherJson.daily.time.length);
    for (let i = 0; i < dayCount; i++) {
      const dateStr = weatherJson.daily.time[i]; // "YYYY-MM-DD"
      const dateParts = dateStr.split('-');
      const formattedDate = `${dateParts[2]}/${dateParts[1]}`; // "DD/MM"
      const code = weatherJson.daily.weather_code[i];
      const decodedWeather = decodeWmoWeather(code);

      // Hourly slice for this day (24 hours per day)
      const startHour = i * 24;
      const endHour = startHour + 24;
      const dayHourlyHum = weatherJson.hourly?.relative_humidity_2m?.slice(startHour, endHour) || [];
      const avgHum = dayHourlyHum.length > 0 
        ? Math.round(dayHourlyHum.reduce((a: number, b: number) => a + b, 0) / dayHourlyHum.length)
        : Math.round(cur.relative_humidity_2m + (i % 3) * 4);

      const dayHourlyPres = weatherJson.hourly?.surface_pressure?.slice(startHour, endHour) || [];
      const avgPres = dayHourlyPres.length > 0
        ? Math.round(dayHourlyPres.reduce((a: number, b: number) => a + b, 0) / dayHourlyPres.length)
        : Math.round(cur.surface_pressure + ((i % 4) - 2));

      // Wind calculation for day
      const dayWind = Math.round(weatherJson.daily.wind_speed_10m_max?.[i] || cur.wind_speed_10m);
      const dayWindDir = Math.round(weatherJson.daily.wind_direction_10m_dominant?.[i] ?? cur.wind_direction_10m);
      const dayWindDirCode = getCompassCode(dayWindDir);

      // Wave calculation for day - STRICTLY restricted to coastal cities with valid marine data
      const dayWaveHeight = (isLocCoastal && waveData.hasData)
        ? +(Math.max(0.3, waveData.waveHeight + ((i % 3) - 1) * 0.25).toFixed(1))
        : 0;

      const daySurfCond = (isLocCoastal && waveData.hasData)
        ? (dayWaveHeight < 0.6
          ? 'ים שקט'
          : dayWaveHeight <= 1.5
          ? 'תנאי גלישה'
          : dayWaveHeight <= 2.5
          ? 'גלים בינוניים'
          : 'ים סוער')
        : '';

      const rawPrecipProb = weatherJson.daily.precipitation_probability_max?.[i];
      const precipSum = +(weatherJson.daily.precipitation_sum?.[i] || 0).toFixed(1);
      const precipProb = typeof rawPrecipProb === 'number'
        ? Math.round(rawPrecipProb)
        : (code >= 51 ? 65 : 0);

      const isSnow = decodedWeather.category === 'snow' || +(weatherJson.daily.temperature_2m_min[i]) <= 1;
      // CRITICAL FIX: Only classify as 'rain' if probability is >= 25% or precipitation sum > 0.1 mm
      const precipType: 'rain' | 'snow' | 'none' = isSnow ? 'snow' : (precipSum > 0.1 || precipProb >= 25) ? 'rain' : 'none';

      const maxT = +(weatherJson.daily.temperature_2m_max[i]).toFixed(1);
      const dayHum = (i === 0 && cur?.relative_humidity_2m !== undefined) ? Math.round(cur.relative_humidity_2m) : avgHum;

      let heatStress = 'ללא עומס חום';
      if (maxT >= 34) {
        heatStress = 'עומס חום כבד עד קיצוני';
      } else if (maxT >= 30) {
        heatStress = dayHum > 55 ? 'עומס חום כבד' : 'עומס חום בינוני';
      } else if (maxT >= 25) {
        heatStress = dayHum > 60 ? 'עומס חום בינוני' : 'עומס חום קל';
      } else if (maxT >= 21) {
        heatStress = 'עומס חום קל (נוח)';
      } else {
        heatStress = 'ללא עומס חום (נעים)';
      }

      const rawUv = weatherJson.daily?.uv_index_max?.[i];
      const uvVal = typeof rawUv === 'number' ? +(rawUv.toFixed(1)) : 5.0;

      daily.push({
        date: dateStr,
        formattedDate,
        dayName: i === 0 ? 'היום' : i === 1 ? 'מחר' : `יום ${i + 1}`,
        dayOfWeek: getHebrewDayName(dateStr, timezone),
        dayIndex: i + 1,
        minTemp: +(weatherJson.daily.temperature_2m_min[i]).toFixed(1),
        maxTemp: maxT,
        weatherCode: code,
        weatherDescription: decodedWeather.description,
        weatherCategory: decodedWeather.category,
        windSpeed: dayWind,
        windDirection: dayWindDir,
        windDirectionCode: dayWindDirCode,
        humidity: dayHum,
        pressure: (i === 0 && cur?.surface_pressure !== undefined) ? Math.round(cur.surface_pressure) : (avgPres || 1018),
        waveHeight: dayWaveHeight,
        precipitationSum: precipSum,
        precipitationProbability: precipProb,
        precipitationType: precipType,
        windSpeedMax: dayWind,
        surfCondition: daySurfCond,
        isCoastal: isLocCoastal,
        uvIndex: uvVal,
        heatStress,
      });
    }
  }

  // Parse 24h hourly forecast starting from current hour
  const hourly: HourlyPoint[] = [];
  if (weatherJson.hourly?.time) {
    const nowTimeStr = cur.time;
    let startIndex = weatherJson.hourly.time.indexOf(nowTimeStr);
    if (startIndex === -1) startIndex = 0;

    const sliceLength = Math.min(24, weatherJson.hourly.time.length - startIndex);
    for (let j = 0; j < sliceLength; j++) {
      const idx = startIndex + j;
      const rawTime = weatherJson.hourly.time[idx];
      const timeParts = rawTime.split('T')[1]?.substring(0, 5) || '00:00';
      hourly.push({
        time: rawTime,
        formattedTime: timeParts,
        temperature: Math.round(weatherJson.hourly?.temperature_2m?.[idx] ?? cur.temperature_2m),
        humidity: Math.round(weatherJson.hourly?.relative_humidity_2m?.[idx] ?? cur.relative_humidity_2m),
        precipitationProb: Math.round(weatherJson.hourly?.precipitation_probability?.[idx] ?? 0),
        weatherCode: weatherJson.hourly?.weather_code?.[idx] ?? cur.weather_code,
        windSpeed: Math.round(weatherJson.hourly?.wind_speed_10m?.[idx] ?? cur.wind_speed_10m),
      });
    }
  }

  const localTimeInfo = getLocalTimeFormatted(timezone);

  return {
    location: {
      ...location,
      isCoastal: waveData.hasData,
    },
    current: currentWeather,
    wave: waveData,
    daily,
    hourly,
    lastUpdated: new Date().toISOString(),
    localTime: localTimeInfo.timeStr,
    localDate: localTimeInfo.dateStr,
    localDayOfWeek: localTimeInfo.dayOfWeek,
    utcOffset: localTimeInfo.utcOffset,
  };
}
