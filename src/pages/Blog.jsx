import { Link } from 'react-router-dom'
import '../styles/contact.css'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Why Real Estate Remains Nigeria\'s Best Investment in 2026',
    excerpt: 'Despite economic headwinds, Nigerian real estate continues to outperform traditional savings instruments. Here\'s what the data shows...',
    category: 'Market Insights',
    date: 'June 1, 2026',
    readTime: '5 min read',
    image: '🏘️'
  },
  {
    id: 2,
    title: 'Green Energy: The Future of Property Development',
    excerpt: 'Solar integration, smart grids, and sustainable materials are transforming how properties are built and valued across Lagos and Abuja...',
    category: 'Green Energy',
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: '☀️'
  },
  {
    id: 3,
    title: 'Understanding Lock-in Periods: A Beginner\'s Guide',
    excerpt: 'New to property investment? Learn why lock-in periods exist, how they protect your returns, and what to consider before committing...',
    category: 'Education',
    date: 'May 20, 2026',
    readTime: '6 min read',
    image: '📚'
  },
  {
    id: 4,
    title: 'NADLAN Hits ₦2.8B in Managed Assets: What This Means for Investors',
    excerpt: 'Our latest milestone reflects growing confidence in structured real estate investment. Here\'s how portfolio scale benefits every investor...',
    category: 'Company News',
    date: 'May 15, 2026',
    readTime: '3 min read',
    image: '📈'
  },
  {
    id: 5,
    title: 'Lekki vs. Ibeju-Lekki: Where Should You Invest?',
    excerpt: 'A comparative analysis of two of Lagos\' fastest-growing corridors. We break down ROI potential, infrastructure, and risk factors...',
    category: 'Market Insights',
    date: 'May 10, 2026',
    readTime: '7 min read',
    image: '🏗️'
  },
  {
    id: 6,
    title: '5 Mistakes First-Time Property Investors Make',
    excerpt: 'Avoid these common pitfalls that can erode your returns. From poor due diligence to emotional decision-making, we cover it all...',
    category: 'Education',
    date: 'May 5, 2026',
    readTime: '5 min read',
    image: '⚠️'
  }
]

export default function Blog() {
  return (
    <div className="dashboard-page" style={{ padding: '40px 30px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="installments-header" style={{ marginBottom: '40px' }}>
        <h1>NADLAN Blog</h1>
      </div>

      <div className="plans-grid-tiered" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {BLOG_POSTS.map(post => (
          <article key={post.id} className="plan-card-tiered" style={{ cursor: 'pointer' }}>
            <div className="plan-header" style={{ padding: '30px', textAlign: 'center' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>{post.image}</span>
              <span style={{ 
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(201, 169, 98, 0.2)',
                color: '#C9A962',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                {post.category}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: '0' }}>
                {post.title}
              </h3>
            </div>
            <div className="plan-body" style={{ padding: '20px 24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                {post.excerpt}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{post.date}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="empty-state-large" style={{ marginTop: '40px', padding: '40px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>
          Want to stay updated? Follow us on{' '}
          <a href="https://www.instagram.com/invites/contact/?igsh=1h265bmm8zbpl&utm_content=ayuzqod" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ color: '#C9A962' }}>
            Instagram
          </a>
          {' '}and{' '}
          <a href="https://www.facebook.com/share/p/18yiCQkf3V/" 
             target="_blank" 
             rel="noopener noreferrer"
             style={{ color: '#C9A962' }}>
            Facebook
          </a>
        </p>
      </div>
    </div>
  )
}
