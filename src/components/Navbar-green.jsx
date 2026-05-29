import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import nadlanLogo from '../assets/images/NADLAN_LOGO.png'
import './Navbar-green.css'

export default function GreenNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/solar', label: 'Solar' },
    { to: '/energy', label: 'Energy' },
    { to: '/sustainability', label: 'Sustainability' },
    { to: '/projects', label: 'Projects' },
  ]

  const isActive = (path) => location.pathname === path
  const darkHeroPages = ['/energy', '/projects']

const isDarkHero = darkHeroPages.includes(location.pathname)

  return (
   <nav
  className={`green-navbar
    ${scrolled ? 'green-navbar--scrolled' : ''}
    ${isDarkHero ? 'green-navbar--light-links' : 'green-navbar--dark-links'}
  `}
>
      <div className="green-navbar__container">

        <Link to="/" className="green-navbar__logo">
          <img
            src={nadlanLogo}
            alt="NADLAN Logo"
            className="green-navbar__logo-image"
          />
        </Link>

        <button
          className="green-navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`green-navbar__hamburger ${
              mobileOpen ? 'green-navbar__hamburger--open' : ''
            }`}
          />
        </button>

        <ul
          className={`green-navbar__links ${
            mobileOpen ? 'green-navbar__links--open' : ''
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`green-navbar__link ${
                  isActive(link.to)
                    ? 'green-navbar__link--active'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
             to="/solar#calculator"
             className="green-navbar__cta"
           >
             Free Energy Assessment
           </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}