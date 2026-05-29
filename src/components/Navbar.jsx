import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ currentSection }) {

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${currentSection}`}>

      <div className="nav-container">

        {/* LINKS */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>

  {currentSection === 'real-estate' ? (
    <>
      <Link to="/about">About</Link>
      <Link to="/properties">Properties</Link>
      <Link to="/developments">Developments</Link>
      <Link to="/investments">Investment Plans</Link>
    </>
  ) : (
    <>
      <Link to="/solar">Solar Projects</Link>
      <Link to="/energy">Energy Solutions</Link>
      <Link to="/sustainability">Sustainability</Link>
      <Link to="/projects">Projects</Link>
    </>
  )}

  {/* MOBILE / PANEL ACTIONS */}
  <div className="nav-actions">

    {currentSection === 'real-estate' && (
      <Link
        to="/login"
        className="nav-login"
      >
        Log In
      </Link>
    )}

    <Link
  to={
    currentSection === 'green-energy'
      ? '/solar#calculator'
      : '/signup'
  }
  className={`nav-signup ${
    currentSection === 'green-energy'
      ? 'green-mode'
      : 'real-estate-mode'
  }`}
>
  {currentSection === 'green-energy'
    ? 'Go Green'
    : 'Get Started'}
</Link>

  </div>

</div>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>


      </div>
    </nav>
  )
}