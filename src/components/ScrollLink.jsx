// src/components/ScrollLink.jsx
import { useNavigate, useLocation } from 'react-router-dom'

export default function ScrollLink({ to, children, className, style }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    e.preventDefault()
    const [path, hash] = to.split('#')

    if (hash) {
      const targetPath = path || '/'
      const isSamePage = location.pathname === targetPath

      if (isSamePage) {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState(null, '', to)
        }
      } else {
        navigate(to)
      }
    } else {
      navigate(to)
    }
  }

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  )
}