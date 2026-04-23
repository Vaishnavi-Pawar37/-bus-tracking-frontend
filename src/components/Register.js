import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const Register = () => {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', mobile: '', bus_no: '', route: '', stop: '', username: '', password: '' 
  });
  const [photo, setPhoto] = useState('');
  const [successData, setSuccessData] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. EXTENSION VALIDATION: Check if username ends with @bmit.com
    if (!formData.username.toLowerCase().endsWith("@bmit.com")) {
      alert("Registration Failed: Username must end with @bmit.com (e.g., john@bmit.com)");
      return; // Stop the function here
    }

    const payload = {
      role: role,
      name: formData.name,
      username: formData.username,
      bus_no: formData.bus_no,
      mobile_no: formData.mobile, 
      route_id: role === 'student' ? formData.stop : formData.route, 
      password: formData.password,
      photo: photo 
    };

    try {
      const res = await axios.post('http://localhost:5000/register', payload);
      
      if (role === 'student') {
        setSuccessData({
          // 2. QR CODE CONTENT: Set the value to the Student ID (username) 
          // so it is visible immediately upon scanning.
          qrValue: `Student ID: ${formData.username}`,
          password: formData.password,
          id: formData.username
        });
      } else {
        alert("Driver Registered Successfully! Redirecting to login...");
        window.location.href = "/login";
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed.";
      alert(errorMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      {successData ? (
        <div className="card shadow-lg p-4 text-center" style={{ width: '450px', borderRadius: '15px' }}>
          <h3 className="text-success fw-bold"><i className="fas fa-check-circle"></i> Registered!</h3>
          <div className="bg-white p-3 d-inline-block mx-auto border rounded mb-3">
            {/* The QR code now contains the plain-text Student ID */}
            <QRCode value={successData.qrValue} size={180} />
          </div>
          <div className="alert alert-warning text-start">
            <p className="mb-1"><strong>Username:</strong> {successData.id}</p>
            <p className="mb-1"><strong>Password:</strong> {successData.password}</p>
          </div>
          <button className="btn btn-dark w-100 fw-bold" onClick={() => window.location.href = "/login"}>Proceed to Login</button>
        </div>
      ) : (
        <div className="card shadow-lg p-4" style={{ width: '550px', borderRadius: '15px' }}>
          <h2 className="text-center mb-4 fw-bold text-dark">Create Account</h2>
          
          <div className="btn-group w-100 mb-4 shadow-sm">
            <button className={`btn ${role === 'student' ? 'btn-warning fw-bold' : 'btn-outline-warning text-dark'}`} onClick={() => setRole('student')}>Student</button>
            <button className={`btn ${role === 'driver' ? 'btn-warning fw-bold' : 'btn-outline-warning text-dark'}`} onClick={() => setRole('driver')}>Driver</button>
          </div>

          <form onSubmit={handleRegister}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Only Alphabets" 
                  pattern="[A-Za-z\s]+" 
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(val)) {
                        setFormData({...formData, name: val});
                    }
                  }} 
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Mobile No</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="10 Digit Number" 
                  pattern="\d{10}"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                        setFormData({...formData, mobile: val});
                    }
                  }} 
                  required 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="example@bmit.com" 
                // HTML5 check for the extension as a backup
                title="Must end with @bmit.com"
                onChange={(e) => setFormData({...formData, username: e.target.value})} 
                required 
              />
              <small className="text-muted">Must use your <b>@bmit.com</b> email.</small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  placeholder="Enter Password"
                  // Line 146
onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Bus No</label>
                <input type="text" className="form-control" placeholder="e.g. 5" onChange={(e) => setFormData({...formData, bus_no: e.target.value})} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">{role === 'student' ? 'Stop Name' : 'Route Name'}</label>
                <input 
                  type="text" 
                  className="form-control" 
                  onChange={(e) => setFormData(role === 'student' ? {...formData, stop: e.target.value} : {...formData, route: e.target.value})} 
                  required 
                />
              </div>
            </div>

            {role === 'student' && (
              <div className="mb-4">
                <label className="form-label fw-bold">Student Photo</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImage} required />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
              Complete Registration
            </button>
          </form>
          
          <p className="mt-3 text-center small">
            Already have an account? <a href="/login" className="fw-bold text-decoration-none">Login Here</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;