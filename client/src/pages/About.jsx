import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 data-animate="blur-in">About Devas Dental Clinic</h1>
          <div className="section-divider" style={{ margin: '20px auto', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}></div>
          <p data-animate="fade-up" data-delay="100">Two decades of compassionate care, one smile at a time.</p>
        </div>
      </section>

      <section className="section" data-animate="fade-up">
        <div className="container">
          <div className="about-content">
            <div className="about-image" data-animate="fade-right">
              <img src="/tooth.png" alt="Devas Dental Clinic" style={{ width: '100px', height: '100px', objectFit: 'contain', opacity: 0.6 }} />
            </div>
            <div className="about-text" data-animate="fade-left">
              <h2>Our Story</h2>
              <p>Devas Dental Clinic. has been serving the Gorakhpur community for over 20 years, providing compassionate and high-quality dental care led by Dr. Pankaj Kumar Srivastava. What started as a small practice with a single chair has grown into a trusted dental institution.</p>
              <p>Dr. Pankaj Kumar Srivastava and our friendly staff are dedicated to making every dental experience comfortable and stress-free.</p>
              <Link to="/appointment" className="btn btn-gold-outline">
                <i className="fas fa-calendar-check"></i> Book Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonials-section" data-animate="fade-up">
        <div className="container">
          <div className="values-grid stagger-grid">
            {values.map((v, i) => (
              <div key={i} className="glass-card stagger-item" style={{ textAlign: 'center', '--stagger-index': i }}>
                <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: 16 }}><i className={v.icon}></i></div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-animate="fade-up">
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">From a single chair to a premier dental institution — our story of growth and commitment.</p>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item" data-animate={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section" data-animate="fade-up">
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">Dedicated professionals committed to your dental health.</p>
          <div className="team-grid stagger-grid">
            {team.map((m, i) => (
              <div key={i} className="team-card stagger-item" style={{ '--stagger-index': i }}>
                <div className="team-avatar"><i className="fas fa-user-md"></i></div>
                <h3>{m.name}</h3>
                <div className="team-role">{m.role}</div>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const values = [
  { icon: 'fas fa-bullseye', title: 'Our Mission', desc: 'To deliver exceptional dental services that promote oral health, enhance smiles, and improve the overall well-being of our patients through compassionate, personalized care.' },
  { icon: 'fas fa-eye', title: 'Our Vision', desc: 'To be the most trusted dental care provider in the region, known for clinical excellence, innovative treatments, and creating confident smiles that transform lives.' },
  { icon: 'fas fa-heart', title: 'Our Values', desc: 'Compassion, excellence, integrity, and innovation guide everything we do. We treat every patient like family and strive to exceed expectations at every visit.' },
];

const timeline = [
  { year: '2005', title: 'Humble Beginnings', desc: 'Devas Dental Clinic. opens its doors in Gorakhpur with a single dental chair and a vision for excellence in patient care.' },
  { year: '2010', title: 'Expanding Services', desc: 'Added orthodontic and cosmetic dentistry services, bringing advanced smile transformations to the community.' },
  { year: '2015', title: 'New Facility', desc: 'Moved to a larger, state-of-the-art facility equipped with modern diagnostic and treatment technology.' },
  { year: '2020', title: 'Digital Transformation', desc: 'Implemented digital dentistry solutions including 3D imaging, laser dentistry, and paperless records.' },
  { year: '2024', title: '5,000+ Smiles', desc: 'Proudly served over 5,000 patients with a reputation for excellence.' },
];

const team = [
  { name: 'Dr. Pankaj Kumar Srivastava', role: 'Chief Dentist', bio: 'With over 20 years of experience, Dr. Pankaj Kumar Srivastava provides expert dental care with compassion and precision.' },
  { name: 'Support Staff', role: 'General Patient Care', bio: 'Our dedicated support team of three ensures that every visit is smooth and comfortable — from warm welcomes at the front desk to chair-side assistance and seamless clinic coordination.' },
];