import React from 'react';
import { Link } from 'react-router-dom';
import nadlanLogo from '../assets/images/NADLAN_LOGO.png';

export default function FooterReal() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Team', path: '/about' },
      { label: 'Careers', path: '#' },
      { label: 'Press', path: '#' },
    ],
    invest: [
      { label: 'Investment Plans', path: '/investments' },
      { label: 'Developments', path: '/developments' },
      { label: 'Properties', path: '/properties' },
      { label: 'Calculator', path: '#' },
    ],
    support: [
      { label: 'Help Center', path: '#' },
      { label: 'Contact Us', path: '#' },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
    ],
  };

  return (
    <footer style={{
      background: 'var(--dark-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4rem'
    }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {/* Brand Column */}
          <div>
            <Link to="/" className="footer__logo">
      <img
       src={nadlanLogo}
       alt="NADLAN Logo"
       style={{ height: '100px', width: 'auto' }}
     />
      </Link>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Nigeria's premier real estate investment platform. Building wealth through verified properties since 2018.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['X', 'in', 'ig', 'fb'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--gold)';
                    e.target.style.color = 'var(--dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--gold)';
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.5rem'
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.company.map((link, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <Link 
                    to={link.path} 
                    style={{
                      color: 'var(--gray-light)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Invest Links */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.5rem'
            }}>
              Invest
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.invest.map((link, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <Link 
                    to={link.path} 
                    style={{
                      color: 'var(--gray-light)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.5rem'
            }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.support.map((link, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <Link 
                    to={link.path} 
                    style={{
                      color: 'var(--gray-light)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{
          padding: '2.5rem',
          background: 'var(--dark-tertiary)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '3rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Stay Updated</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
              Get exclusive property alerts, investment insights, and market reports delivered to your inbox.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0' }}>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                background: 'var(--dark)',
                border: '1px solid var(--border-subtle)',
                borderRight: 'none',
                color: 'var(--white)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button className="btn-primary" style={{ borderRadius: 0 }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          padding: '2rem 0',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
            © {currentYear} NADLAN. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
              SEC Registered • RC 1234567
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
              Lagos • Abuja • Port Harcourt
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .grid-4 { grid-template-columns: 1fr !important; gap: 2rem !important; }
          footer > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}