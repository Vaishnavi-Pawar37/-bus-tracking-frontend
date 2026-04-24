import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import API_BASE_URL from './api_config';

const AdminDashboard = ({ setUser }) => {
  const [data, setData] = useState({ students: [], drivers: [], busInfo: [] });
  const [selectedBus, setSelectedBus] = useState("");
  const [activeTab, setActiveTab] = useState("fee");
  const [newAsset, setNewAsset] = useState({ location: '', price: '', type: 'Main City' });
  
  const [globalStats, setGlobalStats] = useState({ total_buses: '0', active_routes: '0', bus_nos: '0', total_stops: '0' });
  const navigate = useNavigate();

  const fetchData = () => {
    axios.get('https://bus-backend-i8yp.onrender.com/admin/data')
      .then(res => {
        setData(res.data);
        if (res.data.stats) setGlobalStats(res.data.stats);
      })
      .catch(err => console.error("Database connection error:", err));
  };

  useEffect(() => fetchData(), []);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // UPDATED: Convert string inputs to integers to prevent MySQL database crashes
  const handleUpdateStats = async (e) => {
    e.preventDefault();
    try {
      const formattedStats = {
        total_buses: parseInt(globalStats.total_buses) || 0,
        active_routes: parseInt(globalStats.active_routes) || 0,
        total_stops: parseInt(globalStats.total_stops) || 0,
        bus_nos: globalStats.bus_nos
      };
      
      await axios.put('https://bus-backend-i8yp.onrender.com/admin/update-stats', formattedStats);
      alert("Global Dashboard Stats Updated!");
      fetchData(); // Refreshes the data globally immediately 
    } catch (err) {
      console.error(err);
      alert("Failed to update stats: " + (err.response?.data?.error || err.message));
    }
  };

  // UPDATED: Convert price to integer to prevent MySQL database crashes
  const handleAddAsset = async (e) => {
    e.preventDefault();
    try {
      const formattedAsset = {
        location: newAsset.location,
        price: parseInt(newAsset.price) || 0, // Forces price to be a number
        type: newAsset.type
      };

      await axios.post('https://bus-backend-i8yp.onrender.com/admin/add-bus-info', formattedAsset);
      alert("Transport asset added successfully!");
      setNewAsset({ location: '', price: '', type: 'Main City' }); 
      fetchData(); // Refreshes immediately
    } catch (err) {
      console.error(err);
      alert("Error adding asset: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteAsset = (id) => {
    if (window.confirm("Are you sure you want to delete this stop/pricing?")) {
      axios.delete(`https://bus-backend-i8yp.onrender.com/admin/delete-bus-info/${id}`)
        .then(() => fetchData())
        .catch(err => alert("Delete failed."));
    }
  };

  const handleMarkPaid = (id) => {
    axios.put(`https://bus-backend-i8yp.onrender.com/admin/update-fee/${id}`).then(() => fetchData());
  };

  const handleRemoveStudent = (id) => {
    if (window.confirm("Permanent delete? This cannot be undone.")) {
      axios.delete(`https://bus-backend-i8yp.onrender.com/admin/remove-student/${id}`).then(() => fetchData());
    }
  };

  const busNumbers = [...new Set(data.drivers.map(d => String(d.bus_no).trim()))];
  const currentDriver = data.drivers.find(d => String(d.bus_no).trim() === String(selectedBus).trim());
  const filteredStudents = data.students.filter(s => String(s.bus_no).trim() === String(selectedBus).trim());

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="fw-bold text-dark m-0">
          <i className="fas fa-user-shield me-2 text-primary"></i>
          Admin Administration Panel
        </h2>
        <button className="btn btn-danger btn-sm fw-bold shadow-sm px-3" onClick={handleLogout}>
          <i className="fas fa-power-off me-2"></i>Logout
        </button>
      </div>

      <ul className="nav nav-pills nav-fill mb-4 p-1 bg-white shadow-sm rounded border">
        <li className="nav-item">
          <button className={`nav-link py-2 fw-bold ${activeTab === 'fee' ? 'active bg-primary' : 'text-secondary'}`} onClick={() => setActiveTab('fee')}>
            <i className="fas fa-wallet me-2"></i>Student Fee Management
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link py-2 fw-bold ${activeTab === 'reports' ? 'active bg-warning text-dark' : 'text-secondary'}`} onClick={() => setActiveTab('reports')}>
            <i className="fas fa-bus-alt me-2"></i>Bus & Driver Intelligence
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link py-2 fw-bold ${activeTab === 'manage_bus' ? 'active bg-success text-white' : 'text-secondary'}`} onClick={() => setActiveTab('manage_bus')}>
            <i className="fas fa-edit me-2"></i>Edit Bus Info
          </button>
        </li>
      </ul>

      {activeTab === 'fee' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between">
            <span><i className="fas fa-list-ul me-2"></i>Master Student Records</span>
            <span className="small text-warning">Total: {data.students.length}</span>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Roll No</th><th>Student Name</th><th>Bus No</th><th>Fee Status</th><th className="text-center">Administration</th>
                </tr>
              </thead>
              <tbody>
                {data.students.map(s => (
                  <tr key={s.student_id}>
                    <td><strong>{s.roll_no}</strong></td>
                    <td>{s.name}</td>
                    <td><span className="badge bg-secondary">{s.bus_no}</span></td>
                    <td>
                      <span className={`badge rounded-pill ${s.fee_status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                        {s.fee_status}
                      </span>
                    </td>
                    <td className="text-center">
                      {s.fee_status !== 'Paid' ? (
                        <button className="btn btn-success btn-sm me-2 shadow-sm fw-bold" onClick={() => handleMarkPaid(s.student_id)}>
                          <i className="fas fa-check me-1"></i>Mark Paid
                        </button>
                      ) : (
                        <button className="btn btn-light btn-sm me-2 text-success fw-bold" disabled>
                          <i className="fas fa-user-check me-1"></i>Verified
                        </button>
                      )}
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveStudent(s.student_id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="animate__animated animate__fadeIn">
          <div className="card shadow-sm border-0 mb-4 bg-light border-start border-5 border-warning">
            <div className="card-body">
              <label className="form-label fw-bold">Filter View by Bus Number:</label>
              <select className="form-select border-warning shadow-sm" value={selectedBus} onChange={(e) => setSelectedBus(e.target.value)}>
                <option value="">-- Choose a Bus --</option>
                {busNumbers.map((bus, index) => (
                  <option key={index} value={bus}>Bus {bus}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedBus ? (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-12">
                  <div className="card bg-dark text-white shadow border-0 overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row text-center align-items-center">
                        <div className="col-md-4 border-end border-secondary">
                          <span className="text-warning small text-uppercase fw-bold">Assigned Driver</span>
                          <h3 className="m-0 fw-bold">{currentDriver?.name || "No Driver"}</h3>
                        </div>
                        <div className="col-md-4 border-end border-secondary">
                          <span className="text-warning small text-uppercase fw-bold">Route ID</span>
                          <h4 className="m-0">{currentDriver?.route_id || "Main Route"}</h4>
                        </div>
                        <div className="col-md-4">
                          <span className="text-warning small text-uppercase fw-bold">Allocated Stops</span>
                          <h3 className="m-0">{currentDriver?.no_of_stops || 8} <small className="fs-6">Points</small></h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm border-0">
                <div className="card-header bg-secondary text-white fw-bold d-flex justify-content-between">
                  <span><i className="fas fa-users me-2"></i>Students for Bus {selectedBus}</span>
                  <span className="badge bg-light text-dark">{filteredStudents.length} Active</span>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped align-middle mb-0">
                    <thead>
                      <tr><th>Roll No</th><th>Student Name</th><th>Fee Status</th></tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(s => (
                          <tr key={s.student_id}>
                            <td>{s.roll_no}</td>
                            <td className="fw-bold">{s.name}</td>
                            <td>
                              <span className={`badge ${s.fee_status === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                                {s.fee_status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="3" className="text-center py-4 text-muted">No students linked to this bus.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-5 bg-white border rounded shadow-sm">
              <i className="fas fa-bus-alt fa-3x text-light mb-3"></i>
              <h5 className="text-muted">Select a Bus Number from the dropdown to view its live report.</h5>
            </div>
          )}
        </div>
      )}

      {activeTab === 'manage_bus' && (
        <div className="animate__animated animate__fadeIn">
          
          <div className="row g-4 text-center mb-4">
            <div className="col-md-3">
              <div className="card border shadow-sm py-4 rounded-3">
                <h2 className="text-warning fw-bold mb-1">{globalStats.total_buses || '0'}</h2>
                <p className="text-muted mb-0">Total Buses</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border shadow-sm py-4 rounded-3">
                <h2 className="text-primary fw-bold mb-1">{globalStats.active_routes || '0'}</h2>
                <p className="text-muted mb-0">Active Routes</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border shadow-sm py-4 rounded-3">
                <h2 className="text-info fw-bold mb-1">{globalStats.bus_nos || '0'}</h2>
                <p className="text-muted mb-0">Active Bus No(s)</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border shadow-sm py-4 rounded-3">
                <h2 className="text-success fw-bold mb-1">{globalStats.total_stops || '0'}</h2>
                <p className="text-muted mb-0">Designated Stops</p>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4 border-start border-primary border-5">
            <div className="card-header bg-white fw-bold">Update Overview Stats</div>
            <div className="card-body">
              <form onSubmit={handleUpdateStats} className="row g-3">
                <div className="col-md-2">
                  <label className="small fw-bold">Total Buses</label>
                  <input type="text" className="form-control" value={globalStats.total_buses || ''} 
                    onChange={(e) => setGlobalStats({...globalStats, total_buses: e.target.value})} />
                </div>
                <div className="col-md-2">
                  <label className="small fw-bold">Active Routes</label>
                  <input type="text" className="form-control" value={globalStats.active_routes || ''} 
                    onChange={(e) => setGlobalStats({...globalStats, active_routes: e.target.value})} />
                </div>
                <div className="col-md-3">
                  <label className="small fw-bold">Active Bus No(s)</label>
                  <input type="text" className="form-control" placeholder="e.g. 5, 6" value={globalStats.bus_nos || ''} 
                    onChange={(e) => setGlobalStats({...globalStats, bus_nos: e.target.value})} />
                </div>
                <div className="col-md-3">
                  <label className="small fw-bold">Designated Stops</label>
                  <input type="text" className="form-control" value={globalStats.total_stops || ''} 
                    onChange={(e) => setGlobalStats({...globalStats, total_stops: e.target.value})} />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" className="btn btn-primary w-100 fw-bold">Save Stats</button>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-success text-white fw-bold">
              <i className="fas fa-plus-circle me-2"></i>Add New Location & Pricing
            </div>
            <div className="card-body">
              <form onSubmit={handleAddAsset} className="row g-3">
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Location/Stop Name" value={newAsset.location}
                    onChange={(e) => setNewAsset({...newAsset, location: e.target.value})} required />
                </div>
                <div className="col-md-3">
                  <input type="number" className="form-control" placeholder="Annual Fee (₹)" value={newAsset.price}
                    onChange={(e) => setNewAsset({...newAsset, price: e.target.value})} required />
                </div>
                <div className="col-md-3">
                  <select className="form-select" value={newAsset.type} onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}>
                    <option value="Main City">Main City</option>
                    <option value="Suburbs">Suburbs</option>
                    <option value="Extension">Extension</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-success w-100 fw-bold">Add Stop</button>
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white fw-bold">
              <i className="fas fa-map-marked-alt me-2"></i>Active Bus Locations & Fees
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Location Name</th>
                    <th>Area Category</th>
                    <th>Current Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.busInfo && data.busInfo.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.location}</td>
                      <td><span className="badge bg-info text-dark">{item.type}</span></td>
                      <td className="text-primary fw-bold">₹ {item.price}</td>
                      <td className="text-center">
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteAsset(item.id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;