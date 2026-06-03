import React from 'react';
import { Link } from 'react-router-dom';
import ScrollLink from './ScrollLink';
import nadlanLogo from '../assets/images/NADLAN_LOGO.png';

export default function FooterReal() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about', type: 'link' },
      { label: 'Our Team', path: '/#team', type: 'scroll' },
      { label: 'Contact', path: '/#contact', type: 'scroll' },
    ],
    invest: [
      { label: 'Investment Plans', path: '/investments', type: 'link' },
      { label: 'Developments', path: '/developments', type: 'link' },
      { label: 'Properties', path: '/properties', type: 'link' },
    ],
    marketplace: [
      { label: 'Market Reports', path: '/market-reports', type: 'link' },
      { label: 'Blog', path: '/blog', type: 'link' },
      { label: 'FAQs', path: '/faqs', type: 'link' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy', type: 'link' },
      { label: 'Terms of Service', path: '/terms', type: 'link' },
      { label: 'Risk Disclosure', path: '/risk', type: 'link' },
    ],
  };

 const renderLink = (link) => {
  const linkStyle = {
    color: 'var(--gray-light)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const hoverProps = {
    onMouseEnter: (e) => { e.target.style.color = 'var(--gold)'; },
    onMouseLeave: (e) => { e.target.style.color = 'var(--gray-light)'; }
  };

  if (link.type === 'scroll') {
    return (
      <ScrollLink to={link.path} style={linkStyle} {...hoverProps}>
        {link.label}
      </ScrollLink>
    );
  }
  return (
    <Link to={link.path} style={linkStyle} {...hoverProps}>
      {link.label}
    </Link>
  );
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
                  <span
                    style={{
                      color: 'var(--gray-light)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {renderLink(link)}
                  </span>
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
                  <span
                    style={{
                      color: 'var(--gray-light)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {renderLink(link)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Links */}
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
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks.marketplace.map((link, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      color: 'var(--gray-light)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {renderLink(link)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Bar */}
        <div style={{
          padding: '2rem 0',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {footerLinks.legal.map((link, i) => (
              <span key={i}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--gray-dark)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--gray-dark)'}
                >
                  {renderLink(link)}
                </span>
              </span>
            ))}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
            © {currentYear} NADLAN. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .grid-4 { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          footer .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}