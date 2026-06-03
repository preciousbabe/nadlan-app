import '../styles/contact.css'

const REPORTS = [
  {
    id: 1,
    title: 'Q2 2026 Nigerian Real Estate Market Report',
    quarter: 'Q2 2026',
    highlights: [
      'Lagos prime residential yields stabilized at 7.2%',
      'Abuja commercial sector saw 12% transaction volume increase',
      'Green-certified buildings command 15% rental premium',
      'Ibeju-Lekki infrastructure projects boost land values by 23%'
    ],
    status: 'published',
    date: 'June 2026'
  },
  {
    id: 2,
    title: 'Q1 2026 Nigerian Real Estate Market Report',
    quarter: 'Q1 2026',
    highlights: [
      'Naira stability improves foreign investor confidence',
      'Mixed-use developments dominate new project launches',
      'Solar integration becomes standard in premium developments',
      'Rental demand in Lekki Phase 1 exceeds supply by 18%'
    ],
    status: 'published',
    date: 'March 2026'
  },
  {
    id: 3,
    title: 'Annual Market Outlook 2026',
    quarter: 'Annual',
    highlights: [
      'Projected 8.5% average return for structured real estate investments',
      'Federal mortgage reforms expected to unlock ₦500B in housing finance',
      'Smart city initiatives in Eko Atlantic attract international developers',
      'Green energy mandates for new commercial buildings from 2027'
    ],
    status: 'published',
    date: 'January 2026'
  },
  {
    id: 4,
    title: 'Q3 2026 Nigerian Real Estate Market Report',
    quarter: 'Q3 2026',
    highlights: [
      'Report currently being compiled',
      'Preliminary data suggests continued growth trajectory',
      'Focus on post-rainy season construction activity'
    ],
    status: 'coming_soon',
    date: 'September 2026'
  }
]

export default function MarketReports() {
  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>Market Reports</h1>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '15px', lineHeight: '1.6' }}>
        In-depth analysis of the Nigerian real estate and green energy markets. 
        Our reports combine proprietary data, on-ground research, and macroeconomic 
        indicators to guide investment decisions.
      </p>

      <div className="kyc-steps-list" style={{ gap: '20px' }}>
        {REPORTS.map(report => (
          <div key={report.id} className="kyc-step-card">
            <div className="kyc-step-header">
              <div className="kyc-step-number" style={{ 
                background: report.status === 'published' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                color: report.status === 'published' ? '#4CAF50' : '#FF9800'
              }}>
                {report.quarter}
              </div>
              <div className="kyc-step-info" style={{ flex: 1 }}>
                <h3>{report.title}</h3>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{report.date}</span>
              </div>
              <span className={`installment-status ${report.status === 'published' ? 'paid' : 'pending'}`}>
                {report.status === 'published' ? 'Available' : 'Coming Soon'}
              </span>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Key Highlights
              </h4>
              <ul style={{ paddingLeft: '20px' }}>
                {report.highlights.map((highlight, idx) => (
                  <li key={idx} style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    marginBottom: '6px'
                  }}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* {report.status === 'published' && (
              <button className="explore-btn" style={{ marginTop: '16px', width: '100%' }}>
                Download Report (PDF)
              </button>
            )} */}
          </div>
        ))}
      </div>

      <div className="kyc-info-box" style={{ marginTop: '40px' }}>
        <h4>Custom Reports</h4>
        <p>
          Need sector-specific analysis? Our research team produces custom reports for 
          institutional investors and partners. Contact us at{' '}
          <strong style={{ color: '#C9A962' }}>research@nadlanworld.org</strong>
        </p>
      </div>
    </div>
  )
}
