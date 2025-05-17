import { useState } from 'react';

// Custom icon components to replace react-icons
const IconMapMarker = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
  </svg>
);

const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 3c2.21 0 4 1.791 4 4s-1.79 4-4 4-4-1.791-4-4 1.79-4 4-4zm0 14c-2.67 0-8 1.335-8 4v1h16v-1c0-2.665-5.33-4-8-4z" />
  </svg>
);

const IconWarning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
  </svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-3.371 2.866-5.484 3-9 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465v-11.535c-3.516 0-5.629-.134-9-3zm0 1.292c2.942 2.31 5.12 2.655 8 2.701v10.542c0 3.891-2.638 4.943-8 8.284-5.375-3.35-8-4.414-8-8.284v-10.542c2.88-.046 5.058-.391 8-2.701zm5 7.739l-5.992 6.623-3.672-3.931.701-.683 3.008 3.184 5.227-5.878.728.685z" />
  </svg>
);

const IconAmbulance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12l-4-4h-3v-4h-4v4h-3l-4 4v8h6v-4h6v4h6v-8zm-18 6h-2v-2h2v2zm2-6h-4v2h6v-1.417l-2-2v1.417zm14 6h-2v-2h2v2zm-10-6v-6h2v6h-2zm6 0h-1.1l-2-2h3.1v2z" />
  </svg>
);

const IconFire = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"> 
    <path d="M12.358 21.792c-3.787-2.193-6.41-3.824-6.41-6.617 0-2.8 1.392-4.208 2.928-4.208.681 0 1.273.271 1.763.782.522.545.85 1.296.923 2.034.216-.592.536-1.266.928-1.757-1.698-1.999-2.353-3.726-1.023-5.95.549-.925 2.463.102 2.106 1.723 1.086-1.557 3.28-.893 2.582 1.372.499-.47 1.4-.442 1.817.007.844.9.226 2.106-.498 3.014 1.36-.874 2.977-1.872 2.374-4.264-.158-.628-.531-.955-.933-1.144.797-.19 1.54-.095 2.052.196 2.355 1.333 1.518 4.492-.486 6.298.266.473.415.988.415 1.526 0 2.793-2.623 4.424-6.41 6.617-.69.4-1.843.4-2.533 0zm3.258-5.772c-1.216-.067-3.176.166-5.051 2.306 1.038-3.16 3.901-3.869 3.901-3.869s.144.869 1.15 1.563zm-1.705-6.838s-1.288.063-2.084.844c-.46.45-.731.975-.925 1.419 0 0 1.915-1.362 3.087-.619l-.078-1.644zm4.09-1.572s-.313.225-.5.544c-.187.325-.312.85-.2 1.088.113.237.699.512.743.388-.044-.125-.075-.731-.044-1.219.03-.494.369-.625.369-.625-.463-.256-.369-.175-.369-.175z" />
  </svg>
);

function EmergencySos() {
  const [userName] = useState('Jane Doe');
  const [userAddress] = useState('Benito Labao St, Barangay Poblacion, Iligan City');
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [sosActivated, setSosActivated] = useState(false);

  const handleSosPress = () => {
    setIsPressed(true);
    
    // Start countdown
    let timer = 3;
    setCountdown(timer);
    
    const countdownInterval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);
      
      if (timer === 0) {
        clearInterval(countdownInterval);
        setSosActivated(true);
        setTimeout(() => {
          setSosActivated(false);
          setIsPressed(false);
        }, 2000);
      }
    }, 1000);
    
    // Clear interval if button is released early
    setTimeout(() => {
      if (isPressed && !sosActivated) {
        clearInterval(countdownInterval);
        setIsPressed(false);
      }
    }, 3000);
  };

  return (
    <div className="emergency-sos-page">
      <div className="glass-container">
        {/* Header */}
        <div className="header">
          <h1>Emergency SOS</h1>
          <p>Immediate assistance at your fingertips</p>
        </div>

        {/* Enhanced SOS Button */}
        <div 
          className="sos-container" 
          onMouseDown={handleSosPress}
          onTouchStart={handleSosPress}
        >
          <div className={`sos-button ${isPressed ? 'pressed' : ''}`}>
            <div className="sos-text">SOS</div>
            <div className="emergency-icon">
              <IconWarning />
            </div>
            {isPressed && !sosActivated && (
              <div className="countdown-overlay">{countdown}</div>
            )}
            {sosActivated && (
              <div className="activated-overlay">
                <span>SENT</span>
              </div>
            )}
          </div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay"></div>
        </div>

        {/* Instruction Text */}
        <div className="instruction-text">
          <h2>{sosActivated ? "Help is on the way!" : "Emergency Activation"}</h2>
          <p>
            {sosActivated 
              ? "Your location has been sent to emergency services" 
              : "Hold the button for 3 seconds to send your location to emergency services"}
          </p>
        </div>

        {/* User Info Card */}
        <div className="user-card">
          <div className="user-info">
            <div className="avatar">
              <IconUser />
            </div>
            <div className="details">
              <h3>{userName}</h3>
              <div className="location">
                <span className="icon"><IconMapMarker /></span>
                <span>{userAddress}</span>
              </div>
            </div>
          </div>
          <button className="edit-btn">Edit</button>
        </div>

        {/* Emergency Contacts */}
        <div className="emergency-contacts">
          <h3>Quick Contacts</h3>
          <div className="contact-buttons">
            <button className="contact-btn police">
              <IconShield /> Police
            </button>
            <button className="contact-btn ambulance">
              <IconAmbulance /> Ambulance
            </button>
            <button className="contact-btn fire">
              <IconFire /> Fire
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="footer-note">
          <p>Your safety is our priority. Stay calm and help is on the way.</p>
        </div>
      </div>
    </div>
  );
}

export default EmergencySos;