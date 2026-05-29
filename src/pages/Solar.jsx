import { useEffect, useRef, useState } from 'react'
import './Solar.css'

export default function Solar() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [monthlyBill, setMonthlyBill] = useState('')
const [propertyType, setPropertyType] = useState('Residential')

const [results, setResults] = useState(null)

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

  const benefits = [
    {
      icon: '⚡',
      title: 'Zero Upfront Cost',
      description: 'Start generating clean energy with no capital expenditure. We finance, install, and maintain the entire system.'
    },
    {
      icon: '💰',
      title: 'Immediate Savings',
      description: 'Reduce your electricity bills by up to 70% from day one. Lock in predictable energy costs for 25+ years.'
    },
    {
      icon: '🌍',
      title: 'Carbon Reduction',
      description: 'Every 1kW of solar installed prevents approximately 1.5 tonnes of CO₂ emissions annually.'
    },
    {
      icon: '🏠',
      title: 'Property Value Boost',
      description: 'Solar-equipped properties command higher valuations and attract environmentally conscious tenants.'
    }
  ]

  const stats = [
    { value: '50MW+', label: 'Solar Capacity Deployed' },
    { value: '₦2.1B', label: 'Client Savings Generated' },
    { value: '12,000+', label: 'Tonnes CO₂ Offset' },
    { value: '98%', label: 'Client Satisfaction' }
  ]

 function calculateSolarEstimate() {
  const bill = parseFloat(monthlyBill)

  if (!bill || isNaN(bill) || bill <= 0) {
    alert('Please enter a valid electricity bill')
    return
  }

  // estimated system size in kW
  const systemSize = bill / 25000

  // estimated savings
  const monthlySavings = bill * 0.7
  const yearlySavings = monthlySavings * 12

  // estimated panels
  const estimatedPanels = Math.ceil(systemSize * 2)

  // estimated installation cost
  const estimatedCost = systemSize * 850000

  // ROI
  const roiYears =
    yearlySavings > 0
      ? estimatedCost / yearlySavings
      : 0

  setResults({
    estimatedSystemSize: systemSize.toFixed(1),
    monthlySavings: Math.round(monthlySavings),
    yearlySavings: Math.round(yearlySavings),
    estimatedPanels,
    estimatedCost: Math.round(estimatedCost),
    roiYears: roiYears.toFixed(1)
  })

  setTimeout(() => {
  document
    .querySelector('.solar-results')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
}, 100)

  console.log('RESULTS:', {
    estimatedSystemSize: systemSize.toFixed(1),
    monthlySavings,
    yearlySavings,
    estimatedPanels,
    estimatedCost,
    roiYears
  })
}



  return (
    <div className="solar-page">
      {/* Hero */}
      <section className="solar-hero">
        <div className="solar-hero__bg">
          <div className="solar-hero__gradient"></div>
          <div className="solar-hero__pattern"></div>
        </div>
        <div className="solar-hero__content">
          <span className="solar-hero__eyebrow">Solar Solutions</span>
          <h1 className="solar-hero__title">
            Harness the Power of the
            <span className="solar-hero__accent"> Nigerian Sun</span>
          </h1>
          <p className="solar-hero__description">
            From residential rooftops to commercial megawatt installations, 
            NADLAN Green delivers end-to-end solar solutions that turn sunlight into 
            reliable, affordable power for homes and businesses across Nigeria.
          </p>
          <div className="solar-hero__ctas">
            <a href="#benefits" className="solar-hero__cta solar-hero__cta--primary">Explore Benefits</a>
            <a href="#calculator" className="solar-hero__cta solar-hero__cta--secondary">Get a Quote</a>
          </div>
        </div>
        <div className="solar-hero__visual">
          <div className="solar-hero__sun">
            <div className="solar-hero__sun-core"></div>
            <div className="solar-hero__sun-ring"></div>
            <div className="solar-hero__sun-ring solar-hero__sun-ring--outer"></div>
          </div>
          <div className="solar-hero__panel">
            <div className="solar-hero__panel-grid">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="solar-hero__panel-cell"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="solar-stats">
        <div className="solar-stats__container">
          {stats.map((stat, i) => (
            <div key={i} className="solar-stats__item">
              <span className="solar-stats__value">{stat.value}</span>
              <span className="solar-stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section ref={sectionRef} id="benefits" className="section__container solar-benefits">
        <div className={`solar-benefits__header ${isVisible ? 'solar-benefits__header--visible' : ''}`}>
          <span className="solar-benefits__eyebrow">Why Go Solar</span>
          <h2 className="section__header solar-benefits__title">
            Benefits That Shine
            <span className="solar-benefits__accent"> Bright</span>
          </h2>
          <p className="section__description solar-benefits__description">
            Solar energy is not just an environmental choice — it is a smart financial 
            decision that pays dividends for decades.
          </p>
        </div>

        <ul className={`feature__grid solar-benefits__grid ${isVisible ? 'solar-benefits__grid--visible' : ''}`}>
          {benefits.map((item, index) => (
            <li key={index} style={{ '--delay': `${index * 0.12}s` }}>
              <span className="solar-benefits__icon">{item.icon}</span>
              <div>
                <h4 className="solar-benefits__card-title">{item.title}</h4>
                <p className="solar-benefits__card-text">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Solutions Grid */}
      <section className="solar-solutions">
        <div className="solar-solutions__container">
          <div className="solar-solutions__header">
            <span className="solar-solutions__eyebrow">Our Solutions</span>
            <h2 className="section__header solar-solutions__title">
              Solar for Every
              <span className="solar-solutions__accent"> Scale</span>
            </h2>
          </div>

          <div className="solar-solutions__grid">
            <div className="solar-solutions__card solar-solutions__card--featured">
              <div className="solar-solutions__card-badge">Most Popular</div>
              <div className="solar-solutions__card-icon">🏘️</div>
              <h3 className="solar-solutions__card-title">Residential Solar</h3>
              <p className="solar-solutions__card-text">
                Custom rooftop systems designed for Nigerian homes. From 3kW starter kits 
                to 15kW whole-home solutions with battery backup.
              </p>
              <ul className="solar-solutions__card-list">
                <li>25-year panel warranty</li>
                <li>10-year inverter warranty</li>
                <li>24/7 monitoring app</li>
                <li>Flexible payment plans</li>
              </ul>
              <span className="solar-solutions__card-price">From ₦1.2M</span>
            </div>

            <div className="solar-solutions__card">
              <div className="solar-solutions__card-icon">🏢</div>
              <h3 className="solar-solutions__card-title">Commercial Solar</h3>
              <p className="solar-solutions__card-text">
                Large-scale installations for offices, factories, and retail spaces. 
                Reduce operational costs while meeting ESG targets.
              </p>
              <ul className="solar-solutions__card-list">
                <li>50kW to 5MW capacity</li>
                <li>Power Purchase Agreements</li>
                <li>Tax incentive optimization</li>
                <li>Dedicated account manager</li>
              </ul>
              <span className="solar-solutions__card-price">Custom Quote</span>
            </div>

            <div className="solar-solutions__card">
              <div className="solar-solutions__card-icon">🏭</div>
              <h3 className="solar-solutions__card-title">Industrial Solar</h3>
              <p className="solar-solutions__card-text">
                Utility-grade solar farms and industrial microgrids. Reliable baseload 
                power for manufacturing and heavy industry.
              </p>
              <ul className="solar-solutions__card-list">
                <li>5MW+ installations</li>
                <li>Grid-tie & off-grid options</li>
                <li>BESS integration available</li>
                <li>O&M contracts included</li>
              </ul>
              <span className="solar-solutions__card-price">Enterprise</span>
            </div>
          </div>
        </div>
      </section>


      {/* Solar Calculator */}
<section id="calculator" className="solar-calculator">
  <div className="solar-calculator__container">

    <div className="solar-calculator__left">
      <span className="solar-calculator__eyebrow">
        Free Solar Assessment
      </span>

      <h2 className="solar-calculator__title">
        Calculate Your
        <span> Solar Savings</span>
      </h2>

      <p className="solar-calculator__text">
        Get an instant estimate of your energy savings,
        recommended system size, and projected monthly
        electricity reduction.
      </p>

      <div className="solar-calculator__stats">
        <div>
          <strong>70%</strong>
          <span>Average Savings</span>
        </div>

        <div>
          <strong>25+</strong>
          <span>Years Lifespan</span>
        </div>

        <div>
          <strong>48hrs</strong>
          <span>Proposal Delivery</span>
        </div>
      </div>
    </div>

    <div className="solar-calculator__card">

      <div className="solar-calculator__group">
        <label>Monthly Electricity Bill</label>

       <input
         type="number"
         placeholder="e.g 150000"
         value={monthlyBill}
         onChange={(e) =>
           setMonthlyBill(e.target.value)
         }
       />
      </div>

      <div className="solar-calculator__group">
        <label>Property Type</label>

       <select
       value={propertyType}
     onChange={(e) =>
    setPropertyType(e.target.value)
      }
     >
      <option>Residential</option>
      <option>Commercial</option>
      <option>Industrial</option>
     </select>
       </div>

      <div className="solar-calculator__group">
        <label>Location</label>

        <input
          type="text"
          placeholder="Lagos, Abuja, Port Harcourt..."
        />
      </div>

      <div className="solar-calculator__group">
  <label>Do You Need Battery Storage?</label>

  <select>
    <option>Yes</option>
    <option>No</option>
  </select>
</div>

    <button
  type="button"
  className="solar-calculator__button"
  onClick={calculateSolarEstimate}
>
     Calculate Savings
     </button>

      {results && (
  <div className="solar-results">

    <div className="solar-results__item">
      <span>Recommended System</span>
      <strong>
        {results.estimatedSystemSize}kW
      </strong>
    </div>

    <div className="solar-results__item">
      <span>Estimated Panels</span>
      <strong>
        {results.estimatedPanels}
      </strong>
    </div>

    <div className="solar-results__item">
      <span>Monthly Savings</span>
      <strong>
        ₦{results.monthlySavings.toLocaleString()}
      </strong>
    </div>

    <div className="solar-results__item">
      <span>Yearly Savings</span>
      <strong>
        ₦{results.yearlySavings.toLocaleString()}
      </strong>
    </div>

    <div className="solar-results__item">
      <span>Estimated System Cost</span>
      <strong>
        ₦{results.estimatedCost.toLocaleString()}
      </strong>
    </div>

    <div className="solar-results__item">
      <span>Estimated ROI</span>
      <strong>
        {results.roiYears} Years
      </strong>
    </div>

  </div>
)}

    </div>

  </div>
</section>

      {/* CTA Banner */}
      <section className="solar-cta">
        <div className="solar-cta__bg"></div>
        <div className="solar-cta__content">
          <h2 className="solar-cta__title">Ready to Go Solar?</h2>
          <p className="solar-cta__text">
            Get a free energy assessment and personalized solar proposal 
            for your property within 48 hours.
          </p>
          <a href="#calculator" className="solar-cta__button">Request Free Assessment</a>
        </div>
      </section>
    </div>
  )
}
