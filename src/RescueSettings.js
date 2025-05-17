import React, { useState } from 'react';
import './RescueDashboard.css';

export function SettingsContent() {
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+639123456789',
    emergencyContact: 'John Doe - +639876543210',
    location: 'Manila, Philippines',
    locationSharing: true,
    notifications: true,
    darkMode: false
  });

  const [showPolicy, setShowPolicy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Personal information updated successfully!');
  };

  const handleLogout = () => {
    alert('You have been logged out');
  };

  const handleDeleteAccount = () => {
    alert('Account deletion request submitted');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2 className="settings-title">Account Settings</h2>
        <div className="settings-header-actions">
          <button 
            className="help-button"
            onClick={() => setShowHelp(true)}
          >
            <i className="fas fa-question-circle"></i> Help
          </button>
          <button 
            className="policy-button"
            onClick={() => setShowPolicy(true)}
          >
            <i className="fas fa-file-alt"></i> Policy
          </button>
        </div>
      </div>
      
      <div className="settings-grid">
        {/* Personal Information Section */}
        <div className="settings-section personal-info-section">
          <div className="section-header">
            <h3>Personal Information</h3>
            {!isEditing ? (
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i> Update Information
              </button>
            ) : (
              <button 
                className="save-btn"
                onClick={handleSubmit}
              >
                <i className="fas fa-save"></i> Save Changes
              </button>
            )}
          </div>
          
          {isEditing ? (
            <form className="edit-form">
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
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          ) : (
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <div className="info-value">{userData.name}</div>
              </div>
              <div className="info-item">
                <label>Email</label>
                <div className="info-value">{userData.email}</div>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <div className="info-value">{userData.phone}</div>
              </div>
              <div className="info-item">
                <label>Emergency Contact</label>
                <div className="info-value">{userData.emergencyContact}</div>
              </div>
              <div className="info-item">
                <label>Location</label>
                <div className="info-value">
                  <i className="fas fa-map-marker-alt"></i> {userData.location}
                </div>
              </div>
            </div>
          )}

          <div className="danger-zone">
            <h4>Danger Zone</h4>
            <div className="danger-actions">
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Log Out
              </button>
              <button 
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <i className="fas fa-trash-alt"></i> Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Preferences Section */}
        <div className="settings-section privacy-section">
          <h3>Privacy & Preferences</h3>
          <div className="settings-options">
            <div className="option-item">
              <div className="option-text">
                <h4>Location Sharing</h4>
                <p>Allow system to access your location during emergencies</p>
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Account Deletion</h3>
              <button 
                className="close-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <p>All your data will be permanently erased from our systems.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-button"
                onClick={handleDeleteAccount}
              >
                Delete Account Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Modal */}
      {showPolicy && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>System Policy</h3>
              <button 
                className="close-button"
                onClick={() => setShowPolicy(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <h4>Data Collection Policy</h4>
              <p>1. We collect only necessary information for emergency response.</p>
              <p>2. Location data is used solely during active emergencies.</p>
              <p>3. Personal information is encrypted and stored securely.</p>
              
              <h4>Terms of Service</h4>
              <p>1. By using this service, you agree to provide accurate information.</p>
              <p>2. False emergency reports may result in account suspension.</p>
              <p>3. The service is provided "as is" without warranties.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="agree-button"
                onClick={() => setShowPolicy(false)}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Help Center</h3>
              <button 
                className="close-button"
                onClick={() => setShowHelp(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <h4>Account Settings</h4>
              <p>• Update your personal information as needed</p>
              <p>• Ensure emergency contact details are current</p>
              
              <h4>Privacy Settings</h4>
              <p>• Location sharing enables faster emergency response</p>
              <p>• Notifications keep you informed of critical updates</p>
              
              <h4>Contact Support</h4>
              <p>Email: support@rescue-system.com</p>
              <p>Phone: +1 (800) RES-CUE</p>
            </div>
            <div className="modal-footer">
              <button 
                className="agree-button"
                onClick={() => setShowHelp(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsContent;
// RescueSettings.js