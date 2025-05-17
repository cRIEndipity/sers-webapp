import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import {
  FaMapMarkerAlt,
  FaUserShield,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import "./RadarScanner.css";

function RadarScanner() {
  const [sosAlerts, setSosAlerts] = useState([]);
  const [alertPositions, setAlertPositions] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "emergencies"), (snapshot) => {
      const activeAlerts = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((alert) => alert.status === "active"); // Only show active alerts
      setSosAlerts(activeAlerts);

      // Set random positions for new alerts for now (can be updated to real coordinates later)
      const newPositions = {};
      activeAlerts.forEach((alert) => {
        if (!alertPositions[alert.id]) {
          newPositions[alert.id] = {
            top: `${Math.random() * 70 + 15}%`,  // Random top position (15% to 85%)
            left: `${Math.random() * 70 + 15}%`,  // Random left position (15% to 85%)
          };
        } else {
          newPositions[alert.id] = alertPositions[alert.id];
        }
      });
      setAlertPositions(newPositions);
    });

    return () => unsub();
  }, [alertPositions]);

  return (
    <div className="radar-scanner">
      <h2>🚨 Real-time SOS Alerts</h2>

      {/* Radar Display */}
      <div className="radar-container">
        <div className="radar-display">
          <div className="radar-sweep"></div>
          <div className="radar-line horizontal"></div>
          <div className="radar-line vertical"></div>
          <div className="radar-circle inner"></div>
          <div className="radar-circle middle"></div>
          <div className="radar-circle outer"></div>

          {/* Center Radar Blip (rescuer) */}
          <div className="radar-blip" style={{ top: "50%", left: "50%" }}></div>

          {/* SOS Alert Blips */}
          {sosAlerts.map((alert) => (
            <div
              key={alert.id}
              className="radar-blip sos-alert-blip"
              style={{
                top: alertPositions[alert.id]?.top || "50%",
                left: alertPositions[alert.id]?.left || "50%",
              }}
              title={`${alert.name} - ${alert.emergencyType}`}
            >
              <div className="pulse-effect"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="alerts-grid">
        {sosAlerts.length === 0 ? (
          <p>No active alerts.</p>
        ) : (
          sosAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-card ${alert.status === "cancelled" ? "cancelled" : "active"}`}
            >
              <h3>
                <FaUserShield /> {alert.name || "Unknown"}
              </h3>
              <p>
                <FaMapMarkerAlt /> {alert.location || "No location"}
              </p>
              <p>
                <strong>Emergency:</strong> {alert.emergencyType || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {alert.description || "None"}
              </p>
              <p>
                <FaClock /> ETA: {alert.countdown || "?"} mins
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span style={{ color: "red" }}>Active</span>
              </p>
              <p>
                <strong>Assigned Rescuer:</strong> {alert.rescuerName || "Unassigned"}
              </p>
              <p>
                <strong>Distance:</strong> {alert.distance || "?"}
              </p>
              {alert.status === "cancelled" && (
                <div className="cancel-icon">
                  <FaTimesCircle color="gray" size={24} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RadarScanner;
