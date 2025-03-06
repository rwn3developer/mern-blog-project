import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Adminsidebar from '../../components/Adminsidebar';
import Admindetails from '../../components/Usersdetails';

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingOrders: 0,
    revenue: 0,
  });



  return (
    <>
      <Header />
      <div className="container mt-5">

      
        <div className="row mt-5">
          {/* Sidebar Column */}
          <div className="col-sm-12 col-md-3 col-lg-3">
            <Adminsidebar />
          </div>

          {/* Main Content Column */}
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="row">
              {/* Dashboard Card 1 */}
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <p className="card-text">{stats.totalUsers}</p>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>

              {/* Dashboard Card 2 */}
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Pending Orders</h5>
                    <p className="card-text">{stats.pendingOrders}</p>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>

              {/* Dashboard Card 3 */}
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Revenue</h5>
                    <p className="card-text">${stats.revenue}</p>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Dashboard Content or Stats */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Recent Activity</h5>
                    <p className="card-text">View the latest actions on the platform.</p>
                    <a href="#" className="btn btn-secondary">See More</a>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">System Health</h5>
                    <p className="card-text">Monitor the status of the system.</p>
                    <a href="#" className="btn btn-secondary">See More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3"> 
            <Admindetails />
          </div>

        </div>
      </div>
    </>
  );
}

export default Admin;
