import { useEffect, useRef, useState } from 'react'
import './Projects.css'

export default function Projects() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      name: 'Lekki Solar Estate',
      location: 'Lekki, Lagos',
      type: 'residential',
      capacity: '2.5MW',
      status: 'Operational',
      year: '2024',
      impact: '1,200 homes powered',
      image: '🏘️'
    },
    {
      name: 'Ikeja Business Park',
      location: 'Ikeja, Lagos',
      type: 'commercial',
      capacity: '5MW',
      status: 'Operational',
      year: '2023',
      impact: '₦180M annual savings',
      image: '🏢'
    },
    {
      name: 'Abuja Microgrid',
      location: 'Gwarinpa, Abuja',
      type: 'microgrid',
      capacity: '1.2MW',
      status: 'Operational',
      year: '2024',
      impact: '3 communities electrified',
      image: '⚡'
    },
    {
      name: 'Aba Industrial Solar',
      location: 'Aba, Abia State',
      type: 'industrial',
      capacity: '8MW',
      status: 'Under Construction',
      year: '2025',
      impact: '50 factories powered',
      image: '🏭'
    },
    {
      name: 'Port Harcourt EV Hub',
      location: 'PHC, Rivers State',
      type: 'ev',
      capacity: '500kW',
      status: 'Operational',
      year: '2024',
      impact: '24 fast chargers live',
      image: '🔌'
    },
    {
      name: 'Kano Battery Farm',
      location: 'Kano, Kano State',
      type: 'storage',
      capacity: '10MWh',
      status: 'Operational',
      year: '2023',
      impact: 'Grid stability for 8hrs',
      image: '🔋'
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'residential', label: 'Residential' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'industrial', label: 'Industrial' },
    { key: 'microgrid', label: 'Microgrids' },
    { key: 'ev', label: 'EV Charging' },
    { key: 'storage', label: 'Storage' }
  ]

  const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter)

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero">
        <div className="projects-hero__bg">
          <div className="projects-hero__map-dots"></div>
        </div>
        <div className="projects-hero__content">
          <span className="projects-hero__eyebrow">Our Portfolio</span>
          <h1 className="projects-hero__title">
            Projects That
            <span className="projects-hero__accent"> Power Nigeria</span>
          </h1>
          <p className="projects-hero__description">
            From Lagos to Kano, NADLAN Green is building the infrastructure for 
            Nigeria's clean energy future — one project at a time.
          </p>
          <div className="projects-hero__summary">
            <div className="projects-hero__stat">
              <span className="projects-hero__stat-value">27MW</span>
              <span className="projects-hero__stat-label">Total Capacity</span>
            </div>
            <div className="projects-hero__stat">
              <span className="projects-hero__stat-value">18</span>
              <span className="projects-hero__stat-label">Active Projects</span>
            </div>
            <div className="projects-hero__stat">
              <span className="projects-hero__stat-value">6</span>
              <span className="projects-hero__stat-label">States Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section ref={sectionRef} className="projects-grid">
        <div className="projects-grid__container">
          <div className={`projects-grid__header ${isVisible ? 'projects-grid__header--visible' : ''}`}>
            <span className="projects-grid__eyebrow">Explore</span>
            <h2 className="section__header projects-grid__title">
              Every Project,
              <span className="projects-grid__accent"> Verified Impact</span>
            </h2>
          </div>

          <div className="projects-grid__filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`projects-grid__filter ${filter === f.key ? 'projects-grid__filter--active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={`projects-grid__cards ${isVisible ? 'projects-grid__cards--visible' : ''}`}>
            {filtered.map((project, index) => (
              <div 
                key={project.name} 
                className="projects-grid__card"
                style={{ '--delay': `${index * 0.08}s` }}
              >
                <div className="projects-grid__card-visual">
                  <span className="projects-grid__card-image">{project.image}</span>
                  <span className={`projects-grid__card-status projects-grid__card-status--${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                <div className="projects-grid__card-body">
                  <div className="projects-grid__card-meta">
                    <span className="projects-grid__card-location">📍 {project.location}</span>
                    <span className="projects-grid__card-year">{project.year}</span>
                  </div>
                  <h3 className="projects-grid__card-name">{project.name}</h3>
                  <div className="projects-grid__card-specs">
                    <div className="projects-grid__card-spec">
                      <span className="projects-grid__card-spec-label">Capacity</span>
                      <span className="projects-grid__card-spec-value">{project.capacity}</span>
                    </div>
                    <div className="projects-grid__card-spec">
                      <span className="projects-grid__card-spec-label">Impact</span>
                      <span className="projects-grid__card-spec-value">{project.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Investors CTA */}
      <section className="projects-partners">
        <div className="projects-partners__bg"></div>
        <div className="projects-partners__content">
          <div className="projects-partners__text">
            <span className="projects-partners__eyebrow">Partners & Investors</span>
            <h2 className="projects-partners__title">
              Join the Green
              <span className="projects-partners__accent"> Energy Revolution</span>
            </h2>
            <p className="projects-partners__desc">
              Whether you are a developer seeking financing, an EPC looking for projects, 
              or an investor searching for high-yield green assets — we are building together.
            </p>
          </div>
          <div className="projects-partners__cards">
            <div className="projects-partners__card">
              <div className="projects-partners__card-icon">🏗️</div>
              <h4 className="projects-partners__card-title">For Developers</h4>
              <p className="projects-partners__card-text">
                Access full-stack project financing, from early-stage development 
                through construction to permanent debt.
              </p>
              <a href="#" className="projects-partners__card-link">Partner With Us →</a>
            </div>
            <div className="projects-partners__card">
              <div className="projects-partners__card-icon">💼</div>
              <h4 className="projects-partners__card-title">For Investors</h4>
              <p className="projects-partners__card-text">
                Invest in vetted, high-performing solar and storage projects 
                with predictable cash flows and ESG alignment.
              </p>
              <a href="#" className="projects-partners__card-link">View Opportunities →</a>
            </div>
            <div className="projects-partners__card">
              <div className="projects-partners__card-icon">🔧</div>
              <h4 className="projects-partners__card-title">For EPCs</h4>
              <p className="projects-partners__card-text">
                Join our approved installer network. We provide leads, 
                financing, and ongoing project support.
              </p>
              <a href="#" className="projects-partners__card-link">Apply to Network →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
