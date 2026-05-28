import '../styles/contact.css'
import team1 from '../assets/images/NADLAN_LOGO.png'

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

       <span>NADLAN</span>
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
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Platform</h4>
              <ul className="footer__list">
                <li><a href="#investment-tiers">Investment Plans</a></li>
                <li><a href="#about">How It Works</a></li>
                <li><a href="#">Properties</a></li>
                <li><a href="#">Returns Calculator</a></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__list">
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#mission-vision">Mission & Vision</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Resources</h4>
              <ul className="footer__list">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Market Reports</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#contact">Support</a></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__column-title">Legal</h4>
              <ul className="footer__list">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Risk Disclosure</a></li>
                <li><a href="#">Cookie Policy</a></li>
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
