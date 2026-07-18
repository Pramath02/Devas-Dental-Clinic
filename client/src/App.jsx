import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import LoadingScreen from './components/LoadingScreen';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function useScrollAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Observe elements with data-animate after mount
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const anim = el.dataset.animate || 'fade-up';
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => {
              el.classList.add('is-visible', `anim-${anim}`);
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

    // Handle staggered grids
    document.querySelectorAll('.stagger-grid').forEach((grid) => {
      grid.querySelectorAll('.stagger-item').forEach((card, i) => {
        if (!card.dataset.animate) {
          card.dataset.animate = 'fade-up';
          card.dataset.delay = (i * 100).toString();
          card.style.setProperty('--stagger-index', i);
          observer.observe(card);
        }
      });
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Also handle staggered items without .stagger-grid parent
  useEffect(() => {
    document.querySelectorAll('.stagger-item').forEach((card, i) => {
      if (!card.dataset.animate) {
        card.dataset.animate = 'fade-up';
        card.dataset.delay = (i * 100).toString();
      }
    });
  }, [pathname]);
}

export default function App() {
  const [firstLoad, setFirstLoad] = useState(true);
  useScrollAnimations();

  // Safety timeout — hide loading screen after 4s no matter what
  useEffect(() => {
    if (!firstLoad) return;
    const timer = setTimeout(() => setFirstLoad(false), 4000);
    return () => clearTimeout(timer);
  }, [firstLoad]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home onThreeLoaded={() => setFirstLoad(false)} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </main>
      <Footer />
      <LoadingScreen isLoading={firstLoad} onFinish={() => setFirstLoad(false)} />
    </>
  );
}