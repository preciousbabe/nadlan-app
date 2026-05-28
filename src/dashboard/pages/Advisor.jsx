import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { Link } from 'react-router-dom'

const TIERS = [
  { name: 'Bronze', min: 500000, max: 2000000, roi: 15, months: 12, risk: 'Low', icon: '🥉' },
  { name: 'Silver', min: 2000000, max: 5000000, roi: 18, months: 18, risk: 'Low-Medium', icon: '🥈' },
  { name: 'Gold', min: 5000000, max: 15000000, roi: 22, months: 24, risk: 'Medium', icon: '🥇' },
  { name: 'Platinum', min: 15000000, max: 30000000, roi: 25, months: 30, risk: 'Medium-High', icon: '💎' },
  { name: 'Diamond', min: 30000000, max: 50000000, roi: 30, months: 36, risk: 'High', icon: '👑' },
  { name: 'Global', min: 50000000, max: 100000000, roi: 35, months: 48, risk: 'Very High', icon: '🌍' }
]

function getRecommendation(totalInvested) {
  if (totalInvested === 0) {
    return {
      level: 'beginner',
      title: '🌱 Getting Started',
      risk: 'Low',
      suggested: 'Bronze or Silver',
      reason: 'Start with a smaller amount to understand how real estate investing works on NADLAN before committing larger sums.',
      allocation: { residential: 60, commercial: 30, land: 10 }
    }
  }
  if (totalInvested < 5000000) {
    return {
      level: 'growing',
      title: '📈 Building Wealth',
      risk: 'Low-Medium',
      suggested: 'Silver or Gold',
      reason: 'You have some experience. Diversify across residential and commercial properties for balanced growth.',
      allocation: { residential: 50, commercial: 35, land: 15 }
    }
  }
  if (totalInvested < 20000000) {
    return {
      level: 'established',
      title: '🏗️ Portfolio Builder',
      risk: 'Medium',
      suggested: 'Gold or Platinum',
      reason: 'Your portfolio is growing well. Access premium deals in prime Lagos, Abuja, and Port Harcourt locations.',
      allocation: { residential: 40, commercial: 40, land: 20 }
    }
  }
  if (totalInvested < 50000000) {
    return {
      level: 'advanced',
      title: '🚀 Wealth Maximizer',
      risk: 'Medium-High',
      suggested: 'Platinum or Diamond',
      reason: 'Maximize returns with exclusive off-market deals and mixed-use developments.',
      allocation: { residential: 30, commercial: 50, land: 20 }
    }
  }
  return {
    level: 'elite',
    title: '👑 Legacy Builder',
    risk: 'High',
    suggested: 'Diamond or Global',
    reason: 'Build generational wealth with international real estate exposure and trophy assets.',
    allocation: { residential: 25, commercial: 45, land: 30 }
  }
}

function AdviceCard({ level, data, isRecommended }) {
  return (
    <div className={`advice-card ${isRecommended ? 'recommended' : ''}`}>
      {isRecommended && <div className="recommended-badge">Recommended for You</div>}
      <h3>{data.title}</h3>
      <div className="advice-risk">
        <span>Risk Level:</span>
        <span className={`risk-badge ${data.risk.toLowerCase().replace('-', '')}`}>{data.risk}</span>
      </div>
      <p className="advice-recommendation">
        <strong>Suggested:</strong> {data.suggested}
      </p>
      <p className="advice-reason">{data.reason}</p>
      
      <div className="allocation-chart">
        <h4>Suggested Real Estate Allocation</h4>
        <div className="allocation-bars">
          <div className="allocation-bar">
            <div className="allocation-label">Residential</div>
            <div className="allocation-track">
              <div className="allocation-fill residential" style={{ width: `${data.allocation.residential}%` }} />
            </div>
            <span>{data.allocation.residential}%</span>
          </div>
          <div className="allocation-bar">
            <div className="allocation-label">Commercial</div>
            <div className="allocation-track">
              <div className="allocation-fill commercial" style={{ width: `${data.allocation.commercial}%` }} />
            </div>
            <span>{data.allocation.commercial}%</span>
          </div>
          <div className="allocation-bar">
            <div className="allocation-label">Land</div>
            <div className="allocation-track">
              <div className="allocation-fill land" style={{ width: `${data.allocation.land}%` }} />
            </div>
            <span>{data.allocation.land}%</span>
          </div>
        </div>
      </div>
      
      <Link to="/dashboard/investment-plans" className="explore-btn">
        Explore Plans
      </Link>
    </div>
  )
}

function ROICalculator() {
  const [amount, setAmount] = useState(500000)
  const [tierName, setTierName] = useState('Bronze')

  const tier = TIERS.find(t => t.name === tierName)
  const roi = Math.round(amount * (tier.roi / 100))
  const monthly = Math.round(roi / tier.months)
  const total = amount + roi

  return (
    <div className="roi-calculator">
      <h3>💰 ROI Calculator</h3>
      <div className="calculator-inputs">
        <div className="calc-input">
          <label>Select Plan</label>
          <select value={tierName} onChange={(e) => setTierName(e.target.value)} style={{
            width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '16px'
          }}>
            {TIERS.map(t => (
              <option key={t.name} value={t.name} style={{ background: '#111' }}>
                {t.icon} {t.name} ({t.roi}% ROI)
              </option>
            ))}
          </select>
        </div>
        <div className="calc-input">
          <label>Investment Amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={tier.min}
            max={tier.max}
          />
          <small style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
            Range: ₦{tier.min.toLocaleString()} - ₦{tier.max.toLocaleString()}
          </small>
        </div>
      </div>
      <div className="calculator-results">
        <div className="calc-result">
          <span>Total ROI</span>
          <strong>₦{roi.toLocaleString()}</strong>
        </div>
        <div className="calc-result">
          <span>Monthly ROI</span>
          <strong>₦{monthly.toLocaleString()}</strong>
        </div>
        <div className="calc-result highlight">
          <span>Total Return</span>
          <strong>₦{total.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  )
}

function TierComparison() {
  return (
    <div className="tier-comparison">
      <h3>📊 All Plans Comparison</h3>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Min Investment</th>
              <th>ROI</th>
              <th>Duration</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map(t => (
              <tr key={t.name}>
                <td><strong>{t.icon} {t.name}</strong></td>
                <td>₦{t.min.toLocaleString()}</td>
                <td style={{ color: '#C9A962' }}>{t.roi}%</td>
                <td>{t.months} months</td>
                <td>{t.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Advisor() {
  const { user } = useAuth()
  const { stats, investments, loading } = useDashboardData(user)
  const [activeTab, setActiveTab] = useState('advice')

  const totalInvested = stats.totalInvested
  const recommendation = getRecommendation(totalInvested)

  const adviceLevels = [
    getRecommendation(0),
    getRecommendation(2000000),
    getRecommendation(7000000),
    getRecommendation(25000000),
    getRecommendation(60000000)
  ]

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading advisor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="advisor-header">
        <h1>AI Investment Advisor</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', width: '100%' }}>
          Personalized real estate investment insights based on your portfolio
        </p>
      </div>

      <div className="advisor-tabs">
        <button className={activeTab === 'advice' ? 'active' : ''} onClick={() => setActiveTab('advice')}>
          Recommendations
        </button>
        <button className={activeTab === 'calculator' ? 'active' : ''} onClick={() => setActiveTab('calculator')}>
          ROI Calculator
        </button>
        <button className={activeTab === 'comparison' ? 'active' : ''} onClick={() => setActiveTab('comparison')}>
          Plan Comparison
        </button>
      </div>

      {activeTab === 'advice' && (
        <div className="advice-section">
          <div className="user-profile-summary">
            <h3>Your Portfolio Profile</h3>
            <div className="profile-stats">
              <div className="profile-stat">
                <span>Total Invested</span>
                <strong>₦{totalInvested.toLocaleString()}</strong>
              </div>
              <div className="profile-stat">
                <span>Active Plans</span>
                <strong>{stats.activeInvestments}</strong>
              </div>
              <div className="profile-stat">
                <span>Experience Level</span>
                <strong className={`level-${recommendation.level}`}>
                  {recommendation.level.charAt(0).toUpperCase() + recommendation.level.slice(1)}
                </strong>
              </div>
            </div>
          </div>

          <div className="advice-cards">
            {adviceLevels.map((data, i) => (
              <AdviceCard
                key={i}
                level={['beginner', 'growing', 'established', 'advanced', 'elite'][i]}
                data={data}
                isRecommended={data.level === recommendation.level}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'calculator' && <ROICalculator />}

      {activeTab === 'comparison' && <TierComparison />}
    </div>
  )
}