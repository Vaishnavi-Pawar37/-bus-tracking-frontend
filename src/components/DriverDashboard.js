import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = ({ user, setUser }) => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch students assigned to THIS driver's bus number
  useEffect(() => {
    if (user && user.bus_no) {
      // Make sure to use your IP address if testing on mobile, or localhost for PC
      axios.get(`http://localhost:5000/driver/students/${user.bus_no}`)
        .then(res => setStudents(res.data))
        .catch(err => console.error("Error fetching students:", err));
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!user) return <div className="container mt-5 text-center"><h4>Loading Driver Profile...</h4></div>;

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold text-dark m-0"> Driver Dashboard </h2>
          <span className="text-muted">Welcome, <strong>{user.name}</strong></span>
        </div>
        <button className="btn btn-danger shadow-sm" onClick={handleLogout}>Logout</button>
      </div>

      {/* Bus & Route Status Card */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body d-flex justify-content-around align-items-center py-4">
              <div className="text-center">
                <span className="text-uppercase small d-block opacity-75">Your Bus Number</span>
                <h2 className="fw-bold m-0">{user.bus_no}</h2>
              </div>
              <div className="vr opacity-50" style={{ height: '50px' }}></div>
              <div className="text-center">
                <span className="text-uppercase small d-block opacity-75">Assigned Route</span>
                <h2 className="fw-bold m-0">{user.route_id}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List of Allocated Students */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white fw-bold py-3">
          Students assigned to Bus {user.bus_no}
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">QR / Roll No</th>
                <th>Student Name</th>
                <th>Fee Status</th>
                <th className="text-center">Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((s, idx) => (
                  <tr key={idx}>
                    <td className="ps-4"><strong>{s.qr_code_data || s.roll_no}</strong></td>
                    <td>{s.name}</td>
                    <td>
                      <span className={`badge rounded-pill ${s.fee_status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                        {s.fee_status}
                      </span>
                    </td>
                    <td className="text-center">
                      {s.fee_status === 'Paid' ? 
                        <span className="text-success small fw-bold">Allowed to Board</span> : 
                        <span className="text-danger small fw-bold">Boarding Denied</span>
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No students are currently assigned to this bus/route.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;