import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalEmail, setModalEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await signup(email, password, fullName, username)

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    // Email confirmation required — show modal
    if (data?.user && !data?.session) {
      setModalEmail(email)
      setShowModal(true)
      setLoading(false)
      return
    }

    // No confirmation needed — go to dashboard
    navigate('/dashboard')
  }

  function handleModalClose() {
    setShowModal(false)
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Begin your investment journey.</p>

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>

      {/* Email Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content email-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">📧</div>
            <h2>Verify Your Email</h2>
            <p>
              We've sent a confirmation link to <strong>{modalEmail}</strong>.
            </p>
            <p className="modal-hint">
              Please check your inbox and click the link to activate your account.
              If you don't see it, check your spam folder.
            </p>
            <button className="modal-btn" onClick={handleModalClose}>
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}