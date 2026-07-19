import { useEffect, useRef, useState } from 'react';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(update);
  }, [visible, target, duration]);

  return (
    <span ref={ref} className="counter">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-section" data-animate="fade-up">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">
              <Counter target={20} suffix="+" />
            </div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <Counter target={5000} suffix="+" />
            </div>
            <div className="stat-label">Smiles Transformed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <Counter target={1} />
            </div>
            <div className="stat-label">Expert Doctor</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <Counter target={98} suffix="%" />
            </div>
            <div className="stat-label">Patient Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}