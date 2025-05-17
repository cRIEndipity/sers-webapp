import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import Login from './Login'; 
import SignUp from './SignUp';
import UserDashboard, { 
  HomeContent, 
  LocationContent, 
  NotificationsContent, 
  ChatContent, 
  SettingsContent, 
  SOSContent 
} from './UserDashboard';
import RescuerDashboard from './RescueDashboard';
import INYSeeAll from './INYSeeAll';
import EmergencySOS from './EmergencySos';
import ARTSeeAll from './ARTSeeAll';

// Import rescuer pages
import RadarScanner from './RadarScanner';
import EmergencyAlerts from './EmergencyAlerts';
import RescueNotifications from './RescueNotifications';
import RescueLocations from './RescueLocations';
import DroneControl from './DroneControl';
import Weather from './Weather';
import RescueSettings from './RescueSettings';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* User Dashboard with nested routes */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route index element={<HomeContent />} />
          <Route path="location" element={<LocationContent />} />
          <Route path="notifications" element={<NotificationsContent />} />
          <Route path="chat" element={<ChatContent />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route path="sos" element={<SOSContent />} />
        </Route>
        
        {/* Rescuer Dashboard with nested routes */}
        <Route path="/rescuer-dashboard" element={<RescuerDashboard />}>
          <Route index element={<RadarScanner />} />
          <Route path="radar" element={<RadarScanner />} />
          <Route path="emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="notifications" element={<RescueNotifications />} />
          <Route path="locations" element={<RescueLocations />} />
          <Route path="drone-control" element={<DroneControl />} />
          <Route path="weather" element={<Weather />} />
          <Route path="settings" element={<RescueSettings />} />
        </Route>
        
        <Route path="/iny-seeall" element={<INYSeeAll />} />
        <Route path="/sos" element={<EmergencySOS />} />
        <Route path="/art-seeall" element={<ARTSeeAll />} />
      </Routes>
    </Router>
  );
}

export default App;