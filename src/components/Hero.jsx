import { useEffect, useState } from 'react'

import HeroThumbnails from './HeroThumbnails'

import realEstate1 from '../assets/images/real-estate-1.jpg'
import realEstate2 from '../assets/images/real-estate-2.jpg'
import realEstate3 from '../assets/images/real-estate-3.jpg'

import green1 from '../assets/images/green-energy-1.jpg'
import green2 from '../assets/images/green-energy-2.jpg'
import green3 from '../assets/images/green-energy-3.jpg'

export default function Hero({
  currentSection,
  setCurrentSection
}) {

  const sectionImages = {
    'real-estate': [
      realEstate1,
      realEstate2,
      realEstate3
    ],

    'green-energy': [
      green1,
      green2,
      green3
    ]
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

const images = sectionImages[currentSection]

/* =========================
   AUTO IMAGE ROTATION
========================= */
useEffect(() => {

  // reset image index whenever section changes
  setCurrentImageIndex(0)

  const imageInterval = setInterval(() => {

    setCurrentImageIndex((prev) => {
      const next = prev + 1
      return next >= images.length ? 0 : next
    })

  }, 6500)

  return () => {
    clearInterval(imageInterval)
  }

}, [currentSection, images.length])


/* =========================
   AUTO SECTION ROTATION
========================= */
useEffect(() => {

  const sectionInterval = setInterval(() => {

    setCurrentSection((prev) =>
      prev === 'real-estate'
        ? 'green-energy'
        : 'real-estate'
    )

    setCurrentImageIndex(0)

  }, 20000) // 
  return () => {
    clearInterval(sectionInterval)
  }

}, [setCurrentSection])


const currentImage = images[currentImageIndex]
  return (

    <section className={`hero ${currentSection}`}>

      <div className="hero-image">

        <img
          src={currentImage}
          className="hero-slide"
          alt="Hero"
        />

        <div className="hero-overlay"></div>

      </div>

      <div className="hero-content">

        {currentSection === 'real-estate' ? (

          <div className="text-content active">

            <span className="section-label">
              NADLAN
            </span>

            <h1>Real Estate</h1>

            <h2>Investments</h2>

              <p>Build lasting wealth through premium Nigerian and international properties. From residential developments to commercial assets, we connect you with opportunities that appreciate.</p>
          
            <div className="hero-stats">

  <div className="stat">
    <span className="stat-number">₦2.4B+</span>
    <span className="stat-label">Properties Sold</span>
  </div>

  <div className="stat">
    <span className="stat-number">15%</span>
    <span className="stat-label">Avg. Annual Return</span>
  </div>

</div>

          </div>

        ) : (

          <div className="text-content active">

            <span className="section-label">
              NADLAN
            </span>

            <h1>Green Energy</h1>

            <h2>Investments</h2>

              <p>Power Africa's future while earning returns. Invest in solar farms, mini-grids, and renewable projects that solve energy gaps and generate sustainable income.</p>

            <div className="hero-stats">

  <div className="stat">
    <span className="stat-number">50MW+</span>
    <span className="stat-label">Capacity Funded</span>
  </div>

  <div className="stat">
    <span className="stat-number">12%</span>
    <span className="stat-label">Avg. Annual Yield</span>
  </div>

</div>

          </div>

        )}

      </div>

      <HeroThumbnails
        images={images}
        currentImageIndex={currentImageIndex}
        onImageClick={setCurrentImageIndex}
      />

     <div className="section-swapper">
  
  <div
    className={`swap-indicator ${
      currentSection === 'real-estate' ? 'active' : ''
    }`}
    onClick={() => {
      if (currentSection === 'real-estate') return
      setCurrentSection('real-estate')
      setCurrentImageIndex(0)
    }}
  >
    <img
      src={realEstate1}
      alt="Real Estate"
    />
    <span>Real Estate</span>
  </div>

  <div
    className={`swap-indicator ${
      currentSection === 'green-energy' ? 'active' : ''
    }`}
    onClick={() => {
      if (currentSection === 'green-energy') return
      setCurrentSection('green-energy')
      setCurrentImageIndex(0)
    }}
  >
    <img
      src={green1}
      alt="Green Energy"
    />
    <span>Green EQnergy</span>
  </div>

</div>

    </section>
  )
}