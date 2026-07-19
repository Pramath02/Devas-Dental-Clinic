import { Link } from 'react-router-dom';
import ThreeScene from '../components/ThreeScene';
import StatsSection from '../components/StatsSection';

export default function Home({ onThreeLoaded }) {

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge" data-animate="blur-in">Since 2005</div>
            <h2 data-animate="fade-up" data-delay="100">
              Your Smile,<br />
              <span className="highlight">Our Passion</span>
            </h2>
            <p data-animate="fade-up" data-delay="200">
              Welcome to Devas Dental Clinic. — where compassionate care meets clinical excellence.
              Experience dentistry that puts your comfort and confidence first.
            </p>
            <div className="hero-actions" data-animate="fade-up" data-delay="300">
              <Link to="/appointment" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Book Appointment
              </Link>
              <Link to="/services" className="btn btn-outline">
                <i className="fas fa-tooth"></i> Our Services
              </Link>
            </div>
          </div>
          <div className="hero-right">
            <ThreeScene onLoaded={onThreeLoaded} />
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-dot"></div>
        </div>
      </section>

      <StatsSection />

      {/* Services Overview */}
      <section className="section" data-animate="fade-up">
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive dental care tailored to your needs — from routine checkups to advanced cosmetic procedures.</p>
          <div className="services-grid stagger-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card stagger-item" style={{ '--stagger-index': i }}>
                <div className="service-icon"><i className={s.icon}></i></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">Learn More <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" data-animate="slide-up">
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle">Hear from the patients who trust us with their smiles every day.</p>
          <div className="testimonials-grid stagger-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card stagger-item" style={{ '--stagger-index': i }}>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" data-animate="fade-up">
        <div className="container">
          <div className="features-grid stagger-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-item stagger-item" style={{ '--stagger-index': i }}>
                <div className="feature-icon"><i className={f.icon}></i></div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const services = [
  { icon: 'fas fa-tooth', title: 'General Dentistry', desc: 'Routine check-ups, cleanings, fillings, and preventative care to maintain optimal oral health.' },
  { icon: 'fas fa-smile', title: 'Cosmetic Dentistry', desc: 'Teeth whitening, veneers, bonding, and smile makeovers to enhance your smile\'s beauty.' },
  { icon: 'fas fa-teeth', title: 'Orthodontics', desc: 'Braces, clear aligners, and treatments to correct misaligned teeth and jaws.' },
  { icon: 'fas fa-syringe', title: 'Oral Surgery', desc: 'Extractions, wisdom teeth removal, and surgical procedures performed with utmost care.' },
  { icon: 'fas fa-baby', title: 'Pediatric Dentistry', desc: 'Specialized dental care for children, focusing on healthy development and gentle treatment.' },
  { icon: 'fas fa-shield-alt', title: 'Emergency Care', desc: 'Immediate attention for dental emergencies — because some pains can\'t wait.' },
];

const testimonials = [
  { text: 'The most comfortable dental experience I\'ve ever had. Dr. Srivastava and the team are incredibly gentle and professional. My smile has never looked better!', initial: 'P', name: 'Priya M.', role: 'Regular Patient' },
  { text: 'I was terrified of dentists until I came here. The team made me feel at ease from the moment I walked in. Highly recommend for anyone with dental anxiety.', initial: 'R', name: 'Rahul K.', role: 'Patient since 2020' },
  { text: 'My kids actually look forward to their dental visits now! The pediatric team is wonderful with children. So glad we found Devas Dental Clinic.', initial: 'A', name: 'Anita S.', role: 'Parent' },
];

const features = [
  { icon: 'fas fa-certificate', title: 'Certified Experts', desc: 'Internationally trained and certified dental professionals' },
  { icon: 'fas fa-microscope', title: 'Modern Technology', desc: 'State-of-the-art equipment for precise diagnostics' },
  { icon: 'fas fa-hand-holding-heart', title: 'Pain-Free Care', desc: 'Gentle techniques ensuring a comfortable experience' },
  { icon: 'fas fa-clock', title: 'Flexible Hours', desc: 'Convenient scheduling including weekend appointments' },
];