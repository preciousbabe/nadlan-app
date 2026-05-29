import React, { useState } from 'react';
import InvestmentCalculator from '../components/InvestmentCalculator'
import './main.css'

export default function Investments() {
  const [selectedTier, setSelectedTier] = useState(null);

  const tiers = [
    {
      name: 'Bronze',
      min: '₦500,000',
      max: '₦4,999,999',
      returns: '14% - 16%',
      period: '12 - 24 months',
      features: [
        'Fractional property ownership',
        'Quarterly dividend payouts',
        'Basic portfolio dashboard',
        'Email support',
        'Entry to bronze investor events'
      ],
      highlight: false
    },
    {
      name: 'Silver',
      min: '₦5,000,000',
      max: '₦19,999,999',
      returns: '16% - 19%',
      period: '12 - 36 months',
      features: [
        'Priority property allocation',
        'Monthly dividend option',
        'Advanced analytics dashboard',
        'Dedicated account manager',
        'Free property inspection visits',
        'Silver investor networking events'
      ],
      highlight: true
    },
    {
      name: 'Gold',
      min: '₦20,000,000',
      max: '₦49,999,999',
      returns: '19% - 22%',
      period: '12 - 48 months',
      features: [
        'First pick on new developments',
        'Weekly payout option available',
        'Real-time portfolio tracking',
        'Personal wealth advisor',
        'VIP property tours',
        'Gold investor summit access',
        'Tax optimization consultation'
      ],
      highlight: false
    },
    {
      name: 'Platinum',
      min: '₦50,000,000',
      max: 'Unlimited',
      returns: '22% - 28%',
      period: 'Custom',
      features: [
        'Bespoke investment structuring',
        'Custom payout schedules',
        'White-glove concierge service',
        'Board observer rights',
        'Private jet property tours',
        'Annual luxury retreat invitation',
        'Estate planning included',
        'Family office coordination'
      ],
      highlight: false
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Choose Your Tier',
      desc: 'Select an investment level that matches your capital and return expectations.'
    },
    {
      step: '02',
      title: 'Pick a Property',
      desc: 'Browse verified developments and select properties aligned with your goals.'
    },
    {
      step: '03',
      title: 'Fund & Secure',
      desc: 'Complete KYC, transfer funds via bank or crypto, and receive legal documentation.'
    },
    {
      step: '04',
      title: 'Earn & Track',
      desc: 'Monitor returns in real-time, receive payouts, and reinvest or withdraw.'
    }
  ];

  const performance = [
    { year: '2020', return: '12.5%', benchmark: '8.2%' },
    { year: '2021', return: '15.2%', benchmark: '9.1%' },
    { year: '2022', return: '16.8%', benchmark: '10.5%' },
    { year: '2023', return: '18.4%', benchmark: '11.2%' },
    { year: '2024', return: '20.1%', benchmark: '12.0%' },
  ];

  return (
    <div className="investments-page">
      {/* HERO */}
      <section className="hero hero--subpage">

  <div
    className="hero-bg"
    style={{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)'
    }}
  />

  <div className="hero-overlay" />

  <div className="hero-content">

    <div className="text-content">

      {/* <span className="section-label">
        Investment Plans
      </span> */}

      <h1>
        Your Capital,
        <span className="gold-text">
          {' '}Our Expertise
        </span>
      </h1>

      <p>
        Structured real estate investments with transparent
        returns, starting from ₦500,000.
      </p>

    </div>

  </div>

</section>

      {/* HOW IT WORKS */}
      <section className="section-padding" style={{ background: 'var(--dark-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="label">The Process</span>
            <h2>How It <span className="gold-text">Works</span></h2>
            <div className="gold-line-center" />
          </div>
          <div className="grid-4">
            {howItWorks.map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '4rem',
                  color: 'var(--gold)',
                  opacity: 0.3,
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '1rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT TIERS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="label">Choose Your Level</span>
            <h2>Investment <span className="gold-text">Tiers</span></h2>
            <div className="gold-line-center" />
          </div>
          <div className="grid-4" style={{ alignItems: 'stretch' }}>
            {tiers.map((tier, i) => (
              <div 
                key={i} 
                className="card"
                onClick={() => setSelectedTier(selectedTier === i ? null : i)}
                style={{
                  cursor: 'pointer',
                  border: tier.highlight ? '2px solid var(--gold)' : '1px solid var(--border-subtle)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {tier.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--gold)',
                    color: 'var(--dark)',
                    padding: '0.3rem 1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Most Popular
                  </div>
                )}
                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: '1.8rem',
                    color: tier.highlight ? 'var(--gold)' : 'var(--white)',
                    marginBottom: '0.5rem'
                  }}>
                    {tier.name}
                  </h3>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Minimum</span>
                    <div style={{ 
                      fontFamily: "'Playfair Display', serif", 
                      fontSize: '1.6rem', 
                      color: 'var(--white)',
                      fontWeight: 600
                    }}>
                      {tier.min}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>up to {tier.max}</span>
                  </div>
                  
                  <div style={{ 
                    background: 'var(--dark-tertiary)', 
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>Annual Returns</div>
                    <div style={{ 
                      fontFamily: "'Playfair Display', serif", 
                      fontSize: '1.5rem', 
                      color: 'var(--gold)',
                      fontWeight: 700
                    }}>
                      {tier.returns}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.25rem' }}>
                      Period: {tier.period}
                    </div>
                  </div>

                  <ul style={{ 
                    listStyle: 'none', 
                    marginBottom: '2rem',
                    flex: 1
                  }}>
                    {tier.features.map((feat, j) => (
                      <li key={j} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.85rem',
                        color: 'var(--gray-light)'
                      }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button className={tier.highlight ? 'btn-primary' : 'btn-outline'} style={{ width: '100%' }}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE HISTORY */}
      <section className="section-padding" style={{ background: 'var(--dark-secondary)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="label">Track Record</span>
              <h2>Consistent Returns, <span className="gold-text">Year After Year</span></h2>
              <div className="gold-line" />
              <p style={{ marginBottom: '2rem' }}>
                Our portfolio has outperformed traditional savings, bonds, and the stock market consistently since inception.
              </p>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <div>
                  <div style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: '2.5rem', 
                    color: 'var(--gold)',
                    fontWeight: 700
                  }}>
                    20.1%
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>2024 Average Return</span>
                </div>
                <div>
                  <div style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: '2.5rem', 
                    color: 'var(--gold)',
                    fontWeight: 700
                  }}>
                    100%
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>Capital Preservation</span>
                </div>
              </div>
            </div>
            <div>
              {performance.map((p, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{ color: 'var(--white)', fontWeight: 500 }}>{p.year}</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{p.return}</span>
                  </div>
                  <div className="progress-bar" style={{ height: '8px', background: 'var(--dark-tertiary)' }}>
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(parseFloat(p.return) / 30) * 100}%`,
                        background: 'var(--gold)'
                      }}
                    />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '0.25rem',
                    fontSize: '0.75rem',
                    color: 'var(--gray-dark)'
                  }}>
                    <span>NADLAN</span>
                    <span>Market avg: {p.benchmark}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR CTA */}
     <section className="section-padding" style={{ textAlign: 'center' }}>
  <div className="container">
    <span className="label">Plan Ahead</span>
    <h2 style={{ marginBottom: '1rem' }}>Calculate Your <span className="gold-text">Potential Returns</span></h2>
    <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
      Use our investment calculator to project your earnings based on capital, tier, and duration.
    </p>
    <InvestmentCalculator />
  </div>
</section>
    </div>
  );
}