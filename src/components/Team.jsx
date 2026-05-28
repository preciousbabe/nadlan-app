import { useEffect, useRef, useState } from 'react'

import team1 from '../assets/images/teamMembers-1.jpg'
import team2 from '../assets/images/teamMembers-2.jpg'
import team3 from '../assets/images/teamMembers-3.jpg'
import team4 from '../assets/images/teamMembers-4.jpg'
import team5 from '../assets/images/teamMembers-5.jpg'
import team6 from '../assets/images/teamMembers-6.jpg'

export default function TeamMembers() {
  const sectionRef = useRef(null)
  const teamMembersRef = useRef(null)

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

  // Duplicate cards for infinite scrolling animation
  useEffect(() => {
    const container = teamMembersRef.current

    if (!container) return

    const items = Array.from(container.children)

    items.forEach((item) => {
      const duplicateNode = item.cloneNode(true)

      duplicateNode.setAttribute('aria-hidden', true)

      container.appendChild(duplicateNode)
    })
  }, [])

  const teamMembers = [
    {
      image: team1,
      name: 'Daniel Adeyemi',
      role: 'Chief Executive Officer'
    },
    {
      image: team2,
      name: 'Amina Yusuf',
      role: 'Head of Green Energy Projects'
    },
    {
      image: team3,
      name: 'Michael Okafor',
      role: 'Real Estate Investment Director'
    },
    {
      image: team4,
      name: 'Sophia Ibrahim',
      role: 'Sustainability & Compliance Manager'
    },
    {
      image: team5,
      name: 'David Bello',
      role: 'Infrastructure Development Lead'
    },
    {
      image: team6,
      name: 'Grace Eze',
      role: 'Renewable Energy Operations Manager'
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`teamMembers__container ${
        isVisible ? 'teamMembers__container--visible' : ''
      }`}
    >
      <div className="teamMembers__wrapper">

        <div
          ref={teamMembersRef}
          className="teamMembers__images"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="teamMembers__card"
              style={{
                '--delay': `${index * 0.1}s`
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="teamMembers__image"
              />

              <div className="teamMembers__overlay">
                <h3>{member.name}</h3>
                <span>{member.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="teamMembers__content">

        <span className="teamMembers__eyebrow">
          Our Leadership
        </span>

        <h2 className="section__header">
          Experts Driving
          <span className="section__header-accent">
            {' '}Sustainable Growth
          </span>
        </h2>

        <p className="section__description">
          Our team combines expertise in renewable energy,
          sustainable infrastructure, and premium real estate
          development to create long-term value for communities,
          investors, and future generations.
        </p>

      </div>
    </section>
  )
}