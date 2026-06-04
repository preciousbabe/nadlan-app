import usePWAInstall from '../hooks/usePWAInstall'
import './InstallPrompt'

export default function InstallPrompt() {
  const {
    installApp,
    isInstalled,
    showPrompt,
    dismissed,
    dismiss
  } = usePWAInstall()

  if (!showPrompt || isInstalled || dismissed) return null

  return (
    <div className="install-toast">
      <div className="install-left">
        <div className="app-icon">N</div>

        <div className="install-text">
          <strong>NADLAN Investments</strong>
          <span>Install app for faster access</span>
        </div>
      </div>

      <div className="install-actions">
        <button className="install-btn" onClick={installApp}>
          Install
        </button>

        <button className="dismiss-btn" onClick={dismiss}>
          ✕
        </button>
      </div>
    </div>
  )
}