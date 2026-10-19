/**
 * Barometric Pressure conversion and country-specific formatting.
 *
 * Units by region:
 * - Israel (IL) & International (WMO): hPa (הקטופסקל), identical to mbar (מיליבר).
 *   The Israel Meteorological Service (IMS / השירות המטאורולוגי הישראלי) officially measures in hPa.
 * - United States (US): inHg (Inches of Mercury) - standard sea level is ~29.92 inHg.
 * - Russia & Eastern Europe (RU, BY, KZ, UA): mmHg (Torr / מ"מ כספית) - standard is ~760 mmHg.
 */

export interface PressureInfo {
  rawHpa: number;
  valueString: string;
  unit: string;
  unitHebrew: string;
  countryName: string;
  status: 'low' | 'normal' | 'high';
  statusHebrew: string;
  needleAngle: number; // degrees: -55° (Deep Low) to +55° (High Ridge), 0° is 1013.25 hPa
}

export function getPressureForCountry(pressureHpa: number, countryCode?: string): PressureInfo {
  const code = (countryCode || 'IL').toUpperCase();
  const safeHpa = typeof pressureHpa === 'number' && !isNaN(pressureHpa) ? pressureHpa : 1013;

  // Standard sea-level pressure = 1013.25 hPa
  // Atmospheric delta: typical ground variations range from ~980 hPa to ~1040 hPa
  const delta = safeHpa - 1013.25;
  // Map delta of [-28, +28] to angle [-52, +52] degrees
  const needleAngle = Math.max(-55, Math.min(55, Math.round((delta / 25) * 50)));

  const status: 'low' | 'normal' | 'high' =
    safeHpa < 1009 ? 'low' : safeHpa > 1020 ? 'high' : 'normal';

  const statusHebrew =
    status === 'low'
      ? 'שקע ברומטרי (L)'
      : status === 'high'
      ? 'רמה ברומטרית (H)'
      : 'לחץ יציב ותקין';

  // 1. United States: inHg (Inches of Mercury)
  if (code === 'US') {
    const inHg = (safeHpa * 0.029529983).toFixed(2);
    return {
      rawHpa: safeHpa,
      valueString: inHg,
      unit: 'inHg',
      unitHebrew: "אינץ' כספית",
      countryName: "ארה״ב",
      status,
      statusHebrew,
      needleAngle,
    };
  }

  // 2. Russia, Belarus, Kazakhstan, Ukraine: mmHg (Millimeters of Mercury / Torr)
  if (['RU', 'BY', 'KZ', 'UA'].includes(code)) {
    const mmHg = Math.round(safeHpa * 0.750062).toString();
    return {
      rawHpa: safeHpa,
      valueString: mmHg,
      unit: 'mmHg',
      unitHebrew: 'מ"מ כספית',
      countryName: 'מזרח אירופה',
      status,
      statusHebrew,
      needleAngle,
    };
  }

  // 3. Israel (IL) & Metric / WMO countries:
  // In Israel, official IMS forecasts use hPa (הקטופסקל / מ"ב)
  return {
    rawHpa: safeHpa,
    valueString: Math.round(safeHpa).toString(),
    unit: 'hPa',
    unitHebrew: code === 'IL' ? 'hPa (הקטופסקל)' : 'hPa',
    countryName: code === 'IL' ? 'ישראל' : 'בינלאומי',
    status,
    statusHebrew,
    needleAngle,
  };
}
