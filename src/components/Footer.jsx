import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t-2 border-slate-200 dark:border-white/10 py-12 px-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Lado Esquerdo: Logo e Copyright */}
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
          <div className="w-6 h-6 bg-indigo-600 text-white rounded flex items-center justify-center text-[10px] font-bold">
            JP
          </div>
          <span>{t('footer.copyright')}</span>
        </div>

        {/* Lado Direito: Links Sociais */}
        <div className="flex gap-8 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            {t('footer.linkedin')}
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            {t('footer.github')}
          </a>
          <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            {t('footer.dribbble')}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
