import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Register from './Pages/Register';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>        
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
};