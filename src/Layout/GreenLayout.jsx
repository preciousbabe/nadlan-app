import GreenNavbar from '../components/Navbar-green'
import Footer from '../components/Footer-green'
import './GreenLayout.css'

export default function GreenLayout({ children }) {
  return (
    <div className="green-layout">
      <GreenNavbar />

      <main className="green-layout__main">
        {children}
      </main>

      <Footer />
    </div>
  )
}