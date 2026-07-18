import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = el.dataset.animate || 'fade-up';
    const delay = parseInt(el.dataset.delay) || 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('is-visible', `anim-${anim}`);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}