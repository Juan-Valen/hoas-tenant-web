// src/components/Header.jsx
import React from 'react';
import '../styles/main.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">HOAS</div>
        <nav className="site-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#random">Sections</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
