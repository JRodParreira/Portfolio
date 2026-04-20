import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  LayoutTemplate,
  GitBranch,
  UserCog,
  ArrowRight,
  Mail,
  Linkedin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-gray-900 dark:bg-[#0b0f14] dark:text-slate-100">
      <div className="flex flex-row items-center justify-center gap-2 border-b border-indigo-100 bg-indigo-300/50 px-8 py-5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:border-indigo-400/15 dark:bg-indigo-500/12 dark:text-indigo-300">
        <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
        <span className="leading-none">{t('banner.status')}</span>
      </div>

      <Reveal as="main" className="max-w-4xl mx-auto px-8 pt-24 pb-32">
        <p className="mb-4 font-sora text-lg font-medium text-gray-500 dark:text-slate-400 md:text-xl">
          {t('hero.greeting')} <span className="font-bold text-gray-900 dark:text-slate-100">{t('common.personName')}</span>
        </p>

        <h1 className="mb-8 font-sora text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-slate-50 md:text-7xl">
          {t('hero.title')}
        </h1>

        <p className="mb-10 max-w-2xl font-sora text-lg leading-relaxed text-gray-600 dark:text-slate-400">
          {t('hero.subtitle')}{' '}
          <span className="font-semibold text-gray-900 dark:text-slate-100">{t('hero.subtitleHighlight')}</span>{' '}
          {t('hero.subtitleAnd')}{' '}
          <span className="font-semibold text-gray-900 dark:text-slate-100">{t('hero.subtitleOperational')}</span>
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="projects"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 dark:shadow-indigo-900 dark:hover:shadow-indigo-600"
          >
            {t('hero.ctaProjects')}
            <ArrowRight size={20} />
          </a>
          <button className="premium-dark-surface rounded-xl border-2 border-slate-300 bg-white px-8 py-4 font-bold text-gray-900 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:border-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-100 dark:hover:border-white/15">
            {t('hero.ctaWork')}
          </button>
        </div>
      </Reveal>

      <section className="border-y-2 border-slate-200 bg-white py-32 dark:border-white/8 dark:bg-[#121822]">
        <div className="max-w-6xl mx-auto grid gap-16 px-8 md:grid-cols-2">
          <Reveal>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{t('capabilities.label')}</h3>
            <h2 className="font-sora text-4xl font-bold text-slate-900 dark:text-slate-50">{t('capabilities.title')}</h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {[
              { icon: Users, key: 'op' },
              { icon: LayoutTemplate, key: 'saas' },
              { icon: GitBranch, key: 'workflow' },
              { icon: UserCog, key: 'roles' }
            ].map((cap, i) => (
              <Reveal key={cap.key} delay={80 + i * 70}>
                <div className="premium-dark-surface flex items-start gap-5 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl dark:border-white/8 dark:bg-white/[0.03] dark:hover:border-indigo-400/25 dark:hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-300"><cap.icon size={24} /></div>
                  <div>
                    <h4 className="mb-1 font-bold text-slate-900 dark:text-slate-100">{t(`capabilities.${cap.key}.title`)}</h4>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-slate-400">{t(`capabilities.${cap.key}.desc`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-y-2 border-slate-200 bg-slate-50 py-32 dark:border-white/8 dark:bg-[#0b0f14]">
        <div className="max-w-6xl mx-auto px-8">
          <Reveal className="mb-16">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{t('featured.label')}</h3>
            <h2 className="font-sora text-4xl font-bold text-slate-900 dark:text-slate-50">{t('featured.title')}</h2>
          </Reveal>

          <div className="flex flex-col gap-16">
            <Reveal delay={60}>
              <div className="premium-dark-panel group flex flex-col overflow-hidden rounded-[2.5rem] border-2 border-slate-200 bg-white transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl dark:border-white/8 dark:bg-white/[0.03] dark:hover:border-indigo-400/18 dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.32)] lg:flex-row">
                <div className="flex flex-col justify-center p-10 md:p-14 lg:w-[45%]">
                  <span className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{t('featured.case01')}</span>
                  <h3 className="mb-5 font-sora text-3xl font-bold text-slate-900 dark:text-slate-50">{t('projects.hospitality.title')}</h3>
                  <p className="mb-8 leading-relaxed text-gray-600 dark:text-slate-400">
                    {t('projects.hospitality.desc')}
                  </p>
                  <div className="mb-10 flex flex-wrap gap-2">
                    {t('projects.hospitality.tags').map((tag) => (
                      <span key={tag} className="rounded-md border border-slate-200 bg-gray-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/projects/hospitality-os" className="inline-flex items-center gap-2 font-bold text-slate-900 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300">
                    {t('featured.viewCase')} <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="flex min-h-[400px] items-center justify-center border-l-2 border-slate-200 bg-slate-100 p-8 dark:border-white/8 dark:bg-white/[0.03] lg:w-[55%]">
                  <img
                    src="src/assets/HOS_Dashboard.png"
                    alt={t('allProjectsPage.imageAlt.hospitality')}
                    className="theme-image rounded-2xl border border-gray-200 bg-white text-gray-300 shadow-sm transition-transform duration-500 group-hover:scale-105 dark:border-white/10"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <div className="premium-dark-panel group flex flex-col overflow-hidden rounded-[2.5rem] border-2 border-slate-200 bg-white transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl dark:border-white/8 dark:bg-white/[0.03] dark:hover:border-indigo-400/18 dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.32)] lg:flex-row">
                <div className="flex flex-col justify-center p-10 md:p-14 lg:w-[45%]">
                  <span className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{t('featured.case02')}</span>
                  <h3 className="mb-5 font-sora text-3xl font-bold text-slate-900 dark:text-slate-50">{t('projects.foodbridge.title')}</h3>
                  <p className="mb-8 leading-relaxed text-gray-600 dark:text-slate-400">
                    {t('projects.foodbridge.desc')}
                  </p>
                  <div className="mb-10 flex flex-wrap gap-2">
                    {t('projects.foodbridge.tags').map((tag) => (
                      <span key={tag} className="rounded-md border border-slate-200 bg-gray-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/projects/foodbridge" className="inline-flex items-center gap-2 font-bold text-slate-900 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300">
                    {t('featured.viewCase')} <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="flex min-h-[400px] items-center justify-center border-l-2 border-slate-200 bg-slate-100 p-8 dark:border-white/8 dark:bg-[#0c1118] lg:w-[55%]">
                  <img
                    src="src/assets/FB_Dashboard.webp"
                    alt={t('allProjectsPage.imageAlt.foodbridge')}
                    className="theme-image rounded-2xl border border-slate-200 bg-white text-center text-gray-500 shadow-md transition-transform duration-500 group-hover:scale-105 dark:border-white/10 dark:bg-white/[0.04]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-slate-200 bg-white py-28 dark:border-white/8 dark:bg-[#101620]">
        <div className="max-w-6xl mx-auto px-8">
          <Reveal className="premium-dark-panel flex flex-col items-center rounded-[2.5rem] border-2 border-slate-200 bg-white p-16 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-white/[0.03] dark:shadow-[0_30px_80px_rgba(0,0,0,0.28)] md:p-24">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{t('cta.label')}</h3>
            <h2 className="mb-12 max-w-2xl font-sora text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 md:text-5xl">
              {t('cta.title')}
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a href="mailto:hello@joseparreira.com" className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 sm:w-auto dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 dark:hover:bg-white/[0.1]">
                <Mail size={20} />
                {t('cta.email')}
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-8 py-4 font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 sm:w-auto dark:border dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]">
                <Linkedin size={20} />
                {t('cta.linkedin')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default Home;
