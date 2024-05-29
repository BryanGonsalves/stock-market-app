import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from "./pages/Home";
import Stocks from "./pages/Stocks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

      <Route element={<Layout/>}>
        <Route path='/' element={<Home />}/>
        <Route path='/stocks/:symbols' element={<Stocks />}/>
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;