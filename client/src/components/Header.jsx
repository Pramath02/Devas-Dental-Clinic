import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.classList.toggle('menu-open', !prev);
      return !prev;
    });
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <img src="/logo.png" alt="Devas Dental Clinic" className="logo-img" />
          </span>
          Devas<span> Dental Clinic.</span>
        </Link>
        <nav>
          <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
            <li><Link to="/" className={isActive('/')}>Home</Link></li>
            <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
            <li><Link to="/about" className={isActive('/about')}>About</Link></li>
            <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
            <li><Link to="/appointment" className="nav-cta">Book Now</Link></li>
          </ul>
        </nav>
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}