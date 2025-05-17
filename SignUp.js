import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from './mylogo.png';
import { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    rescuerType: '', // Add rescuer type
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, email, password, confirmPassword, role, rescuerType } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (role === 'rescuer' && !rescuerType) {
      setError('Please select your rescuer type');
      setLoading(false);
      return;
    }

    // Simulate successful signup
    setTimeout(() => {
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', name);
      navigate(role === 'user' ? '/user-dashboard' : '/rescuer-dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleGoToLogin = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-glass-panel">
        <div className="signup-content-wrapper">
          <div className="signup-hero-section">
            <img src={logo} alt="SERS Logo" className="signup-logo" />
            <div className="signup-hero-text">
              <h1>SMART EMERGENCY RESCUE SYSTEM</h1>
              <p>Join our network of safety responders</p>
            </div>
          </div>
          <div className="signup-form-section">
            <form className="signup-form" onSubmit={handleSubmit}>
              <h2>Create Your Account</h2>
              <p className="signup-subtitle">Register to access emergency services</p>

              {error && <div className="signup-error">{error}</div>}

              <div className="form-group">
                <input
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
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
                      <span key={i} className={`strength-indicator ${passwordStrength > i ? 'active' : ''}`} />
                    ))}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
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

              {formData.role === 'rescuer' && (
                <div className="form-group">
                  <select
                    name="rescuerType"
                    value={formData.rescuerType}
                    onChange={handleChange}
                    className="role-select"
                    required
                  >
                    <option value="">Select your specialty</option>
                    <option value="Doctor">Medical Doctor</option>
                    <option value="Firefighter">Firefighter</option>
                    <option value="Police">Police Officer</option>
                    <option value="Paramedic">Paramedic</option>
                    <option value="Volunteer">Rescue Volunteer</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className={`signup-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? <><span className="spinner" aria-hidden="true"></span> Registering...</> : 'CREATE ACCOUNT'}
              </button>

              <div className="signup-footer">
                <p className="already-have-account">
                  Already have an account?{' '}
                  <button type="button" className="login-link-button" onClick={handleGoToLogin}>
                    Sign in
                  </button>
                </p>
                <p className="copyright">© SERS by Group Alertify</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;