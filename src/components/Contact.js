import React from 'react';

const Contact = () => {
  // BMIT College Coordinates (Approximate for Solapur/Mapping)
  // Replace the 'src' in the iframe if you have a specific Google Maps Share link
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.4468623696237!2d75.90807037517112!3d17.675150583259833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db6615555555%3A0x89e6777649557a!2sBrahmdevdada%20Mane%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin";

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Get In Touch</h1>
        <p className="text-muted">Have questions about the Smart Bus System? We are here to help!</p>
      </div>

      <div className="row g-4">
        {/* Left Side: Contact Information */}
        <div className="col-md-5">
          <div className="card border-0 shadow-lg h-100 p-4" style={{ borderRadius: '20px' }}>
            <h3 className="fw-bold mb-4">Contact Information</h3>
            
            <div className="d-flex align-items-start mb-4">
              <div className="bg-warning p-3 rounded-circle me-3">
                <i className="fas fa-envelope text-white fs-4"></i>
              </div>
              <div>
                <h5 className="mb-1">Email Us</h5>
                <p className="text-muted mb-0">support@bmit.com</p>
                <p className="text-muted">info@bmit_bus.ac.in</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div className="bg-primary p-3 rounded-circle me-3">
                <i className="fas fa-phone-alt text-white fs-4"></i>
              </div>
              <div>
                <h5 className="mb-1">Call Us</h5>
                <p className="text-muted mb-0">+91 98765 43210</p>
                <p className="text-muted">0217-2283822</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div className="bg-success p-3 rounded-circle me-3">
                <i className="fas fa-map-marker-alt text-white fs-4"></i>
              </div>
              <div>
                <h5 className="mb-1">Our Location</h5>
                <p className="text-muted mb-0">BMIT College, Belati,</p>
                <p className="text-muted">Solapur, Maharashtra 413002</p>
              </div>
            </div>

            <div className="mt-auto">
              <h5 className="fw-bold mb-3">Follow Our Updates</h5>
              <div className="d-flex gap-3">
                <button className="btn btn-outline-dark rounded-circle"><i className="fab fa-facebook-f"></i></button>
                <button className="btn btn-outline-dark rounded-circle"><i className="fab fa-twitter"></i></button>
                <button className="btn btn-outline-dark rounded-circle"><i className="fab fa-instagram"></i></button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Google Map */}
        <div className="col-md-7">
          <div className="card border-0 shadow-lg overflow-hidden h-100" style={{ borderRadius: '20px' }}>
            <iframe
              title="BMIT College Map"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '450px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Quick Support Section */}
      <div className="mt-5 p-4 bg-dark text-white rounded-4 text-center shadow">
        <h4 className="mb-2">Need immediate assistance with your Bus Pass?</h4>
        <p className="opacity-75">Visit the Admin Office during college hours (9:00 AM - 5:00 PM)</p>
        <a href="mailto:support@bmit.com" className="btn btn-warning fw-bold px-4 py-2 mt-2">
          Email Admin Now
        </a>
      </div>
    </div>
  );
};

export default Contact;