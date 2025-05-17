import React from 'react';
import './INYSeeAll.css';
import { 
  FaFireExtinguisher, 
  FaWater, 
  FaCarCrash, 
  FaMountain, 
  FaFirstAid,
  FaExclamationTriangle,
  FaBolt,
  FaWind,
  FaHouseDamage,
  FaSkullCrossbones,
  FaPeopleCarry
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function INYSeeAll() {
  const navigate = useNavigate();

  const incidents = [
    { id: 1, type: 'Flood', location: 'Barangay Purok-7', description: 'Heavy rains caused significant flooding in the area. Water levels rising rapidly.', distance: '5 km away', severity: 'High' },
    { id: 2, type: 'Fire', location: 'Barangay Hinaplanon', description: 'A fire broke out in a residential area. Evacuation ongoing. 3 houses affected.', distance: '2 km away', severity: 'Critical' },
    { id: 3, type: 'Car Accident', location: 'National Highway', description: 'A multi-vehicle collision causing heavy traffic. Emergency services on site.', distance: '3 km away', severity: 'Medium' },
    { id: 4, type: 'Earthquake', location: 'Near Mount Malindang', description: 'A 5.3 magnitude earthquake felt. Stay alert for aftershocks. Minor structural damage reported.', distance: '10 km away', severity: 'High' },
    { id: 5, type: 'Flood', location: 'Iligan City', description: 'Flash flooding due to continuous rain. Evacuate if needed. Roads impassable.', distance: '8 km away', severity: 'High' },
    { id: 6, type: 'Medical Emergency', location: 'Barangay Poblacion', description: 'Mass casualty incident reported. Multiple injuries requiring urgent attention.', distance: '4 km away', severity: 'Critical' },
    { id: 7, type: 'Hazardous Spill', location: 'Industrial Zone', description: 'Chemical leak detected. Avoid the area. Hazmat team responding.', distance: '7 km away', severity: 'Extreme' },
    { id: 8, type: 'Power Outage', location: 'Downtown Area', description: 'Large-scale power failure affecting 5 barangays. Estimated restoration in 6 hours.', distance: '6 km away', severity: 'Medium' },
    { id: 9, type: 'Typhoon', location: 'Coastal Areas', description: 'Typhoon warning issued. Winds up to 120 km/h expected within 2 hours.', distance: '12 km away', severity: 'High' },
    { id: 10, type: 'Building Collapse', location: 'Commercial District', description: 'Partial building collapse reported. Possible people trapped inside.', distance: '5 km away', severity: 'Critical' },
    { id: 11, type: 'Gas Leak', location: 'Residential Area', description: 'Natural gas leak detected. Evacuation in progress. No open flames.', distance: '3 km away', severity: 'Extreme' },
    { id: 12, type: 'Landslide', location: 'Mountain Village', description: 'Mudslide blocking access road. Several homes at risk.', distance: '9 km away', severity: 'High' },
    { id: 13, type: 'Civil Disturbance', location: 'City Center', description: 'Large protest turning violent. Avoid the area.', distance: '4 km away', severity: 'Medium' },
    { id: 14, type: 'Tsunami Warning', location: 'Coastal Communities', description: 'Tsunami alert after undersea earthquake. Move to higher ground immediately.', distance: '15 km away', severity: 'Extreme' },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'Flood': return <FaWater />;
      case 'Fire': return <FaFireExtinguisher />;
      case 'Car Accident': return <FaCarCrash />;
      case 'Earthquake': return <FaMountain />;
      case 'Medical Emergency': return <FaFirstAid />;
      case 'Hazardous Spill': return <FaSkullCrossbones />;
      case 'Power Outage': return <FaBolt />;
      case 'Typhoon': return <FaWind />;
      case 'Building Collapse': return <FaHouseDamage />;
      case 'Gas Leak': return <FaExclamationTriangle />;
      case 'Landslide': return <FaMountain />;
      case 'Civil Disturbance': return <FaPeopleCarry />;
      case 'Tsunami Warning': return <FaWater />;
      default: return <FaExclamationTriangle />;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FFC107';
      case 'High': return '#FF9800';
      case 'Critical': return '#F44336';
      case 'Extreme': return '#9C27B0';
      default: return '#607D8B';
    }
  };

  return (
    <div className="iny-container">
      <div className="iny-header">
        <h1>Incidents Near You</h1>
        <div className="iny-header-right">
          <span className="iny-count">{incidents.length} Active Incidents</span>
          <button 
            onClick={() => navigate('/user-dashboard')}
            className="iny-back"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="iny-glass">
        {incidents.map((incident) => (
          <div key={incident.id} className="iny-card">
            <div className="iny-icon" style={{ color: getSeverityColor(incident.severity) }}>
              {getIcon(incident.type)}
            </div>

            <div className="iny-info">
              <div className="iny-info-header">
                <h2>{incident.type}</h2>
                <span className="iny-severity" style={{ backgroundColor: getSeverityColor(incident.severity) }}>
                  {incident.severity}
                </span>
              </div>
              <p className="iny-location"><strong>📍 {incident.location}</strong></p>
              <p className="iny-description">{incident.description}</p>
              <div className="iny-footer">
                <span className="distance">📏 {incident.distance}</span>
                <button className="iny-action-btn">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default INYSeeAll;