import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          
          {/* Brand & Description */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">
              <i className="fas fa-bus-alt me-2"></i>SmartBus System
            </h5>
            <p className="small text-white-50">
              Revolutionizing college transport with real-time QR verification and 
              seamless pass management for BMIT students and staff.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><Link to="/" className="text-white text-decoration-none hover-link">Home</Link></p>
            <p><Link to="/contact" className="text-white text-decoration-none hover-link">Contact Us</Link></p>
            <p><Link to="/login" className="text-white text-decoration-none hover-link">System Login</Link></p>
            <p><Link to="/register" className="text-white text-decoration-none hover-link">Get Bus Pass</Link></p>
          </div>

          {/* Support Info */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Support</h5>
            <p className="small"><i className="fas fa-headset me-2"></i> Tech Support</p>
            <p className="small"><i className="fas fa-shield-alt me-2"></i> Privacy Policy</p>
            <p className="small"><i className="fas fa-file-invoice me-2"></i> Fee Queries</p>
          </div>

          {/* Newsletter / Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Stay Updated</h5>
            <div className="input-group mb-3">
              <input type="text" className="form-control form-control-sm" placeholder="Email Address" />
              <button className="btn btn-warning btn-sm" type="button">Join</button>
            </div>
            <p className="small"><i className="fas fa-home me-2"></i> Solapur, MH 413002, IN</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Bottom Bar: Copyright & Socials */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="small text-white-50">
              Copyright ©2026 All rights reserved by: 
              <strong className="text-warning"> BMIT Smart Transport Team</strong>
            </p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white fs-5 mx-2 social-icon"><i className="fab fa-facebook"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white fs-5 mx-2 social-icon"><i className="fab fa-twitter"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white fs-5 mx-2 social-icon"><i className="fab fa-linkedin-in"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white fs-5 mx-2 social-icon"><i className="fab fa-instagram"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Internal CSS for Interactivity */}
      <style>{`
        .hover-link:hover {
          color: #ffc107 !important;
          padding-left: 5px;
          transition: 0.3s;
        }
        .social-icon:hover {
          color: #ffc107 !important;
          transform: translateY(-3px);
          display: inline-block;
          transition: 0.3s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;