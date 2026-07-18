import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitAppointment } from '../utils/api';

export default function Appointment() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', service: '', message: '',
  });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });
    try {
      await submitAppointment(form);
      setStatus({ type: 'success', text: 'Appointment requested! We\'ll confirm your visit within 24 hours.' });
      setForm({ name: '', email: '', phone: '', date: '', time: '', service: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 data-animate="fade-up">Book Your Appointment</h1>
          <div className="section-divider" style={{ margin: '20px auto', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}></div>
          <p data-animate="fade-up" data-delay="100">Fill out the form below and our team will confirm your visit within 24 hours.</p>
          <div data-animate="fade-up" data-delay="150" style={{
            marginTop: 20, padding: '10px 20px', borderRadius: 8,
            display: 'inline-block', background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}>
            <i className="fas fa-phone-alt" style={{ color: 'var(--gold)', marginRight: 8 }}></i>
            <span style={{ fontWeight: 600 }}>Call us directly:</span>{' '}
            <a href="tel:+919415282238" style={{ color: 'var(--gold-dark)', fontWeight: 700, textDecoration: 'none' }}>
              +91-9415282238
            </a>
            {' '}<span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>— No form needed</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="appointment-steps" data-animate="fade-up">
            <div className="step active">
              <div className="step-number">1</div>
              <span className="step-label">Details</span>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <span className="step-label">Schedule</span>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <span className="step-label">Confirm</span>
            </div>
          </div>

          <div className="form-card" data-animate="fade-up" data-delay="100">
            {status.text && (
              <div style={{
                padding: '12px 16px', borderRadius: 8, marginBottom: 16,
                background: status.type === 'success' ? '#d4edda' : '#f8d7da',
                color: status.type === 'success' ? '#155724' : '#721c24',
              }}>
                {status.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="appointment-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="form-group">
                  <label htmlFor="name">Full Name <span style={{ color: 'var(--gold-dark)' }}>*</span></label>
                  <div className="input-icon">
                    <i className="fas fa-user icon"></i>
                    <input type="text" id="name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone <span style={{ color: 'var(--gold-dark)' }}>*</span></label>
                  <div className="input-icon">
                    <i className="fas fa-phone icon"></i>
                    <input type="tel" id="phone" name="phone" placeholder="Your phone" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email <span style={{ color: 'var(--gold-dark)' }}>*</span></label>
                <div className="input-icon">
                  <i className="fas fa-envelope icon"></i>
                  <input type="email" id="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="appointment-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="form-group">
                  <label htmlFor="date">Preferred Date <span style={{ color: 'var(--gold-dark)' }}>*</span></label>
                  <input type="date" id="date" name="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <input type="time" id="time" name="time" value={form.time} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Needed <span style={{ color: 'var(--gold-dark)' }}>*</span></label>
                <select id="service" name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Select a service...</option>
                  <option value="general">General Check-up & Cleaning</option>
                  <option value="cosmetic">Cosmetic Consultation</option>
                  <option value="orthodontics">Orthodontic Consultation</option>
                  <option value="surgery">Oral Surgery</option>
                  <option value="pediatric">Pediatric Dentistry</option>
                  <option value="emergency">Emergency Dental Care</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Notes</label>
                <textarea id="message" name="message" placeholder="Any specific concerns?" rows={4} value={form.message} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 32px', fontSize: '1.05rem' }} disabled={loading}>
                <i className="fas fa-calendar-check"></i> {loading ? 'Submitting...' : 'Request Appointment'}
              </button>

              <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                <i className="fas fa-shield-alt"></i> Your information is kept confidential.
              </p>
            </form>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 40 }} data-animate="fade-up">
            {infoCards.map((card, i) => (
              <div key={i} className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--gold)', marginBottom: 8 }}><i className={card.icon}></i></div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 8 }}>{card.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section" data-animate="fade-up">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 16, color: '#fff' }}>Prefer to Call?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 8, fontSize: '1.1rem' }}>We're happy to help you schedule over the phone.</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 24 }}>
            <i className="fas fa-phone-alt"></i> +91-9415282238
          </p>
          <Link to="/contact" className="btn btn-outline">
            <i className="fas fa-envelope"></i> Send us an Email
          </Link>
        </div>
      </section>
    </>
  );
}

const infoCards = [
  { icon: 'fas fa-clock', title: 'Quick Response', desc: 'We confirm appointments within 24 hours' },
  { icon: 'fas fa-calendar-alt', title: 'Flexible Scheduling', desc: 'Morning, evening, and weekend slots available' },
  { icon: 'fas fa-bell', title: 'Reminders', desc: 'Get SMS and email reminders before your visit' },
];