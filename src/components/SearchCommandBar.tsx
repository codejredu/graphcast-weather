import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Compass, Clock } from 'lucide-react';
import { LocationItem } from '../types';
import { searchCities, PRESET_CITIES } from '../services/weatherService';

interface SearchCommandBarProps {
  currentLocation: LocationItem;
  onSelectLocation: (loc: LocationItem) => void;
  localTimeStr: string;
  localDateStr: string;
  localDayOfWeek: string;
  utcOffset: string;
  isLoadingWeather: boolean;
}

export const SearchCommandBar: React.FC<SearchCommandBarProps> = ({
  currentLocation,
  onSelectLocation,
  localTimeStr,
  localDateStr,
  localDayOfWeek,
  utcOffset,
  isLoadingWeather,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const found = await searchCities(query);
        setResults(found);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc: LocationItem) => {
    onSelectLocation(loc);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="w-full relative z-30">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl glass-panel border border-slate-700/60 shadow-xl">
        {/* Global Search Input Box */}
        <div className="relative flex-1" ref={dropdownRef}>
          <div className="relative flex items-center">
            <Search className="absolute right-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="חפש כל עיר ומדינה בעולם (למשל: טוקיו, ניו יורק, לונדון, אילת)..."
              className="w-full h-13 pr-12 pl-10 rounded-2xl bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
              dir="rtl"
            />

            {/* Clear / Loading state */}
            <div className="absolute left-3.5 flex items-center gap-1.5">
              {isSearching && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />}
              {query && !isSearching && (
                <button
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && (results.length > 0 || isSearching) && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-72 overflow-y-auto z-50 divide-y divide-slate-800">
              {isSearching ? (
                <div className="p-4 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>סורק מאגרי Geocoding עולמיים...</span>
                </div>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <button
                    key={`${item.id}-${item.latitude}-${item.longitude}`}
                    onClick={() => handleSelect(item)}
                    className="w-full p-3.5 text-right hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 text-slate-400 group-hover:text-cyan-400 flex items-center justify-center transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.country} {item.admin1 ? `· ${item.admin1}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="text-left font-mono text-[11px] text-slate-500 group-hover:text-slate-300">
                      <div>{item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°</div>
                      <div className="text-[10px] text-cyan-400/80">{item.timezone}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  לא נמצאו תוצאות עבור &quot;{query}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Local Clock & Date for the selected city */}
        <div className="flex items-center justify-between lg:justify-end gap-3 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-700/80 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>

          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-300">
                {localTimeStr}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {utcOffset}
              </span>
            </div>
            <div className="text-xs text-slate-300">
              {localDayOfWeek}, {localDateStr}
            </div>
          </div>
        </div>
      </div>

      {/* Quick City Presets Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 px-1 scrollbar-none text-xs">
        <span className="text-slate-400 text-xs font-medium ml-2 shrink-0 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>יעדים פופולריים:</span>
        </span>
        {PRESET_CITIES.map((city) => {
          const isSelected = city.id === currentLocation.id;
          return (
            <button
              key={city.id}
              onClick={() => onSelectLocation(city)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-medium cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {city.name} {city.isCoastal ? '🌊' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};
