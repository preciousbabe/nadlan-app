import React from 'react';
import NavbarReal from '../components/navbar-real';
import FooterReal from '../components/footer-real';

export default function RealLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarReal />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <FooterReal />
    </div>
  );
}