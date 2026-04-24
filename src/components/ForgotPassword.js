import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from './api_config';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Verify, Step 2: Reset Password
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // STEP 1: Verify the user exists in the database
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');

    try {
      await axios.post('https://bus-backend-i8yp.onrender.com/verify-user-reset', { role, username });
      setMessage("Account found! Please set your new password.");
      setStep(2); // Move to Step 2
    } catch (err) {
      setError(err.response?.data?.error || "Account not found. Please check your Username/ID.");
    }
  };

  // STEP 2: Save the new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post('http://localhost:5000/reset-password', { 
        role, 
        username, 
        new_password: passwords.newPassword 
      });
      alert("Password updated successfully! You can now login.");
      navigate('/login'); // Send them back to login
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ width: '450px', borderRadius: '15px' }}>
        <div className="text-center mb-4">
          <i className={`fas ${step === 1 ? 'fa-search' : 'fa-key'} fa-3x text-warning mb-3`}></i>
          <h2 className="fw-bold">{step === 1 ? 'Find Your Account' : 'Set New Password'}</h2>
          <p className="text-muted small">
            {step === 1 ? 'Enter your details to verify your account.' : `Creating new password for ${username}`}
          </p>
        </div>

        {message && <div className="alert alert-success small text-center">{message}</div>}
        {error && <div className="alert alert-danger small text-center">{error}</div>}

        {/* --- STEP 1 FORM --- */}
        {step === 1 && (
          <>
            <div className="btn-group w-100 mb-4 shadow-sm">
              <button type="button" className={`btn ${role === 'student' ? 'btn-warning fw-bold' : 'btn-outline-warning text-dark'}`} onClick={() => setRole('student')}>Student</button>
              <button type="button" className={`btn ${role === 'driver' ? 'btn-warning fw-bold' : 'btn-outline-warning text-dark'}`} onClick={() => setRole('driver')}>Driver</button>
            </div>

            <form onSubmit={handleVerify}>
              <div className="mb-4">
                <label className="form-label fw-bold">Username / ID</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder={role === 'student' ? "e.g., student@bmit.com" : "Enter Driver Username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow mb-3">
                Verify Account
              </button>
            </form>
          </>
        )}

        {/* --- STEP 2 FORM --- */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label fw-bold">New Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter new password"
                minLength="6"
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Re-enter password"
                minLength="6"
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-success w-100 fw-bold py-2 shadow mb-3">
              Update Password
            </button>
          </form>
        )}
        
        <div className="text-center mt-2">
          <Link to="/login" className="text-decoration-none fw-bold text-secondary">
            <i className="fas fa-arrow-left me-1"></i> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;