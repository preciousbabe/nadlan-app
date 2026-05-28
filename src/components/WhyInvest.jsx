import { useEffect, useRef, useState } from 'react'

export default function WhyInvest() {
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const reasons = [
    {
      number: '01',
      title: 'Proven Track Record',
      description:
        'Over ₦2.8 billion in successfully managed assets with consistent returns outperforming traditional savings and fixed deposits.',
    },
    {
      number: '02',
      title: 'Curated Portfolio',
      description:
        "Access to handpicked properties in Nigeria's fastest-growing corridors. Each asset undergoes rigorous due diligence.",
    },
    {
      number: '03',
      title: 'Passive Income',
      description:
        'Earn monthly or quarterly returns without the hassle of property management. We handle everything from tenant relations to maintenance.',
    },
    {
      number: '04',
      title: 'Capital Appreciation',
      description:
        "Benefit from Nigeria's booming real estate market. Our properties have appreciated an average of 18% annually over the past 5 years.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="why-invest"
      className={`section__container why-invest__container ${
        isVisible ? 'why-invest--visible' : ''
      }`}
    >
      <div className="why-invest__header">

        <h2 className="section__header">
          The Smart Way to
          <span className="why-invest__title-accent"> Build Wealth</span>
        </h2>

       <p className="invest__description">
  Real estate has remained one of Nigeria’s most reliable wealth-building
  assets, offering long-term stability, consistent appreciation, and passive
  income opportunities. At NADLAN, we go beyond traditional property
  investment by combining premium real estate opportunities with innovative
  green energy solutions designed for the future. From carefully selected
  developments to sustainable infrastructure, thousands of investors trust
  NADLAN to help them grow and preserve their wealth with confidence.
   </p>
      </div>

      <ul className="why-invest__grid">
        {reasons.map((reason, index) => (
          <li
            key={index}
            className="why-invest__item"
            style={{ '--delay': `${index * 0.15}s` }}
          >
            <span className="why-invest__number">{reason.number}</span>

            <div className="why-invest__content">
              <h4 className="why-invest__title">{reason.title}</h4>

              <p className="why-invest__text">
                {reason.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}