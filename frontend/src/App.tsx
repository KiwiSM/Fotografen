import './App.css';
import React from "react";
import LandingPage from './Components/LandingPage';
import TakePhoto from './Components/TakePhoto';

export default function App() {
  return (
    <section className="App">
      <header className="App-header">
      <h1>Helloooo</h1>
      <TakePhoto />
      <LandingPage />
      </header>
    </section>
  );
};