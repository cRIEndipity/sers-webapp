import React, { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaExclamationTriangle, 
  FaRunning, 
  FaUserFriends, 
  FaFileMedical,
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
  FaPaperPlane,
  FaDirections
} from 'react-icons/fa';
import './RescueDashboard.css';

const EmergencyAlerts = () => {
  // State for emergencies data
  const [emergencies, setEmergencies] = useState([
    { 
      id: 'SOS001', 
      name: 'Sarah Johnson', 
      location: '34.0522° N, 118.2437° W', 
      time: new Date(Date.now() - 3600000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
      status: 'Active',
      details: 'Drowning incident at beach, needs immediate assistance',
      medicalInfo: 'No known allergies',
      priority: 'Critical',
      type: 'Water Rescue'
    },
    { 
      id: 'SOS002', 
      name: 'Mike Chen', 
      location: '34.0548° N, 118.2498° W', 
      time: new Date(Date.now() - 1800000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
      status: 'Pending',
      details: 'Hiker lost in forest, injured ankle',
      medicalInfo: 'Allergic to penicillin',
      priority: 'High',
      type: 'Wilderness Rescue'
    },
    { 
      id: 'SOS003', 
      name: 'Lisa Garcia', 
      location: '34.0511° N, 118.2376° W', 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
      status: 'Active',
      details: 'Car accident on highway, trapped in vehicle',
      medicalInfo: 'Diabetic',
      priority: 'Critical',
      type: 'Vehicle Extraction'
    }
  ]);

  // State for selected emergency and messages
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [messages, setMessages] = useState({
    'SOS001': [
      { id: 'msg1', sender: 'system', content: 'Help is on the way.', time: '10:24 AM' },
      { id: 'msg2', sender: 'rescuer', content: 'Are you safe?', time: '10:25 AM' },
      { id: 'msg3', sender: 'rescuer', content: 'I\'m approximately 5 minutes out.', time: '10:27 AM' }
    ],
    'SOS002': [],
    'SOS003': [
      { id: 'msg4', sender: 'rescuer', content: 'Please remain calm, I\'m responding to your alert.', time: '11:03 AM' }
    ]
  });
  
  const [newMessage, setNewMessage] = useState('');
  const [notification, setNotification] = useState(null);

  // Simulate receiving new emergency alerts
  useEffect(() => {
    const alertInterval = setInterval(() => {
      // 10% chance of new emergency
      if (Math.random() < 0.1) {
        const newEmergency = generateRandomEmergency();
        setEmergencies(prev => [newEmergency, ...prev]);
        showAlertNotification(newEmergency);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(alertInterval);
  }, []);

  // Generate a random emergency
  const generateRandomEmergency = () => {
    const names = ['Alex Smith', 'Emma Wilson', 'James Brown', 'Olivia Davis', 'William Taylor'];
    const types = ['Water Rescue', 'Wilderness Rescue', 'Vehicle Accident', 'Medical Emergency', 'Fire Incident'];
    const priorities = ['Critical', 'High', 'Medium'];
    const locations = [
      '34.0522° N, 118.2437° W',
      '34.0548° N, 118.2498° W',
      '34.0511° N, 118.2376° W',
      '34.0495° N, 118.2412° W',
      '34.0533° N, 118.2459° W'
    ];
    const details = [
      'Drowning incident requiring immediate assistance',
      'Hiker lost with possible injuries',
      'Vehicle collision with trapped victim',
      'Medical emergency - chest pains',
      'Structural fire with possible victims'
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomDetails = details[Math.floor(Math.random() * details.length)];
    
    return {
      id: `SOS${Math.floor(1000 + Math.random() * 9000)}`,
      name: randomName,
      type: randomType,
      priority: randomPriority,
      location: randomLocation,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'Active',
      details: randomDetails,
      medicalInfo: Math.random() > 0.5 ? 'No known allergies' : 'Allergic to penicillin'
    };
  };

  // Show browser notification for new emergency
  const showAlertNotification = (emergency) => {
    if (Notification.permission === 'granted') {
      new Notification(`New ${emergency.type} Alert`, {
        body: `${emergency.name} - ${emergency.details}`,
        icon: '/emergency-icon.png',
        tag: 'emergency-alert'
      });
    }
    
    // Show in-app notification
    setNotification({
      id: emergency.id,
      message: `New ${emergency.priority} priority alert: ${emergency.type}`,
      emergencyId: emergency.id
    });
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  // Handle emergency status update
  const handleStatusUpdate = (emergencyId, newStatus) => {
    setEmergencies(emergencies.map(emergency => 
      emergency.id === emergencyId ? {...emergency, status: newStatus} : emergency
    ));
    
    if (newStatus === 'Responding') {
      addSystemMessage(emergencyId, `Rescuer is en route to your location`);
    }
  };

  // Handle reassigning emergency
  const handleReassign = (emergencyId) => {
    setEmergencies(emergencies.filter(emergency => emergency.id !== emergencyId));
    addSystemMessage(emergencyId, `This emergency has been reassigned to another team`);
    setSelectedEmergency(null);
  };

  // Add system-generated message
  const addSystemMessage = (emergencyId, content) => {
    const newMsg = {
      id: `msg${Date.now()}`,
      sender: 'system',
      content,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages({
      ...messages,
      [emergencyId]: [...(messages[emergencyId] || []), newMsg]
    });
  };

  // Handle sending a message
  const handleMessageSend = (emergencyId) => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: `msg${Date.now()}`,
        sender: 'rescuer',
        content: newMessage,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages({
        ...messages,
        [emergencyId]: [...(messages[emergencyId] || []), newMsg]
      });
      setNewMessage('');
    }
  };

  // Handle notification click
  const handleNotificationClick = () => {
    if (notification) {
      const emergency = emergencies.find(e => e.id === notification.emergencyId);
      if (emergency) {
        setSelectedEmergency(emergency);
      }
      setNotification(null);
    }
  };

  // Render emergency detail view
  const renderEmergencyDetail = () => (
    <div className="emergency-detail">
      <button 
        className="back-button" 
        onClick={() => setSelectedEmergency(null)}
      >
        <FaArrowLeft /> Back to all alerts
      </button>
      
      <div className="emergency-card">
        <div className="emergency-header">
          <div>
            <h2>{selectedEmergency.name}</h2>
            <div className="emergency-meta">
              <span className={`priority-badge ${selectedEmergency.priority.toLowerCase()}`}>
                {selectedEmergency.priority}
              </span>
              <span className="emergency-type">{selectedEmergency.type}</span>
              <span className="emergency-time">
                <FaClock /> {selectedEmergency.time}
              </span>
            </div>
          </div>
          <span className={`status ${selectedEmergency.status.toLowerCase()}`}>
            {selectedEmergency.status}
          </span>
        </div>
        
        <div className="emergency-info-grid">
          <div className="info-section">
            <h3>Emergency Details</h3>
            <p>{selectedEmergency.details}</p>
          </div>
          
          <div className="info-section">
            <h3>Medical Information</h3>
            <p>{selectedEmergency.medicalInfo || 'None provided'}</p>
          </div>
          
          <div className="info-section">
            <h3>Location</h3>
            <p>
              <FaMapMarkerAlt /> {selectedEmergency.location}
            </p>
            <button className="btn btn-outline">
              <FaDirections /> Get Directions
            </button>
          </div>
        </div>
        
        <div className="messaging">
          <h3>Communication</h3>
          <div className="message-list">
            {messages[selectedEmergency.id]?.length > 0 ? (
              messages[selectedEmergency.id].map(msg => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-header">
                    <span className="message-sender">
                      {msg.sender === 'rescuer' ? 'You' : 'System'}:
                    </span>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))
            ) : (
              <div className="no-messages">No messages yet</div>
            )}
          </div>
          
          <div className="message-input">
            <input 
              type="text" 
              placeholder="Type message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMessageSend(selectedEmergency.id)}
            />
            <button 
              className="btn btn-primary"
              onClick={() => handleMessageSend(selectedEmergency.id)}
              disabled={!newMessage.trim()}
            >
              <FaPaperPlane /> Send
            </button>
          </div>
        </div>
        
        <div className="emergency-actions">
          <button 
            className="btn btn-primary"
            onClick={() => handleStatusUpdate(selectedEmergency.id, 'Responding')}
          >
            <FaRunning /> Respond Now
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleReassign(selectedEmergency.id)}
          >
            <FaUserFriends /> Reassign
          </button>
          <button className="btn btn-outline">
            <FaFileMedical /> Medical Report
          </button>
        </div>
      </div>
    </div>
  );

  // Render emergency list view
  const renderEmergencyList = () => (
    <div className="emergency-list">
      <h2>Active Emergencies</h2>
      {emergencies.filter(e => e.status === 'Active').length > 0 ? (
        <div className="alert-grid">
          {emergencies.filter(e => e.status === 'Active').map(emergency => (
            <div 
              key={emergency.id} 
              className="alert-card"
              onClick={() => setSelectedEmergency(emergency)}
            >
              <div className="alert-header">
                <h3>{emergency.name}</h3>
                <div className="alert-status">
                  <span className={`priority-badge ${emergency.priority.toLowerCase()}`}>
                    {emergency.priority}
                  </span>
                  <span className={`status ${emergency.status.toLowerCase()}`}>
                    {emergency.status}
                  </span>
                </div>
              </div>
              <div className="alert-details">
                <p><FaMapMarkerAlt /> {emergency.location}</p>
                <p><FaClock /> {emergency.time}</p>
                <p className="emergency-type">{emergency.type}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-alerts">No active emergencies at this time</div>
      )}
      
      <h2>Pending Emergencies</h2>
      {emergencies.filter(e => e.status === 'Pending').length > 0 ? (
        <div className="alert-grid">
          {emergencies.filter(e => e.status === 'Pending').map(emergency => (
            <div 
              key={emergency.id} 
              className="alert-card"
              onClick={() => setSelectedEmergency(emergency)}
            >
              <div className="alert-header">
                <h3>{emergency.name}</h3>
                <div className="alert-status">
                  <span className={`priority-badge ${emergency.priority.toLowerCase()}`}>
                    {emergency.priority}
                  </span>
                  <span className={`status ${emergency.status.toLowerCase()}`}>
                    {emergency.status}
                  </span>
                </div>
              </div>
              <div className="alert-details">
                <p><FaMapMarkerAlt /> {emergency.location}</p>
                <p><FaClock /> {emergency.time}</p>
                <p className="emergency-type">{emergency.type}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-alerts">No pending emergencies at this time</div>
      )}
    </div>
  );

  return (
    <div className="emergency-alerts-container">
      {/* Notification banner */}
      {notification && (
        <div 
          className="notification-banner"
          onClick={handleNotificationClick}
        >
          <div className="notification-content">
            <FaExclamationTriangle className="notification-icon" />
            <span>{notification.message}</span>
          </div>
          <div className="notification-timer"></div>
        </div>
      )}
      
      {selectedEmergency ? renderEmergencyDetail() : renderEmergencyList()}
    </div>
  );
};

export default EmergencyAlerts;