import { Link } from 'react-router-dom'
import nadlanLogo from '../assets/images/NADLAN_LOGO.png'
import './Footer-green.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/solar', label: 'Solar Solutions' },
    { to: '/energy', label: 'Energy Services' },
    { to: '/sustainability', label: 'Sustainability' },
    { to: '/projects', label: 'Our Projects' },
  ]

 const companyLinks = [
  { to: '/cookies', label: 'Cookies' },
  { to: '/market-reports', label: 'Marketplace' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About Us' },
]

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
           <Link to="/" className="footer__logo">
      <img
        src={nadlanLogo}
       alt="NADLAN Logo"
        className="footer__logo-image"
      />
      </Link>

            <p className="footer__tagline">
              Building a sustainable future through strategic green energy investments across Nigeria.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="Twitter" className="footer__social">𝕏</a>
              <a href="#" aria-label="LinkedIn" className="footer__social">in</a>
              <a href="#" aria-label="Instagram" className="footer__social">📷</a>
              <a href="#" aria-label="YouTube" className="footer__social">▶</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__heading">Green Energy</h4>
            <ul className="footer__list">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
        <div className="footer__column">
          <h4 className="footer__heading">Explore</h4>
          <ul className="footer__list">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

          {/* Contact */}
          <div className="footer__column">
            <h4 className="footer__heading">Get in Touch</h4>
            <ul className="footer__list footer__contact">
              <li>
                <span className="footer__contact-label">Email</span>
                <a href="mailto:green@nadlan.ng" className="footer__link">green@nadlan.ng</a>
              </li>
              <li>
                <span className="footer__contact-label">Phone</span>
                <a href="tel:+2348000000000" className="footer__link">+234 800 000 0000</a>
              </li>
              <li>
                <span className="footer__contact-label">Address</span>
                <span className="footer__contact-text">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} NADLAN Green. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
