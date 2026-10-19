import React, { useState, useEffect } from 'react';
import { SimpleSafetyProblem } from './types';
import { INITIAL_SIMPLE_PROBLEMS } from './data/seedData';
import { Language, TRANSLATIONS, getTranslation } from './utils/translations';

// Simple Worker Views (All Clean White Theme)
import { SimpleHome } from './components/SimpleHome';
import { SimpleCheckSafety } from './components/SimpleCheckSafety';
import { SimpleSafetyProblems } from './components/SimpleSafetyProblems';
import { SimpleFixProblems } from './components/SimpleFixProblems';
import { SimpleReport } from './components/SimpleReport';

// Icons
import {
  HardHat,
  RotateCcw,
  ShieldCheck,
  Camera,
  AlertTriangle,
  ClipboardCheck,
  BarChart3,
  Home,
} from 'lucide-react';
import { IndusafeLogo } from './components/IndusafeLogo';

const STORAGE_KEY_SIMPLE_PROBLEMS = 'safefactory_simple_problems_v2';
const STORAGE_KEY_LANG = 'safefactory_lang_v2';

export default function App() {
  // Language: Supports English (en), Kannada (kn), Hindi (hi), Telugu (te), Tamil (ta), Malayalam (ml)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      if (saved && ['en', 'kn', 'hi', 'te', 'ta', 'ml'].includes(saved)) return saved;
    } catch (e) {}
    return 'en';
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'home' | 'check' | 'problems' | 'fix' | 'report'>('home');

  // Simple Problems list
  const [simpleProblems, setSimpleProblems] = useState<SimpleSafetyProblem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SIMPLE_PROBLEMS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading stored simple problems:', e);
    }
    return INITIAL_SIMPLE_PROBLEMS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SIMPLE_PROBLEMS, JSON.stringify(simpleProblems));
    } catch (e) {}
  }, [simpleProblems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, currentLang);
    } catch (e) {}
  }, [currentLang]);

  // Management functions
  const handleSaveSimpleProblem = (newProblem: SimpleSafetyProblem) => {
    setSimpleProblems((prev) => [newProblem, ...prev]);
  };

  const handleUpdateProblem = (updated: SimpleSafetyProblem) => {
    setSimpleProblems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleMarkProblemFixed = (id: string) => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    setSimpleProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Fixed', fixedDate: today } : p))
    );
  };

  const handleResetData = () => {
    const tLocal = getTranslation(currentLang);
    if (window.confirm(tLocal.resetConfirmPrompt)) {
      localStorage.removeItem(STORAGE_KEY_SIMPLE_PROBLEMS);
      setSimpleProblems(INITIAL_SIMPLE_PROBLEMS);
      setActiveTab('home');
    }
  };

  const t = getTranslation(currentLang);
  const openProblemsCount = simpleProblems.filter((p) => p.status === 'Needs Fixing').length;
  const fixedProblemsCount = simpleProblems.filter((p) => p.status === 'Fixed').length;
  const totalProblemsCount = simpleProblems.length;
  const repeatedCount = simpleProblems.filter((p) => p.isRepeated).length;

  return (
    <div className="min-h-screen bg-slate-50 text-[#0f172a] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar - Clean White Theme with Navy Text */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Branding */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="p-1 rounded-2xl group-hover:scale-105 transition-transform">
                <IndusafeLogo className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-[#0f172a] tracking-tight">
                    {t.appTitle}
                  </h1>
                </div>
                <p className="text-[11px] font-extrabold text-slate-700 tracking-tight leading-tight">
                  {t.platformSubtitle}
                </p>
                <p className="text-[10px] font-bold text-blue-600 tracking-wide">
                  {t.tagline}
                </p>
              </div>
            </div>

            {/* Language Selector & Reset Header Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Pills */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold gap-0.5 overflow-x-auto max-w-[280px] sm:max-w-none no-scrollbar">
                <button
                  type="button"
                  onClick={() => setCurrentLang('en')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currentLang === 'en'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to English"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLang('kn')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currentLang === 'kn'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLang('hi')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currentLang === 'hi'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="हिन्दी में बदलें"
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLang('te')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currentLang === 'te'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="తెలుగులోకి మార్చండి"
                >
                  తెలుగు
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLang('ta')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currentLang === 'ta'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="தமிழுக்கு மாற்றவும்"
                >
                  தமிழ்
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLang('ml')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currentLang === 'ml'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="മലയാളത്തിലേക്ക് മാറ്റുക"
                >
                  മലയാളം
                </button>
              </div>

              {/* Reset Demo button */}
              <button
                onClick={handleResetData}
                title="Reset sample records to initial state"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Sub-navigation bar when viewing sub-pages */}
          {activeTab !== 'home' && (
            <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 border-t border-slate-100 mt-3 text-xs font-bold no-scrollbar">
              <button
                onClick={() => setActiveTab('home')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-blue-600" />
                {t.homeBtn.replace(/^[←\s]+/, '')}
              </button>
              <button
                onClick={() => setActiveTab('check')}
                className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'check'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                {t.cardCheckSafetyTitle}
              </button>
              <button
                onClick={() => setActiveTab('problems')}
                className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'problems'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {t.cardSafetyProblemsTitle}
                {openProblemsCount > 0 && (
                  <span className="bg-rose-700 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                    {openProblemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('fix')}
                className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'fix'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                {t.cardFixProblemsTitle}
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'report'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                {t.cardSafetyReportTitle}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'home' && (
          <SimpleHome
            currentLang={currentLang}
            onSelectLang={setCurrentLang}
            onNavigate={setActiveTab}
            openProblemsCount={openProblemsCount}
            totalProblemsCount={totalProblemsCount}
            fixedProblemsCount={fixedProblemsCount}
            repeatedCount={repeatedCount}
          />
        )}

        {activeTab === 'check' && (
          <SimpleCheckSafety
            currentLang={currentLang}
            onBackToHome={() => setActiveTab('home')}
            onSaveProblem={handleSaveSimpleProblem}
          />
        )}

        {activeTab === 'problems' && (
          <SimpleSafetyProblems
            currentLang={currentLang}
            problems={simpleProblems}
            onBackToHome={() => setActiveTab('home')}
            onGoToFix={() => setActiveTab('fix')}
          />
        )}

        {activeTab === 'fix' && (
          <SimpleFixProblems
            currentLang={currentLang}
            problems={simpleProblems}
            onBackToHome={() => setActiveTab('home')}
            onUpdateProblem={handleUpdateProblem}
          />
        )}

        {activeTab === 'report' && (
          <SimpleReport
            currentLang={currentLang}
            problems={simpleProblems}
            onBackToHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Clean White Footer */}
      <footer className="bg-white border-t-2 border-slate-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="text-xs text-slate-800 font-bold flex items-center justify-center gap-2">
            <IndusafeLogo className="w-5 h-5 shrink-0" />
            <span>{t.appTitle} — {t.platformSubtitle}</span>
            <span className="text-slate-400">•</span>
            <span className="text-blue-700 font-extrabold">{t.tagline}</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-lg mx-auto leading-relaxed">
            {t.photoDisclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}
