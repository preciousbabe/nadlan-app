import { Link } from 'react-router-dom'
import ScrollLink from './ScrollLink'
import ScrollToTop from './ScrollToTop'
import '../styles/contact.css'
import team1 from '../assets/images/NADLAN_LOGO.png'
import About from '../components/About'
import WhyInvest from '../components/WhyInvest'
import Products from '../components/Products'
import InvestmentTiers from '../components/InvestmentTiers'
import Team from '../components/Team'
import MissionVision from '../components/MissionVision'
import Contact from '../components/Contact'

import FAQs from '../pages/FAQs'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsOfService from '../pages/TermsOfService'
import RiskDisclosure from '../pages/RiskDisclosure'
import CookiePolicy from '../pages/CookiePolicy'
import Blog from '../pages/Blog'
import MarketReports from '../pages/MarketReports'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__gradient"></div>
      </div>

      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src={team1}
                alt="NADLAN Logo"
                className="footer__logo-image"
              />
            </div>
            <p className="footer__tagline">
              Nigeria's premier real estate investment platform. 
              Building wealth, one property at a time.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=1h265bmm8zbpl&utm_content=ayuzqod" className="footer__social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/p/18yiCQkf3V/" 
                className="footer__social" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Platform</h4>
              <ul className="footer__list">
                <li><ScrollLink to="/#investment-tiers">Investment Plans</ScrollLink></li>
                <li><ScrollLink to="/#about">How It Works</ScrollLink></li>
                <li><ScrollLink to="/#Products">Products</ScrollLink></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__list">
                <li><Link to="/about">About Us</Link></li>
                <li><ScrollLink to="/#team">Our Team</ScrollLink></li>
                <li><ScrollLink to="/#mission-vision">Mission & Vision</ScrollLink></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Resources</h4>
              <ul className="footer__list">
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/market-reports">Market Reports</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><ScrollLink to="/#contact">Support</ScrollLink></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Legal</h4>
              <ul className="footer__list">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/risk">Risk Disclosure</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 NADLAN Investment Platform. All rights reserved.
          </p>
          <p className="footer__disclaimer">
            Investments involve risk. Past performance does not guarantee future results. 
            Please read our risk disclosure before investing.
          </p>
          <button className="footer__top-btn" onClick={scrollToTop} aria-label="Back to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}