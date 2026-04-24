import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyStudent = () => {
  const { studentId } = useParams(); // Gets 'STU-XXXXX' from URL
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Replace 'localhost' with your computer's IP (e.g., 192.168.1.5) so mobile can connect
    axios.get(`https://bus-backend-i8yp.onrender.com/api/verify-scan/${studentId}`)
      .then(res => setStudent(res.data))
      .catch(err => setError(true));
  }, [studentId]);

  if (error) return <div className="p-5 text-center text-danger"><h1>Invalid Pass</h1></div>;
  if (!student) return <div className="p-5 text-center"><h1>Scanning...</h1></div>;

  const isPaid = student.fee_status === 'Paid';

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: '90%', maxWidth: '400px', borderRadius: '25px' }}>
        {/* Status Header */}
        <div className={`p-4 text-center text-white ${isPaid ? 'bg-success' : 'bg-danger'}`} 
             style={{ borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}>
          <h1 className="fw-bold mb-0">{isPaid ? 'ALLOWED' : 'DENIED'}</h1>
          <p className="mb-0 fs-5">Fee Status: {student.fee_status}</p>
        </div>

        <div className="card-body text-center">
          <img src={student.photo} alt="Student" className="rounded-circle mb-3 border border-4 shadow-sm" 
               style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          
          <h2 className="fw-bold mb-1">{student.name}</h2>
          <p className="text-muted fw-bold mb-4">ID: {student.qr_code_data}</p>

          <div className="bg-white rounded-3 p-3 shadow-sm text-start">
            <div className="d-flex justify-content-between border-bottom py-2">
              <span className="text-muted">Bus Number</span>
              <span className="fw-bold">{student.bus_no}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span className="text-muted">Route/Stop</span>
              <span className="fw-bold">{student.route_id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyStudent;