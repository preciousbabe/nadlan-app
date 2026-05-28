import { useEffect, useRef, useState } from 'react'
import './Energy.css'

export default function Energy() {
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

  const services = [
    {
      icon: '🔋',
      title: 'Battery Storage Systems',
      description: 'Lithium-ion and flow battery solutions that store excess solar energy for use during grid outages or peak demand periods. Scalable from 5kWh residential to 5MWh utility-grade.'
    },
    {
      icon: '⚡',
      title: 'Grid Integration & Microgrids',
      description: 'Smart grid solutions that connect renewable assets to the national grid or operate as independent microgrids for rural communities, estates, and industrial parks.'
    },
    {
      icon: '🔌',
      title: 'EV Charging Infrastructure',
      description: 'End-to-end electric vehicle charging solutions — from home chargers to commercial fast-charging stations powered 100% by renewable energy.'
    },
    {
      icon: '📊',
      title: 'Energy Monitoring & AI',
      description: 'Real-time energy analytics platform with AI-driven optimization. Predict consumption patterns, detect inefficiencies, and automate energy dispatch.'
    }
  ]

  const process = [
    { step: '01', title: 'Energy Audit', desc: 'Comprehensive assessment of your current energy usage, costs, and infrastructure.' },
    { step: '02', title: 'System Design', desc: 'Custom engineering solution tailored to your load profile and site constraints.' },
    { step: '03', title: 'Installation', desc: 'Certified technicians deploy equipment with minimal disruption to operations.' },
    { step: '04', title: 'Optimization', desc: 'Continuous monitoring and AI tuning to maximize performance and savings.' }
  ]

  return (
    <div className="energy-page">
      {/* Hero */}
      <section className="energy-hero">
        <div className="energy-hero__bg">
          <div className="energy-hero__grid-pattern"></div>
          <div className="energy-hero__glow"></div>
        </div>
        <div className="energy-hero__content">
          <span className="energy-hero__eyebrow">Energy Services</span>
          <h1 className="energy-hero__title">
            Powering Nigeria's
            <span className="energy-hero__accent"> Energy Transition</span>
          </h1>
          <p className="energy-hero__description">
            Beyond solar panels, NADLAN Green provides a full spectrum of energy 
            infrastructure services — from battery storage and smart grids to EV charging 
            and AI-powered energy management.
          </p>
          <div className="energy-hero__stats">
            <div className="energy-hero__stat">
              <span className="energy-hero__stat-value">35MWh</span>
              <span className="energy-hero__stat-label">Storage Deployed</span>
            </div>
            <div className="energy-hero__stat-divider"></div>
            <div className="energy-hero__stat">
              <span className="energy-hero__stat-value">48</span>
              <span className="energy-hero__stat-label">Microgrids Active</span>
            </div>
            <div className="energy-hero__stat-divider"></div>
            <div className="energy-hero__stat">
              <span className="energy-hero__stat-value">120+</span>
              <span className="energy-hero__stat-label">EV Chargers Installed</span>
            </div>
          </div>
        </div>
      </section>

      

      {/* Services */}
      <section ref={sectionRef} className="section__container energy-services">
        <div className={`energy-services__header ${isVisible ? 'energy-services__header--visible' : ''}`}>
          <span className="energy-services__eyebrow">What We Offer</span>
          <h2 className="section__header energy-services__title">
            Complete Energy
            <span className="energy-services__accent"> Infrastructure</span>
          </h2>
          <p className="section__description energy-services__description">
            Integrated solutions that transform how homes, businesses, and communities 
            generate, store, and consume energy.
          </p>
        </div>

        <ul className={`feature__grid energy-services__grid ${isVisible ? 'energy-services__grid--visible' : ''}`}>
          {services.map((item, index) => (
            <li key={index} style={{ '--delay': `${index * 0.12}s` }}>
              <span className="energy-services__icon">{item.icon}</span>
              <div>
                <h4 className="energy-services__card-title">{item.title}</h4>
                <p className="energy-services__card-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="energy-process">
        <div className="energy-process__container">
          <div className="energy-process__header">
            <span className="energy-process__eyebrow">How It Works</span>
            <h2 className="section__header energy-process__title">
              From Audit to
              <span className="energy-process__accent"> Optimization</span>
            </h2>
          </div>

          <div className="energy-process__timeline">
            {process.map((item, i) => (
              <div key={i} className="energy-process__step">
                <div className="energy-process__step-number">{item.step}</div>
                <div className="energy-process__step-content">
                  <h4 className="energy-process__step-title">{item.title}</h4>
                  <p className="energy-process__step-desc">{item.desc}</p>
                </div>
                {i < process.length - 1 && <div className="energy-process__step-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="energy-tech">
        <div className="energy-tech__container">
          <div className="energy-tech__content">
            <span className="energy-tech__eyebrow">Technology</span>
            <h2 className="section__header energy-tech__title">
              Built on Proven,
              <span className="energy-tech__accent"> Future-Ready Tech</span>
            </h2>
            <p className="energy-tech__text">
              We partner with Tier 1 manufacturers and integrate cutting-edge technology 
              to ensure every installation delivers maximum ROI and reliability for decades.
            </p>
            <div className="energy-tech__logos">
              <span className="energy-tech__logo">Tesla Powerwall</span>
              <span className="energy-tech__logo">BYD Battery</span>
              <span className="energy-tech__logo">SMA Inverters</span>
              <span className="energy-tech__logo">Sungrow</span>
              <span className="energy-tech__logo">ABB</span>
              <span className="energy-tech__logo">ChargePoint</span>
            </div>
          </div>
          <div className="energy-tech__visual">
            <div className="energy-tech__card energy-tech__card--main">
              <div className="energy-tech__card-header">
                <span className="energy-tech__status">● Live</span>
                <span className="energy-tech__location">Lagos Microgrid</span>
              </div>
              <div className="energy-tech__metrics">
                <div className="energy-tech__metric">
                  <span className="energy-tech__metric-value">2.4MW</span>
                  <span className="energy-tech__metric-label">Generation</span>
                </div>
                <div className="energy-tech__metric">
                  <span className="energy-tech__metric-value">94%</span>
                  <span className="energy-tech__metric-label">Efficiency</span>
                </div>
                <div className="energy-tech__metric">
                  <span className="energy-tech__metric-value">₦0</span>
                  <span className="energy-tech__metric-label">Grid Cost Today</span>
                </div>
              </div>
              <div className="energy-tech__chart">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div 
                    key={i} 
                    className="energy-tech__bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
