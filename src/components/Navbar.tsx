import React from 'react';
import { Cpu, Zap } from 'lucide-react';

interface NavbarProps {
  onLaunchSimulation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchSimulation }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no pills) */}
        <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-sm">
            <Cpu className="w-4 h-4" />
          </div>
          <span>GraphCast Weather Engine</span>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#globe-section" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            גלובוס הגרף
          </a>
          <a href="#weather-card" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            תחזית ומדדים
          </a>
          <a href="#ten-day-section" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            תחזית 10 ימים
          </a>
          <a href="#benchmark-section" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            השוואת ביצועים
          </a>
          <a href="#github-section" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            אחסון ב-GitHub
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onLaunchSimulation}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
            <span>הפעלת ניבוי 60 שניות</span>
          </button>
        </div>
      </div>
    </header>
  );
};
