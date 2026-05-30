import React, { useState } from 'react'
import './main.css'

import property1 from '../assets/images/property-1.jpeg'
import property2 from '../assets/images/property-2.jpeg'
import property3 from '../assets/images/property-3.jpeg'
import property4 from '../assets/images/property-4.jpeg'
import property5 from '../assets/images/property-5.jpeg'
import property6 from '../assets/images/property-6.jpeg'
import property7 from '../assets/images/property-7.jpeg'
import property8 from '../assets/images/property-8.jpeg'
import property9 from '../assets/images/property-9.jpeg'
import property10 from '../assets/images/property-10.jpeg'
import property11 from '../assets/images/property-11.jpeg'
import property12 from '../assets/images/property-12.png'
import property13 from '../assets/images/property-13.jpeg'

const propertyImages = [
  property1,
  property2,
  property3,
  property4,
  property5,
  property6,
  property7,
  property8,
  property9,
  property10,
  property11,
  property12,
  property13
]

export default function Properties() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const properties = [
  {
    id: 1,
    title: 'Penthouse Suite, Eko Pearl',
    location: 'Eko Atlantic, Lagos',
    type: 'sale',
    category: 'luxury',
    price: '₦450,000,000',
    beds: 4,
    baths: 5,
    sqm: 420,
    image: propertyImages[9],
    featured: true,
    agent: 'NADLAN Direct',
    listed: '2 days ago'
  },
  {
    id: 2,
    title: 'Modern Villa, Banana Island',
    location: 'Banana Island, Lagos',
    type: 'sale',
    category: 'luxury',
    price: '₦280,000,000',
    beds: 5,
    baths: 6,
    sqm: 680,
    image: propertyImages[1],
    featured: true,
    agent: 'NADLAN Direct',
    listed: '1 week ago'
  },
  {
    id: 3,
    title: 'Executive Apartment, Maitama',
    location: 'Maitama, Abuja',
    type: 'rent',
    category: 'residential',
    price: '₦8,500,000/year',
    beds: 3,
    baths: 4,
    sqm: 280,
    image: propertyImages[2],
    featured: false,
    agent: 'NADLAN Direct',
    listed: '3 days ago'
  },
  {
    id: 4,
    title: 'Commercial Space, Lekki Phase 1',
    location: 'Lekki, Lagos',
    type: 'sale',
    category: 'commercial',
    price: '₦150,000,000',
    beds: 0,
    baths: 4,
    sqm: 350,
    image: propertyImages[3],
    featured: false,
    agent: 'NADLAN Direct',
    listed: '5 days ago'
  },
  {
    id: 5,
    title: 'Waterfront Duplex, Ikoyi',
    location: 'Ikoyi, Lagos',
    type: 'sale',
    category: 'luxury',
    price: '₦380,000,000',
    beds: 6,
    baths: 7,
    sqm: 550,
    image: propertyImages[4],
    featured: true,
    agent: 'NADLAN Direct',
    listed: '1 day ago'
  },
  {
    id: 6,
    title: 'Exclusive Duplex, Ikoyi',
    location: 'Ikoyi, Lagos',
    type: 'sale',
    category: 'luxury',
    price: '₦450,000,000',
    beds: 4,
    baths: 7,
    sqm: 650,
    image: propertyImages[0],
    featured: true,
    agent: 'NADLAN Direct',
    listed: '1 day ago'
  },
  {
    id: 6,
    title: 'Serviced Flat, Wuse 2',
    location: 'Wuse 2, Abuja',
    type: 'rent',
    category: 'residential',
    price: '₦4,200,000/year',
    beds: 2,
    baths: 3,
    sqm: 180,
    image: propertyImages[5],
    featured: false,
    agent: 'NADLAN Direct',
    listed: '2 weeks ago'
  },
  {
    id: 7,
    title: 'Land Plot, Epe Corridor',
    location: 'Epe, Lagos',
    type: 'sale',
    category: 'land',
    price: '₦25,000,000',
    beds: 0,
    baths: 0,
    sqm: 1200,
    image: propertyImages[6],
    featured: false,
    agent: 'NADLAN Direct',
    listed: '1 month ago'
  },
  {
    id: 8,
    title: 'Boutique Office, Victoria Island',
    location: 'Victoria Island, Lagos',
    type: 'rent',
    category: 'commercial',
    price: '₦18,000,000/year',
    beds: 0,
    baths: 3,
    sqm: 220,
    image: propertyImages[7],
    featured: false,
    agent: 'NADLAN Direct',
    listed: '4 days ago'
  },
  {
  id: 11,
  title: 'Modern Family Duplex, Lekki Phase 1',
  location: 'Lekki, Lagos',
  type: 'sale',
  category: 'residential',
  price: '₦120,000,000',
  beds: 4,
  baths: 5,
  sqm: 310,
  image: propertyImages[10],
  featured: false,
  agent: 'NADLAN Direct',
  listed: '6 days ago'
},
{
  id: 12,
  title: 'High-Rise Commercial Tower Space',
  location: 'Ikeja GRA, Lagos',
  type: 'rent',
  category: 'commercial',
  price: '₦25,000,000/year',
  beds: 0,
  baths: 4,
  sqm: 480,
  image: propertyImages[11],
  featured: false,
  agent: 'NADLAN Direct',
  listed: '9 days ago'
},
{
  id: 13,
  title: 'Premium Estate Land Plot',
  location: 'Sangotedo, Lagos',
  type: 'sale',
  category: 'land',
  price: '₦38,000,000',
  beds: 0,
  baths: 0,
  sqm: 950,
  image: propertyImages[12],
  featured: false,
  agent: 'NADLAN Direct',
  listed: '2 weeks ago'
}
  ];

  const featured = properties.filter(p => p.featured);
  const regular = properties.filter(p => !p.featured);

  return (
    <div className="properties-page">
      {/* HERO */}
      <section className="hero hero--subpage">

  <div
    className="hero-bg"
    style={{
      backgroundImage:
        'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)'
    }}
  />

  <div className="hero-overlay" />

  <div className="hero-content">

    <div className="text-content">

      {/* <span className="section-label">
        Property Listings
      </span> */}

      <h1>
        Find Your Perfect
        <span className="gold-text">
          {' '}Property
        </span>
      </h1>

      <p>
        Verified listings across Nigeria's prime
        locations. Buy, rent, or invest with confidence.
      </p>

    </div>

  </div>

</section>



      {/* SEARCH BAR */}
      <section style={{ 
        padding: '2rem 0', 
        background: 'var(--dark-secondary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: '1rem',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.8rem', 
                color: 'var(--gray)', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Search
              </label>
              <input 
                type="text" 
                placeholder="Location, property name..."
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem',
                  background: 'var(--dark)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--white)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.8rem', 
                color: 'var(--gray)', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Type
              </label>
              <select style={{
                width: '100%',
                padding: '0.9rem 1rem',
                background: 'var(--dark)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--white)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}>
                <option>All Types</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.8rem', 
                color: 'var(--gray)', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Category
              </label>
              <select style={{
                width: '100%',
                padding: '0.9rem 1rem',
                background: 'var(--dark)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--white)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}>
                <option>All Categories</option>
                <option>Luxury</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.8rem', 
                color: 'var(--gray)', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Price Range
              </label>
              <select style={{
                width: '100%',
                padding: '0.9rem 1rem',
                background: 'var(--dark)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--white)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}>
                <option>Any Price</option>
                <option>Under ₦50M</option>
                <option>₦50M - ₦200M</option>
                <option>₦200M - ₦500M</option>
                <option>Above ₦500M</option>
              </select>
            </div>
            <button className="btn-primary" style={{ height: 'fit-content' }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section-padding">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <span className="label">Premium Selection</span>
              <h2 style={{ margin: 0 }}>Featured <span className="gold-text">Properties</span></h2>
            </div>
          </div>
          <div className="grid-2">
            {featured.map(prop => (
              <div key={prop.id} className="card" style={{ position: 'relative' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="card-image" 
                    style={{ height: '350px' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <span className="badge" style={{ background: 'var(--gold)', color: 'var(--dark)' }}>
                      Featured
                    </span>
                    <span className="badge">{prop.type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 className="card-title" style={{ fontSize: '1.4rem' }}>{prop.title}</h3>
                    <span className="card-price">{prop.price}</span>
                  </div>
                  <div className="card-meta">
                    <span>📍 {prop.location}</span>
                    <span>•</span>
                    <span>Listed {prop.listed}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1.5rem',
                    padding: '1rem 0',
                    borderTop: '1px solid var(--border-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: '1rem'
                  }}>
                    {prop.beds > 0 && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--gray-light)' }}>
                        🛏 {prop.beds} Beds
                      </span>
                    )}
                    {prop.baths > 0 && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--gray-light)' }}>
                        🚿 {prop.baths} Baths
                      </span>
                    )}
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-light)' }}>
                      📐 {prop.sqm} m²
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
                      Listed by {prop.agent}
                    </span>
                    <button className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL LISTINGS */}
      <section className="section-padding" style={{ background: 'var(--dark-secondary)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="label">Browse All</span>
              <h2 style={{ margin: 0 }}>All <span className="gold-text">Listings</span></h2>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.6rem 1rem',
                  background: 'var(--dark)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--white)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '0.6rem',
                    background: viewMode === 'grid' ? 'var(--gold)' : 'var(--dark)',
                    color: viewMode === 'grid' ? 'var(--dark)' : 'var(--gray)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  ⊞
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '0.6rem',
                    background: viewMode === 'list' ? 'var(--gold)' : 'var(--dark)',
                    color: viewMode === 'list' ? 'var(--dark)' : 'var(--gray)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid-4' : ''} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '1.5rem' } : {}}>
            {regular.map(prop => (
              <div key={prop.id} className="card" style={viewMode === 'list' ? { display: 'grid', gridTemplateColumns: '300px 1fr' } : {}}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="card-image" 
                    style={{ height: viewMode === 'list' ? '100%' : '200px' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem'
                  }}>
                    <span className="badge" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                      {prop.type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                  </div>
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 className="card-title" style={{ fontSize: viewMode === 'list' ? '1.3rem' : '1.1rem' }}>{prop.title}</h3>
                  <div className="card-meta" style={{ fontSize: '0.8rem' }}>
                    <span>📍 {prop.location}</span>
                    <span>•</span>
                    <span>{prop.listed}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem',
                    margin: '0.75rem 0'
                  }}>
                    {prop.beds > 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--gray-light)' }}>
                        🛏 {prop.beds}
                      </span>
                    )}
                    {prop.baths > 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--gray-light)' }}>
                        🚿 {prop.baths}
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-light)' }}>
                      📐 {prop.sqm}m²
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <span className="card-price" style={{ fontSize: '1.2rem' }}>{prop.price}</span>
                    <button className="btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }}>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIST PROPERTY CTA */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="label">For Property Owners</span>
          <h2 style={{ marginBottom: '1rem' }}>List Your <span className="gold-text">Property</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Reach thousands of verified buyers and renters. Zero listing fees for premium properties.
          </p>
          <button className="btn-primary">List Property</button>
        </div>
      </section>
    </div>
  );
}