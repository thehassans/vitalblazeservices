import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Shield, Zap, Star, Sparkles } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Animated Background Elements */}
      <div className="login-bg-gradient"></div>
      <div className="login-bg-blur login-bg-blur-1"></div>
      <div className="login-bg-blur login-bg-blur-2"></div>
      <div className="login-bg-blur login-bg-blur-3"></div>
      
      <div className={`admin-login-container ${mounted ? 'mounted' : ''}`}>
        {/* Premium Header with Logo */}
        <div className="admin-login-header">
          <div className="admin-logo-wrapper">
            <div className="admin-logo">
              <Zap className="logo-icon" size={42} strokeWidth={2.5} />
            </div>
            <div className="logo-sparkles">
              <Sparkles className="sparkle sparkle-1" size={16} />
              <Sparkles className="sparkle sparkle-2" size={14} />
              <Sparkles className="sparkle sparkle-3" size={12} />
            </div>
          </div>
          <h1>VitalBlaze</h1>
          <div className="admin-subtitle">
            <Shield size={18} />
            <span>Admin Control Panel</span>
          </div>
          <p className="admin-tagline">Premium Service Management System</p>
        </div>

        {/* Login Form */}
        <form className="admin-login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="admin-error-message">
              <div className="error-icon">
                <Lock size={18} />
              </div>
              <span>{error}</span>
            </div>
          )}

          <div className="admin-form-group">
            <label>
              <Mail size={18} />
              <span>Email Address</span>
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="admin@vitalblaze.com"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>
              <Lock size={18} />
              <span>Password</span>
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            <div className="btn-gradient"></div>
            <div className="btn-content">
              {loading ? (
                <>
                  <div className="admin-spinner"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield size={22} />
                  <span>Access Admin Panel</span>
                  <Star className="btn-star" size={18} />
                </>
              )}
            </div>
          </button>
        </form>

        <div className="admin-login-footer">
          <div className="footer-badge">
            <Shield size={14} />
            <span>256-bit Encrypted</span>
          </div>
          <p>Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
