import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Breadcrumb({ pageName, isProject = false }) {
  const { t } = useLanguage();
  const [isCompact, setIsCompact] = useState(false);
  const linkPillClasses =
    'inline-flex items-center rounded-full border border-indigo-200/60 dark:border-white/10 px-3 py-1.5 text-indigo-950/60 dark:text-slate-300 transition-all duration-300 hover:border-white/90 dark:hover:border-white/15 hover:bg-white/90 dark:hover:bg-white/5 hover:text-indigo-950 dark:hover:text-slate-100 hover:shadow-sm';

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="theme-glass sticky top-[79px] z-40 border-y border-indigo-200/60 bg-gradient-to-r from-indigo-200/70 via-indigo-100/80 to-white/80 backdrop-blur-md dark:border-white/8 dark:bg-gradient-to-r dark:from-[#151d2b]/96 dark:via-[#111827]/94 dark:to-[#0b1017]/94">
      <div
        className={`max-w-7xl mx-auto flex flex-col justify-between px-8 transition-all duration-300 sm:flex-row sm:items-center ${
          isCompact ? 'gap-3 py-3' : 'gap-4 py-5'
        }`}
      >
        
        {/* Lado Esquerdo: Caminho */}
        <span
          className={`flex flex-wrap items-center gap-1.5 font-bold uppercase tracking-widest transition-all duration-300 ${
            isCompact ? 'text-[11px]' : 'text-xs'
          }`}
        >
          <Link to="/" className={linkPillClasses}>{t('nav.home')}</Link>
          <span className="mx-1 text-indigo-900/25 dark:text-slate-600">/</span>
          
          {/* Se for um projeto, adiciona o link "Projects" no meio! */}
          {isProject && (
            <>
              <Link to="/projects" className={linkPillClasses}>{t('nav.projects')}</Link>
              <span className="mx-1 text-indigo-900/25 dark:text-slate-600">/</span>
            </>
          )}
          
          {/* Página atual */}
          <span
            className={`inline-flex items-center rounded-full border-2 border-white/80 dark:border-white/10 bg-white/80 dark:bg-white/5 text-indigo-950 dark:text-slate-100 shadow-sm transition-all duration-300 ${
              isCompact ? 'px-3 py-1' : 'px-3 py-1.5'
            }`}
          >
            {pageName}
          </span>
        </span>

        {/* Lado Direito: Botão Voltar (Só aparece nos Projetos) */}
        {isProject && (
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 rounded-full border-2 border-white/80 dark:border-white/10 bg-white/80 dark:bg-white/5 font-bold text-indigo-950/70 dark:text-slate-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white dark:hover:border-white/15 hover:bg-white dark:hover:bg-white/10 hover:text-indigo-950 dark:hover:text-slate-100 hover:shadow-md dark:shadow-none dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] ${
              isCompact ? 'px-4 py-1.5 text-xs' : 'px-4 py-2 text-sm'
            }`}
          >
            <ArrowLeft size={16} />
            {t('banner.allProjectsButton')}
          </Link>
        )}
        
      </div>
    </div>
  );
}

export default Breadcrumb;
