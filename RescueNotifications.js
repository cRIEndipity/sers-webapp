import React, { useState } from 'react';
import './RescueDashboard.css';

const RescueNotifications = () => {
  const [notifications] = useState([
    { id: 'N001', message: 'New SOS alert from Sarah Johnson', time: '10:23 AM', read: false },
    { id: 'N002', message: 'Weather alert: Wind speed increasing', time: '10:30 AM', read: true }
  ]);

  const markNotificationsAsRead = () => {
    // Implementation would go here
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button onClick={markNotificationsAsRead}>Mark all as read</button>
      </div>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))
        ) : (
          <div className="no-notifications">No notifications</div>
        )}
      </div>
    </div>
  );
};

export default RescueNotifications;