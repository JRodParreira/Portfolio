import React, { useEffect, useRef, useState } from 'react';

function Reveal({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
  duration = 700,
  threshold = 0.18,
  y = 20,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsVisible(true);
      }
    };

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || isVisible || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, reducedMotion, threshold]);

  return (
    <Component
      ref={ref}
      className={`transform-gpu will-change-transform transition-[opacity,transform] ease-out ${className} ${
        isVisible || reducedMotion ? 'opacity-100 translate-y-0' : 'opacity-0'
      }`}
      style={{
        '--tw-translate-y': isVisible || reducedMotion ? '0px' : `${y}px`,
        transitionDuration: `${duration}ms`,
        transitionDelay: reducedMotion ? '0ms' : `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Reveal;
