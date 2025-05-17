import './UserDashboard.css';
import { useState, useEffect } from 'react';
import {
  FaHome, FaMapMarkerAlt, FaBell, FaComments, FaCog, FaSearch,
  FaExclamationCircle, FaWater, FaFireExtinguisher, FaCarCrash,
  FaWalking, FaFireAlt, FaUser, FaAmbulance, FaShieldAlt, FaLifeRing,
  FaProcedures, FaTree, FaBolt, FaHeartbeat, FaUserCircle, FaPhone,
  FaClock, FaMapPin, FaFirstAid, FaPaperPlane, FaCheckCircle, 
  FaExclamationTriangle, FaTimes, FaInfoCircle, FaRadar, FaCloudSun,
  FaDrone, FaArrowLeft, FaArrowUp, FaArrowDown, FaArrowRight,
  FaCrosshairs, FaSun, FaCloud, FaCloudRain, FaSnowflake,
  FaTint, FaEye, FaThermometerHalf, FaSignal, FaMountain,
  FaTachometerAlt, FaBatteryThreeQuarters, FaBatteryHalf,
  FaBatteryQuarter, FaCamera, FaVideo, FaUsers, FaUserMd,
  FaUserShield, FaUserTie, FaUserNurse, FaUserInjured,
  FaHospital, FaClinicMedical, FaFirstdraft, FaParachuteBox,
  FaHardHat, FaHelmetSafety, FaHouseDamage, FaRoad,
  FaTrafficLight, FaSkullCrossbones, FaBiohazard,
  FaRadiation, FaWind, FaVolcano, FaMeteor, FaTornado, FaBuilding
} from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { db } from './firebase';  // Correct path if firebase.js is in the same src/ directory
import { addDoc, collection, Timestamp, doc, deleteDoc } from "firebase/firestore";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import fireIconImg from './fire-icon.png';
import floodIconImg from './flood-icon.png';
import medicalIconImg from './medical-icon.png';
import rescuerMarkerIcon from './rescuergps.png';
import userMarkerIcon from './usergps-icon.png';

// Icons for incidents
const fireIcon = new L.Icon({
  iconUrl: fireIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const floodIcon = new L.Icon({
  iconUrl: floodIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const medicalIcon = new L.Icon({
  iconUrl: medicalIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function DashboardSidebar({ userName }) {
  return (
    <div className="dashboard-sidebar">
      <div className="profile-section">
        <div className="profile-avatar">
          <FaUserCircle className="avatar-icon" size={40} />
        </div>
        <h3 className="profile-name">Hello {userName},</h3>
      </div>
      <nav className="vertical-nav">
        <Link to="/user-dashboard" className="nav-button">
          <FaHome size={20} />
          <span>Home</span>
        </Link>
        <Link to="/user-dashboard/location" className="nav-button">
          <FaMapMarkerAlt size={20} />
          <span>Location</span>
        </Link>
        <Link to="/user-dashboard/notifications" className="nav-button">
          <FaBell size={20} />
          <span>Notifications</span>
        </Link>
        <Link to="/user-dashboard/chat" className="nav-button">
          <FaComments size={20} />
          <span>Chat</span>
        </Link>
        <Link to="/user-dashboard/settings" className="nav-button">
          <FaCog size={20} />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="sos-container">
        <Link to="/user-dashboard/sos" className="sos-link">
          <button className="sos-button">
            <div className="sos-text">
              <p className="sos-title">EMERGENCY SOS</p>
              <p className="sos-subtitle">Tap for emergency help</p>
            </div>
            <FaExclamationCircle className="sos-icon" size={30} />
          </button>
        </Link>
      </div>
    </div>
  );
}

function UserDashboard() {
  const [userName] = useState('Jane');
  return (
    <div className="user-dashboard">
      <div className="dashboard-glass-panel">
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="sers-title">SERS</h1>
            <p className="subtitle">Stay safe with us</p>
          </div>
          <div className="header-right">
            <div className="weather-box">
              <p><FaSun /> 29°C</p>
              <p>Partly Cloudy</p>
              <p>Iligan City</p>
            </div>
          </div>
        </header>
        <div className="dashboard-main">
          <DashboardSidebar userName={userName} />
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeContent() {
  return (
    <>
      <div className="search-bar-container">
        <FaSearch className="search-icon" size={20} />
        <input type="text" className="search-bar" placeholder="Search for help, tips, or alerts..." />
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2><FaExclamationTriangle className="section-icon" /> Incident Near You</h2>
          <Link to="/iny-seeall" className="see-all">See All</Link>
        </div>
        <div className="section-cards">
          <div className="card">
            <div className="icon-container flood">
              <FaWater size={40} />
            </div>
            <div className="card-content">
              <h3>Flood Alert</h3>
              <p><FaClock /> Reported 5 km away | Updated 30 mins ago</p>
              <p>Heavy rain has caused flooding in Barangay Pala-o. Water levels rising rapidly.</p>
            </div>
          </div>
          <div className="card">
            <div className="icon-container fire">
              <FaFireAlt size={40} />
            </div>
            <div className="card-content">
              <h3>Fire Incident</h3>
              <p><FaClock /> Reported 2 km away | Updated 15 mins ago</p>
              <p>Commercial fire at Del Carmen Street. Fire department responding.</p>
            </div>
          </div>
          <div className="card">
            <div className="icon-container landslide">
              <FaMountain size={40} />
            </div>
            <div className="card-content">
              <h3>Landslide Warning</h3>
              <p><FaClock /> Reported 7 km away | Updated 1 hour ago</p>
              <p>Heavy rains have increased landslide risk in hilly areas. Avoid mountain roads.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2><FaMapMarkerAlt className="section-icon" /> Nearby Rescue Locations</h2>
          <Link to="/iny-seeall" className="see-all">See All</Link>
        </div>
        <div className="rescue-container">
          <div className="rescue-item">
            <div className="rescue-location">Iligan City Fire Station</div>
            <div className="rescue-address"><FaMapPin /> Benito Labao St, Barangay Poblacion, Iligan City</div>
            <div className="big-location-icon"><FaFireExtinguisher size={50} /></div>
            <div className="rescue-distance">10km away from you</div>
          </div>
          <div className="rescue-item">
            <div className="rescue-location">Barangay Rescue Unit</div>
            <div className="rescue-address"><FaMapPin /> Barangay Purok-7, Hinaplanon, Iligan City</div>
            <div className="big-location-icon"><FaFirstAid size={50} /></div>
            <div className="rescue-distance">5km away from you</div>
          </div>
          <div className="rescue-item">
            <div className="rescue-location">City Disaster Risk Reduction Office</div>
            <div className="rescue-address"><FaMapPin /> City Hall Complex, Pala-o, Iligan City</div>
            <div className="big-location-icon"><FaShieldAlt size={50} /></div>
            <div className="rescue-distance">8km away from you</div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2><FaUsers className="section-icon" /> Available Rescue Teams</h2>
          <Link to="/art-seeall" className="see-all">See All</Link>
        </div>
        <div className="section-cards">
          <div className="card">
            <div className="icon-container medical">
              <FaAmbulance size={40} />
              <FaUserMd className="overlay-icon" size={20} />
            </div>
            <div className="card-content">
              <h3>Medic Team Alpha</h3>
              <p><FaCheckCircle className="available-icon" /> Ready to respond | 2 ambulances available</p>
              <p><FaUserMd /> 5 medical personnel | <FaHospital /> Base: Iligan City Hospital</p>
            </div>
          </div>
          <div className="card">
            <div className="icon-container fire">
              <FaFireExtinguisher size={40} />
              <FaUserShield className="overlay-icon" size={20} />
            </div>
            <div className="card-content">
              <h3>Fire Department Bravo</h3>
              <p><FaCheckCircle className="available-icon" /> Available now | 3 fire trucks ready</p>
              <p><FaUserShield /> 12 firefighters | <FaBuilding /> Base: Central Fire Station</p>
            </div>
          </div>
          <div className="card">
            <div className="icon-container rescue">
              <FaHardHat size={40} />
              <FaUserTie className="overlay-icon" size={20} />
            </div>
            <div className="card-content">
              <h3>Search & Rescue Team</h3>
              <p><FaCheckCircle className="available-icon" /> On standby | Specialized in urban rescue</p>
              <p><FaUserTie /> 8 rescuers | <FaClinicMedical /> Base: CDRRMO Office</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2><FaFirstAid className="section-icon" /> Safety Tips and Aid</h2>
          <Link to="/iny-seeall" className="see-all">See All</Link>
        </div>
        <div className="safety-container">
          <div className="safety-item">
            <div className="safety-location-icon"><FaCarCrash size={80} /></div>
            <div className="safety-location">Car Accident</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaFireAlt size={80} /></div>
            <div className="safety-location">Fire Burn</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaWalking size={80} /></div>
            <div className="safety-location">Sprain/Strain</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaProcedures size={80} /></div>
            <div className="safety-location">Choking</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaLifeRing size={80} /></div>
            <div className="safety-location">CPR Basics</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaShieldAlt size={80} /></div>
            <div className="safety-location">Earthquake</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaBolt size={80} /></div>
            <div className="safety-location">Electric Shock</div>
          </div>
          <div className="safety-item">
            <div className="safety-location-icon"><FaHeartbeat size={80} /></div>
            <div className="safety-location">Heart Attack</div>
          </div>
        </div>
      </div>
    </>
  );
}

// Location Content Component
// Function to get the correct incident icon based on the type
const getIncidentIcon = (type) => {
  switch (type) {
    case 'fire':
      return fireIcon;
    case 'flood':
      return floodIcon;
    case 'medical':
      return medicalIcon;
    default:
      return null;
  }
};

export function LocationContent() {
  const incidentIcons = {
    fire: <FaFireExtinguisher />,
    flood: <FaWater />,
    medical: <FaHeartbeat />
  };

  const [rescuerLocation, setRescuerLocation] = useState({
    lat: 8.2417,
    lng: 124.2450,
    name: "Rescuer Team Alpha",
    eta: "12 minutes",
    status: "En route",
    distance: "3.2 km"
  });

  const userLocation = {
    lat: 8.2298,
    lng: 124.2450
  };

  const nearbyIncidents = [
    { id: 1, type: "flood", location: "Pala-o", lat: 8.2405, lng: 124.2500 },
    { id: 2, type: "fire", location: "Tibanga", lat: 8.2350, lng: 124.2400 },
    { id: 3, type: "medical", location: "Hinaplanon", lat: 8.2450, lng: 124.2550 }
  ];

  // Simulate rescuer moving every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRescuerLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rescuer and user marker icons
  const rescuerIcon = new L.Icon({
    iconUrl: rescuerMarkerIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [5, -25]
  });

  const userIcon = new L.Icon({
    iconUrl: userMarkerIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [5, -25]
  });

  return (
    <div className="location-container">
      <div className="location-header">
        <h2>Rescuer Tracking</h2>
        <div className="location-status">
          <span className={`status-badge ${rescuerLocation.status.toLowerCase().replace(' ', '-')}`}>
            {rescuerLocation.status}
          </span>
          <span className="eta-display">ETA: {rescuerLocation.eta}</span>
        </div>
      </div>

      <div className="map-container" style={{ height: "400px", width: "100%", borderRadius: "15px", marginBottom: "20px" }}>
        <MapContainer center={[rescuerLocation.lat, rescuerLocation.lng]} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[rescuerLocation.lat, rescuerLocation.lng]} icon={rescuerIcon}>
            <Popup>{rescuerLocation.name} - {rescuerLocation.status}</Popup>
          </Marker>
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
          {nearbyIncidents.map((incident) => (
            <Marker key={incident.id} position={[incident.lat, incident.lng]} icon={getIncidentIcon(incident.type)}>
              <Popup>
                {incident.type.toUpperCase()} - {incident.location}
                <div>{incidentIcons[incident.type]}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Rescuer Info Card */}
      <div className="rescuer-info-card">
        <div className="rescuer-avatar"><FaUserCircle /></div>
        <div className="rescuer-details">
          <h3>{rescuerLocation.name}</h3>
          <div className="rescuer-stats">
            <div className="stat-item"><FaClock className="stat-icon" /><span>ETA: {rescuerLocation.eta}</span></div>
            <div className="stat-item"><FaMapMarkerAlt className="stat-icon" /><span>Distance: {rescuerLocation.distance}</span></div>
          </div>
        </div>
        <button className="call-rescuer"><FaPhone /> Call</button>
      </div>

      {/* Nearby Incidents */}
      <div className="incidents-section">
        <h3>Nearby Incidents</h3>
        <div className="incidents-list">
          {nearbyIncidents.map(incident => (
            <div key={incident.id} className="incident-item">
              <div className={`incident-icon ${incident.type}`}>
                {incidentIcons[incident.type]}
              </div>
              <div className="incident-info">
                <h4>{incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Alert</h4>
                <p><FaMapPin /> {incident.location}</p>
              </div>
              <div className={`incident-status ${incident.status}`}>
                {incident.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Notifications Content Component
export function NotificationsContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "emergency",
      title: "Flood Warning",
      message: "Flood alert issued for your area. Water levels rising.",
      time: "10 mins ago",
      read: false
    },
    {
      id: 2,
      type: "rescuer",
      title: "Rescuer Assigned",
      message: "Team Alpha has been assigned to your emergency.",
      time: "25 mins ago",
      read: true
    },
    {
      id: 3,
      type: "system",
      title: "System Update",
      message: "New safety features available in your area.",
      time: "2 hours ago",
      read: true
    },
    {
      id: 4,
      type: "emergency",
      title: "Fire Alert",
      message: "Fire reported 3km from your location.",
      time: "45 mins ago",
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.read;
    return n.type === activeTab;
  });

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button 
          className="mark-all-read"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>

      <div className="notifications-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread
        </button>
        <button 
          className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          Emergency
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {notification.type === "emergency" && <FaExclamationTriangle />}
                {notification.type === "rescuer" && <FaUserCircle />}
                {notification.type === "system" && <FaCog />}
              </div>
              <div className="notification-content">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-footer">
                  <span className="notification-time">{notification.time}</span>
                  {!notification.read && <span className="unread-badge">New</span>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <FaInfoCircle className="info-icon" />
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Chat Content Component
export function ChatContent() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'rescuer', 
      text: 'Hello Jane, this is Team Alpha. We are on our way to your location.', 
      time: '10:30 AM',
      status: 'read'
    },
    { 
      id: 2, 
      sender: 'user', 
      text: 'Thank you! How long until you arrive?', 
      time: '10:32 AM',
      status: 'sent'
    },
    { 
      id: 3, 
      sender: 'rescuer', 
      text: 'Approximately 12 minutes. Please stay where you are.', 
      time: '10:33 AM',
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        const responseMsg = {
          id: messages.length + 2,
          sender: 'rescuer',
          text: 'We can see your location. Please stay safe.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
        setMessages(prev => [...prev, responseMsg]);
      }, 2000);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="rescuer-info">
          <div className="rescuer-avatar">
            <FaUserCircle />
          </div>
          <div>
            <h3>Rescuer Team Alpha</h3>
            <div className="rescuer-status">
              <span className="status-dot"></span>
              <span>Active now</span>
            </div>
          </div>
        </div>
        <button className="call-button">
          <FaPhone />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'rescuer' && (
              <div className="rescuer-avatar">
                <FaUserCircle />
              </div>
            )}
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <div className="message-meta">
                <span className="message-time">{message.time}</span>
                {message.sender === 'user' && (
                  <span className={`message-status ${message.status}`}>
                    {message.status === 'read' ? <FaCheckCircle /> : <FaCheckCircle />}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="chat-input"
        />
        <button 
          onClick={handleSendMessage}
          className="send-button"
          disabled={!newMessage.trim()}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

// Settings Content Component
export function SettingsContent() {
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+639123456789',
    emergencyContact: 'John Doe - +639876543210',
    locationSharing: true,
    notifications: true,
    darkMode: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Account Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Personal Information</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={userData.emergencyContact}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy & Preferences</h3>
          <div className="settings-options">
            <div className="option-item">
              <div className="option-text">
                <h4>Location Sharing</h4>
                <p>Allow SERS to access your location during emergencies</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="locationSharing"
                  checked={userData.locationSharing}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="option-item">
              <div className="option-text">
                <h4>Notifications</h4>
                <p>Receive emergency alerts and updates</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={userData.notifications}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="option-item">
              <div className="option-text">
                <h4>Dark Mode</h4>
                <p>Switch to dark color scheme</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={userData.darkMode}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button type="button" className="logout-button">
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
}

// SOS content component
export function SOSContent() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [location, setLocation] = useState("");
  const [docId, setDocId] = useState(null); // 🔥 Track document ID

  const [emergencyDetails, setEmergencyDetails] = useState({
    name: "",
    emergencyType: "",
    description: "",
    location: "",
  });

  const [userId] = useState("user123"); // Replace with real user ID
  const [rescueData] = useState({
    rescuerName: "Team Alpha",
    eta: countdown,
    distance: "3.2 km",
  });

  const handleInputChange = (e) => {
    setEmergencyDetails({ ...emergencyDetails, [e.target.name]: e.target.value });
  };

  const submitEmergencyDetails = async () => {
    const { name, emergencyType, description, location } = emergencyDetails;
    if (name && emergencyType && location && description) {
      setLocation(location);
      setEmergencyActive(true);
      setIsFormVisible(false);

      const docRef = await addDoc(collection(db, "emergencies"), {
        userId,
        name,
        emergencyType,
        description,
        location,
        status: "active",
        countdown,
        rescuerName: rescueData.rescuerName,
        distance: rescueData.distance,
        timestamp: Timestamp.now(),
      });

      setDocId(docRef.id); // ✅ Save the generated document ID
    }
  };

  useEffect(() => {
    if (emergencyActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, emergencyActive]);

  const cancelEmergency = async () => {
    setEmergencyActive(false);
    setCountdown(5);
    setEmergencyDetails({ name: "", emergencyType: "", description: "", location: "" });

    if (docId) {
      const sosRef = doc(db, "emergencies", docId);
      await deleteDoc(sosRef); // ✅ Delete the exact doc
      setDocId(null);
    }
  };

  return (
    <div className="sos-container">
      {!emergencyActive && isFormVisible && (
        <div className="sos-form">
          <h2>Fill out Emergency Form</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitEmergencyDetails();
            }}
          >
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" value={emergencyDetails.name} onChange={handleInputChange} required />

            <label htmlFor="emergencyType">Type of Emergency:</label>
            <input type="text" id="emergencyType" name="emergencyType" value={emergencyDetails.emergencyType} onChange={handleInputChange} required />

            <label htmlFor="description">What Happened?</label>
            <textarea id="description" name="description" value={emergencyDetails.description} onChange={handleInputChange} required />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={emergencyDetails.location} onChange={handleInputChange} required />

            <button type="submit">Activate SOS</button>
          </form>
        </div>
      )}

      {emergencyActive && (
        <>
          <div className="sos-alert">
            <div className="sos-icon"><FaExclamationCircle /></div>
            <h2>EMERGENCY ALERT ACTIVATED</h2>
            <p>Help is arriving in approximately {countdown} minutes</p>
          </div>

          <div className="sos-info-grid">
            <div className="info-card rescuer-info">
              <h3>Your Rescuer</h3>
              <div className="rescuer-details">
                <div className="rescuer-avatar"><FaUserCircle /></div>
                <div>
                  <p className="rescuer-name">{rescueData.rescuerName}</p>
                  <p className="rescuer-status">En route to your location</p>
                </div>
              </div>
              <div className="rescuer-stats">
                <div className="stat-item"><FaClock /> ETA: {rescueData.eta} mins</div>
                <div className="stat-item"><FaMapPin /> {rescueData.distance} away</div>
              </div>
            </div>

            <div className="info-card location-info">
              <h3>Your Location</h3>
              <p>{location}</p>
              <div className="mini-map"><FaMapPin /></div>
            </div>
          </div>

          <div className="sos-actions">
            <button className="cancel-button" onClick={cancelEmergency}>
              <FaTimes /> Cancel Emergency
            </button>
            <button className="call-button">
              <FaPhone /> Call Emergency Services
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDashboard;
