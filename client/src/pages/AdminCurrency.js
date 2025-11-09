import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LogOut, 
  Zap,
  ArrowRightLeft,
  Check,
  AlertCircle,
  Sun,
  Moon,
  LayoutDashboard,
  Repeat,
  RefreshCw
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import './AdminDashboard.css';

const AdminCurrency = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [conversionRate, setConversionRate] = useState(5.0);
  const [conversionDirection, setConversionDirection] = useState('SAR_TO_GBP');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  const handleConvertPrices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.ADMIN_CONVERT_PRICES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          direction: conversionDirection,
          rate: conversionRate
        })
      });

      const data = await response.json();
      if (data.success) {
        showMessage('success', `Successfully converted ${data.updated} service prices!`);
      } else {
        showMessage('error', data.message || 'Conversion failed');
      }
    } catch (err) {
      showMessage('error', 'Failed to convert prices');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(API_ENDPOINTS.ADMIN_LOGOUT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      // Silent fail
    }
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  return (
    <div className={`admin-dashboard-page ${isDarkMode ? '' : 'light-mode'}`}>
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <div className="admin-logo-vital">
              <Zap size={28} strokeWidth={2.5} />
              <span>VITAL<span className="logo-blue">BLAZE</span></span>
            </div>
          </div>
          <div className="admin-header-right">
            <button 
              className="admin-theme-toggle" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="admin-navigation">
        <div className="admin-nav-content">
          <Link 
            to="/admin/dashboard" 
            className={`admin-nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            Services
          </Link>
          <Link 
            to="/admin/currency" 
            className={`admin-nav-link ${location.pathname === '/admin/currency' ? 'active' : ''}`}
          >
            <Repeat size={20} />
            Currency Conversion
          </Link>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Currency Conversion Section */}
      <div className="admin-conversion-section">
        <div className="admin-section-header">
          <RefreshCw size={24} />
          <h2>Currency Conversion Tool</h2>
        </div>
        <div className="admin-conversion-content">
          <div className="conversion-inputs">
            <div className="conversion-group">
              <label>Conversion Direction</label>
              <select
                value={conversionDirection}
                onChange={(e) => setConversionDirection(e.target.value)}
              >
                <option value="SAR_TO_GBP">SAR → GBP</option>
                <option value="GBP_TO_SAR">GBP → SAR</option>
              </select>
            </div>
            <div className="conversion-group">
              <label>Conversion Rate (1 SAR = ? GBP)</label>
              <input
                type="number"
                value={conversionRate}
                onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <button 
            className="admin-convert-btn" 
            onClick={handleConvertPrices}
            disabled={loading}
          >
            <ArrowRightLeft size={20} />
            {loading ? 'Converting...' : 'Convert All Prices'}
          </button>
          <p className="conversion-note">
            <AlertCircle size={16} />
            <strong>Note:</strong> This will update all service prices based on the conversion rate.
            Services with "Contact Us" or "By Quote" will be skipped.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminCurrency;
