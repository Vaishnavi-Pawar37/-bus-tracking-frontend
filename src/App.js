import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login'; 
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; // NEW: Import ForgotPassword
import StudentDashboard from './components/StudentDashboard';
import DriverDashboard from './components/DriverDashboard';
import AdminDashboard from './components/AdminDashboard';
import VerifyStudent from './components/VerifyStudent';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BusInfo from './components/BusInfo'; 
import Chatbot from './components/Chatbot'; 

/**
 * Main Application Component
 */
function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        <Navbar user={user} setUser={setUser} />
        
        <div className="app-content flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            
            {/* NEW: Forgot Password Route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/contact" element={<Contact />} />
            
            {/* Route for Bus Information & Pricing */}
            <Route path="/bus-info" element={<BusInfo />} />
            
            {/* QR Verification Route */}
            <Route path="/verify/:studentId" element={<VerifyStudent />} />

            {/* Protected Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                !user ? (
                  <Navigate to="/login" /> 
                ) : (
                  user.role === 'student' ? (
                    <StudentDashboard user={user} setUser={setUser} />
                  ) : user.role === 'driver' ? (
                    <DriverDashboard user={user} setUser={setUser} />
                  ) : (
                    <AdminDashboard user={user} setUser={setUser} />
                  )
                )
              } 
            />

            {/* Catch-all Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Footer />
        
        {/* Floating Chatbot wrapper in the bottom right corner */}
        {/* <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <Chatbot />
        </div> */}

      </div>
    </Router>
  );
}

export default App;