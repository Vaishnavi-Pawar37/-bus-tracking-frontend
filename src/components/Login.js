import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // ADDED: Link for navigation
// import API_BASE_URL from './api_config';

const Login = ({ setUser }) => {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bus-backend-i8yp.onrender.com/login', { ...credentials, role });
      
      // Update global user state. 
      // NOTE: We inject the 'role' here just in case your backend didn't send it back,
      // so App.js knows exactly which dashboard to open!
      if (setUser) {
        setUser({ ...res.data, role: role }); 
      }

      // Save session data so dashboards can load specific data
      if (role === 'student') {
        localStorage.setItem('studentSession', JSON.stringify(res.data.student || res.data));
      } 
      
      // FIX: Always navigate to the unified '/dashboard' route. 
      // App.js will automatically sort them into Student, Driver, or Admin.
      navigate('/dashboard'); 
      
    } catch (err) {
      alert(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ width: '450px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold">System Login</h2>
        
        <div className="btn-group w-100 mb-4 shadow-sm">
          <button type="button" className={`btn ${role === 'student' ? 'btn-warning fw-bold' : 'btn-outline-warning text-dark'}`} onClick={() => setRole('student')}>Student</button>
          <button type="button" className={`btn ${role === 'driver' ? 'btn-warning fw-bold' : 'btn-outline-warning text-dark'}`} onClick={() => setRole('driver')}>Driver</button>
          <button type="button" className={`btn ${role === 'admin' ? 'btn-dark text-white fw-bold' : 'btn-outline-dark'}`} onClick={() => setRole('admin')}>Admin</button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Username / ID</label>
            <input type="text" className="form-control" placeholder={role === 'student' ? "Enter Student ID or Username" : "Enter Username"}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})} required />
          </div>

          <div className="mb-4">
            {/* NEW: Flex container to align Label and Forgot Password link */}
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label fw-bold mb-0">Password</label>
              <Link to="/forgot-password" className="text-primary small text-decoration-none fw-bold">Forgot Password?</Link>
            </div>
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Enter password"
                onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow">Login to Dashboard</button>
        </form>
        
        {role !== 'admin' && (
          <p className="mt-3 text-center small">
            New here? <a href="/register" className="fw-bold text-decoration-none text-primary">Create an account</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;