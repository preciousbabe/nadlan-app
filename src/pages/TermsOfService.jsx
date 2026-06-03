import { Link } from 'react-router-dom'
import '../styles/contact.css'

export default function TermsOfService() {
  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>Terms of Service</h1>
      </div>

      <div className="kyc-steps-list" style={{ gap: '20px' }}>
        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">1</div>
            <div className="kyc-step-info">
              <h3>Acceptance of Terms</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            By accessing or using the NADLAN Investment Platform ("Platform"), you agree to be bound 
            by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use 
            the Platform. These Terms constitute a legally binding agreement between you and NADLAN 
            Investment Limited ("NADLAN," "we," "us," or "our").
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">2</div>
            <div className="kyc-step-info">
              <h3>Eligibility</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>To use the Platform, you must:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Be at least 18 years of age</li>
              <li style={{ marginBottom: '8px' }}>Be a Nigerian citizen or legal resident with valid identification</li>
              <li style={{ marginBottom: '8px' }}>Have the legal capacity to enter into binding contracts</li>
              <li style={{ marginBottom: '8px' }}>Complete KYC verification with accurate information</li>
              <li>Not be barred from participating in investment activities under applicable law</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">3</div>
            <div className="kyc-step-info">
              <h3>Account Registration & Security</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>
              You are responsible for maintaining the confidentiality of your account credentials. 
              You agree to:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Provide accurate, current, and complete information during registration</li>
              <li style={{ marginBottom: '8px' }}>Promptly update your information if it changes</li>
              <li style={{ marginBottom: '8px' }}>Notify us immediately of any unauthorized access or security breach</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">4</div>
            <div className="kyc-step-info">
              <h3>Investment Terms</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>
              All investments are subject to the following terms:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Lock-in Period:</strong> Your capital is committed for the duration specified in your chosen plan. Early withdrawal may incur penalties.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>ROI Rates:</strong> Published rates are projections based on historical performance and are not guaranteed.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Capital Protection:</strong> While investments are backed by real assets, all investments carry risk. See our <Link to="/risk" style={{ color: '#C9A962' }}>Risk Disclosure</Link>.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Minimum Investment:</strong> The minimum amount for each plan is non-negotiable and must be fully paid before ROI accrual begins.</li>
              <li>Investment plans may be modified or discontinued with prior notice to affected investors</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">5</div>
            <div className="kyc-step-info">
              <h3>Payments & Refunds</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>All payments must be made through approved channels (Flutterwave or bank transfer)</li>
              <li style={{ marginBottom: '8px' }}>Payments are verified by our admin team before credit</li>
              <li style={{ marginBottom: '8px' }}>Refunds are processed only for unactivated investments within 14 days of payment</li>
              <li style={{ marginBottom: '8px' }}>Processing fees for refunds may be deducted from the refund amount</li>
              <li>Withdrawal requests are processed within 3-5 business days</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">6</div>
            <div className="kyc-step-info">
              <h3>Prohibited Activities</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>You may not:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Use the Platform for illegal purposes or money laundering</li>
              <li style={{ marginBottom: '8px' }}>Provide false or misleading information</li>
              <li style={{ marginBottom: '8px' }}>Attempt to gain unauthorized access to our systems</li>
              <li style={{ marginBottom: '8px' }}>Interfere with other users\' accounts or the Platform\'s functionality</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Platform</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">7</div>
            <div className="kyc-step-info">
              <h3>Limitation of Liability</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            To the maximum extent permitted by law, NADLAN shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages arising from your use of the Platform. 
            Our total liability shall not exceed the amount you have invested through the Platform. 
            We do not guarantee investment returns, and past performance is not indicative of future results.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">8</div>
            <div className="kyc-step-info">
              <h3>Governing Law & Disputes</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes 
            arising from these Terms shall first be attempted to be resolved through good-faith negotiation. 
            If unresolved, disputes shall be submitted to arbitration in Lagos, Nigeria, in accordance 
            with the Arbitration and Conciliation Act.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">9</div>
            <div className="kyc-step-info">
              <h3>Changes to Terms</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            We may modify these Terms at any time. Changes will be effective immediately upon posting. 
            Continued use of the Platform after changes constitutes acceptance. Material changes affecting 
            your rights will be notified via email or dashboard notification.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">10</div>
            <div className="kyc-step-info">
              <h3>Contact</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            For questions about these Terms, contact us at <strong style={{ color: '#C9A962' }}>legal@nadlanworld.org</strong>
          </p>
        </section>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '40px', fontSize: '13px' }}>
        Last updated: June 2026
      </p>
    </div>
  )
}
