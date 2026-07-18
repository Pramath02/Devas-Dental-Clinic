import { useState } from 'react';
import { submitContact } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });
    try {
      await submitContact(form);
      setStatus({ type: 'success', text: 'Message sent! We\'ll get back to you within 24 hours.' });
      setForm({ name: '', email: '', subject: '', message: '' });
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
          <h1 data-animate="fade-up">Contact Us</h1>
          <div className="section-divider" style={{ margin: '20px auto', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}></div>
          <p data-animate="fade-up" data-delay="100">We'd love to hear from you. Reach out with any questions or to schedule your visit.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div data-animate="fade-right">
              <div className="contact-info-card">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 32 }}>Get in Touch</h2>
                {contactInfo.map((item, i) => (
                  <div key={i} className="contact-info-item">
                    <div className="contact-info-icon"><i className={item.icon}></i></div>
                    <div>
                      <h4>{item.label}</h4>
                      {item.href ? (
                        <p><a href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>{item.value}</a></p>
                      ) : (
                        <p style={{ whiteSpace: 'pre-line' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: 'var(--border-light)' }}>
                  <h4 style={{ marginBottom: 12, fontFamily: 'var(--font-heading)' }}>Follow Us</h4>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook" style={{ borderColor: 'var(--warm-light)', color: 'var(--text-secondary)' }}><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-link" aria-label="Instagram" style={{ borderColor: 'var(--warm-light)', color: 'var(--text-secondary)' }}><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-link" aria-label="Twitter" style={{ borderColor: 'var(--warm-light)', color: 'var(--text-secondary)' }}><i className="fab fa-twitter"></i></a>
                    <a href="#" className="social-link" aria-label="YouTube" style={{ borderColor: 'var(--warm-light)', color: 'var(--text-secondary)' }}><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div data-animate="fade-left">
              <div className="form-card">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 8 }}>Send us a Message</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
                {status.text && (
                  <div style={{ padding: '12px 16px', borderRadius: 8, marginBottom: 16, background: status.type === 'success' ? '#d4edda' : '#f8d7da', color: status.type === 'success' ? '#155724' : '#721c24' }}>
                    {status.text}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-icon">
                      <i className="fas fa-user icon"></i>
                      <input type="text" id="name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-icon">
                      <i className="fas fa-envelope icon"></i>
                      <input type="email" id="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <div className="input-icon">
                      <i className="fas fa-tag icon"></i>
                      <input type="text" id="subject" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Tell us how we can help..." rows={5} value={form.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    <i className="fas fa-paper-plane"></i> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="map-container" data-animate="fade-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.0!2d83.3539!3d26.8049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145c1c46af1b1%3A0x6f437d8a0f335e6f!2sDevas+Dental+Clinic!5e0!3m2!1sen!2sin!4v1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Devas Dental Clinic. Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

const contactInfo = [
  { icon: 'fas fa-map-marker-alt', label: 'Our Address', value: 'Devas Dental Clinic.,\nGDC Complex, FCI Road, Vakas Nagar,\nBargadwa, Gorakhpur, Uttar Pradesh 273007' },
  { icon: 'fas fa-phone-alt', label: 'Phone', value: '+91-9415282238', href: 'tel:+919415282238' },
  { icon: 'fas fa-envelope', label: 'Email', value: 'info@devasdental.com', href: 'mailto:info@devasdental.com' },
  { icon: 'fas fa-clock', label: 'Clinic Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed' },
];