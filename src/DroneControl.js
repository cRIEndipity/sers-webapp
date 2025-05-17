import React, { useState } from 'react';
import { FaCamera, FaVideo, FaThermometerHalf, FaSignal, FaMountain, FaTachometerAlt, FaFirstAid, FaHome, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaCrosshairs } from 'react-icons/fa';

const DroneControl = () => {
  const [droneStatus, setDroneStatus] = useState({
    battery: 87,
    signal: 'Strong',
    altitude: 120,
    speed: 15,
    camera: 'On',
    gps: 'Locked',
    status: 'Connected'
  });

  const [dronePosition, setDronePosition] = useState({ x: 60, y: 40 });
  const [activeMode, setActiveMode] = useState('camera'); // 'camera', 'thermal', or 'lidar'

  const moveDrone = (direction) => {
    const moveAmount = 5;
    const newPosition = {...dronePosition};
    
    switch(direction) {
      case 'up': newPosition.y = Math.max(10, newPosition.y - moveAmount); break;
      case 'down': newPosition.y = Math.min(90, newPosition.y + moveAmount); break;
      case 'left': newPosition.x = Math.max(10, newPosition.x - moveAmount); break;
      case 'right': newPosition.x = Math.min(90, newPosition.x + moveAmount); break;
      default: break;
    }
    
    setDronePosition(newPosition);
  };

  return (
    <div className="drone-control">
      <div className="drone-grid">
        <div className="drone-feed">
          <div className="feed-header">
            <h3>Live {activeMode === 'camera' ? 'Camera' : activeMode === 'thermal' ? 'Thermal' : 'LiDAR'} Feed</h3>
            <div className="feed-status">
              <span className={`status-indicator ${droneStatus.status.toLowerCase()}`}>
                {droneStatus.status}
              </span>
            </div>
          </div>
          
          <div className="video-feed">
            <div className="feed-overlay">
              <div className="crosshair"></div>
              <div className="coordinates">
                {dronePosition.x.toFixed(1)}°N, {dronePosition.y.toFixed(1)}°W
              </div>
              <div className="zoom-level">3.5x</div>
            </div>
          </div>
          
          <div className="feed-controls">
            <button className="control-btn"><FaCamera /> Snapshot</button>
            <button className="control-btn"><FaVideo /> Record</button>
            <button 
              className={`control-btn ${activeMode === 'camera' ? 'active' : ''}`}
              onClick={() => setActiveMode('camera')}
            >
              Camera
            </button>
            <button 
              className={`control-btn ${activeMode === 'thermal' ? 'active' : ''}`}
              onClick={() => setActiveMode('thermal')}
            >
              <FaThermometerHalf /> Thermal
            </button>
            <button 
              className={`control-btn ${activeMode === 'lidar' ? 'active' : ''}`}
              onClick={() => setActiveMode('lidar')}
            >
              LiDAR
            </button>
          </div>
        </div>
        
        <div className="drone-info">
          <div className="info-section">
            <h3>Drone Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <div className="status-icon battery">
                  <div className={`fas fa-battery-${droneStatus.battery > 60 ? 'three-quarters' : droneStatus.battery > 30 ? 'half' : 'quarter'}`}></div>
                </div>
                <div className="status-details">
                  <div className="status-label">Battery</div>
                  <div className="status-value">{droneStatus.battery.toFixed(0)}%</div>
                </div>
              </div>
              
              <div className="status-item">
                <div className="status-icon signal">
                  <FaSignal />
                </div>
                <div className="status-details">
                  <div className="status-label">Signal</div>
                  <div className="status-value">{droneStatus.signal}</div>
                </div>
              </div>
              
              <div className="status-item">
                <div className="status-icon altitude">
                  <FaMountain />
                </div>
                <div className="status-details">
                  <div className="status-label">Altitude</div>
                  <div className="status-value">{droneStatus.altitude} ft</div>
                </div>
              </div>
              
              <div className="status-item">
                <div className="status-icon speed">
                  <FaTachometerAlt />
                </div>
                <div className="status-details">
                  <div className="status-label">Speed</div>
                  <div className="status-value">{droneStatus.speed} mph</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h3>Navigation Controls</h3>
            <div className="control-grid">
              <div className="control-row">
                <button 
                  className="control-btn direction" 
                  onClick={() => moveDrone('up')}
                  aria-label="Move drone up"
                >
                  <FaArrowUp />
                </button>
              </div>
              <div className="control-row">
                <button 
                  className="control-btn direction" 
                  onClick={() => moveDrone('left')}
                  aria-label="Move drone left"
                >
                  <FaArrowLeft />
                </button>
                <button className="control-btn center">
                  <FaCrosshairs />
                </button>
                <button 
                  className="control-btn direction" 
                  onClick={() => moveDrone('right')}
                  aria-label="Move drone right"
                >
                  <FaArrowRight />
                </button>
              </div>
              <div className="control-row">
                <button 
                  className="control-btn direction" 
                  onClick={() => moveDrone('down')}
                  aria-label="Move drone down"
                >
                  <FaArrowDown />
                </button>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn emergency">
                <FaFirstAid /> Drop Kit
              </button>
              <button className="action-btn return">
                <FaHome /> Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneControl;