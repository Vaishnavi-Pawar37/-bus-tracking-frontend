import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import API_BASE_URL from './api_config';

const BusInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pricingData, setPricingData] = useState([]); 
  const [stats, setStats] = useState({ total_buses: '0', active_routes: '0', bus_nos: '0', total_stops: '0' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://bus-backend-i8yp.onrender.com/admin/data')
      .then(res => {
        if (res.data.busInfo) setPricingData(res.data.busInfo);
        if (res.data.stats) setStats(res.data.stats);
        setLoading(false);
      })
      .catch(err => {
        console.error("Data fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredPricing = pricingData.filter(item =>
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-5">Loading Live Info...</div>;

  return (
    <div className="container py-5">
      <div className="row g-4 text-center mb-5">
        <div className="col-md-3">
          <div className="card shadow-sm p-4 border-bottom border-warning border-4">
            <h3 className="text-warning fw-bold">{stats.total_buses || '0'}</h3>
            <p className="text-muted mb-0">Total Buses</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-4 border-bottom border-primary border-4">
            <h3 className="text-primary fw-bold">{stats.active_routes || '0'}</h3>
            <p className="text-muted mb-0">Active Routes</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-4 border-bottom border-info border-4">
            <h3 className="text-info fw-bold">{stats.bus_nos || '0'}</h3>
            <p className="text-muted mb-0">Active Bus No(s)</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-4 border-bottom border-success border-4">
            <h3 className="text-success fw-bold">{stats.total_stops || '0'}</h3>
            <p className="text-muted mb-0">Designated Stops</p>
          </div>
        </div>
      </div>

      <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '20px' }}>
        <div className="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center">
          <h4 className="m-0 fw-bold">Location Based Pricing</h4>
          <input 
            type="text" 
            className="form-control w-25" 
            placeholder="Search stop..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Pickup Location</th>
                <th>Category</th>
                <th className="text-end pe-4">Annual Fee (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPricing.map((item, index) => (
                <tr key={index}>
                  <td className="ps-4 fw-bold">{item.location}</td>
                  <td><span className="badge bg-secondary opacity-75">{item.type}</span></td>
                  <td className="text-end pe-4 text-primary fw-bold">₹ {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusInfo;