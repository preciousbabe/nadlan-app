import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import nadlanLogo from '../assets/images/NADLAN_LOGO.png'
import './Navbar-green.css'

export default function Navbar() {
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

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">

  <img
    src={nadlanLogo}
    alt="NADLAN Logo"
    className="navbar__logo-image"
  />
</Link>

        <button 
          className="navbar__toggle" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}></span>
        </button>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className={`navbar__link ${isActive(link.to) ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/invest" className="navbar__cta">Invest Now</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
