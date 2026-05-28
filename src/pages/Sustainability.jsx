import { useEffect, useRef, useState } from 'react'
import './Sustainability.css'

export default function Sustainability() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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

  const pillars = [
    {
      icon: '🌱',
      title: 'Carbon Neutrality',
      description: 'Committed to net-zero operations by 2030. Every project we fund is measured against strict carbon accounting standards, with third-party verified offsets for any residual emissions.'
    },
    {
      icon: '♻️',
      title: 'Circular Economy',
      description: 'End-of-life solar panel recycling programs, battery repurposing initiatives, and zero-waste installation practices ensure our projects leave no harmful footprint.'
    },
    {
      icon: '🏘️',
      title: 'Community Impact',
      description: 'Every megawatt deployed creates local jobs, funds community development, and brings reliable electricity to underserved areas. We measure success in lives improved, not just ROI.'
    },
    {
      icon: '📜',
      title: 'ESG Compliance',
      description: 'Full adherence to global ESG frameworks including GRI, SASB, and TCFD. Our sustainability reports are audited annually and published transparently for all stakeholders.'
    }
  ]

  const impacts = [
    { metric: '45,000+', label: 'Trees Equivalent Planted', icon: '🌳' },
    { metric: '₦850M', label: 'Community Development Fund', icon: '💚' },
    { metric: '1,200+', label: 'Green Jobs Created', icon: '👷' },
    { metric: '98%', label: 'Waste Recycled', icon: '♻️' }
  ]

  return (
    <div className="sustainability-page">
      {/* Hero */}
      <section className="sus-hero">
        <div className="sus-hero__bg">
          <div className="sus-hero__leaf-pattern"></div>
          <div className="sus-hero__orb sus-hero__orb--1"></div>
          <div className="sus-hero__orb sus-hero__orb--2"></div>
        </div>
        <div className="sus-hero__content">
          <span className="sus-hero__eyebrow">Our Commitment</span>
          <h1 className="sus-hero__title">
            Investing in a
            <span className="sus-hero__accent"> Greener Tomorrow</span>
          </h1>
          <p className="sus-hero__description">
            Sustainability is not a marketing line for us — it is the core of every 
            investment decision we make. From project selection to end-of-life management, 
            we ensure every naira generates both financial and environmental returns.
          </p>
          <div className="sus-hero__badges">
            <span className="sus-hero__badge">🌿 ISO 14001 Certified</span>
            <span className="sus-hero__badge">🏆 UN Global Compact Member</span>
            <span className="sus-hero__badge">📊 GRI Sustainability Reporting</span>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="sus-impact">
        <div className="sus-impact__container">
          {impacts.map((item, i) => (
            <div key={i} className="sus-impact__item">
              <span className="sus-impact__icon">{item.icon}</span>
              <span className="sus-impact__metric">{item.metric}</span>
              <span className="sus-impact__label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section ref={sectionRef} className="section__container sus-pillars">
        <div className={`sus-pillars__header ${isVisible ? 'sus-pillars__header--visible' : ''}`}>
          <span className="sus-pillars__eyebrow">Framework</span>
          <h2 className="section__header sus-pillars__title">
            Four Pillars of
            <span className="sus-pillars__accent"> Sustainability</span>
          </h2>
          <p className="section__description sus-pillars__description">
            Our sustainability framework guides every investment, partnership, 
            and operational decision at NADLAN Green.
          </p>
        </div>

        <ul className={`feature__grid sus-pillars__grid ${isVisible ? 'sus-pillars__grid--visible' : ''}`}>
          {pillars.map((item, index) => (
            <li key={index} style={{ '--delay': `${index * 0.12}s` }}>
              <span className="sus-pillars__icon">{item.icon}</span>
              <div>
                <h4 className="sus-pillars__card-title">{item.title}</h4>
                <p className="sus-pillars__card-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Report CTA */}
      <section className="sus-report">
        <div className="sus-report__bg"></div>
        <div className="sus-report__content">
          <div className="sus-report__text">
            <span className="sus-report__eyebrow">Transparency</span>
            <h2 className="sus-report__title">
              Download Our 2025
              <span className="sus-report__accent"> Sustainability Report</span>
            </h2>
            <p className="sus-report__desc">
              Full ESG metrics, carbon footprint analysis, community impact data, 
              and third-party audit results for all NADLAN Green operations.
            </p>
            <a href="#" className="sus-report__button">
              <span>📥 Download PDF</span>
              <span className="sus-report__button-size">(4.2 MB)</span>
            </a>
          </div>
          <div className="sus-report__preview">
            <div className="sus-report__doc">
              <div className="sus-report__doc-header">
                <span className="sus-report__doc-logo">☀ NADLAN<span>Green</span></span>
                <span className="sus-report__doc-year">2025</span>
              </div>
              <div className="sus-report__doc-title">Sustainability Report</div>
              <div className="sus-report__doc-line"></div>
              <div className="sus-report__doc-line sus-report__doc-line--short"></div>
              <div className="sus-report__doc-charts">
                <div className="sus-report__doc-chart"></div>
                <div className="sus-report__doc-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="sus-sdg">
        <div className="sus-sdg__container">
          <div className="sus-sdg__header">
            <span className="sus-sdg__eyebrow">Global Goals</span>
            <h2 className="section__header sus-sdg__title">
              Aligned with the UN
              <span className="sus-sdg__accent"> Sustainable Development Goals</span>
            </h2>
          </div>
          <div className="sus-sdg__grid">
            {[
              { num: '7', name: 'Affordable & Clean Energy', color: '#fcc30b' },
              { num: '9', name: 'Industry & Innovation', color: '#fd6925' },
              { num: '11', name: 'Sustainable Cities', color: '#fd9d24' },
              { num: '13', name: 'Climate Action', color: '#3f7e44' },
            ].map((sdg, i) => (
              <div key={i} className="sus-sdg__card" style={{ '--sdg-color': sdg.color }}>
                <span className="sus-sdg__num">{sdg.num}</span>
                <span className="sus-sdg__name">{sdg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
