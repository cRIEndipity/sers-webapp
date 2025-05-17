import React, { useState } from 'react'; 
import {
  FaBell,
  FaCloudSun,
  FaMap,
  FaUser,
  FaCog,
  FaSatelliteDish,
  FaPaperPlane
} from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './RescueDashboard.css';

const RescuerDashboard = () => {
  const [rescuerStatus, setRescuerStatus] = useState('Available');
  const [currentRescuer] = useState({
    name: 'John Doe',
    title: 'Dr.',
    specialty: 'Water Rescue',
    avatarInitials: 'JD'
  });
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const toggleRescuerStatus = () => {
    setRescuerStatus(rescuerStatus === 'Available' ? 'Busy' : 'Available');
  };

  return (
    <div className="rescuer-dashboard">
      <header className="main-header">
        <div className="header-content">
          <div className="logo-container">
            <h1 className="logo-title">SERS</h1>
            <h2 className="logo-subtitle">Emergency Rescue System</h2>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="profile-section">
            <div className="profile-avatar">
              <FaUser className="avatar-icon" />
            </div>
            <h3 className="profile-name">Hello {currentRescuer.title} {currentRescuer.name},</h3>
            <p className="profile-role">{currentRescuer.specialty} Rescuer</p>
          </div>

          <nav className="vertical-nav">
            <Link 
              to="/rescuer-dashboard/radar" 
              className={`nav-button ${isActive('radar') ? 'active' : ''}`}
            >
              <FaSatelliteDish />
              <span>Radar Scanner</span>
            </Link>
            
            <Link 
              to="/rescuer-dashboard/emergency-alerts" 
              className={`nav-button ${isActive('emergency-alerts') ? 'active' : ''}`}
            >
              <FaBell />
              <span>Emergency Alerts</span>
            </Link>
            
            <Link 
              to="/rescuer-dashboard/notifications" 
              className={`nav-button ${isActive('notifications') ? 'active' : ''}`}
            >
              <FaBell />
              <span>Notifications</span>
            </Link>
            
            <Link 
              to="/rescuer-dashboard/locations" 
              className={`nav-button ${isActive('locations') ? 'active' : ''}`}
            >
              <FaMap />
              <span>Locations</span>
            </Link>
            
            <Link 
              to="/rescuer-dashboard/weather" 
              className={`nav-button ${isActive('weather') ? 'active' : ''}`}
            >
              <FaCloudSun />
              <span>Weather</span>
            </Link>
            
            <Link 
              to="/rescuer-dashboard/drone-control" 
              className={`nav-button ${isActive('drone-control') ? 'active' : ''}`}
            >
              <FaPaperPlane />
              <span>Drone Control</span>
            </Link>
            
            <Link 
              to="/rescuer-dashboard/settings" 
              className={`nav-button ${isActive('settings') ? 'active' : ''}`}
            >
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="status-container">
            <div className={`status-indicator ${rescuerStatus.toLowerCase()}`}>
              <span>Status: {rescuerStatus}</span>
            </div>
            <button 
              className={`status-toggle-btn ${rescuerStatus === 'Available' ? 'available' : 'busy'}`}
              onClick={toggleRescuerStatus}
            >
              {rescuerStatus === 'Available' ? 'Set as Busy' : 'Set as Available'}
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="content-area">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescuerDashboard;
