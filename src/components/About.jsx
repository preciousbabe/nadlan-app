import { useEffect, useRef, useState } from 'react'
import storyImage from '../assets/images/story.png'
import '../styles/about.css'

export default function About() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`section__container story__container ${
        isVisible ? 'story__container--visible' : ''
      }`}
    >
      <div className="story__image">
        <img src={storyImage} alt="NADLAN story" />
      </div>

      <div className="story__content">

        <span className="story__eyebrow">
          About NADLAN
        </span>

        <h2 className="section__header">
          Our Story<br />
          Behind Sustainable Real Estate
        </h2>

        <p className="section__description">
          NADLAN was born from a simple belief — real estate and green energy
          should work together to build smarter, cleaner, and more sustainable
          communities. What started as a vision to modernize property investment
          has grown into a platform connecting people to eco-friendly, high-value
          real estate opportunities across Nigeria.
        </p>

        <p className="section__description">
          We built NADLAN to remove barriers in traditional real estate investing
          while promoting renewable energy integration, smart infrastructure,
          and long-term environmental impact.
        </p>

        <div className="story__link">
          <a href="#">Explore NADLAN</a>
        </div>

      </div>
    </section>
  )
}