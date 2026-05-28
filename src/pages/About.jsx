import React from 'react';
import './main.css'

export default function About() {
  const milestones = [
    { year: '2018', title: 'Founded in Lagos', desc: 'Started with a vision to democratize real estate investment across Nigeria.' },
    { year: '2020', title: 'First 100 Investors', desc: 'Reached our first milestone with ₦500M in managed assets.' },
    { year: '2022', title: 'Nationwide Expansion', desc: 'Extended operations to Abuja, Port Harcourt, and Ibadan.' },
    { year: '2024', title: '₦5B Portfolio', desc: 'Surpassed five billion naira in total investment value under management.' },
  ];

  const values = [
    { title: 'Transparency', desc: 'Every transaction, fee, and return is documented and accessible to you in real-time.' },
    { title: 'Security', desc: 'All properties are legally verified with title documents and insurance coverage.' },
    { title: 'Growth', desc: 'Curated portfolios designed to maximize returns while minimizing risk exposure.' },
    { title: 'Community', desc: 'Join thousands of investors building wealth together through collective intelligence.' },
  ];

  const team = [
    { name: 'Oluwaseun Adeyemi', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
    { name: 'Amara Okonkwo', role: 'Head of Investments', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
    { name: 'Ibrahim Danjuma', role: 'Chief Operations Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
    { name: 'Chioma Nwosu', role: 'Legal & Compliance', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
  ];

  return (
    <div className="about-page">
      {/* HERO */}
     <section className="hero hero--about">

  <div
    className="hero-bg"
    style={{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)'
    }}
  />

  <div className="hero-overlay" />

  <div className="hero-content">

    <div className="text-content">

      {/* <span className="section-label">
        About NADLAN
      </span> */}

      <h1>
        Building Wealth Through
        <span className="gold-text">
          {' '}Real Estate
        </span>
      </h1>

      <p>
        Nigeria's premier platform for accessible,
        transparent, and high-yield property investments.
      </p>

    </div>

  </div>

</section>

      {/* STATS */}
      <div className="container">
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">₦5B+</div>
            <div className="stat-label">Assets Managed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2,400+</div>
            <div className="stat-label">Active Investors</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">85+</div>
            <div className="stat-label">Properties</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">18%</div>
            <div className="stat-label">Avg. Annual Return</div>
          </div>
        </div>
      </div>

      {/* STORY */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="label">Our Story</span>
              <h2>Redefining Property Investment in <span className="gold-text">Nigeria</span></h2>
              <div className="gold-line" />
              <p style={{ marginBottom: '1.5rem' }}>
                NADLAN was born from a simple belief: that every Nigerian deserves access to premium real estate investment opportunities, not just the elite few.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                We bridge the gap between high-value property developments and everyday investors, offering fractional ownership, installment plans, and full-purchase options starting from ₦500,000.
              </p>
              <ul className="feature-list">
                <li>SEC-registered investment platform</li>
                <li>Verified property titles and legal documentation</li>
                <li>Real-time portfolio tracking dashboard</li>
                <li>Dedicated account managers for premium investors</li>
              </ul>
            </div>
            <div className="image-frame" style={{ height: '500px' }}>
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" 
                alt="Luxury real estate interior"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding" style={{ background: 'var(--dark-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="label">Our Journey</span>
            <h2>Milestones That Define <span className="gold-text">Us</span></h2>
            <div className="gold-line-center" />
          </div>
          <div className="grid-4">
            {milestones.map((m, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: '3rem', 
                  color: 'var(--gold)', 
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  {m.year}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{m.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="label">What We Stand For</span>
            <h2>Our Core <span className="gold-text">Values</span></h2>
            <div className="gold-line-center" />
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={i} className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  border: '2px solid var(--gold)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.5rem',
                  color: 'var(--gold)'
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding" style={{ background: 'var(--dark-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="label">The People</span>
            <h2>Meet Our <span className="gold-text">Leadership</span></h2>
            <div className="gold-line-center" />
          </div>
          <div className="grid-4">
            {team.map((member, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  margin: '0 auto 1.5rem',
                  border: '3px solid var(--gold)'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Ready to Start Your Investment Journey?</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 2rem', color: 'var(--gray)' }}>
            Join thousands of Nigerians building generational wealth through strategic real estate investments.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary">Explore Investments</button>
            <button className="btn-outline">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}