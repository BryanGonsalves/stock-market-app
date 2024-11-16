import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stocks from './pages/Stocks';

const App = () => {
  const [user, setUser] = useState(null); // Track if user is authenticated

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout onLogout={handleLogout} user={user} />}>
          
          {/* Home Route - Show stock cards if logged in */}
          <Route
            path="/"
            element={
              user ? (
                <Home /> // Show stock cards if user is logged in
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Protected Route for Stocks */}
          <Route
            path="/stocks/:symbol" // Define symbol as part of the URL
            element={<PrivateRoute element={<Stocks />} user={user} />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
