import { useState } from 'react'
import './InvestmentCalculator.css'

export default function InvestmentCalculator() {
  const [isOpen, setIsOpen] = useState(false)
  const [capital, setCapital] = useState('')
  const [tier, setTier] = useState('bronze')
  const [duration, setDuration] = useState(12)
  const [results, setResults] = useState(null)

  const tiers = {
    bronze: { name: 'Bronze', min: 500000, max: 4999999, rate: 18 },
    silver: { name: 'Silver', min: 5000000, max: 14999999, rate: 22 },
    gold: { name: 'Gold', min: 15000000, max: 29999999, rate: 25 },
    platinum: { name: 'Platinum', min: 30000000, max: 50000000, rate: 28 },
  }

  const currentTier = tiers[tier]
  const capitalNum = parseFloat(capital.replace(/,/g, '')) || 0

  const calculate = () => {
    if (capitalNum < currentTier.min) {
      setResults({ error: `Minimum capital for ${currentTier.name} is ₦${currentTier.min.toLocaleString()}` })
      return
    }
    if (capitalNum > currentTier.max) {
      setResults({ error: `Maximum capital for ${currentTier.name} is ₦${currentTier.max.toLocaleString()}` })
      return
    }

    const monthlyRate = currentTier.rate / 100 / 12
    const totalReturn = capitalNum * (currentTier.rate / 100) * (duration / 12)
    const monthlyIncome = totalReturn / duration
    const totalValue = capitalNum + totalReturn

    setResults({
      monthlyIncome,
      totalReturn,
      totalValue,
      roi: currentTier.rate,
    })
  }

  const formatNaira = (num) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const handleCapitalChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setCapital(raw)
    setResults(null)
  }

  const closeModal = () => {
    setIsOpen(false)
    setResults(null)
    setCapital('')
  }

  return (
    <>
      {/* Trigger Button */}
      <button className="btn-primary" onClick={() => setIsOpen(true)}>
        Launch Calculator
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="calc-overlay" onClick={closeModal}>
          <div className="calc-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="calc-header">
              <div>
                <span className="calc-label">Investment Calculator</span>
                <h2 className="calc-title">
                  Calculate Your <span className="calc-gold">Returns</span>
                </h2>
              </div>
              <button className="calc-close" onClick={closeModal}>×</button>
            </div>

            {/* Inputs */}
            <div className="calc-body">
              {/* Capital Input */}
              <div className="calc-field">
                <label className="calc-field-label">Investment Capital (₦)</label>
                <input
                  type="text"
                  className="calc-input"
                  placeholder="e.g. 5,000,000"
                  value={capital ? parseInt(capital).toLocaleString() : ''}
                  onChange={handleCapitalChange}
                />
                <span className="calc-hint">
                  Range: ₦{currentTier.min.toLocaleString()} – ₦{currentTier.max.toLocaleString()}
                </span>
              </div>

              {/* Tier Select */}
              <div className="calc-field">
                <label className="calc-field-label">Investment Tier</label>
                <div className="calc-tier-grid">
                  {Object.entries(tiers).map(([key, t]) => (
                    <button
                      key={key}
                      className={`calc-tier-btn ${tier === key ? 'calc-tier-btn--active' : ''}`}
                      onClick={() => { setTier(key); setResults(null) }}
                    >
                      <span className="calc-tier-name">{t.name}</span>
                      <span className="calc-tier-rate">{t.rate}% / yr</span>
                      <span className="calc-tier-range">
                        ₦{(t.min / 1e6).toFixed(t.min >= 1e7 ? 0 : 1)}M – ₦{(t.max / 1e6).toFixed(t.max >= 1e7 ? 0 : 1)}M
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Slider */}
              <div className="calc-field">
                <label className="calc-field-label">
                  Duration: <span className="calc-duration-value">{duration} months</span>
                </label>
                <input
                  type="range"
                  className="calc-slider"
                  min="3"
                  max="36"
                  step="3"
                  value={duration}
                  onChange={(e) => { setDuration(parseInt(e.target.value)); setResults(null) }}
                />
                <div className="calc-slider-labels">
                  <span>3m</span>
                  <span>12m</span>
                  <span>24m</span>
                  <span>36m</span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                className="calc-calculate-btn"
                onClick={calculate}
                disabled={!capitalNum}
              >
                Calculate Returns
              </button>

              {/* Results */}
              {results && !results.error && (
                <div className="calc-results">
                  <div className="calc-result-row">
                    <span className="calc-result-label">Monthly Income</span>
                    <span className="calc-result-value calc-result-value--green">
                      {formatNaira(results.monthlyIncome)}
                    </span>
                  </div>
                  <div className="calc-result-row">
                    <span className="calc-result-label">Total Return ({duration} months)</span>
                    <span className="calc-result-value">{formatNaira(results.totalReturn)}</span>
                  </div>
                  <div className="calc-result-row calc-result-row--highlight">
                    <span className="calc-result-label">Total Value</span>
                    <span className="calc-result-value calc-result-value--large">
                      {formatNaira(results.totalValue)}
                    </span>
                  </div>
                  <div className="calc-result-row">
                    <span className="calc-result-label">Annual ROI</span>
                    <span className="calc-result-value calc-result-value--green">
                      {results.roi}%
                    </span>
                  </div>
                </div>
              )}

              {results?.error && (
                <div className="calc-error">{results.error}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
