import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Adminsidebar from '../../components/Adminsidebar';
import { FaUsers, FaTasks, FaChartLine } from 'react-icons/fa';  // Importing icons for better UI

const User = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  // Simulate fetching data
  useEffect(() => {
    // Assuming you have an API to fetch this data
    setStats({
      totalUsers: 1200,
      pendingOrders: 40,
      revenue: 25000,
    });
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">User Dashboard</h2>
        <div className="row">
          {/* Sidebar Column */}
          <div className="col-md-3">
            <Adminsidebar />
          </div>

          {/* Main Content Column */}
          <div className="col-md-9">
            <div className="row">
              {/* Dashboard Card 1: Total Users */}
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <FaUsers size={40} className="text-primary mr-3" />
                    <div>
                      <h5 className="card-title">Total Users</h5>
                      <p className="card-text">{stats.totalUsers}</p>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-outline-primary">View Details</a>
                  </div>
                </div>
              </div>

              {/* Dashboard Card 2: Pending Orders */}
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <FaTasks size={40} className="text-warning mr-3" />
                    <div>
                      <h5 className="card-title">Pending Orders</h5>
                      <p className="card-text">{stats.pendingOrders}</p>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-outline-warning">View Details</a>
                  </div>
                </div>
              </div>

              {/* Dashboard Card 3: Revenue */}
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <FaChartLine size={40} className="text-success mr-3" />
                    <div>
                      <h5 className="card-title">Revenue</h5>
                      <p className="card-text">${stats.revenue}</p>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <a href="#" className="btn btn-outline-success">View Details</a>
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

            {/* Task/Project Overview */}
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Manage Projects</h5>
                    <p className="card-text">View, manage, and assign tasks to your team.</p>
                    <a href="#" className="btn btn-info">Manage Projects</a>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* End of Main Content Column */}
        </div> {/* End of Row */}
      </div> {/* End of Container */}
    </>
  );
}

export default User;
