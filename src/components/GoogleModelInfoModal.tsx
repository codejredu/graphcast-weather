import React, { useState } from 'react';
import { X, Cpu, Zap, Sparkles, BookOpen, ExternalLink, ShieldCheck, Layers, CloudRain, Check, BarChart2, Globe } from 'lucide-react';

interface GoogleModelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleModelInfoModal: React.FC<GoogleModelInfoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'precipitation' | 'architecture' | 'benchmarks'>('overview');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 p-5 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  מודל GraphCast של Google DeepMind
                </h3>
                <span className="text-[11px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
                  Google DeepMind AI
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                מהפכת ה-AI הגדולה ביותר בעולם המטאורולוגיה וחיזוי מזג האוויר המודרני
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title="סגור"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-950/80 rounded-2xl border border-white/10 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>סקירה כללית</span>
          </button>

          <button
            onClick={() => setActiveTab('precipitation')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'precipitation'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>חיזוי גשם ומשקעים (מ"מ)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ארכיטקטורה ו-TPU</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'benchmarks'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>השוואה מדעית מול מחשבי-על</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>מהו מודל GraphCast?</span>
              </div>
              <p>
                <strong>GraphCast</strong> הוא מודל בינה מלאכותית מהפכני שפותח על ידי חוקרי <strong>Google DeepMind</strong> ו-<strong>Google Research</strong>, ופורסם כמאמר ראשי בכתב העת המדעי המוביל <em>Science</em> (נובמבר 2023).
              </p>
              <p>
                המודל מנבא תחזית מזג אוויר עולמית מפורטת ל-<strong>10 ימים קדימה</strong> ברזולוציה גיאוגרפית גבוהה של 0.25° (כ-28 ק"מ × 28 ק"מ), תוך חישוב מאות משתנים מטאורולוגיים במפלסי רום שונים.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                <div className="text-amber-300 font-bold flex items-center gap-1.5 text-xs">
                  <Zap className="w-3.5 h-3.5" />
                  <span>מהירות על-אנושית (פחות מ-60 שניות)</span>
                </div>
                <p className="text-xs text-slate-300">
                  במקום שעות של חישוב על גבי מחשבי-על מסורתיים, GraphCast מייצר תחזית עולמית מלאה ל-10 ימים בתוך פחות מדקה על גבי שבב <strong>Google TPU v4</strong> בודד!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>עליונות על המודלים המסורתיים</span>
                </div>
                <p className="text-xs text-slate-300">
                  נמצא עדיף על תקן הזהב העולמי (ECMWF HRES) ב-<strong>90.3%</strong> מתוך 1,380 מדדי אימות מטאורולוגיים שנבדקו במחקר המדעי.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                <div className="text-cyan-300 font-bold flex items-center gap-1.5 text-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>אימון על 40 שנות נתוני אמת</span>
                </div>
                <p className="text-xs text-slate-300">
                  אומן על גבי נתוני תצפיות אטמוספריות מטאורולוגיות של ארבעה עשורים (1979–2017) ממאגר <strong>ERA5</strong> של המרכז האירופי לחיזוי מזג אוויר.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                <div className="text-purple-300 font-bold flex items-center gap-1.5 text-xs">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>זיהוי מוקדם של אירועי קיצון</span>
                </div>
                <p className="text-xs text-slate-300">
                  מסוגל לזהות סופות ציקלון, הוריקנים, שיטפונות ואירועי מזג אוויר חריג ימים מראש ברמת דיוק גבוהה בהרבה ממודלים חישוביים רגילים.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Precipitation */}
        {activeTab === 'precipitation' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 space-y-2">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-sky-400" />
                <span>כיצד מודל ה-AI חוזה כמויות גשם ומשקעים (מ"מ)?</span>
              </div>
              <p>
                חיזוי גשם הוא אחד האתגרים הגדולים ביותר במטאורולוגיה מכיוון שהוא תלוי בתהליכים תרמודינמיים מהירים וזעירים בעמודת האוויר. GraphCast פותר זאת באמצעות שקלול רב-ממדי:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold text-white text-xs">לחות סגולית (Specific Humidity) ב-37 מפלסי רום</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    המודל עוקב במדויק אחר כמות אדי המים המומסים באוויר מקרקע הים ועד לגובה של עשרות קילומטרים בסטרטוספירה.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-bold text-white text-xs">מהירות אנכית וזרימת אוויר (Vertical Velocity)</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    עליית אוויר חם ולח גורמת להתעבות עננים ולמשקעים. המודל מחשב את מהירות ההתרוממות של גושי האוויר ואת פוטנציאל ההתעבות לענני גשם.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-bold text-white text-xs">כימות מדויק של צפי מ"מ והסתברות באחוזים</div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    האלגוריתם מתרגם את מאזן המים האטמוספרי לשני מדדים משלימים: <strong>הסתברות לגשם (%)</strong> וכן <strong>כמות משקעים צפויה במ"מ</strong> במצטבר לכל יום וליממה כולה.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/30 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">טווח סיווג עוצמת גשם:</span>
              <span className="text-amber-300 font-bold">
                טפטוף (0-2 מ"מ) · מתון (2-10 מ"מ) · כבד (&gt;10 מ"מ)
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>ארכיטקטורת רשת עצבית מבוססת גרפים (GNN)</span>
              </div>
              <p>
                במקום לפתור משוואות פיזיקליות מורכבות של הידרודינמיקה באופן נומרי איטי (כמו במודלי מחשבי-על ישנים), GraphCast עושה שימוש בארכיטקטורת רשת עצבית גרפית הפועלת ב-3 שלבים:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <div className="font-bold text-white text-xs mt-1">Grid-to-Mesh Encoder</div>
                <p className="text-[11px] text-slate-300">
                  קולט מעל 1,000,000 נקודות רשת גיאוגרפיות וממפה אותן למבנה גיאומטרי ייחודי של רשת רב-שכבתית (Icosahedral Mesh) המונעת עיוותים באזורי הקטבים.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/40 space-y-1">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <div className="font-bold text-white text-xs mt-1">GNN Processor (16 שכבות)</div>
                <p className="text-[11px] text-slate-300">
                  רשת עצבית עמוקה המבצעת Message Passing בין 42,152 צמתים ו-3.2 מיליון קשתות, ומדמה התפשטות גלי רוח ולחץ גלובליים במהירות בזק.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <div className="font-bold text-white text-xs mt-1">Mesh-to-Grid Decoder</div>
                <p className="text-[11px] text-slate-300">
                  מפענח את התוצאה בחזרה לקווי אורך ורוחב של כדור הארץ ומייצר תחזית עוקבת בכל פסיעה של 6 שעות עד ל-10 ימים (240 שעות).
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">חומרת אימון והרצה ייעודית:</span>
              <span className="text-cyan-300 font-bold">Google Cloud TPU v4 (Tensor Processing Unit)</span>
            </div>
          </div>
        )}

        {/* Tab 4: Benchmarks & Comparison */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <span>השוואת ביצועים מדעית: GraphCast מול מחשב-על מסורתי (ECMWF HRES)</span>
              </div>
              <p>
                המאמר המדעי שפורסם ב-<em>Science</em> הציג השוואה ישירה מול המודל המסורתי הטוב ביותר בעולם המשמש מרכזים מטאורולוגיים עולמיים:
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950/90 text-slate-300 border-b border-white/10 font-mono">
                  <tr>
                    <th className="p-2.5">פרמטר</th>
                    <th className="p-2.5 text-cyan-300 font-bold">GraphCast (Google DeepMind)</th>
                    <th className="p-2.5 text-slate-400">ECMWF HRES (מודל מסורתי)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr className="bg-slate-900/60">
                    <td className="p-2.5 font-bold text-white">זמן חישוב (10 ימים)</td>
                    <td className="p-2.5 text-cyan-300 font-bold">&lt; 60 שניות ⚡</td>
                    <td className="p-2.5 text-rose-400">120 - 180 דקות (שעתיים עד שלוש)</td>
                  </tr>
                  <tr className="bg-slate-950/40">
                    <td className="p-2.5 font-bold text-white">חומרה נדרשת</td>
                    <td className="p-2.5 text-emerald-300">שבב TPU v4 בודד של גוגל</td>
                    <td className="p-2.5 text-slate-400">מחשב-על עם מאות שרתים ומעבדים</td>
                  </tr>
                  <tr className="bg-slate-900/60">
                    <td className="p-2.5 font-bold text-white">דיוק מטאורולוגי כולל</td>
                    <td className="p-2.5 text-emerald-300 font-bold">עדיף ב-90.3% מהמדדים</td>
                    <td className="p-2.5 text-slate-400">תקן הזהב הקודם</td>
                  </tr>
                  <tr className="bg-slate-950/40">
                    <td className="p-2.5 font-bold text-white">צריכת חשמל ואנרגיה</td>
                    <td className="p-2.5 text-emerald-300 font-bold">פי 1,000 פחות אנרגיה (~0.1 kWh)</td>
                    <td className="p-2.5 text-amber-400">מעל 1,000 kWh לריצה בודדת</td>
                  </tr>
                  <tr className="bg-slate-900/60">
                    <td className="p-2.5 font-bold text-white">חיזוי מסלולי סופות טרופיות</td>
                    <td className="p-2.5 text-cyan-300">דיוק גבוה יותר עד 9 ימים מראש</td>
                    <td className="p-2.5 text-slate-400">דיוק מוגבל מעבר ל-5 ימים</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scientific Citations & Links */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-white/10 space-y-2">
              <div className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>מקורות מדעיים ומאגרי קוד רשמיים של Google:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://www.science.org/doi/10.1126/science.adi2336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 flex items-center gap-1.5 transition-colors"
                >
                  <span>מאמר ב-Science (נובמבר 2023)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://github.com/google-deepmind/graphcast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1.5 transition-colors"
                >
                  <span>קוד פתוח ב-GitHub של Google DeepMind</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://deepmind.google/discover/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1.5 transition-colors"
                >
                  <span>הודעת ההשקה בבלוג של DeepMind</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <div className="text-slate-400 font-mono text-[11px] hidden sm:block">
            Google DeepMind · GraphCast 10-Day GNN Weather Engine
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/30 cursor-pointer mr-auto"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
