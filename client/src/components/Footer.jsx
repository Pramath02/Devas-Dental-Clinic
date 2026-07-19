import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <span className="logo-icon" style={{ width: '28px', height: '28px', display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <img src="/tooth.png" alt="Devas Dental Clinic" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </span>
              Devas <span>Dental Clinic.</span>
            </h3>
            <p>Providing exceptional dental care with compassion and expertise. Your smile is our priority.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/services">General Dentistry</Link>
            <Link to="/services">Cosmetic Care</Link>
            <Link to="/services">Orthodontics</Link>
            <Link to="/services">Emergency Care</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+919415282238"><i className="fas fa-phone"></i> +91-9415282238</a>
            <a href="mailto:info@devasdental.com"><i className="fas fa-envelope"></i> info@devasdental.com</a>
            <Link to="/contact"><i className="fas fa-map-marker-alt"></i> GDC Complex, FCI Road, Gorakhpur</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Devas Dental Clinic. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}