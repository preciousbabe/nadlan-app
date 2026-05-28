import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/new.css'


export default function InvestmentTiers() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTier, setHoveredTier] = useState(null)

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

  const tiers = [
    {
      name: 'Starter',
      price: '₦500,000',
      period: 'Minimum Investment',
      returnRate: '18%',
      returnLabel: 'Annual Return',
      duration: '12 Months',
      features: [
        'Access to starter properties',
        'Monthly return payouts',
        'Basic portfolio dashboard',
        'Email support',
        'Quarterly market reports'
      ],
      popular: false,
      color: '#6366f1'
    },
    {
      name: 'Growth',
      price: '₦2,000,000',
      period: 'Minimum Investment',
      returnRate: '22%',
      returnLabel: 'Annual Return',
      duration: '18 Months',
      features: [
        'Priority property access',
        'Monthly or quarterly payouts',
        'Advanced analytics dashboard',
        'Priority email & chat support',
        'Monthly market insights',
        'Portfolio rebalancing',
        'Tax optimization guidance'
      ],
      popular: true,
      color: '#10b981'
    },
    {
      name: 'Premium',
      price: '₦10,000,000',
      period: 'Minimum Investment',
      returnRate: '26%',
      returnLabel: 'Annual Return',
      duration: '24 Months',
      features: [
        'Exclusive premium properties',
        'Flexible payout schedules',
        'Full analytics suite',
        'Dedicated account manager',
        'Weekly market briefings',
        'Custom portfolio strategy',
        'Estate planning support',
        'VIP investor events access'
      ],
      popular: false,
      color: '#f59e0b'
    },
    {
      name: 'Elite',
      price: '₦50,000,000',
      period: 'Minimum Investment',
      returnRate: '28%',
      returnLabel: 'Annual Return',
      duration: '36 Months',
      features: [
        'Bespoke property deals',
        'Fully customized terms',
        'White-glove service',
        'Direct CEO access',
        'Real-time market data',
        'Co-investment opportunities',
        'International property access',
        'Family office services'
      ],
      popular: false,
      color: '#ec4899'
    }
  ]

  return (
    <section ref={sectionRef} id="investment-tiers" className="tiers">
      <div className="tiers__bg">
        <div className="tiers__orb tiers__orb--1"></div>
        <div className="tiers__orb tiers__orb--2"></div>
      </div>

      <div className="tiers__container">
        <div className={`tiers__header ${isVisible ? 'tiers__header--visible' : ''}`}>
          <span className="tiers__eyebrow">Investment Plans</span>
          <h2 className="tiers__title">
            Choose Your
            <span className="tiers__title-accent"> Investment Tier</span>
          </h2>
          <p className="tiers__description">
            From entry-level to elite, we have an investment plan tailored to your financial goals. 
            All tiers include full legal protection and transparent reporting.
          </p>
        </div>

        <div className={`tiers__grid ${isVisible ? 'tiers__grid--visible' : ''}`}>
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`tiers__card ${tier.popular ? 'tiers__card--popular' : ''} ${hoveredTier === index ? 'tiers__card--hover' : ''}`}
              style={{ 
                '--delay': `${index * 0.1}s`,
                '--tier-color': tier.color 
              }}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.popular && (
                <div className="tiers__badge">
                  <span>Most Popular</span>
                </div>
              )}

              <div className="tiers__card-header">
                <h3 className="tiers__card-name">{tier.name}</h3>
                <div className="tiers__card-price">
                  <span className="tiers__card-amount">{tier.price}</span>
                  <span className="tiers__card-period">{tier.period}</span>
                </div>
              </div>

              <div className="tiers__card-return">
                <span className="tiers__return-rate">{tier.returnRate}</span>
                <span className="tiers__return-label">{tier.returnLabel}</span>
              </div>

              <div className="tiers__card-duration">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{tier.duration} Lock-in Period</span>
              </div>

              <ul className="tiers__features">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="tiers__feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
  className={`tiers__btn ${
    tier.popular
      ? 'tiers__btn--primary'
      : 'tiers__btn--outline'
  }`}
  onClick={() => navigate('/signup')}
>
  Get Started

  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>

              <div className="tiers__card-glow" style={{ background: tier.color }}></div>
            </div>
          ))}
        </div>

        <div className={`tiers__guarantee ${isVisible ? 'tiers__guarantee--visible' : ''}`}>
          <div className="tiers__guarantee-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <div className="tiers__guarantee-text">
            <strong>100% Capital Protection</strong>
            <span>All investments are backed by physical assets with legal title documentation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
