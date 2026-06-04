import { useNavigate, useLocation } from 'react-router-dom'

export default function ScrollLink({ to, children, className, style }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    e.preventDefault()
    
    const [path, hash] = to.split('#')
    const targetPath = path || '/'
    const isSamePage = location.pathname === targetPath

    if (isSamePage && hash) {
      // Same page, scroll to hash
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', to)
      }
      return
    }

    if (!isSamePage && hash) {
      // Different page WITH hash: navigate to path first, hash will be handled by ScrollToHash
      navigate(targetPath + '#' + hash)
      return
    }

    // Different page, no hash — just navigate (ScrollToTop will handle scroll)
    navigate(targetPath)
  }

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  )
}