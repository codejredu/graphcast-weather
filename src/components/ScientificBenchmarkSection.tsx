import React, { useState } from 'react';
import { Cpu, Server, Zap, Flame, ShieldCheck, Check, Github, BookOpen, Layers, GitBranch } from 'lucide-react';

export const ScientificBenchmarkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'architecture' | 'github'>('comparison');

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-xl text-right">
      {/* Header and Tab Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
            Science & Deep Learning Foundations
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            מהפכת ה-AI במטאורולוגיה: GraphCast מול מחשבי-על
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-medium ${
              activeTab === 'comparison'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>השוואת ביצועים</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-medium ${
              activeTab === 'architecture'
                ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ארכיטקטורת המודל</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-medium ${
              activeTab === 'github'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>אחסון והרצה ב-GitHub</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Direct Benchmark Comparison */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional NWP Card */}
            <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-slate-400" />
                    <span className="font-bold text-lg text-slate-200">
                      ECMWF HRES (מודל מסורתי)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    משוואות Navier-Stokes
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  שיטה פיזיקלית מסורתית בת עשרות שנים הפותרת משוואות דיפרנציאליות חלקיות של הידרודינמיקה
                  ותרמודינמיקה ברישות גלובלי.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400">זמן חישוב לתחזית 10 ימים:</span>
                    <span className="text-rose-400 font-bold">120 - 180 דקות</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400">חומרה נדרשת:</span>
                    <span className="text-slate-200">מאות שרתי מחשב-על (HPC)</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400">צריכת אנרגיה ממוצעת:</span>
                    <span className="text-amber-400 font-bold">~1,000+ קילו-וואט שעה (kWh)</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400">גמישות לשינויי אקלים:</span>
                    <span className="text-slate-300">תלויה בכיול פרמטרים ידני</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
                המודל המבצעי המוביל של המרכז האירופי למזג אוויר (ECMWF).
              </div>
            </div>

            {/* GraphCast AI Card */}
            <div className="bg-cyan-950/30 rounded-2xl p-6 border border-cyan-500/40 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-cyan-500/10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-lg text-white">
                      GraphCast (Google DeepMind)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-900/60 border border-cyan-500/40 px-2 py-0.5 rounded">
                    GNN + 40 שנות ERA5
                  </span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  רשת נוירונים גרפית הלומדת ישירות מ-40 שנות תצפיות היסטוריות עולמיות ומנבאת מאות
                  משתנים אטמוספריים בדיוק חסר תקדים.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                    <span className="text-slate-300">זמן חישוב לתחזית 10 ימים:</span>
                    <span className="text-cyan-300 font-bold text-sm">פחות מ-60 שניות! ⚡</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                    <span className="text-slate-300">חומרה נדרשת:</span>
                    <span className="text-cyan-300 font-semibold">שבב בודד של Google Cloud TPU v4</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                    <span className="text-slate-300">חיסכון באנרגיה:</span>
                    <span className="text-emerald-400 font-bold">פי 1,000 פחות חשמל (כ-0.1 kWh)</span>
                  </div>

                  <div className="flex justify-between p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                    <span className="text-slate-300">ציון דיוק מדעי (Science 2023):</span>
                    <span className="text-emerald-300 font-bold">עולה על HRES ב-90.3% מהמשתנים</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-cyan-900/60 text-xs text-cyan-400/80 font-mono flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>זיהוי מוקדם של סופות טרופיות, נהרות אטמוספריים וגלי חום קיצוניים</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Model Architecture (Encoder -> Processor -> Decoder) */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold mb-3">
                01
              </div>
              <h4 className="text-base font-bold text-white mb-2">Grid-to-Mesh Encoder</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                לוקח 2 מצבי זמן של כדור הארץ (t-6h ו-t0) ברשת קווי אורך/רוחב 0.25° (מעל 1 מיליון
                נקודות). הרשת מקודדת אותם לתוך צמתים של גרף איקוסהדרלי הומוגני המונע עיוותי קטבים.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/40">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono font-bold mb-3">
                02
              </div>
              <h4 className="text-base font-bold text-white mb-2">GNN Processor (16 שכבות)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ליבת ה-AI: רשת נוירונים גרפית עמוקה המבצעת Message Passing בין 40,962 צמתים ו-3.2
                מיליון קשתות על גבי 6 רמות שונות (M0-M6). מידע מתפשט גלובלית במהירות האור.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold mb-3">
                03
              </div>
              <h4 className="text-base font-bold text-white mb-2">Mesh-to-Grid Decoder</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                מפענח את המצב האקלימי בחזרה אל רשת כדור הארץ עבור 37 מפלסי רום אטמוספריים, ומריץ
                צעד אוטורגרסיבי נוסף לניבוי 10 ימים קדימה (240 שעות ב-40 צעדים).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-mono">
            מאמר מדעי מפתח: <span className="text-cyan-300">Lam et al., Science 382, eadi2336 (2023) - Learning skillful medium-range global weather forecasting</span>
          </div>
        </div>
      )}

      {/* Tab 3: GitHub Hosting Instructions */}
      {activeTab === 'github' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-400" />
              <span>הנחיות להעלאת הפרויקט ואירוח ב-GitHub Pages</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              הפרויקט בנוי כ-Pure Client-Side React SPA (ללא תלות בשרת מסורבל), ולכן ניתן לארח אותו
              בקלות ובחינם ב-<strong>GitHub Pages</strong>, <strong>Vercel</strong> או <strong>Netlify</strong>.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 mb-1">1. אתחול מאגר Git מקומי וחיבור ל-GitHub:</div>
                <code className="text-cyan-300 block select-all">
                  git init<br />
                  git add .<br />
                  git commit -m "Initial commit: GraphCast Weather Engine"<br />
                  git branch -M main<br />
                  git remote add origin https://github.com/USERNAME/graphcast-weather-engine.git<br />
                  git push -u origin main
                </code>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 mb-1">2. בניית גרסת פרודקשן (Build):</div>
                <code className="text-cyan-300 block select-all">npm run build</code>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 mb-1">3. הפעלה עם GitHub Pages:</div>
                <p className="text-slate-300 font-sans text-xs">
                  בהגדרות ה-Repository ב-GitHub (Settings &gt; Pages), בחר ב-<strong>GitHub Actions</strong> או בענף <code>gh-pages</code> והאתר יפעל אונליין ללא כל עלות.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
