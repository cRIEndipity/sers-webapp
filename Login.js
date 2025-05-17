import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './mylogo.png';
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | SERS";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    // Simulate successful login
    setTimeout(() => {
      localStorage.setItem('userRole', formData.role);
      if (localStorage.getItem('termsAccepted') === 'true') {
        navigate(formData.role === 'user' ? '/user-dashboard' : '/rescuer-dashboard');
      } else {
        setShowTermsModal(true);
      }
      setLoading(false);
    }, 1000);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    localStorage.setItem('termsAccepted', 'true');
    setShowTermsModal(false);
    navigate(formData.role === 'user' ? '/user-dashboard' : '/rescuer-dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-glass-panel">
        <div className="login-content-wrapper">
          <div className="login-hero-section">
            <img src={logo} alt="SERS Logo" className="login-logo" />
            <div className="login-hero-text">
              <h1>SMART EMERGENCY RESCUE SYSTEM</h1>
              <p>Empowering swift response for safer communities</p>
            </div>
          </div>

          <div className="login-form-section">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Emergency Access Portal</h2>
              <p className="login-subtitle">Secure login for emergency response</p>

              {error && <div className="login-error">{error}</div>}

              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  placeholder="Registered email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {formData.password && (
                  <div className="password-strength">
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className={`strength-indicator ${formData.password.length > i * 2 ? 'active' : ''}`}
                      ></span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="user">User</option>
                  <option value="rescuer">Rescuer</option>
                </select>
              </div>

              <button
                type="submit"
                className={`login-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'LOGIN TO SYSTEM'}
              </button>

              <div className="login-footer">
                <div className="login-footer-links">
                  <Link to="/forgot-password">Forgot password?</Link>
                  <span>|</span>
                  <Link to="/signup">Sign Up</Link>
                </div>
                <p>© SERS by Group Alertify</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showTermsModal && (
        <div className="terms-modal-overlay">
          <div className="terms-modal">
            <button
              className="terms-close-btn"
              onClick={() => {
                localStorage.removeItem('userRole');
                setShowTermsModal(false);
              }}
            >
              <FaTimes />
            </button>

            <div className="terms-header">
              <FaExclamationTriangle className="terms-icon" />
              <h2>Terms of Service & Privacy Policy</h2>
            </div>

            <div className="terms-content">
              <h3>Emergency Response System Agreement</h3>
              <p>By using the Smart Emergency Rescue System (SERS), you agree to the following terms:</p>

              <h4>1. Data Collection and Use</h4>
              <ul>
                <li><FaCheckCircle /> We collect your location data during emergencies</li>
                <li><FaCheckCircle /> Contact info is shared when you activate SOS</li>
                <li><FaCheckCircle /> Data is encrypted and secure</li>
              </ul>

              <h4>2. User Responsibilities</h4>
              <ul>
                <li><FaCheckCircle /> Use SOS only in real emergencies</li>
                <li><FaCheckCircle /> False reports may lead to penalties</li>
                <li><FaCheckCircle /> Keep your credentials safe</li>
              </ul>

              <h4>3. Limitations</h4>
              <ul>
                <li><FaCheckCircle /> Response may vary depending on location</li>
                <li><FaCheckCircle /> Availability isn't guaranteed in all areas</li>
              </ul>

              <h4>4. Privacy</h4>
              <ul>
                <li><FaCheckCircle /> We follow the PH Data Privacy Act</li>
                <li><FaCheckCircle /> No third-party data sales</li>
              </ul>

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="acceptTerms">
                  I have read and agree to these terms and understand the consequences of misuse.
                </label>
              </div>
            </div>

            <div className="terms-footer">
              <button
                className="terms-accept-btn"
                onClick={handleAcceptTerms}
                disabled={!termsAccepted}
              >
                Accept and Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;