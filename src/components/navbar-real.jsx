import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import nadlanLogo from '../assets/images/NADLAN_LOGO.png';
import './navbar-real.css';

export default function NavbarReal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/developments', label: 'Developments' },
    { path: '/investments', label: 'Investments' },
    { path: '/properties', label: 'Properties' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      
      <div className="navbar__container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src={nadlanLogo} alt="NADLAN Logo" />
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/investments" className="btn-primary navbar__cta">
            Invest Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={isActive(link.path) ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/investments"
          className="btn-primary"
          onClick={() => setMenuOpen(false)}
        >
          Invest Now
        </Link>
      </div>

    </nav>
  );
}