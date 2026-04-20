import React from 'react';
import { Boxes, GraduationCap, PenTool, MonitorCog, Workflow } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumb from '../components/Breadcrumb';
import Reveal from '../components/Reveal';
import aboutImage from '../assets/About.png';

function About() {
  const { t } = useLanguage();
  const stackIcons = [PenTool, MonitorCog, Workflow];
  const educationIcons = [GraduationCap, Boxes];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter dark:bg-[#0b0f14]">
      <Breadcrumb pageName={t('nav.about')} />

      <Reveal className="max-w-7xl mx-auto px-8 py-16 ">
        <div className="w-full h-[300px] md:h-[450px] bg-gray-100 rounded-[2.5rem] overflow-hidden border-2 border-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
          <img
            src={aboutImage}
            alt={t('aboutPage.imageAlt')}
            className="theme-image h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal as="main" className="max-w-5xl mx-auto px-8 pb-32 grid md:grid-cols-12 gap-12 md:gap-24 pt-8">
        <div className="md:col-span-5">
          <h3 className="text-indigo-600 font-bold text-xs tracking-widest uppercase mb-4 font-inter">
            {t('aboutPage.label')}
          </h3>
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tighter">
            {t('aboutPage.title')}
          </h1>
        </div>

        <div className="md:col-span-7 flex flex-col gap-4">
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('aboutPage.p1')}
          </p>

          <p className="text-lg text-slate-600 leading-relaxed">
            {t('aboutPage.p2')}
          </p>

          <p className="text-lg text-slate-600 leading-relaxed">
            {t('aboutPage.p3')}
          </p>

          <p className="text-lg text-slate-600 leading-relaxed">
            {t('aboutPage.p4')}
          </p>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {t('aboutPage.p5')}
          </p>

          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-100">
            <div>
              <h4 className="text-gray-600 font-bold text-xs tracking-widest uppercase mb-6">
                {t('aboutPage.stack')}
              </h4>
              <ul className="flex flex-col gap-4 font-semibold text-slate-900 text-base md:text-lg">
                {t('aboutPage.stackItems').map((item, index) => {
                  const Icon = stackIcons[index] || PenTool;
                  return (
                    <Reveal
                      as="li"
                      key={item}
                      delay={index * 70}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm dark:bg-[#0b0f14]"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 shrink-0">
                        <Icon size={18} />
                      </span>
                      <span>{item}</span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <div>
              <h4 className="text-gray-600 font-bold text-xs tracking-widest uppercase mb-6">
                {t('aboutPage.education')}
              </h4>
              <ul className="flex flex-col gap-4 font-semibold text-slate-900 text-base md:text-lg">
                {t('aboutPage.educationItems').map((item, index) => {
                  const Icon = educationIcons[index] || GraduationCap;
                  return (
                    <Reveal
                      as="li"
                      key={item}
                      delay={80 + index * 70}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:bg-[#0b0f14]"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shrink-0 dark:bg-[#1b1e23]">
                        <Icon size={18} />
                      </span>
                      <span>{item}</span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default About;
