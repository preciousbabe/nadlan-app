import { useEffect, useRef, useState } from 'react'
import '../styles/contact.css'

export default function Contact() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: 'Visit Us',
      lines: ['3rd Floor, Landmark Tower', 'Water Corporation Road, Victoria Island, Lagos']
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: 'Email Us',
      lines: ['invest@nadlan.ng', 'support@nadlan.ng']
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      title: 'Call Us',
      lines: ['+234 800 NADLAN 01', '+234 1 277 8888']
    }
  ]

  return (
    <section ref={sectionRef} id="contact" className="contact">
      <div className="contact__bg">
        <div className="contact__gradient"></div>
        <div className="contact__grid"></div>
      </div>

      <div className="contact__container">
        <div className={`contact__header ${isVisible ? 'contact__header--visible' : ''}`}>
          <span className="contact__eyebrow">Get In Touch</span>
          <h2 className="contact__title">
            Start Your
            <span className="contact__title-accent"> Investment Journey</span>
          </h2>
          <p className="contact__description">
            Have questions about our investment plans? Our team is ready to guide you 
            through every step of building your real estate portfolio.
          </p>
        </div>

        <div className={`contact__body ${isVisible ? 'contact__body--visible' : ''}`}>
          {/* Contact Info Cards */}
          <div className="contact__info">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact__info-card" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="contact__info-icon">{info.icon}</div>
                <h3 className="contact__info-title">{info.title}</h3>
                {info.lines.map((line, i) => (
                  <p key={i} className="contact__info-line">{line}</p>
                ))}
              </div>
            ))}

            <div className="contact__hours">
              <h4 className="contact__hours-title">Business Hours</h4>
              <div className="contact__hours-row">
                <span>Monday - Friday</span>
                <span>8:00 AM - 6:00 PM WAT</span>
              </div>
              <div className="contact__hours-row">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM WAT</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrapper">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-group">
                <label className="contact__label">Full Name</label>
                <input 
                  type="text" 
                  className="contact__input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label className="contact__label">Email Address</label>
                  <input 
                    type="email" 
                    className="contact__input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="contact__form-group">
                  <label className="contact__label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="contact__input"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label className="contact__label">Investment Interest</label>
                <select 
                  className="contact__select"
                  value={formData.interest}
                  onChange={e => setFormData({...formData, interest: e.target.value})}
                >
                  <option value="">Select an option</option>
                  <option value="starter">Starter Plan (₦500K)</option>
                  <option value="growth">Growth Plan (₦2M)</option>
                  <option value="premium">Premium Plan (₦10M)</option>
                  <option value="elite">Elite Plan (₦50M)</option>
                  <option value="custom">Custom / Undecided</option>
                </select>
              </div>

              <div className="contact__form-group">
                <label className="contact__label">Message</label>
                <textarea 
                  className="contact__textarea"
                  rows="4"
                  placeholder="Tell us about your investment goals..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className={`contact__submit ${submitted ? 'contact__submit--success' : ''}`}>
                {submitted ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
