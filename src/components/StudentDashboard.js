import React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';


const StudentDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  // SAFETY CHECK: Prevents the "Cannot read properties of undefined" error
  if (!user || !user.name) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading Student Profile...</h4>
      </div>
    );
  }

  // Handle Logout: Clears state and redirects to Home
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row shadow-lg p-5 rounded bg-white border-top border-5 border-warning position-relative">
        
        {/* LOGOUT BUTTON */}
        <div className="position-absolute top-0 end-0 m-3">
          <button className="btn btn-outline-danger btn-sm fw-bold shadow-sm" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </button>
        </div>

        {/* THE PROFILE & NAME SECTION */}
        <div className="col-md-7">
          <div className="bg-light p-3 rounded mb-4 border-start border-5 border-primary d-flex align-items-center">
            
            {/* DYNAMIC PHOTO DISPLAY */}
            {user.photo ? (
              <img 
                src={user.photo} 
                alt={`${user.name}'s profile`} 
                className="rounded-circle me-3 shadow-sm border border-2 border-primary" 
                style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
              />
            ) : (
              <i className="fas fa-user-circle fa-4x me-3 text-primary"></i>
            )}

            <div>
              <h2 className="text-dark fw-bold mb-0">{user.name}</h2>
              <small className="text-muted fw-bold">{user.username || "Registered Student Profile"}</small>
            </div>
          </div>

          {/* STUDENT DETAILS */}
          <div className="fs-5 ps-2">
            <p><strong><i className="fas fa-id-badge me-2 text-warning"></i>Roll No:</strong> {user.roll_no || user.qr_code_data}</p>
            
            {/* UPDATED: Checks for mobile_no (from DB) OR mobile (from Registration) */}
            <p><strong><i className="fas fa-phone-alt me-2 text-warning"></i>Mobile No:</strong> {user.mobile_no || user.mobile || "Not Provided"}</p>
            
            <p><strong><i className="fas fa-bus me-2 text-warning"></i>Bus No:</strong> {user.bus_no || "N/A"}</p>
            
            {/* UPDATED: Checks for route_id (from DB) OR stop (from Registration) */}
            <p><strong><i className="fas fa-route me-2 text-warning"></i>Route:</strong> {user.route_id || user.stop || "N/A"}</p>
            
            <p><strong><i className="fas fa-money-check-alt me-2 text-warning"></i>Fee Status:</strong> 
              <span className={`ms-2 badge ${user.fee_status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                {user.fee_status || 'Not Paid'}
              </span>
            </p>
          </div>
        </div>

        {/* THE QR SECTION */}
        <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-center">
          <h5 className="mb-3 fw-bold">Unique Bus Pass QR</h5>
          <div className="p-3 border border-2 rounded bg-white shadow-sm">
            {/* NOTE: If you want Google Lens scanning to work directly, 
                change 'user.qr_code_data' below to: `http://192.168.1.X:3000/verify/${user.qr_code_data}` 
                (Replace X with your actual IPv4 address) 
            */}
            <QRCode value={user.qr_code_data || "NO_QR"} size={200} />
          </div>
          <p className="mt-3 text-muted small">Scan this to verify your entry</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;