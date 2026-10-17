import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Zap, ArrowRight, ShieldCheck, Activity, FastForward } from 'lucide-react';
import { LocationItem, SimulationStep } from '../types';

interface GraphCastPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationItem;
  onComplete: () => void;
}

const SIMULATION_STAGES: SimulationStep[] = [
  {
    id: 1,
    timeWindow: [0, 12],
    phaseName: 'טעינת ERA5 היסטורי',
    phaseCode: 'era5_ingest',
    title: 'דגימת 40 שנות תצפיות היסטוריות (1979-2017)',
    description: 'משיכת 2 מצבי אטמוספירה עוקבים (t-6 שעות ו-t0) ברזולוציה עולמית של 0.25° ממאגרי ECMWF ERA5.',
    metric: '40 שנות למידה · 2 צילומי מצב',
    subsystem: 'ERA5 Ingestion Engine',
  },
  {
    id: 2,
    timeWindow: [12, 24],
    phaseName: 'קידוד Grid-to-Mesh',
    phaseCode: 'grid_to_mesh',
    title: 'מיפוי גלובלי ל-Icosahedral Multi-Mesh',
    description: 'הקרנת 1,038,240 נקודות רשת גיאוגרפיות אל עבר גרף איקוסהדרלי רב-שכבתי אחיד המונע עיוותי קטבים.',
    metric: '1.03M נקודות רשת ← 40,962 צמתים',
    subsystem: 'Spatial Encoder Layer',
  },
  {
    id: 3,
    timeWindow: [24, 40],
    phaseName: 'רשת נוירונים גרפית (GNN Processor)',
    phaseCode: 'gnn_processor',
    title: '16 שכבות של Message Passing על פני הגרף',
    description: 'וקטורי מצב פיזיקליים מועברים במהירות עצומה בין צמתים סמוכים ורחוקים דרך 3.2 מיליון קשתות מכוונות.',
    metric: '16 שכבות עמוקות · 3.2M Edges',
    subsystem: 'Graph Neural Network (TPU v4)',
  },
  {
    id: 4,
    timeWindow: [40, 52],
    phaseName: 'שקלול 37 שכבות לחץ אטמוספריות',
    phaseCode: 'gnn_processor',
    title: 'פתרון דינמיקה אטמוספרית מ-1000hPa עד 1hPa',
    description: 'ניבוי מדויק של גאופוטנציאל, לחות סגולית, וקטורי רוח אופקיים/אנכיים וטמפרטורה בכל רום שמימי.',
    metric: '37 מפלסי רום · גאופוטנציאל + רוח',
    subsystem: 'Atmospheric Physics Tensor',
  },
  {
    id: 5,
    timeWindow: [52, 60],
    phaseName: 'פענוח Mesh-to-Grid ותחזית 10 ימים',
    phaseCode: 'rollout_eval',
    title: 'Rollout אוטורגרסיבי ל-240 שעות קדימה',
    description: 'הקרנה בחזרה לרשת קווי אורך/רוחב ויצירת תחזית מזג אוויר מקיפה בדיוק העולה על מחשב-על מסורתי!',
    metric: 'תחזית 10 ימים ב-60 שניות',
    subsystem: 'Autoregressive Decoder',
  },
];

export const GraphCastPredictionModal: React.FC<GraphCastPredictionModalProps> = ({
  isOpen,
  onClose,
  location,
  onComplete,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1x = 60s, 6x = 10s turbo
  const [isFinished, setIsFinished] = useState(false);

  const TOTAL_SECONDS = 60;

  useEffect(() => {
    if (!isOpen) {
      setSecondsElapsed(0);
      setIsFinished(false);
      return;
    }

    const intervalTime = 100; // update every 100ms
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + (0.1 * speedMultiplier);
        if (next >= TOTAL_SECONDS) {
          clearInterval(timer);
          setIsFinished(true);
          return TOTAL_SECONDS;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, speedMultiplier]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, (secondsElapsed / TOTAL_SECONDS) * 100);
  const remainingSeconds = Math.max(0, Math.ceil(TOTAL_SECONDS - secondsElapsed));

  // Find active stage
  const currentStage =
    SIMULATION_STAGES.find(
      (s) => secondsElapsed >= s.timeWindow[0] && secondsElapsed < s.timeWindow[1]
    ) || SIMULATION_STAGES[SIMULATION_STAGES.length - 1];

  const handleFinishAndApply = () => {
    onComplete();
    onClose();
  };

  const handleSkipToFinish = () => {
    setSecondsElapsed(TOTAL_SECONDS);
    setIsFinished(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel-glow-cyan rounded-3xl p-6 sm:p-8 text-right overflow-hidden shadow-2xl border border-cyan-500/30">
        {/* Background ambient lighting pulse */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-cyan-400">
                Google DeepMind Architecture
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                מנוע הניבוי ב-60 שניות: {location.name}
              </h2>
            </div>
          </div>

          {/* Speed Toggle & Skip Controls */}
          <div className="flex items-center gap-2">
            {!isFinished && (
              <>
                <button
                  onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 6 : 1))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 border ${
                    speedMultiplier > 1
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="מעבר בין ריצה רגילה (60 שניות) למצב טורבו (10 שניות)"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{speedMultiplier > 1 ? 'מצב טורבו 6x' : 'מצב מדעי 1x'}</span>
                </button>

                <button
                  onClick={handleSkipToFinish}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
                >
                  <FastForward className="w-3.5 h-3.5 text-cyan-400" />
                  <span>דלג לתוצאות</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Countdown & Main Meter */}
        <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-800 mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-300 tracking-tight">
                {isFinished ? '00.0' : remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
              </span>
              <span className="text-xs sm:text-sm font-mono text-slate-400">שניות לסיום החישוב</span>
            </div>

            <div className="text-left font-mono text-sm text-cyan-400">
              {Math.round(progressPercent)}% הושלם
            </div>
          </div>

          {/* Progress Bar with Cyan/Purple Gradient */}
          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 transition-all duration-150 shadow-lg shadow-cyan-500/30"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>TPU v4 Core Execution</span>
            <span>רשת נוירונים גרפית מעבדת 40 שנות נתוני ERA5</span>
          </div>
        </div>

        {/* Current Stage Card */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-cyan-500/30 mb-6 relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  שלב {currentStage.id} מתוך 5: {currentStage.phaseName}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{currentStage.title}</h3>
            </div>
            <div className="text-left font-mono text-xs text-purple-300 bg-purple-950/60 px-3 py-1 rounded-md border border-purple-800 shrink-0">
              {currentStage.subsystem}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-3">{currentStage.description}</p>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>מדד ביצוע: </span>
            <span className="text-cyan-300 font-medium">{currentStage.metric}</span>
          </div>
        </div>

        {/* Stage Timeline Steps */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {SIMULATION_STAGES.map((stage) => {
            const isPassed = secondsElapsed >= stage.timeWindow[1] || isFinished;
            const isCurrent =
              secondsElapsed >= stage.timeWindow[0] &&
              secondsElapsed < stage.timeWindow[1] &&
              !isFinished;

            return (
              <div
                key={stage.id}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isPassed
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                    : isCurrent
                    ? 'bg-purple-950/60 border-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[11px] font-mono mb-1">שלב {stage.id}</div>
                <div className="text-xs font-semibold truncate">{stage.phaseName.split(' ')[0]}</div>
              </div>
            );
          })}
        </div>

        {/* Scientific Comparison Banner */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              GraphCast מנצח ב-90% מהמדדים את מחשב-העל ECMWF HRES (משוואות Navier-Stokes)
            </span>
          </div>
          <div className="text-cyan-400 font-semibold whitespace-nowrap">
            60 שניות במקום 3 שעות
          </div>
        </div>

        {/* Action Button */}
        {isFinished && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleFinishAndApply}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all text-sm cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>הצג את נתוני התחזית המלאים של {location.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
