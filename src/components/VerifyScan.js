import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyScan = () => {
  const { studentId } = useParams(); // Grabs the ID from the URL
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Note: use your local IP here as well if testing on a mobile phone
    axios.get(`https://bus-backend-i8yp.onrender.com/api/verify-scan/${studentId}`)
      .then(res => setStudent(res.data))
      .catch(err => setError('Invalid QR Code or Student Not Found.'));
  }, [studentId]);

  if (error) return <div className="alert alert-danger m-5 text-center"><h2>{error}</h2></div>;
  if (!student) return <div className="text-center m-5">Loading...</div>;

  const isPaid = student.fee_status === 'Paid';

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className={`card shadow-lg border-0 text-center p-4 ${isPaid ? 'border-success border-bottom border-5' : 'border-danger border-bottom border-5'}`} style={{width: '350px'}}>
        
        {/* Student Photo */}
        {student.photo ? (
          <img src={student.photo} alt="Student" className="rounded-circle mx-auto mb-3 shadow" style={{width: '120px', height: '120px', objectFit: 'cover'}} />
        ) : (
          <i className="fas fa-user-circle fa-5x text-muted mb-3"></i>
        )}

        <h3 className="fw-bold text-dark">{student.name}</h3>
        <p className="text-muted mb-4">ID: {studentId}</p>

        {/* Access Logic Display */}
        {isPaid ? (
          <div className="alert alert-success fw-bold fs-5">
            <i className="fas fa-check-circle fa-2x d-block mb-2"></i>
            Access Granted: PAID
          </div>
        ) : (
          <div className="alert alert-danger fw-bold fs-5 animate__animated animate__headShake">
            <i className="fas fa-times-circle fa-2x d-block mb-2"></i>
            Not Allowed For Bus Access
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyScan;