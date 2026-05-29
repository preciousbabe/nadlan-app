import NavbarGreen from '../components/Navbar-Green'
import FooterGreen from '../components/Footer-Green'
import './GreenLayout.css'

export default function GreenLayout({ children }) {
  return (
    <div className="green-layout">
      <NavbarGreen />

      <main className="green-layout__main">
        {children}
      </main>

      <FooterGreen />
    </div>
  )
}