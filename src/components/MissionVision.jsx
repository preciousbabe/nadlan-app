import { useEffect, useRef, useState } from 'react'
import '../styles/new.css'

export default function MissionVision() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('mission')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const content = {
    mission: {
      title: 'Our Mission',
      subtitle: 'Democratizing Real Estate Wealth',
      text:
        "To make premium real estate investment accessible to every Nigerian, regardless of capital size. We believe that wealth-building through property should not be an exclusive club.",
      points: [
        'Lower entry barriers to real estate investment',
        'Provide transparent investment decisions',
        'Access to prime properties',
        'Build sustainable family wealth'
      ]
    },

    vision: {
      title: 'Our Vision',
      subtitle: 'A Property-Owning Nigeria',
      text:
        "To become Africa's leading property investment platform and empower millions of Nigerians through real estate ownership.",
      points: [
        '1 million active investors by 2030',
        '₦100 billion assets under management',
        'Expansion across Africa',
        'Green property development'
      ]
    },

    values: {
      title: 'Our Values',
      subtitle: 'Built on Trust & Transparency',
      text:
        'Integrity, innovation, transparency, and impact shape every investment experience we create.',
      points: [
        'Transparency in every transaction',
        'Innovation in property technology',
        'Impact-driven decisions',
        'Excellent customer experience'
      ]
    }
  }

  const activeContent = content[activeTab]

  return (
    <section
      ref={sectionRef}
      id="mission-vision"
      className="mission"
    >
      <div className="mission__bg">
        <div className="mission__gradient"></div>
      </div>

      <div className="mission__container">

        {/* HEADER */}
        <div
          className={`mission__header ${
            isVisible ? 'mission__header--visible' : ''
          }`}
        >
          <span className="mission__eyebrow">
            Our Purpose
          </span>

          <h2 className="mission__title">
            Driven by Purpose,
            <span className="mission__title-accent">
              {' '}Defined by Values
            </span>
          </h2>
        </div>

        {/* BODY */}
        <div
          className={`mission__body ${
            isVisible ? 'mission__body--visible' : ''
          }`}
        >

          {/* TABS */}
          <div className="mission__tabs">
            {Object.keys(content).map((key) => {
              const item = content[key]

              return (
                <button
                  key={key}
                  className={`mission__tab ${
                    activeTab === key
                      ? 'mission__tab--active'
                      : ''
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {item.title}
                </button>
              )
            })}
          </div>

          {/* CONTENT */}
          <div className="mission__content">

            <div className="mission__panel">

              {/* LEFT */}
              <div className="mission__visual">

                <div className="mission__icon">

                  {activeTab === 'mission' && (
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  )}

                  {activeTab === 'vision' && (
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}

                  {activeTab === 'values' && (
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                    </svg>
                  )}

                </div>

                <div className="mission__orbit"></div>

              </div>

              {/* RIGHT */}
              <div className="mission__text">

                <span className="mission__subtitle">
                  {activeContent.subtitle}
                </span>

                <h3 className="mission__panel-title">
                  {activeContent.title}
                </h3>

                <p className="mission__description">
                  {activeContent.text}
                </p>

                <ul className="mission__points">
                  {activeContent.points.map((point, i) => (
                    <li
                      key={i}
                      className="mission__point"
                    >
                      <span className="mission__check">
                        ✓
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mission__stats">

          <div className="mission__stat">
            <h3>75%</h3>
            <span>First-time Investors</span>
          </div>

          <div className="mission__stat">
            <h3>86%</h3>
            <span>Reinvestment Rate</span>
          </div>

          <div className="mission__stat">
            <h3>93%</h3>
            <span>On-time Payouts</span>
          </div>

        </div>

      </div>
    </section>
  )
}