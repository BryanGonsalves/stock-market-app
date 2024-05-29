
import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Slider from '../components/Slider';

const Layout = ({ children }) => {
  return (
    <>
      <Slider />
      <Header />
      <main>{children}</main>
      <Outlet />
    </>
  );
}

export default Layout;