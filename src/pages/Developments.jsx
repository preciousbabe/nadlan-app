import React, { useState } from 'react';
import './main.css'


export default function Developments() {
  const [filter, setFilter] = useState('all');

  const developments = [
    {
      id: 1,
      title: 'Eko Atlantic Residences',
      location: 'Lagos, Eko Atlantic',
      type: 'residential',
      status: 'ongoing',
      price: '₦45M',
      units: 48,
      sold: 32,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      description: 'Luxury waterfront apartments with panoramic ocean views, smart home integration, and private marina access.',
      features: ['24/7 Power', 'Swimming Pool', 'Gym', 'Underground Parking'],
      completion: 'Q4 2026',
      roi: '22%'
    },
    {
      id: 2,
      title: 'Maitama Heights',
      location: 'Abuja, Maitama District',
      type: 'residential',
      status: 'upcoming',
      price: '₦38M',
      units: 64,
      sold: 0,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      description: 'Premium duplex estates in Abuja\'s most exclusive district, featuring Italian marble finishes and landscaped gardens.',
      features: ['Smart Security', 'Tennis Court', 'Clubhouse', 'Green Spaces'],
      completion: 'Q2 2027',
      roi: '20%'
    },
    {
      id: 3,
      title: 'Lekki Commercial Hub',
      location: 'Lagos, Lekki Phase 1',
      type: 'commercial',
      status: 'ongoing',
      price: '₦120M',
      units: 24,
      sold: 18,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      description: 'Grade A office complex targeting fintech and multinational tenants. LEED-certified sustainable design.',
      features: ['Solar Power', 'Fiber Internet', 'Conference Center', 'Rooftop Lounge'],
      completion: 'Q1 2027',
      roi: '25%'
    },
    {
      id: 4,
      title: 'Port Harcourt Industrial Park',
      location: 'Rivers State, Port Harcourt',
      type: 'industrial',
      status: 'upcoming',
      price: '₦85M',
      units: 12,
      sold: 0,
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
      description: 'Strategic warehouse and light manufacturing facilities with direct port access and customs processing.',
      features: ['Port Access', 'Heavy Power', 'Loading Docks', '24/7 Security'],
      completion: 'Q3 2027',
      roi: '19%'
    },
    {
      id: 5,
      title: 'Ibadan Garden City',
      location: 'Oyo State, Ibadan',
      type: 'residential',
      status: 'ongoing',
      price: '₦18M',
      units: 120,
      sold: 89,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      description: 'Affordable luxury living for young professionals. Gated community with modern amenities at accessible price points.',
      features: ['Playground', 'Jogging Track', 'Community Center', 'Backup Power'],
      completion: 'Q3 2026',
      roi: '16%'
    },
    {
      id: 6,
      title: 'Victoria Island Towers',
      location: 'Lagos, Victoria Island',
      type: 'mixed',
      status: 'ongoing',
      price: '₦200M',
      units: 36,
      sold: 28,
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      description: 'Mixed-use skyscraper combining luxury residences, retail spaces, and co-working offices in Lagos\' financial district.',
      features: ['Helipad', 'Sky Lounge', 'Retail Arcade', 'EV Charging'],
      completion: 'Q1 2028',
      roi: '28%'
    },
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'residential', label: 'Residential' },
    { key: 'commercial', label: 'Commercial' },
  ];

  const filtered = filter === 'all' 
    ? developments 
    : developments.filter(d => d.status === filter || d.type === filter);

  return (
    <div className="developments-page">
      {/* HERO */}
      <section className="hero hero--subpage">

  <div
    className="hero-bg"
    style={{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1448630360428-65456885c650?w=1920&q=80)'
    }}
  />

  <div className="hero-overlay" />

  <div className="hero-content">

    <div className="text-content">

      {/* <span className="section-label">
        Our Developments
      </span> */}

      <h1>
        Properties Shaping
        <span className="gold-text">
          {' '}Nigeria's Future
        </span>
      </h1>

      <p>
        From Lagos to Abuja, discover developments designed
        for maximum returns and lasting value.
      </p>

    </div>

  </div>

</section>

      {/* FILTER BAR */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={filter === f.key ? 'btn-primary' : 'btn-outline'}
                style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {filtered.map(project => (
              <div key={project.id} className="card">
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={project.image} alt={project.title} className="card-image" style={{ height: '280px' }} />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <span className="badge">{project.status}</span>
                    <span className="badge" style={{ 
                      background: 'var(--dark-overlay-heavy)',
                      borderColor: 'transparent'
                    }}>
                      {project.type}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'var(--dark-overlay-heavy)',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--gold)',
                    fontWeight: 600
                  }}>
                    {project.price}
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-meta">
                    <span>📍 {project.location}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{project.description}</p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--gray)' }}>Units Sold</span>
                      <span style={{ color: 'var(--gold)' }}>{project.sold}/{project.units}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(project.sold / project.units) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem'
                  }}>
                    {project.features.map((feat, i) => (
                      <span key={i} style={{
                        fontSize: '0.75rem',
                        padding: '0.3rem 0.8rem',
                        background: 'var(--dark-tertiary)',
                        color: 'var(--gray-light)',
                        borderRadius: '2px'
                      }}>
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gray)', display: 'block' }}>Completion</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--white)' }}>{project.completion}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gray)', display: 'block' }}>Projected ROI</span>
                      <span style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 600 }}>{project.roi}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT CTA */}
      <section className="section-padding" style={{ 
        background: 'var(--dark-secondary)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="label">Early Access</span>
          <h2 style={{ marginBottom: '1rem' }}>Get Priority on Upcoming <span className="gold-text">Developments</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Upcoming projects offer the highest ROI potential. Reserve your spot and get exclusive pre-launch pricing.
          </p>
          <button className="btn-primary">Join Priority List</button>
        </div>
      </section>
    </div>
  );
}