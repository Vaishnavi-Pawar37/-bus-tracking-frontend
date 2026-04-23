import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroStyle = {
    fontFamily: "'Poppins', sans-serif",
    // Hero background with a nice gradient and image overlay
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    color: 'white'
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section (Replaces Carousel) */}
      <section style={heroStyle}>
        <div className="container px-5 text-center">
          <h1 className="display-3 fw-bold mb-3">Smart Bus System</h1>
          <p className="lead mb-4 fs-4">
            A smart, safe, and reliable transport solution for the BMIT community.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn btn-primary btn-lg px-5 shadow rounded-pill">
              Get Started <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
            
              <Link to="/bus-info" className="btn btn-primary btn-lg px-5 shadow rounded-pill">
              <i className="fa-solid fa-bus me-2"></i> Bus Info
              </Link>
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5 text-center">
        <div className="py-4">
          <h2 className="fw-bold mb-2">Why Choose Our System?</h2>
          <div className="bg-primary mx-auto mb-5" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
        </div>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 border-0 shadow-sm card h-100">
              <i className="fa-solid fa-clock-rotate-left fa-3x mb-3 text-primary"></i>
              <h4 className="fw-bold">Real-time Tracking</h4>
              <p className="text-muted">Know exactly where your bus is at any moment to save time.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border-0 shadow-sm card h-100">
              <i className="fa-solid fa-qrcode fa-3x mb-3 text-primary"></i>
              <h4 className="fw-bold">Digital Pass</h4>
              <p className="text-muted">Quick student registration and entry with integrated QR support.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border-0 shadow-sm card h-100">
              <i className="fa-solid fa-shield-halved fa-3x mb-3 text-primary"></i>
              <h4 className="fw-bold">Secure Data</h4>
              <p className="text-muted">Safe management of student records and fee payment history.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;