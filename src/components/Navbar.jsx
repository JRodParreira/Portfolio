import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { FadeText } from '../components/FadeText';
import logoImage from '../assets/logo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme, toggleTheme } = useTheme();

  const ThemeIcon = resolvedTheme === 'dark' ? Sun : Moon;
  const themeLabel =
    resolvedTheme === 'dark'
      ? t('common.theme.dark')
      : t('common.theme.light');

  const linkClasses = ({ isActive }) =>
    `font-inter uppercase tracking-widest text-[12px] font-bold transition-all duration-300 ${
      isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
    }`;

  return (
    <nav className="theme-glass sticky top-0 z-50 border-b-2 border-slate-200 bg-white/80 dark:border-white/8 dark:bg-slate-950/78">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 shadow-sm">
            <img
              src={logoImage}
              alt={t('common.personName')}
              className="w-full h-full p-1 group-hover:scale-105 transition-transform duration-500 text-center"
            />
          </div>
          <span className="font-sora font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {t('common.personName')}
          </span>
        </Link>

        <button
          className="md:hidden text-slate-900 dark:text-slate-100 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <NavLink to="/" end className={linkClasses}><FadeText>{t('nav.home')}</FadeText></NavLink>
          <NavLink to="/projects" className={linkClasses}><FadeText>{t('nav.projects')}</FadeText></NavLink>
          <NavLink to="/about" className={linkClasses}><FadeText>{t('nav.about')}</FadeText></NavLink>

          <div className="flex items-center gap-3 rounded-xl border-2 border-slate-300/70 bg-slate-300/80 p-1 dark:border-white/8 dark:bg-white/[0.03]">
            <div className="pl-2 text-slate-400 dark:text-slate-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            <div className="relative flex items-center">
              <div
                className={`absolute h-full w-1/2 rounded-lg border-2 border-slate-300 bg-white shadow-sm transition-all duration-300 ease-out dark:border-white/10 dark:bg-white/[0.08] ${
                  language === 'en' ? 'left-0' : 'left-1/2'
                }`}
              />

              <button
                onClick={() => setLanguage('en')}
                className={`relative z-10 px-4 py-1.5 text-[11px] font-bold tracking-wider transition-colors duration-300 min-w-[45px] ${
                  language === 'en' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                {t('common.language.en')}
              </button>

              <button
                onClick={() => setLanguage('pt')}
                className={`relative z-10 px-4 py-1.5 text-[11px] font-bold tracking-wider transition-colors duration-300 min-w-[45px] ${
                  language === 'pt' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                {t('common.language.pt')}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`${t('common.theme.toggle')}: ${themeLabel}`}
            title={themeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-300/70 bg-white/80 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/8 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-indigo-400/35 dark:hover:bg-white/[0.06] dark:hover:text-indigo-300"
          >
            <ThemeIcon size={18} />
          </button>

          <button className="flex min-w-[140px] items-center justify-center rounded-md bg-indigo-600 py-1.5 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-700 dark:shadow-[0_14px_32px_rgba(99,102,241,0.26)] dark:hover:shadow-[0_18px_38px_rgba(99,102,241,0.32)]">
            <FadeText>{t('nav.contact')}</FadeText>
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[520px] opacity-100 border-b-2 border-slate-200 dark:border-white/10' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-6 px-6 py-8 bg-white dark:bg-slate-950/95">
          <NavLink to="/" end className={linkClasses} onClick={() => setIsOpen(false)}><FadeText>{t('nav.home')}</FadeText></NavLink>
          <NavLink to="/projects" className={linkClasses} onClick={() => setIsOpen(false)}><FadeText>{t('nav.projects')}</FadeText></NavLink>
          <NavLink to="/about" className={linkClasses} onClick={() => setIsOpen(false)}><FadeText>{t('nav.about')}</FadeText></NavLink>

          <div className="flex items-center gap-3 bg-slate-100/80 dark:bg-white/5 p-1 rounded-xl border-2 border-slate-300/70 dark:border-white/10">
            <div className="pl-2 text-slate-400 dark:text-slate-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            <div className="relative flex items-center">
              <div
                className={`absolute h-full w-1/2 bg-white dark:bg-white/10 rounded-lg shadow-sm border-2 border-slate-300 dark:border-white/10 transition-all duration-300 ease-out ${
                  language === 'en' ? 'left-0' : 'left-1/2'
                }`}
              />

              <button
                onClick={() => setLanguage('en')}
                className={`relative z-10 px-4 py-1.5 text-[11px] font-bold tracking-wider transition-colors duration-300 min-w-[45px] ${
                  language === 'en' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                {t('common.language.en')}
              </button>

              <button
                onClick={() => setLanguage('pt')}
                className={`relative z-10 px-4 py-1.5 text-[11px] font-bold tracking-wider transition-colors duration-300 min-w-[45px] ${
                  language === 'pt' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                {t('common.language.pt')}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`${t('common.theme.toggle')}: ${themeLabel}`}
            title={themeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-slate-300/70 bg-white/80 text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-300"
          >
            <ThemeIcon size={18} />
          </button>

          <a href="https://www.linkedin.com/in/josé-parreira-397744201/" className="bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md transition-all duration-300 font-semibold min-w-[140px] flex items-center justify-center shadow-sm dark:shadow-none">
            <FadeText>{t('nav.contact')}</FadeText>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
