import '../styles/contact.css'

export default function CookiePolicy() {
  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>Cookie Policy</h1>
      </div>

      <div className="kyc-steps-list" style={{ gap: '20px' }}>
        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">1</div>
            <div className="kyc-step-info">
              <h3>What Are Cookies</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            Cookies are small text files stored on your device when you visit a website. They help 
            us recognize your device, remember your preferences, and improve your browsing experience. 
            We also use similar technologies like local storage and pixel tags for the same purposes.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">2</div>
            <div className="kyc-step-info">
              <h3>Types of Cookies We Use</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '8px' }}>Essential Cookies</h4>
              <p>These are necessary for the Platform to function. They enable core features like 
              user authentication, security, and session management. You cannot disable these cookies.</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '8px' }}>Functional Cookies</h4>
              <p>These remember your preferences (language, display settings) and personalize your 
              experience. They help us provide enhanced functionality.</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '8px' }}>Analytics Cookies</h4>
              <p>These help us understand how visitors interact with our Platform. We use aggregated 
              data to improve site performance, identify issues, and optimize user experience.</p>
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '15px', marginBottom: '8px' }}>Marketing Cookies</h4>
              <p>These track your browsing habits to deliver relevant advertisements. We currently 
              do not use third-party marketing cookies, but may introduce them in the future with 
              your explicit consent.</p>
            </div>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">3</div>
            <div className="kyc-step-info">
              <h3>Specific Cookies We Use</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <table className="comparison-table" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>sb-access-token</td>
                  <td>Essential</td>
                  <td>Authentication session</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>sb-refresh-token</td>
                  <td>Essential</td>
                  <td>Session refresh</td>
                  <td>7 days</td>
                </tr>
                <tr>
                  <td>theme-preference</td>
                  <td>Functional</td>
                  <td>Dark/light mode</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>Analytics</td>
                  <td>Google Analytics ID</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>Analytics</td>
                  <td>Session tracking</td>
                  <td>24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">4</div>
            <div className="kyc-step-info">
              <h3>Managing Cookies</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>You can control cookies through your browser settings:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: '#fff' }}>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong style={{ color: '#fff' }}>Edge:</strong> Settings → Cookies and Site Permissions</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              Note: Disabling essential cookies will prevent you from logging in and using the Platform.
            </p>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">5</div>
            <div className="kyc-step-info">
              <h3>Third-Party Services</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            We use Supabase for authentication and database services, which may set their own cookies. 
            We also use Flutterwave for payment processing. These third parties have their own cookie 
            policies, which we encourage you to review. We do not share cookie data with advertisers 
            or data brokers.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">6</div>
            <div className="kyc-step-info">
              <h3>Updates to This Policy</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            We may update this Cookie Policy to reflect changes in technology or regulation. 
            Significant changes will be notified via email or dashboard banner. The "Last updated" 
            date at the bottom indicates the most recent revision.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">7</div>
            <div className="kyc-step-info">
              <h3>Contact</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            For cookie-related questions, contact us at <strong style={{ color: '#C9A962' }}>privacy@nadlanworld.org</strong>
          </p>
        </section>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '40px', fontSize: '13px' }}>
        Last updated: June 2026
      </p>
    </div>
  )
}
