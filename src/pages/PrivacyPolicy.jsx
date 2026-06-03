import { Link } from 'react-router-dom'
import '../styles/contact.css'

export default function PrivacyPolicy() {
  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>Privacy Policy</h1>
      </div>

      <div className="kyc-steps-list" style={{ gap: '20px' }}>
        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">1</div>
            <div className="kyc-step-info">
              <h3>Introduction</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            NADLAN Investment Platform ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our website and services. This policy complies with the Nigeria Data Protection 
            Regulation (NDPR) and other applicable data protection laws.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">2</div>
            <div className="kyc-step-info">
              <h3>Information We Collect</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>We collect the following types of information:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Personal Information:</strong> Name, email address, phone number, date of birth, and residential address provided during registration.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Identity Verification:</strong> Government-issued ID, passport photograph, and proof of address for KYC compliance.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Financial Information:</strong> Bank account details, transaction history, investment records, and payment proofs.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Technical Data:</strong> IP address, browser type, device information, and usage patterns collected via cookies.</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">3</div>
            <div className="kyc-step-info">
              <h3>How We Use Your Information</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>Your information is used for:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Account creation, verification, and management</li>
              <li style={{ marginBottom: '8px' }}>Processing investments, payments, and withdrawals</li>
              <li style={{ marginBottom: '8px' }}>Compliance with legal and regulatory requirements (SEC, NDPR)</li>
              <li style={{ marginBottom: '8px' }}>Sending investment updates, statements, and notifications</li>
              <li style={{ marginBottom: '8px' }}>Fraud prevention and platform security</li>
              <li>Improving our services and user experience</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">4</div>
            <div className="kyc-step-info">
              <h3>Data Sharing & Disclosure</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>
              We do not sell your personal data. We may share information with:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Regulatory Bodies:</strong> SEC, CBN, or other authorities as required by law</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Payment Processors:</strong> Flutterwave and partner banks for transaction processing</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Legal Representatives:</strong> When required to enforce our terms or protect rights</li>
              <li>Professional advisors under strict confidentiality agreements</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">5</div>
            <div className="kyc-step-info">
              <h3>Data Security</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            We implement bank-grade encryption (SSL/TLS), secure servers, and access controls 
            to protect your data. Regular security audits and penetration testing are conducted. 
            While we strive for maximum security, no internet transmission is 100% secure. 
            You are responsible for maintaining the confidentiality of your login credentials.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">6</div>
            <div className="kyc-step-info">
              <h3>Your Rights</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>Under the NDPR, you have the right to:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Access and request copies of your personal data</li>
              <li style={{ marginBottom: '8px' }}>Request correction of inaccurate information</li>
              <li style={{ marginBottom: '8px' }}>Request deletion of your data (subject to legal retention requirements)</li>
              <li style={{ marginBottom: '8px' }}>Object to or restrict certain processing activities</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              To exercise these rights, contact us at <strong style={{ color: '#C9A962' }}>privacy@nadlanworld.org</strong>
            </p>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">7</div>
            <div className="kyc-step-info">
              <h3>Cookies</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            We use cookies and similar technologies to enhance your experience, analyze traffic, 
            and personalize content. You can manage cookie preferences through your browser settings. 
            For detailed information, please read our <Link to="/cookies" style={{ color: '#C9A962' }}>Cookie Policy</Link>.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">8</div>
            <div className="kyc-step-info">
              <h3>Contact Us</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            If you have questions about this Privacy Policy or our data practices, contact us at:
          </p>
          <div style={{ marginTop: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            <p><strong style={{ color: '#fff' }}>Email:</strong> privacy@nadlanworld.org</p>
            <p><strong style={{ color: '#fff' }}>Address:</strong> NADLAN Investment Limited, Lagos, Nigeria</p>
          </div>
        </section>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '40px', fontSize: '13px' }}>
        Last updated: June 2026
      </p>
    </div>
  )
}
