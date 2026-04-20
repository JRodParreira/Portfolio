import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';

function Projects() {
  const { t } = useLanguage();

  const projectList = [
    {
      id: 'hospitality',
      num: '01',
      link: '/projects/hospitality-os',
      tags: ['allProjectsPage.tags.b2b', 'allProjectsPage.tags.systemArchitecture', 'allProjectsPage.tags.saas', 'allProjectsPage.tags.webApp', 'allProjectsPage.tags.selfInitiated'],
      imageBg: 'bg-gray-100 dark:bg-white/[0.03]',
      imgBg: 'bg-white dark:bg-white/[0.04]',
      border: 'border-gray-200 dark:border-white/10',
      img: 'src/assets/HOS_Dashboard.webp',
      alt: 'allProjectsPage.imageAlt.hospitality',
    },
    {
      id: 'foodbridge',
      num: '02',
      link: '/projects/foodbridge',
      tags: ['allProjectsPage.tags.inventory', 'allProjectsPage.tags.logistics', 'allProjectsPage.tags.dataViz', 'allProjectsPage.tags.b2b', 'allProjectsPage.tags.selfInitiated'],
      imageBg: 'bg-[#1C1F26] dark:bg-[#0c1118]',
      imgBg: 'bg-[#2A2E39] dark:bg-white/[0.04]',
      border: 'border-[#3A3F4E] dark:border-white/10',
      img: 'src/assets/FB_Dashboard.webp',
      alt: 'allProjectsPage.imageAlt.foodbridge',
    }
  ];

  return (
    <div className="w-full pb-32 dark:bg-[#0b0f14]">
      <Breadcrumb pageName={t('nav.projects')} />

      <section className="bg-white pt-24 pb-16 dark:bg-[#0b0f14]">
        <Reveal className="max-w-6xl mx-auto px-8">
          <h1 className="mb-8 font-sora text-6xl font-bold leading-[1.05] tracking-tighter text-slate-950 dark:text-slate-50 md:text-7xl">
            {t('allProjectsPage.title')}
          </h1>
          <p className="max-w-2xl font-inter text-xl font-medium leading-relaxed text-gray-600 dark:text-slate-400">
            {t('allProjectsPage.subtitle')}
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-8 dark:bg-[#0b0f14]">
        <div className="flex flex-col gap-16">
          {projectList.map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <div className="premium-dark-panel group flex flex-col overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl dark:border-white/8 dark:bg-white/[0.03] dark:hover:border-indigo-400/18 dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.3)] lg:flex-row">
                <div className="flex flex-col justify-center p-10 md:p-14 lg:w-[45%]">
                  <span className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
                    {t('allProjectsPage.caseStudy')} {project.num}
                  </span>

                  <h3 className="mb-5 font-sora text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    {t(`projects.${project.id.replace('-', '')}.title`)}
                  </h3>
                  <p className="mb-8 font-inter font-medium leading-relaxed text-gray-600 dark:text-slate-400">
                    {t(`projects.${project.id.replace('-', '')}.desc`)}
                  </p>

                  <div className="mb-12 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-slate-200 bg-gray-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-400">
                        {t(tag)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link to={project.link} className="group inline-flex items-center gap-2 font-bold text-slate-900 transition-all duration-300 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300">
                      {t('featured.viewCase')}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className={`${project.imageBg} flex min-h-[400px] items-center justify-center border-l-2 border-slate-200 p-8 dark:border-white/8 lg:w-[55%]`}>
                  <img
                    src={project.img}
                    alt={t(project.alt)}
                    className={`theme-image ${project.imgBg} ${project.border} rounded-2xl border text-center font-mono text-xs italic text-gray-500 shadow-md transition-transform duration-500 group-hover:scale-105`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Projects;
