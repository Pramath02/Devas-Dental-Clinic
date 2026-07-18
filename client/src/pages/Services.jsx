import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 data-animate="fade-up">Our Services</h1>
          <div className="section-divider" style={{ margin: '20px auto', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}></div>
          <p data-animate="fade-up" data-delay="100">Comprehensive dental care tailored to your unique needs — all under one roof.</p>
        </div>
      </section>

      <section className="section" data-animate="fade-up">
        <div className="container">
          <div className="services-page-list">
            {services.map((s, i) => (
              <div key={i} className="service-item stagger-item" data-animate={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
                <div className="service-page-icon"><i className={s.icon}></i></div>
                <div className="service-page-content">
                  <h3>{s.title}</h3>
                  <p>{s.longDesc}</p>
                  <p><strong>Includes:</strong> {s.includes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section" data-animate="fade-up">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 16, color: '#fff' }}>Ready for a Healthier Smile?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: '1.1rem' }}>Book your appointment today and take the first step toward exceptional dental health.</p>
          <Link to="/appointment" className="btn btn-primary">
            <i className="fas fa-calendar-check"></i> Schedule Your Visit
          </Link>
        </div>
      </section>
    </>
  );
}

const services = [
  {
    icon: 'fas fa-tooth', title: 'General Dentistry',
    longDesc: 'Our comprehensive general dentistry services include routine check-ups, professional cleanings, cavity fillings, and preventative care. We focus on early detection and treatment to maintain your optimal oral health.',
    includes: 'Dental exams, scaling & polishing, fillings, fluoride treatments, and oral cancer screenings.',
  },
  {
    icon: 'fas fa-smile', title: 'Cosmetic Dentistry',
    longDesc: 'Transform your smile with our advanced cosmetic dentistry treatments. From professional teeth whitening to porcelain veneers and dental bonding, we help you achieve the smile you\'ve always dreamed of.',
    includes: 'Teeth whitening, veneers, dental bonding, gum contouring, and complete smile makeovers.',
  },
  {
    icon: 'fas fa-teeth', title: 'Orthodontics',
    longDesc: 'Correct misaligned teeth and achieve a perfectly straight smile with our orthodontic treatments. We offer both traditional braces and modern clear aligners to suit your lifestyle.',
    includes: 'Traditional braces, clear aligners (Invisalign), retainers, and jaw correction treatments.',
  },
  {
    icon: 'fas fa-syringe', title: 'Oral Surgery',
    longDesc: 'Our skilled oral surgeons perform a wide range of surgical procedures with precision and care. Using advanced techniques and anesthesia options, we ensure your comfort throughout any surgical treatment.',
    includes: 'Tooth extractions, wisdom teeth removal, dental implants, and jaw surgery.',
  },
  {
    icon: 'fas fa-baby', title: 'Pediatric Dentistry',
    longDesc: 'We specialize in making dental visits fun and comfortable for children. Our pediatric team is trained to work with young patients, creating positive dental experiences that build lifelong healthy habits.',
    includes: 'Child dental exams, sealants, fluoride treatments, cavity care, and habit counseling.',
  },
  {
    icon: 'fas fa-shield-alt', title: 'Emergency Dental Care',
    longDesc: 'Dental emergencies can be stressful and painful. We offer prompt emergency care services to address urgent dental issues quickly and effectively.',
    includes: 'Emergency exams, pain management, emergency extractions, and trauma care.',
  },
];