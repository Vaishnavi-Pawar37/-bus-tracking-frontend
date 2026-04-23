import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand Name */}
        <a className="navbar-brand fw-bold" href="#">
          <i className="fas fa-bus-alt me-2 text-warning"></i>
          SmartBus System
        </a>

        {/* Hamburger Menu for Mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <a className="nav-link active" href="home">
                {/* <i className="fas fa-chart-line me-1"></i> */}
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about">
                {/* <i className="fas fa-user-plus me-1"></i> Register Student */}
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact">
                {/* <i className="fas fa-qrcode me-1"></i> Bus Entry */}
                Contact
              </a>
            </li>
           {/* <li className="nav-item">
              <a className="nav-link" href="#reports">
                <i className="fas fa-file-invoice me-1"></i> Reports
              </a>
            </li> */}
               {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Languages
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">English</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Marathi</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Hindi</a></li>
          </ul>
        </li> */}
          </ul>
        </div>
      </div>
    </nav>
  ); 
};

export default Navbar;