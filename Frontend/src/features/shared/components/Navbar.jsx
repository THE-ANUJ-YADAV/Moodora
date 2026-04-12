import React from 'react'
import '../styles/navbar.scss'

const Navbar = () => {
  return (
    <nav className="moodora-navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-circle">
            <svg className="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Music notes forming emotion wave */}
              <g className="note-group">
                <circle cx="20" cy="50" r="8" fill="#1DB954" />
                <path d="M 20 42 L 20 20" stroke="#1DB954" strokeWidth="3" strokeLinecap="round" />
                <path d="M 20 20 L 35 25" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g className="note-group" style={{ animationDelay: '0.2s' }}>
                <circle cx="50" cy="40" r="8" fill="#06b6d4" />
                <path d="M 50 32 L 50 10" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                <path d="M 50 10 L 65 15" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g className="note-group" style={{ animationDelay: '0.4s' }}>
                <circle cx="80" cy="50" r="8" fill="#7c3aed" />
                <path d="M 80 42 L 80 20" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
                <path d="M 80 20 L 95 25" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
              </g>
            </svg>
          </div>
          <div className="logo-text">
            <h1 className="app-title">Moodora</h1>
            <p className="tagline">Song is <span className="emotion-text">Emotions</span></p>
          </div>
        </div>

        {/* Right section (for future use - notifications, user profile, etc.) */}
        <div className="navbar-right">
          {/* Can add menu items here in future */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
