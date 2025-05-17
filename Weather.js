import React, { useState, useEffect } from 'react';
import { 
  FaWind, 
  FaEye, 
  FaExclamationTriangle, 
  FaTint,
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudRain,
  FaBolt,
  FaSnowflake,
  FaBell,
  FaBellSlash,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import './RescueDashboard.css';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: '72°F',
    conditions: 'Partly Cloudy',
    wind: '8 mph NW',
    humidity: '65%',
    visibility: '10 mi',
    pressure: '1012 hPa',
    alerts: [],
    hourlyForecast: [],
    dailyForecast: [],
    location: 'New York, NY',
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [notifications, setNotifications] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [showNotifications, setShowNotifications] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }

    // Try to get user's actual location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Generate realistic weather alerts
  const generateAlerts = (currentCondition) => {
    const alertTypes = [
      { type: 'Severe Thunderstorm', level: 'Warning', color: 'red' },
      { type: 'Flash Flood', level: 'Watch', color: 'orange' },
      { type: 'Winter Storm', level: 'Advisory', color: 'blue' },
      { type: 'Heat', level: 'Advisory', color: 'yellow' },
      { type: 'Tornado', level: 'Warning', color: 'red' }
    ];
    
    const alerts = [];
    
    // Higher chance of alerts during bad weather
    const alertChance = ['Rainy', 'Thunderstorm'].includes(currentCondition) ? 0.3 : 0.05;
    
    if (Math.random() < alertChance) {
      const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      alerts.push({
        ...alert,
        issued: new Date().toLocaleString(),
        expires: new Date(Date.now() + 3600000).toLocaleString(), // 1 hour from now
        description: `${alert.type} ${alert.level} in effect until ${new Date(Date.now() + 3600000).toLocaleTimeString()}. Take necessary precautions.`
      });
    }
    
    return alerts;
  };

  // Generate realistic weather data
  const generateWeatherData = () => {
    const conditions = [
      'Sunny', 'Partly Cloudy', 'Cloudy', 
      'Rainy', 'Thunderstorm', 'Clear', 'Snow'
    ];
    const currentHour = new Date().getHours();
    const isDaytime = currentHour >= 6 && currentHour < 18;
    const month = new Date().getMonth();
    const isWinter = month >= 11 || month <= 2;
    
    // Simulate realistic temperature based on time of day and season
    const baseTemp = isWinter ? 
      (isDaytime ? 35 : 25) : 
      (isDaytime ? 75 : 65);
    
    const tempVariation = Math.sin((currentHour - 6) * Math.PI / 12) * 15;
    const temperature = Math.round(baseTemp + tempVariation + (Math.random() * 4 - 2));
    
    // Weather condition probabilities based on season
    let condition;
    const rand = Math.random();
    
    if (isWinter) {
      if (rand < 0.6) condition = 'Clear';
      else if (rand < 0.8) condition = 'Cloudy';
      else if (rand < 0.95) condition = 'Snow';
      else condition = 'Rainy';
    } else {
      if (isDaytime) {
        if (rand < 0.6) condition = 'Sunny';
        else if (rand < 0.85) condition = 'Partly Cloudy';
        else if (rand < 0.95) condition = 'Cloudy';
        else condition = 'Rainy';
      } else {
        if (rand < 0.7) condition = 'Clear';
        else if (rand < 0.9) condition = 'Partly Cloudy';
        else condition = 'Cloudy';
      }
    }

    // 5% chance of thunderstorm when raining
    if (condition === 'Rainy' && Math.random() < 0.05) {
      condition = 'Thunderstorm';
    }

    const alerts = generateAlerts(condition);
    
    // If there are new alerts, send notifications
    if (alerts.length > 0 && (weatherData.alerts.length === 0 || 
        JSON.stringify(alerts) !== JSON.stringify(weatherData.alerts))) {
      sendAlertNotifications(alerts);
    }

    return {
      temperature: `${temperature}°F`,
      conditions: condition,
      wind: `${Math.round(5 + Math.random() * 15)} mph ${['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)]}`,
      humidity: `${Math.round(40 + Math.random() * 50)}%`,
      visibility: condition === 'Fog' ? 
        `${Math.round(0.1 + Math.random() * 2)} mi` : 
        `${Math.round(5 + Math.random() * 15)} mi`,
      pressure: `${Math.round(980 + Math.random() * 40)} hPa`,
      alerts,
      hourlyForecast: generateHourlyForecast(condition, temperature, isWinter),
      dailyForecast: generateDailyForecast(temperature, isWinter),
      location: userLocation ? `Lat: ${userLocation.lat.toFixed(2)}, Long: ${userLocation.lng.toFixed(2)}` : 'New York, NY',
      lastUpdated: new Date().toLocaleTimeString()
    };
  };

  const generateHourlyForecast = (currentCondition, currentTemp, isWinter) => {
    const forecast = [];
    const now = new Date();
    let currentConditionVar = currentCondition;
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + i * 3600000);
      const hour = time.getHours();
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      
      // Temperature follows a daily pattern
      const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 15;
      const temp = Math.round(currentTemp + tempVariation + (Math.random() * 4 - 2));
      
      // Conditions may change gradually
      const change = Math.random();
      if (change < 0.8) {
        // 80% chance condition stays similar
        if (Math.random() < 0.1) {
          // Small chance to become more or less severe
          if (currentConditionVar === 'Thunderstorm' && Math.random() < 0.5) {
            currentConditionVar = 'Rainy';
          } else if (currentConditionVar === 'Rainy' && Math.random() < 0.3) {
            currentConditionVar = 'Partly Cloudy';
          } else if (currentConditionVar === 'Snow' && Math.random() < 0.3) {
            currentConditionVar = 'Cloudy';
          }
        }
      } else {
        // 20% chance of more significant change
        if (isWinter) {
          currentConditionVar = ['Clear', 'Cloudy', 'Snow'][Math.floor(Math.random() * 3)];
        } else {
          currentConditionVar = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)];
        }
        
        // Small chance of thunderstorm
        if (currentConditionVar === 'Rainy' && Math.random() < 0.1) {
          currentConditionVar = 'Thunderstorm';
        }
      }

      forecast.push({
        time: `${displayHour}${period}`,
        temp,
        condition: currentConditionVar,
        precipitation: currentConditionVar === 'Rainy' || currentConditionVar === 'Thunderstorm' || currentConditionVar === 'Snow' ? 
          `${Math.round(Math.random() * 80)}%` : '0%'
      });
    }
    
    return forecast;
  };

  const generateDailyForecast = (currentTemp, isWinter) => {
    const forecast = [];
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() + i * 86400000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Base temp varies by day with some randomness
      const baseTemp = isWinter ? 
        30 + (Math.random() * 20 - 10) : 
        65 + (Math.random() * 20 - 10);
      
      const high = Math.round(baseTemp + 10 + (Math.random() * 5));
      const low = Math.round(baseTemp - 10 + (Math.random() * 5));
      
      let condition;
      const rand = Math.random();
      
      if (isWinter) {
        if (rand < 0.6) condition = 'Clear';
        else if (rand < 0.8) condition = 'Cloudy';
        else if (rand < 0.95) condition = 'Snow';
        else condition = 'Rainy';
      } else {
        if (rand < 0.6) condition = 'Sunny';
        else if (rand < 0.85) condition = 'Partly Cloudy';
        else if (rand < 0.95) condition = 'Cloudy';
        else condition = 'Rainy';
      }

      forecast.push({
        day: i === 0 ? 'Today' : dayName,
        high,
        low,
        condition,
        precipitation: condition === 'Rainy' || condition === 'Thunderstorm' || condition === 'Snow' ? 
          `${Math.round(20 + Math.random() * 80)}%` : `${Math.round(Math.random() * 20)}%`
      });
    }
    
    return forecast;
  };

  // Send browser notifications for alerts
  const sendAlertNotifications = (alerts) => {
    if (notificationPermission === 'granted') {
      alerts.forEach(alert => {
        new Notification(`Weather ${alert.type} ${alert.level}`, {
          body: alert.description,
          icon: '/weather-warning.png',
          tag: 'weather-alert'
        });
      });
    }
    
    // Add to notifications history
    const newNotifications = alerts.map(alert => ({
      type: alert.type,
      level: alert.level,
      time: new Date().toLocaleTimeString(),
      description: alert.description
    }));
    
    setNotifications(prev => [...newNotifications, ...prev].slice(0, 20)); // Keep last 20
  };

  // Update weather data every 5 minutes
  useEffect(() => {
    const updateWeather = () => {
      setWeatherData(generateWeatherData());
    };
    
    updateWeather(); // Initial load
    const interval = setInterval(updateWeather, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [userLocation]);

  const getWeatherIcon = (condition, size = 'md') => {
    const sizeClass = size === 'lg' ? 'weather-icon-lg' : 'weather-icon';
    
    switch(condition) {
      case 'Sunny': return <FaSun className={`${sizeClass} sunny`} />;
      case 'Partly Cloudy': return <FaCloudSun className={`${sizeClass} partly-cloudy`} />;
      case 'Cloudy': return <FaCloud className={`${sizeClass} cloudy`} />;
      case 'Rainy': return <FaCloudRain className={`${sizeClass} rainy`} />;
      case 'Thunderstorm': return <FaBolt className={`${sizeClass} thunderstorm`} />;
      case 'Snow': return <FaSnowflake className={`${sizeClass} snowy`} />;
      case 'Clear': return <FaSun className={`${sizeClass} clear-night`} />;
      default: return <FaSun className={sizeClass} />;
    }
  };

  return (
    <div className="weather-container">
      {/* Alert Banner */}
      {weatherData.alerts.length > 0 && (
        <div className="weather-alert-banner">
          <FaExclamationTriangle className="alert-icon" />
          <div className="alert-content">
            <h3>{weatherData.alerts[0].type} {weatherData.alerts[0].level}</h3>
            <p>{weatherData.alerts[0].description}</p>
          </div>
        </div>
      )}
      
      <div className="weather-header">
        <div className="location-info">
          <FaMapMarkerAlt className="location-icon" />
          <h2>{weatherData.location}</h2>
          <span className="last-updated">Updated: {weatherData.lastUpdated}</span>
        </div>
        <button 
          className="notification-button"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          {notificationPermission === 'granted' ? 
            <FaBell /> : <FaBellSlash />}
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </button>
      </div>
      
      {/* Notifications Panel */}
      {showNotifications && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>Weather Alerts</h3>
            <button onClick={() => setShowNotifications(false)}>Close</button>
          </div>
          {notifications.length === 0 ? (
            <div className="no-notifications">No recent alerts</div>
          ) : (
            <div className="notifications-list">
              {notifications.map((note, i) => (
                <div key={i} className="notification-item">
                  <div className="notification-header">
                    <span className={`notification-type ${note.level.toLowerCase()}`}>
                      {note.type} {note.level}
                    </span>
                    <span className="notification-time">{note.time}</span>
                  </div>
                  <div className="notification-description">{note.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="weather-current">
        <div className="current-main">
          <div className="current-temp">{weatherData.temperature}</div>
          <div className="current-details">
            <div className="current-conditions">
              {getWeatherIcon(weatherData.conditions, 'lg')}
              <span>{weatherData.conditions}</span>
            </div>
            <div className="current-feels-like">Feels like {weatherData.temperature}</div>
          </div>
        </div>
        
        <div className="current-stats">
          <div className="stat-item">
            <FaWind className="stat-icon" />
            <div>
              <div className="stat-label">Wind</div>
              <div className="stat-value">{weatherData.wind}</div>
            </div>
          </div>
          <div className="stat-item">
            <WiHumidity className="stat-icon" />
            <div>
              <div className="stat-label">Humidity</div>
              <div className="stat-value">{weatherData.humidity}</div>
            </div>
          </div>
          <div className="stat-item">
            <FaEye className="stat-icon" />
            <div>
              <div className="stat-label">Visibility</div>
              <div className="stat-value">{weatherData.visibility}</div>
            </div>
          </div>
          <div className="stat-item">
            <WiBarometer className="stat-icon" />
            <div>
              <div className="stat-label">Pressure</div>
              <div className="stat-value">{weatherData.pressure}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="weather-hourly">
        <h3>Hourly Forecast</h3>
        <div className="hourly-scroll">
          {weatherData.hourlyForecast.map((hour, i) => (
            <div key={i} className="hourly-item">
              <div className="hourly-time">{i === 0 ? 'Now' : hour.time}</div>
              <div className="hourly-icon">
                {getWeatherIcon(hour.condition)}
              </div>
              <div className="hourly-temp">{hour.temp}°</div>
              {(hour.condition === 'Rainy' || hour.condition === 'Thunderstorm' || hour.condition === 'Snow') && (
                <div className="hourly-precipitation">{hour.precipitation}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="weather-daily">
        <h3>7-Day Forecast</h3>
        <div className="daily-list">
          {weatherData.dailyForecast.map((day, i) => (
            <div key={i} className="daily-item">
              <div className="daily-day">{day.day}</div>
              <div className="daily-icon">
                {getWeatherIcon(day.condition)}
                {day.precipitation !== '0%' && (
                  <span className="daily-precipitation">{day.precipitation}</span>
                )}
              </div>
              <div className="daily-temps">
                <span className="daily-high">{day.high}°</span>
                <span className="daily-low">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {weatherData.alerts.length > 0 && (
        <div className="weather-alerts">
          <h3>Active Alerts</h3>
          {weatherData.alerts.map((alert, i) => (
            <div key={i} className={`alert-item ${alert.color}`}>
              <div className="alert-header">
                <FaExclamationTriangle />
                <strong>{alert.type} {alert.level}</strong>
              </div>
              <div className="alert-details">
                <div>Issued: {alert.issued}</div>
                <div>Expires: {alert.expires}</div>
                <p>{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;