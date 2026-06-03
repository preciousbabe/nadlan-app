import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/contact.css'

const FAQS_DATA = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is NADLAN?',
        a: 'NADLAN is Nigeria\'s premier real estate and green energy investment platform. We connect investors to premium property opportunities across Nigeria while promoting sustainable, eco-friendly development. Our platform allows you to invest in real estate with as little as ₦500,000 and earn competitive returns.'
      },
      {
        q: 'How do I create an account?',
        a: 'Click the "Get Started" button on our homepage and complete the registration form with your email, full name, and a secure password. After signing up, you\'ll need to complete KYC verification by uploading a valid government-issued ID and proof of address before you can start investing.'
      },
      {
        q: 'Is NADLAN regulated?',
        a: 'NADLAN operates in compliance with Nigerian investment regulations. All investment offerings are backed by physical real estate assets with verified legal titles. We maintain transparency in all dealings and provide regular updates on investment performance.'
      }
    ]
  },
  {
    category: 'Investments',
    questions: [
      {
        q: 'What is the minimum investment amount?',
        a: 'Our entry-level Bronze Plan starts at ₦500,000. We offer tiered investment plans ranging from ₦500,000 to ₦50,000,000+, each with different ROI rates, lock-in periods, and benefits. Higher tiers offer better returns and exclusive perks.'
      },
      {
        q: 'How does the ROI work?',
        a: 'ROI (Return on Investment) is calculated based on your investment plan\'s rate and duration. For example, our Bronze Plan offers 18% annual ROI over 12 months. Once your investment is fully paid, ROI accrues monthly or quarterly depending on your plan. Payouts begin after the lock-in period.'
      },
      {
        q: 'Can I invest in installments?',
        a: 'Yes! You can make partial payments toward your total investment amount. Your investment becomes active once fully paid, and ROI accrual begins at that point. You can track your payment progress and remaining balance in your dashboard.'
      },
      {
        q: 'What happens after the lock-in period?',
        a: 'After your lock-in period ends, you can choose to withdraw your capital plus accumulated returns, reinvest in the same or a different plan, or roll over your investment for continued returns. We provide flexible options to suit your financial goals.'
      }
    ]
  },
  {
    category: 'Payments & Withdrawals',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Flutterwave (card, USSD, bank transfer) and direct bank transfers to our GTBank account. All payments are verified by our admin team before being credited to your investment. Bank transfer payments require proof of payment upload.'
      },
      {
        q: 'How long do withdrawals take?',
        a: 'Withdrawal requests are processed within 3-5 business days. The funds are transferred to your registered bank account after verification. You can track your withdrawal status in the Transactions section of your dashboard.'
      },
      {
        q: 'Are there any fees?',
        a: 'NADLAN does not charge account opening or maintenance fees. A small processing fee may apply to withdrawals depending on your bank. All fees are disclosed transparently before you confirm any transaction.'
      }
    ]
  },
  {
    category: 'Security & Trust',
    questions: [
      {
        q: 'How is my money protected?',
        a: 'All investments are backed by physical real estate assets with legal title documentation. We conduct rigorous due diligence on every property. Your funds are held securely, and we provide regular updates on asset performance and valuation.'
      },
      {
        q: 'What is KYC and why do I need it?',
        a: 'KYC (Know Your Customer) is a regulatory requirement to verify your identity. You must upload a valid government-issued ID (passport, driver\'s license, or national ID) and proof of address. This protects against fraud and ensures compliance with Nigerian financial regulations.'
      },
      {
        q: 'Is my personal data safe?',
        a: 'Absolutely. We use bank-grade encryption and comply with the Nigeria Data Protection Regulation (NDPR). Your personal and financial information is never shared with third parties without your consent. Read our Privacy Policy for full details.'
      }
    ]
  }
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...FAQS_DATA.map(c => c.category)]

  const filteredFaqs = activeCategory === 'All' 
  ? FAQS_DATA.flatMap(c => c.questions.map(q => ({ ...q, category: c.category })))
  : FAQS_DATA.find(c => c.category === activeCategory)?.questions.map(q => ({ ...q, category: activeCategory })) || []

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>Frequently Asked Questions</h1>
      </div>

      <div className="filter-tabs" style={{ marginBottom: '30px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="kyc-steps-list" style={{ gap: '12px' }}>
        {filteredFaqs.map((faq, index) => (
          <div 
            key={index} 
            className="kyc-step-card"
            style={{ cursor: 'pointer' }}
            onClick={() => toggleFaq(index)}
          >
            <div className="kyc-step-header" style={{ marginBottom: openIndex === index ? '16px' : '0' }}>
              <div className="kyc-step-info" style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', color: '#C9A962', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {faq.category}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 500, marginTop: '6px', color: '#fff' }}>
                  {faq.q}
                </h3>
              </div>
              <span style={{ 
                fontSize: '20px', 
                color: 'rgba(255,255,255,0.4)',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}>
                ▼
              </span>
            </div>
            {openIndex === index && (
              <div style={{ 
                paddingTop: '16px', 
                borderTop: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: '1.7',
                fontSize: '14px'
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="kyc-info-box" style={{ marginTop: '40px' }}>
        <h4>Still have questions?</h4>
        <p>
          Our support team is ready to help. Reach out through the 
          <Link to="/" onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)} style={{ color: '#C9A962' }}> Contact section</Link> 
          {' '}or email us at support@nadlanworld.org
        </p>
      </div>
    </div>
  )
}
