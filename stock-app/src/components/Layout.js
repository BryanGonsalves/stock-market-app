import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Slider from '../components/Slider';

const Layout = ({ children, user, onLogout }) => {
  return (
    <>
      <Slider />
      <Header />
      
      <main>
        {user && (
          <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  // Red background to match the theme
    padding: '15px 20px',
    borderRadius: '8px',
  
  }}
>
  <h2 style={{ margin: 0, fontSize: '1.5em', fontWeight: '600' }}>Welcome, {user}!</h2>
  <button
    onClick={onLogout}
    style={{
      padding: '8px 15px',
      backgroundColor: 'maroon',  // Black button
      color: '#fff',  // White text
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',  // Smooth hover transition
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#lightmaroon')}  // Darken on hover
    onMouseOut={(e) => (e.target.style.backgroundColor = '#lightmaroon')}  // Lighten on hover out
  >
    Sign Out
  </button>
</div>

        )}
        {children}
      </main>

      <Outlet />
    </>
  );
}

export default Layout;
