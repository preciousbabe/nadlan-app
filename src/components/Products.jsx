import { useEffect, useRef, useState } from 'react'
import '../styles/about.css'


// Paint Images
import paint1 from '../assets/images/paint-1.jpeg'
import paint2 from '../assets/images/paint-2.jpeg'
import paint3 from '../assets/images/paint-3.jpeg'
import paint4 from '../assets/images/paint-4.jpeg'
import paint5 from '../assets/images/paint-5.jpeg'
import paint6 from '../assets/images/paint-6.jpeg'

// Coffee Images
import coffee1 from '../assets/images/coffee-1.jpeg'
import coffee2 from '../assets/images/coffee-2.jpeg'
import coffee3 from '../assets/images/coffee-3.jpeg'
import coffee4 from '../assets/images/coffee-4.jpeg'
import coffee5 from '../assets/images/coffee-5.jpeg'
import coffee6 from '../assets/images/coffee-6.jpeg'

export default function Products() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const paintImages = [
    paint1,
    paint2,
    paint3,
    paint4,
    paint5,
    paint6
  ]

  const coffeeImages = [
    coffee1,
    coffee2,
    coffee3,
    coffee4,
    coffee5,
    coffee6
  ]

  const renderGallery = (images) => (
    <>
      <div className="products__topGrid">

        <div className="products__featured">
          <img src={images[0]} alt="" />
        </div>

        <div className="products__sideImages">

          <div className="products__galleryItem">
            <img src={images[1]} alt="" />
          </div>

          <div className="products__galleryItem">
            <img src={images[2]} alt="" />
          </div>

        </div>

      </div>

      <div className="products__bottomGrid">

        <div className="products__galleryItem">
          <img src={images[3]} alt="" />
        </div>

        <div className="products__galleryItem">
          <img src={images[4]} alt="" />
        </div>

        <div className="products__galleryItem">
          <img src={images[5]} alt="" />
        </div>

      </div>
    </>
  )

  return (
    <section
      ref={sectionRef}
      className={`products__container ${
        isVisible ? 'products__container--visible' : ''
      }`}
    >
      <div className="products__header">

        <span className="products__eyebrow">
          Our Products
        </span>

        <h2 className="section__header">
          Crafted For
          <span className="section__header-accent">
            {' '}Every Lifestyle
          </span>
        </h2>

        <p className="product__section__description">
          Discover our premium paint and coffee collections,
          designed to combine quality, innovation and
          exceptional customer experience.
        </p>

      </div>

      {/* PAINTS */}

      <div className="products__category">

        <div className="products__categoryHeader">

          <span>Paint Collection</span>

          <h3>
            Premium Finishes For Every Space
          </h3>

        </div>

        {renderGallery(paintImages)}

      </div>

      {/* COFFEE */}

      <div className="products__category">

        <div className="products__categoryHeader">

          <span>Coffee Collection</span>

          <h3>
            Rich Flavours Crafted To Perfection
          </h3>

        </div>

        {renderGallery(coffeeImages)}

      </div>

    </section>
  )
}