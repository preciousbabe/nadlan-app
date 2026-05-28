import NavbarReal from '../components/Navbar-real'
import FooterReal from '../components/Footer-real'
import './RealLayout.css'

export default function RealLayout({ children }) {
  return (
    <div className="real-layout">
      <NavbarReal />
      <main className="real-layout__main">
        {children}
      </main>
      <FooterReal />
    </div>
  )
}