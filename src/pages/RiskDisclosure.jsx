import '../styles/contact.css'

export default function RiskDisclosure() {
  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>Risk Disclosure</h1>
      </div>

      <div className="notification-warning" style={{ marginBottom: '30px' }}>
        <strong>Important:</strong> All investments carry risk. Please read this disclosure carefully 
        before making any investment decision. If you do not understand any part of this document, 
        seek independent professional advice.
      </div>

      <div className="kyc-steps-list" style={{ gap: '20px' }}>
        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">1</div>
            <div className="kyc-step-info">
              <h3>Nature of Investments</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            NADLAN offers investments in real estate and green energy projects. These are 
            <strong style={{ color: '#FF9800' }}> long-term, illiquid investments </strong> 
            backed by physical assets. Your capital is committed for the lock-in period specified 
            in your chosen plan. Unlike bank deposits, these investments are not insured by the 
            Nigeria Deposit Insurance Corporation (NDIC).
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">2</div>
            <div className="kyc-step-info">
              <h3>Market Risk</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            Real estate values fluctuate based on economic conditions, interest rates, government 
            policies, and local market dynamics. Property prices may decline, affecting the underlying 
            value of your investment. The Nigerian real estate market is subject to regulatory changes, 
            infrastructure development, and macroeconomic factors beyond our control.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">3</div>
            <div className="kyc-step-info">
              <h3>Liquidity Risk</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            Your investment is locked in for the duration of the plan (12-36 months). 
            <strong style={{ color: '#FF9800' }}> Early withdrawal is not permitted </strong> 
            except under exceptional circumstances approved by NADLAN management. You should only 
            invest funds you will not need during the lock-in period.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">4</div>
            <div className="kyc-step-info">
              <h3>Return Risk</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>
              Published ROI rates (18%-28%) are <strong style={{ color: '#fff' }}>projections based on historical performance</strong> 
              and are not guaranteed. Actual returns may differ due to:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Property vacancy rates or tenant defaults</li>
              <li style={{ marginBottom: '8px' }}>Unexpected maintenance or development costs</li>
              <li style={{ marginBottom: '8px' }}>Changes in rental market conditions</li>
              <li style={{ marginBottom: '8px' }}>Currency fluctuations affecting material costs</li>
              <li>Force majeure events (natural disasters, civil unrest, pandemics)</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">5</div>
            <div className="kyc-step-info">
              <h3>Green Energy Specific Risks</h3>
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            <p style={{ marginBottom: '12px' }}>Green energy investments carry additional risks:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Technology obsolescence as newer systems emerge</li>
              <li style={{ marginBottom: '8px' }}>Regulatory changes affecting renewable energy incentives</li>
              <li style={{ marginBottom: '8px' }}>Equipment performance degradation over time</li>
              <li>Grid connectivity and power purchase agreement risks</li>
            </ul>
          </div>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">6</div>
            <div className="kyc-step-info">
              <h3>Operational Risk</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            NADLAN relies on third-party service providers for property management, legal services, 
            and payment processing. While we conduct due diligence, operational failures by these 
            partners could impact investment performance. We maintain contingency plans but cannot 
            eliminate all operational risks.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">7</div>
            <div className="kyc-step-info">
              <h3>Capital Protection</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            While all investments are backed by physical assets with legal title documentation, 
            <strong style={{ color: '#fff' }}> capital protection does not mean capital guarantee</strong>. 
            In extreme circumstances (property destruction, legal disputes, market collapse), the 
            recovery value of underlying assets may be less than your invested capital. We maintain 
            insurance coverage, but policy limits and exclusions apply.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">8</div>
            <div className="kyc-step-info">
              <h3>Diversification Recommendation</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            We strongly recommend that real estate investments constitute only a portion of your 
            overall investment portfolio. Do not invest more than you can afford to lose. Consider 
            your risk tolerance, investment timeline, and financial goals before committing capital.
          </p>
        </section>

        <section className="kyc-step-card">
          <div className="kyc-step-header">
            <div className="kyc-step-number">9</div>
            <div className="kyc-step-info">
              <h3>Acknowledgment</h3>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '14px' }}>
            By investing through NADLAN, you acknowledge that you have read, understood, and accepted 
            the risks outlined in this disclosure. You confirm that your investment decision is made 
            voluntarily and with full awareness of the potential for financial loss. You agree to 
            review your investments periodically and stay informed about market conditions.
          </p>
        </section>
      </div>

      <div className="kyc-info-box" style={{ marginTop: '40px' }}>
        <h4>Need Clarification?</h4>
        <p>
          If you have questions about any risk mentioned here, please contact our investment advisors 
          at <strong style={{ color: '#C9A962' }}>advisor@nadlanworld.org</strong> before making an investment.
        </p>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '40px', fontSize: '13px' }}>
        Last updated: June 2026
      </p>
    </div>
  )
}
