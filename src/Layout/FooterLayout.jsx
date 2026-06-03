// src/Layout/FooterLayout.jsx
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function FooterLayout() {
  return (
    <>
      <main className="footer-layout__main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}