import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Reveal from '../components/Reveal';
import { useLanguage } from '../context/LanguageContext';
import foodBridgeBasketImage from '../assets/FB_Bask.png';
import foodBridgeDashboardImage from '../assets/FB_Dashboard.webp';
import foodBridgeDashboardWhiteImage from '../assets/FB_Dashboard_White.webp';
import foodBridgeDeliveryImage from '../assets/FB_Del.png';
import foodBridgeDonationsImage from '../assets/FB_Don.png';
import foodBridgeFamiliesImage from '../assets/FB_Fam.png';
import foodBridgeFlowOneImage from '../assets/FB_Flow1.png';
import foodBridgeFlowTwoImage from '../assets/FB_Flow2.png';
import foodBridgeInventoryImage from '../assets/FB_Inv.png';
import foodBridgeLoginImage from '../assets/FB_Login.png';
import foodBridgeReportsImage from '../assets/FB_Rep.png';
import foodBridgeScheduleImage from '../assets/FB_Scedule.png';
import foodBridgeSettingsImage from '../assets/FB_Set.png';
import {
  ClipboardX, Database, Leaf, Truck, Package, Shield, Map,
  Users, LayoutGrid, HeartHandshake, CheckCircle2, ArrowRight, Maximize2, X, ChevronLeft, ChevronRight, Mail, Linkedin, Store, ScanSearch, Route, BarChart3
} from 'lucide-react';

const HERO_SLIDE_DURATION = 5000;
const HERO_TRANSITION_DURATION = 950;

function FoodBridge() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [slideProgress, setSlideProgress] = useState(0);
  const heroSlides = [
    {
      src: foodBridgeLoginImage,
      alt: t('foodBridgePage.carousel.slides.7.alt'),
      accent: t('foodBridgePage.carousel.slides.7.accent'),
    },
    {
      src: foodBridgeDashboardImage,
      alt: t('foodBridgePage.carousel.slides.0.alt'),
      accent: t('foodBridgePage.carousel.slides.0.accent'),
    },
    {
      src: foodBridgeDashboardWhiteImage,
      alt: t('foodBridgePage.carousel.slides.2.alt'),
      accent: t('foodBridgePage.carousel.slides.2.accent'),
    },
    {
      src: foodBridgeInventoryImage,
      alt: t('foodBridgePage.carousel.slides.6.alt'),
      accent: t('foodBridgePage.carousel.slides.6.accent'),
    },
    {
      src: foodBridgeBasketImage,
      alt: t('foodBridgePage.carousel.slides.1.alt'),
      accent: t('foodBridgePage.carousel.slides.1.accent'),
    },
    {
      src: foodBridgeDonationsImage,
      alt: t('foodBridgePage.carousel.slides.4.alt'),
      accent: t('foodBridgePage.carousel.slides.4.accent'),
    },
    {
      src: foodBridgeFamiliesImage,
      alt: t('foodBridgePage.carousel.slides.5.alt'),
      accent: t('foodBridgePage.carousel.slides.5.accent'),
    },
    {
      src: foodBridgeDeliveryImage,
      alt: t('foodBridgePage.carousel.slides.3.alt'),
      accent: t('foodBridgePage.carousel.slides.3.accent'),
    },
    {
      src: foodBridgeScheduleImage,
      alt: t('foodBridgePage.carousel.slides.9.alt'),
      accent: t('foodBridgePage.carousel.slides.9.accent'),
    },
    {
      src: foodBridgeReportsImage,
      alt: t('foodBridgePage.carousel.slides.8.alt'),
      accent: t('foodBridgePage.carousel.slides.8.accent'),
    },
    {
      src: foodBridgeSettingsImage,
      alt: t('foodBridgePage.carousel.slides.10.alt'),
      accent: t('foodBridgePage.carousel.slides.10.accent'),
    },
  ];

  useEffect(() => {
    if (!selectedImage) return undefined;

    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      window.scrollTo(0, scrollY);
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    const startTime = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(elapsed / HERO_SLIDE_DURATION, 1);

      setSlideProgress(nextProgress);

      if (nextProgress >= 1) {
        setSlideDirection('next');
        setActiveSlide((current) => (current + 1) % heroSlides.length);
      }
    }, 80);

    return () => window.clearInterval(timer);
  }, [activeSlide, heroSlides.length]);

  const getDirectionToSlide = (targetIndex) => {
    const forwardSteps = (targetIndex - activeSlide + heroSlides.length) % heroSlides.length;
    const backwardSteps = (activeSlide - targetIndex + heroSlides.length) % heroSlides.length;

    if (forwardSteps === backwardSteps) return 'next';
    return forwardSteps < backwardSteps ? 'next' : 'prev';
  };

  const handleSelectSlide = (index) => {
    if (index === activeSlide) return;
    setSlideDirection(getDirectionToSlide(index));
    setActiveSlide(index);
    setSlideProgress(0);
  };

  const handleOpenCarouselImage = (index) => {
    setSelectedImage({
      type: 'carousel',
      slides: heroSlides,
      index,
    });
  };

  const handlePrevModalImage = () => {
    setSelectedImage((current) => {
      if (!current || current.type !== 'carousel') return current;
      return {
        ...current,
        index: (current.index - 1 + current.slides.length) % current.slides.length,
      };
    });
  };

  const handleNextModalImage = () => {
    setSelectedImage((current) => {
      if (!current || current.type !== 'carousel') return current;
      return {
        ...current,
        index: (current.index + 1) % current.slides.length,
      };
    });
  };

  return (
    <div className="w-full pb-32 dark:bg-[#0b0f14]">
      <Breadcrumb pageName={t('foodBridgePage.pageName')} isProject={true} />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-indigo-50/50 dark:from-[#0f141b] dark:via-[#0f141b] dark:to-[#131924]">
        <Reveal className="max-w-7xl mx-auto px-8 pt-24 pb-14 flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {t('foodBridgePage.hero.tags').map((tag) => (
              <Reveal as="span" key={tag} delay={40} className="rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-indigo-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-indigo-300 font-inter">
                {tag}
              </Reveal>
            ))}
          </div>
          <h1 className="mb-8 font-sora text-6xl font-bold leading-[1.05] tracking-tighter text-slate-950 dark:text-slate-50 md:text-7xl">
            {t('common.projectNames.foodbridge')}
          </h1>
          <p className="mx-auto mb-16 max-w-4xl font-inter text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-400 md:text-2xl">
            {t('foodBridgePage.hero.subtitle')}
          </p>
        </Reveal>
        <Reveal className="w-full overflow-hidden px-2 pb-12 -mt-4 md:px-6 md:-mt-8" delay={120}>
          <HeroCarousel
            slides={heroSlides}
            activeSlide={activeSlide}
            slideDirection={slideDirection}
            slideProgress={slideProgress}
            onSelectSlide={handleSelectSlide}
            onOpen={handleOpenCarouselImage}
          />
        </Reveal>
      </section>

      {/* 2. METRICS / CONTEXT */}
      <section className="border-y border-slate-900 bg-slate-950 dark:border-white/6 dark:bg-[#0d1219]">
        <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center font-inter">
          {[
            { label: t('foodBridgePage.metrics.role'), value: t('foodBridgePage.metrics.roleVal') },
            { label: t('foodBridgePage.metrics.timeline'), value: t('foodBridgePage.metrics.timelineVal') },
            { label: t('foodBridgePage.metrics.scope'), value: t('foodBridgePage.metrics.scopeVal') }
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">{item.label}</div>
              <div className="text-2xl md:text-3xl font-bold text-white font-sora">{item.value}</div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. IMPACT */}
      <section className="bg-white py-20 dark:bg-[#10161f] md:py-24">
        <Reveal className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="mb-6 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {t('foodBridgePage.impact.label')}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-14 xl:grid-cols-4">
              {t('foodBridgePage.impact.items').map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="space-y-4">
                    <div className="font-sora text-5xl font-bold tracking-tight text-slate-950 dark:text-slate-50 md:text-6xl">
                      {item.value}
                    </div>
                    <p className="max-w-[16rem] text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.title}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="mt-12 text-sm text-slate-500 dark:text-slate-500 font-inter">
                {t('foodBridgePage.impact.note')}
              </p>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* 4. THE PROBLEM */}
      <section className="border-y border-gray-100 bg-white py-24 dark:border-white/6 dark:bg-[#0f141b] md:py-32">
        <Reveal className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="mb-6 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{t('foodBridgePage.problem.title')}</h2>
          </div>
          <div className="lg:col-span-7 grid gap-6 items-start">
            <p className="font-inter text-xl leading-relaxed text-slate-600 dark:text-slate-400">{t('foodBridgePage.problem.desc')}</p>
          </div>
        </Reveal>
      </section>

      {/* 5. THE GOAL */}
      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-white/6 dark:bg-[#10161f] md:py-24">
        <Reveal className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="mb-6 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{t('foodBridgePage.goal.title')}</h2>
          </div>
          <div className="lg:col-span-7 grid gap-6 items-start">
            <p className="font-inter text-xl leading-relaxed text-slate-600 dark:text-slate-400">{t('foodBridgePage.goal.desc')}</p>
          </div>
        </Reveal>
      </section>

      {/* 6. BEFORE VS AFTER */}
      <section className="bg-white py-24 dark:bg-[#0f141b] md:py-28">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal className="mb-14">
            <h2 className="font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {t('foodBridgePage.beforeAfter.title')}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            {[
              { title: t('foodBridgePage.beforeAfter.beforeTitle'), items: t('foodBridgePage.beforeAfter.before'), tone: 'muted' },
              { title: t('foodBridgePage.beforeAfter.afterTitle'), items: t('foodBridgePage.beforeAfter.after'), tone: 'strong' },
            ].map((column, index) => (
              <Reveal key={column.title} delay={index * 90}>
                <div className={`space-y-6 ${index === 1 ? 'md:border-l md:border-slate-200 md:pl-10 dark:md:border-white/8' : ''}`}>
                  <h3 className={`font-sora text-2xl font-semibold tracking-tight ${
                    column.tone === 'strong'
                      ? 'text-indigo-600 dark:text-indigo-300'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {column.title}
                  </h3>
                  <ul className="space-y-5 font-inter">
                    {column.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base leading-8 text-slate-700 dark:text-slate-300">
                        <span className={`mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${
                          column.tone === 'strong' ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-600'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. USER PERSONAS */}
      <section className="border-b border-gray-100 bg-white py-24 dark:border-white/6 dark:bg-[#10161f] md:py-32">
        <div className="max-w-7xl mx-auto px-8 font-inter">
          <Reveal><h2 className="mb-12 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{t('foodBridgePage.personas.title')}</h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Reveal delay={40}><PersonaCard icon={Shield} color="indigo" keyName="admin" /></Reveal>
            <Reveal delay={110}><PersonaCard icon={Package} color="emerald" keyName="operator" /></Reveal>
            <Reveal delay={180}><PersonaCard icon={Map} color="amber" keyName="coord" /></Reveal>
            <Reveal delay={250}><PersonaCard icon={Users} color="rose" keyName="volunt" /></Reveal>
          </div>
        </div>
      </section>

      {/* 8. SYSTEM-LEVEL WORKFLOW */}
      <section className="border-b border-indigo-100 bg-indigo-50/60 py-20 dark:border-white/6 dark:bg-[#10151d] md:py-24">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal className="max-w-3xl mb-16 md:mb-20">
            <h2 className="mb-5 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              {t('foodBridgePage.workflow.title')}
            </h2>
            <p className="font-inter text-lg leading-relaxed text-slate-700 dark:text-slate-400 md:text-xl">
              {t('foodBridgePage.workflow.subtitle')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 font-inter">
            {[
              { key: 'restaurant', icon: Store, featured: true },
              { key: 'matching', icon: ScanSearch, featured: true },
              { key: 'distribution', icon: Route, featured: true },
              { key: 'tracking', icon: BarChart3, featured: true },
            ].map((card, index) => (
              <Reveal
                key={card.key}
                delay={index * 80}
                className={`group rounded-2xl border p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-[0_26px_65px_rgba(15,23,42,0.12)] dark:hover:border-indigo-400/25 dark:hover:shadow-[0_26px_70px_rgba(0,0,0,0.34)] ${
                  card.featured
                    ? 'border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-white dark:border-indigo-400/15 dark:bg-[linear-gradient(180deg,rgba(99,102,241,0.12),rgba(255,255,255,0.045))]'
                    : 'border-slate-300 bg-white dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.022))]'
                }`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-indigo-600 dark:text-indigo-300 ${
                      card.featured
                        ? 'border-indigo-200 bg-white shadow-sm dark:border-indigo-400/15 dark:bg-white/[0.06]'
                        : 'border-slate-200 bg-slate-50 shadow-sm dark:border-white/8 dark:bg-white/[0.04]'
                    }`}>
                      <card.icon size={20} strokeWidth={1.9} />
                    </div>
                    <h3 className="font-sora text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                      {t(`foodBridgePage.workflow.${card.key}.title`)}
                    </h3>
                  </div>
                  <div className="mt-5 hidden h-px max-w-20 flex-1 bg-gradient-to-r from-slate-300 to-transparent dark:from-white/12 md:block" />
                </div>

                <ul className="space-y-3.5">
                  {t(`foodBridgePage.workflow.${card.key}.items`).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="mt-10 max-w-7xl">
            <div className="text-center rounded-xl border border-slate-200 bg-white/90 px-5 py-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                {t('common.insight')}
              </p>
              <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
                {t('foodBridgePage.workflow.insight')}
              </p>
            </div>
          </Reveal>

          {/* 4. SYSTEM OVERVIEW */}
            <Reveal as="section" className="mt-12 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 px-4 dark:border-white/6 dark:bg-[#10161f] md:px-8">
              <div className="py-12 relative w-full flex flex-col items-center">
                <div className="flex justify-center items-start gap-8 md:gap-16 lg:gap-24 relative z-10 w-full max-w-5xl mx-auto">
                  <Node icon={Package} label={t('foodBridgePage.personas.operator.t')} side="left" />
                  <Node icon={Shield} label={t('foodBridgePage.personas.admin.t')} side="center-left" />
                  <Node icon={Map} label={t('foodBridgePage.personas.coord.t')} side="center-right" />
                  <Node icon={Users} label={t('foodBridgePage.personas.volunt.t')} side="right" />
                </div>

                <div className="relative z-20 w-full max-w-5xl mx-auto mt-12 px-8">
                  <div className="rounded-[2.5rem] bg-[#111827] p-3 shadow-2xl transition-transform hover:scale-[1.01] dark:bg-[#0d1219]">
                    <div className="flex flex-col items-center justify-center rounded-[2rem] bg-[#192135] px-8 py-12 text-center dark:bg-[#121925]">
                      <h3 className="text-2xl font-bold text-white mb-2 font-sora">
                        {t('foodBridgePage.system.nodeTitle')}
                      </h3>
                      <p className="font-inter text-slate-400 text-sm font-medium">
                        {t('foodBridgePage.system.nodeDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 w-full max-w-6xl mx-auto relative hidden lg:block">
                  <div className="absolute -top-16 left-1/2 w-px h-12 border-l-2 border-dashed border-slate-600 -translate-x-1/2"></div>
                  <div className="absolute -top-4 left-[10%] right-[10%] border-t-2 border-dashed border-slate-600"></div>
                  <div className="grid grid-cols-5 gap-6 relative font-inter text-center">
                    {[
                      { icon: Package, key: 'inv' },
                      { icon: Users, key: 'guests' },
                      { icon: LayoutGrid, key: 'rooms' },
                      { icon: Truck, key: 'tasks' },
                      { icon: HeartHandshake, key: 'stats' },
                    ].map((mod, i) => (
                      <div key={i} className="flex flex-col items-center relative pt-8">
                        <div className="absolute top-[-16px] left-1/2 w-px h-8 border-l-2 border-dashed border-slate-600 -translate-x-1/2"></div>
                        <div className="h-full w-full rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all hover:border-slate-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)] dark:border-white/8 dark:bg-white/[0.03] dark:hover:border-white/12">
                          <div className="mb-5 flex justify-center text-indigo-600 dark:text-indigo-300"><mod.icon size={30} strokeWidth={1.5} /></div>
                          <h4 className="mb-2 text-base font-bold text-slate-900 dark:text-slate-100">{t(`foodBridgePage.system.modules.${mod.key}.t`)}</h4>
                          <p className="text-xs font-medium leading-relaxed text-gray-500 dark:text-slate-400">{t(`foodBridgePage.system.modules.${mod.key}.d`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
        </div>
      </section>

      {/* 9. KEY DESIGN DECISIONS & TRADE-OFFS */}
      <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-white/6 dark:bg-[#10161f] md:py-24">
        <Reveal className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="mb-6 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {t('foodBridgePage.tradeoffs.title')}
            </h2>
          </div>
          <div className="lg:col-span-7 grid gap-6 items-start">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              {t('foodBridgePage.tradeoffs.decisionLabel')}
            </p>
            <h2 className="font-inter text-xl leading-relaxed text-slate-950 dark:text-slate-50">
              {t('foodBridgePage.tradeoffs.question')}
            </h2>
            <div>
              {t('foodBridgePage.tradeoffs.reasons').map((item) => (
                <div key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  <span className="text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              {t('foodBridgePage.tradeoffs.tradeoffLabel')}
            </p>
            <h2 className="font-inter text-xl leading-relaxed text-slate-950 dark:text-slate-50">
              {t('foodBridgePage.tradeoffs.tradeoff')}
            </h2>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              {t('foodBridgePage.tradeoffs.solutionLabel')}
            </p>
            <h2 className="font-inter text-xl leading-relaxed text-slate-950 dark:text-slate-50">
              {t('foodBridgePage.tradeoffs.solution')}
            </h2>
          </div>
        </Reveal>
      </section>

      {/* 10. DESIGN PROCESS & DECISIONS - BLOCO RECUPERADO */}
      <section className="bg-white py-24 dark:bg-[#0f141b] md:py-32">
        <div className="max-w-7xl mx-auto px-8 font-inter">
          <Reveal>
          <h2 className="mb-20 font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
            {t('foodBridgePage.decisions.title')}
          </h2>
          </Reveal>

          <div className="flex flex-col gap-24 md:gap-32">
            {/* Bloco 1: System Mapping */}
            <Reveal className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div className="order-2 md:order-1">
                <h3 className="mb-5 font-sora text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {t('foodBridgePage.decisions.mapping.t')}
                </h3>
                <p className="mb-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                  {t('foodBridgePage.decisions.mapping.d')}
                </p>
                <ul className="space-y-4">
                  {[1, 2].map(i => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                      {t(`foodBridgePage.decisions.mapping.l${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <CaseStudyImage
                src={foodBridgeFlowOneImage}
                alt={t('foodBridgePage.decisions.images.mappingAlt')}
                className="order-1 md:order-2 aspect-square"
                onOpen={setSelectedImage}
              />
            </Reveal>

            
            {/* Bloco 2: Traceability Interface */}
            <Reveal className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
              <CaseStudyImage
                src={foodBridgeFlowTwoImage}
                alt={t('foodBridgePage.decisions.images.traceAlt')}
                className="aspect-square"
                onOpen={setSelectedImage}
              />
              <div className="self-center">
                <h3 className="mb-5 font-sora text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {t('foodBridgePage.decisions.trace.t')}
                </h3>
                <p className="mb-10 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                  {t('foodBridgePage.decisions.trace.d')}
                </p>
                <ul className="space-y-4">
                  {[1, 2].map(i => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={18} className="text-indigo-600 mt-0.5 shrink-0" />
                      {t(`foodBridgePage.decisions.trace.m${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="bg-slate-50 py-28 dark:bg-[#101620] md:py-32">
        <div className="max-w-5xl mx-auto px-8">
          <Reveal className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white via-white to-indigo-50/60 px-8 py-16 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(99,102,241,0.06))] dark:shadow-[0_30px_80px_rgba(0,0,0,0.28)] md:px-16 md:py-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300 font-inter">
              {t('foodBridgePage.finalCta.label')}
            </p>
            <h2 className="mx-auto mb-6 max-w-3xl font-sora text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              {t('foodBridgePage.finalCta.title')}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-inter">
              {t('foodBridgePage.finalCta.desc')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:hello@joseparreira.com"
                className="inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 dark:shadow-[0_14px_34px_rgba(99,102,241,0.2)]"
              >
                <Mail size={18} />
                {t('foodBridgePage.finalCta.primary')}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.08]"
              >
                <Linkedin size={18} />
                {t('foodBridgePage.finalCta.secondary')}
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500 dark:text-slate-500 font-inter">
              {t('foodBridgePage.finalCta.note')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 12. NEXT CASE STUDY */}
      <section className="mx-8 border-t border-dashed border-gray-200 bg-white py-32 text-center dark:border-white/8 dark:bg-[#0f141b]">
        <p className="mb-4 font-inter text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{t('foodBridgePage.next')}</p>
        <Link to="/projects/hospitality-os" className="group inline-block">
          <h2 className="mb-8 font-sora text-5xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-300 md:text-6xl">{t('common.projectNames.hospitality')}</h2>
          <div className="inline-flex items-center gap-2 font-inter font-bold text-gray-400 transition-colors group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-slate-100">
            {t('featured.viewCase')} <ArrowRight size={18} />
          </div>
        </Link>
      </section>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrevModalImage}
          onNext={handleNextModalImage}
        />
      )}
    </div>
  );
}

// COMPONENTES AUXILIARES
function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.06)] hover:border-slate-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition-all font-inter h-full">
      <div className="text-red-500 mb-5"><Icon size={26} /></div>
      <h4 className="text-lg font-bold text-slate-900 mb-3 font-sora">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function Node({ icon: Icon, label, side }) {
  return (
    <div className="flex flex-col items-center relative w-24 md:w-32 group font-inter">
      <span className="mt-4 py-4 whitespace-nowrap font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-slate-900 text-center leading-tight">{label}</span>
      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:-translate-y-1 transition-transform relative z-10">
        <Icon size={26} />
      </div>
      {side === 'left' && <div className="hidden md:block absolute top-24 left-[30%] w-[160px] h-[60px] border-t-2 border-r-2 border-dashed border-slate-600 rounded-tr-2xl -z-10"></div>}
      {side === 'center-left' && <div className="hidden md:block absolute top-29 left-1/2 h-[52px] border-l-2 border-dashed border-slate-600 -translate-x-1/2 -z-10"></div>}
      {side === 'center-right' && <div className="hidden md:block absolute top-29 left-1/2 h-[52px] border-l-2 border-dashed border-slate-600 -translate-x-1/2 -z-10"></div>}
      {side === 'right' && <div className="hidden md:block absolute top-24 right-[30%] w-[160px] h-[60px] border-t-2 border-l-2 border-dashed border-slate-600 rounded-tl-2xl -z-10"></div>}
    </div>
  );
}

function PersonaCard({ icon: Icon, color, keyName }) {
  const { t } = useLanguage();
  const colors = { indigo: "bg-indigo-50 text-indigo-500", emerald: "bg-emerald-50 text-emerald-500", amber: "bg-amber-50 text-amber-500", rose: "bg-rose-50 text-rose-500" };
  return (
    <div className="h-full rounded-[2.5rem] border-2 border-slate-200 bg-white p-10 font-inter shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all hover:border-slate-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/8 dark:bg-white/[0.03] dark:hover:border-white/12 dark:hover:shadow-[0_28px_75px_rgba(0,0,0,0.28)]">
      <div className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center mb-8`}><Icon size={28} /></div>
      <h4 className="mb-1 font-sora text-xl font-bold text-slate-900 dark:text-slate-100">{t(`foodBridgePage.personas.${keyName}.t`)}</h4>
      <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">{t(`foodBridgePage.personas.${keyName}.tag`)}</p>
      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{t(`foodBridgePage.personas.${keyName}.d`)}</p>
    </div>
  );
}

function HeroCarousel({ slides, activeSlide, slideDirection, slideProgress, onSelectSlide, onOpen }) {
  const { t } = useLanguage();
  const prevIndex = (activeSlide - 1 + slides.length) % slides.length;
  const nextIndex = (activeSlide + 1) % slides.length;

  return (
    <div className="mx-auto w-full max-w-[1680px]">
      <div className="relative h-[360px] px-3 md:h-[560px] md:px-10 xl:h-[760px] xl:px-16">
        {slides.map((slide, index) => (
          <SlideCard
            key={slide.alt}
            slide={slide}
            index={index}
            state={getSlideState(index, activeSlide, slides.length, slideDirection)}
            onSelect={() => onSelectSlide(index)}
            onOpen={() => onOpen(index)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1 rounded-full border-2 border-slate-300 bg-white/90 p-1.5 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <button
            type="button"
            onClick={() => onSelectSlide(prevIndex)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/8 dark:hover:text-slate-100"
            aria-label={t('common.previousSlide')}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => onSelectSlide(nextIndex)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/8 dark:hover:text-slate-100"
            aria-label={t('common.nextSlide')}
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white/90 px-3 py-2 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          {slides.map((slide, index) => (
            <button
              key={slide.alt}
              type="button"
              onClick={() => onSelectSlide(index)}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'w-14 bg-slate-200 dark:bg-white/10' : 'w-2.5 bg-slate-200/80 dark:bg-white/10'
              }`}
              aria-label={`${t('common.goToSlide')} ${index + 1}`}
            >
              {index === activeSlide && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-slate-900 dark:bg-indigo-300"
                  style={{ width: `${slideProgress * 100}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getSlideState(index, activeSlide, totalSlides, direction) {
  const prevIndex = (activeSlide - 1 + totalSlides) % totalSlides;
  const nextIndex = (activeSlide + 1) % totalSlides;

  if (index === activeSlide) return 'center';
  if (index === prevIndex) return 'left';
  if (index === nextIndex) return 'right';

  const forwardDistance = (index - activeSlide + totalSlides) % totalSlides;
  const backwardDistance = (activeSlide - index + totalSlides) % totalSlides;

  if (direction === 'prev') {
    return backwardDistance < forwardDistance ? 'hidden-left' : 'hidden-right';
  }

  return forwardDistance < backwardDistance ? 'hidden-right' : 'hidden-left';
}

function SlideCard({ slide, index, state, onSelect, onOpen }) {
  const { t } = useLanguage();
  const isCenter = state === 'center';
  const stateClasses = {
    center:
      'left-1/2 top-1/2 z-30 w-[84%] -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 blur-0 md:w-[76%] xl:w-[68%]',
    left:
      'left-[14%] top-1/2 z-20 hidden w-[30%] -translate-x-1/2 -translate-y-1/2 scale-[0.7] opacity-95 blur-[0.8px] lg:block xl:left-[16%] xl:w-[28%] xl:scale-[0.72]',
    right:
      'left-[86%] top-1/2 z-20 hidden w-[30%] -translate-x-1/2 -translate-y-1/2 scale-[0.7] opacity-95 blur-[0.8px] lg:block xl:left-[84%] xl:w-[28%] xl:scale-[0.72]',
    'hidden-left':
      'left-[-10%] top-1/2 z-0 hidden w-[22%] -translate-x-1/2 -translate-y-1/2 scale-[0.52] opacity-0 blur-[1.6px] pointer-events-none lg:block',
    'hidden-right':
      'left-[110%] top-1/2 z-0 hidden w-[22%] -translate-x-1/2 -translate-y-1/2 scale-[0.52] opacity-0 blur-[1.6px] pointer-events-none lg:block',
  };

  return (
    <button
      type="button"
      onClick={isCenter ? onOpen : onSelect}
      className={`group absolute overflow-hidden rounded-[2.75rem] border border-slate-300/80 ${slide.accent} p-4 text-left shadow-[0_35px_90px_rgba(15,23,42,0.18)] will-change-[left,width,transform,opacity,filter] transition-[left,width,transform,opacity,filter,box-shadow] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_45px_110px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_35px_90px_rgba(0,0,0,0.38)] dark:hover:shadow-[0_40px_100px_rgba(0,0,0,0.45)] ${stateClasses[state]}`}
      style={{ transitionDuration: `${HERO_TRANSITION_DURATION}ms` }}
      aria-label={isCenter ? `${t('common.expand')}: ${slide.alt}` : `${t('common.goToSlide')} ${index + 1}`}
    >
      <div className="overflow-hidden rounded-[2.2rem] border-2 border-white/90 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.04]">
        <img
          src={slide.src}
          alt={slide.alt}
          className={`theme-image aspect-[16/10] w-full bg-white object-contain transition-transform duration-700 dark:bg-white ${
            isCenter ? 'group-hover:scale-[1.015]' : ''
          }`}
        />
      </div>
      {isCenter && (
        <span className="pointer-events-none absolute right-8 top-8 inline-flex translate-y-1 items-center gap-2 rounded-full border border-white/70 bg-white/88 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-800 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100">
          <Maximize2 size={14} />
          {t('common.expand')}
        </span>
      )}
    </button>
  );
}

function CaseStudyImage({ src, alt, className = '', onOpen }) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt })}
      className={`group overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3 text-left shadow-[0_24px_80px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.16)] dark:border-white/8 dark:bg-white/[0.03] dark:shadow-[0_26px_70px_rgba(0,0,0,0.28)] ${className}`}
      aria-label={`${t('common.expand')}: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className="theme-image h-full w-full rounded-[2rem] bg-white object-contain transition-transform duration-500 group-hover:scale-[1.015]"
      />
      <span className="pointer-events-none absolute right-8 top-8 inline-flex translate-y-1 items-center gap-2 rounded-full border border-white/70 bg-white/88 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-800 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100">
        <Maximize2 size={14} />
        {t('common.expand')}
      </span>
    </button>
  );
}

function ImageModal({ image, onClose, onPrev, onNext }) {
  const { t } = useLanguage();
  if (typeof document === 'undefined') return null;

  const currentImage = image.type === 'carousel' ? image.slides[image.index] : image;
  const isCarousel = image.type === 'carousel';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/88 px-6 py-6 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.alt}
    >
      <div
        className="relative flex h-full w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {isCarousel && (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/82 text-white shadow-lg transition-colors hover:bg-slate-800"
            aria-label={t('common.previousSlide')}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="theme-image max-h-[88vh] max-w-[88vw] rounded-[1.75rem] bg-white object-contain shadow-[0_32px_100px_rgba(0,0,0,0.42)]"
        />
        {isCarousel && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/82 text-white shadow-lg transition-colors hover:bg-slate-800"
            aria-label={t('common.nextSlide')}
          >
            <ChevronRight size={20} />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-slate-900/85 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800"
        >
          <X size={16} />
          {t('common.closeImageModal')}
        </button>
      </div>
    </div>,
    document.body
  );
}

export default FoodBridge;
