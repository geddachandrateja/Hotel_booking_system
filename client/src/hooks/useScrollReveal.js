import { useEffect, useRef } from 'react';

/**
 * Hook to trigger scroll animations via IntersectionObserver.
 * Fully supports prefers-reduced-motion and gracefully falls back.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      element.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return ref;
}
