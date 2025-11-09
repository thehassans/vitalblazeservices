import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LogOut, 
  DollarSign, 
  RefreshCw, 
  Save, 
  Zap,
  ArrowRightLeft,
  Check,
  AlertCircle,
  Settings,
  Sun,
  Moon,
  LayoutDashboard,
  Repeat
} from 'lucide-react';
import ServicePricingModal from '../components/ServicePricingModal';
import { API_ENDPOINTS } from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedService, setSelectedService] = useState(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [conversionRate, setConversionRate] = useState(5.0);
  const [conversionDirection, setConversionDirection] = useState('SAR_TO_GBP');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchServices();
  }, [navigate]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.ADMIN_SERVICES, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      } else {
        navigate('/admin');
      }
    } catch (err) {
      showMessage('error', 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (serviceId, field, value) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, [field]: value }
        : service
    ));
  };

  const handlePriceTypeChange = (serviceId, priceType) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, priceType: priceType }
        : service
    ));
  };

  const handleSavePrice = async (serviceId) => {
    setSaving(true);
    const service = services.find(s => s.id === serviceId);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.ADMIN_SERVICE_PRICE(serviceId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          priceSAR: service.priceSAR,
          priceGBP: service.priceGBP
        })
      });

      const data = await response.json();
      if (data.success) {
        showMessage('success', `Price updated for ${service.name}`);
      } else {
        showMessage('error', 'Failed to update price');
      }
    } catch (err) {
      showMessage('error', 'Connection error');
    } finally {
      setSaving(false);
    }
  };

  const handleConvertAll = async () => {
    if (!conversionRate || conversionRate <= 0) {
      showMessage('error', 'Please enter a valid conversion rate');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.ADMIN_CONVERT_PRICES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          conversionRate: parseFloat(conversionRate),
          direction: conversionDirection
        })
      });

      const data = await response.json();
      if (data.success) {
        setServices(data.services);
        showMessage('success', 'All prices converted successfully!');
      } else {
        showMessage('error', 'Failed to convert prices');
      }
    } catch (err) {
      showMessage('error', 'Connection error');
    } finally {
      setSaving(false);
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

  const handleOpenDetailedPricing = (service) => {
    setSelectedService(service);
    setIsPricingModalOpen(true);
  };

  const handleSaveDetailedPrices = (serviceId, detailedPrices) => {
    // In a real app, this would send to backend
    console.log('Saving detailed prices for service', serviceId, detailedPrices);
    showMessage('success', 'Detailed prices updated successfully!');
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="admin-spinner-large"></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

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

      {/* Services Section */}
      <div className="admin-services-section">
        <div className="admin-section-header">
          <DollarSign size={24} />
          <h2>All Services ({services.length})</h2>
        </div>
        <div className="admin-services-grid">
          {services.map((service) => (
            <div key={service.id} className="admin-service-card">
              <div className="admin-service-header">
                <div className="admin-service-info">
                  <h3>{service.name}</h3>
                  <span className="admin-service-category">{service.category}</span>
                </div>
              </div>
              <div className="admin-service-prices">
                <div className="admin-price-input full-width">
                  <label>SAR Price</label>
                  <input
                    type="text"
                    value={service.priceSAR}
                    onChange={(e) => handlePriceChange(service.id, 'priceSAR', e.target.value)}
                    placeholder="e.g., 299 or Contact Us"
                  />
                </div>
              </div>
              <div className="admin-price-type-selector">
                <label>Price Type</label>
                <div className="price-type-buttons">
                  <button
                    className={`price-type-btn ${service.priceType === 'mo' ? 'active' : ''}`}
                    onClick={() => handlePriceTypeChange(service.id, 'mo')}
                  >
                    Per Month
                  </button>
                  <button
                    className={`price-type-btn ${service.priceType === 'yr' ? 'active' : ''}`}
                    onClick={() => handlePriceTypeChange(service.id, 'yr')}
                  >
                    Per Year
                  </button>
                  <button
                    className={`price-type-btn ${!service.priceType || service.priceType === 'one-time' ? 'active' : ''}`}
                    onClick={() => handlePriceTypeChange(service.id, 'one-time')}
                  >
                    One-Time
                  </button>
                </div>
              </div>
              <div className="admin-card-actions">
                {[3, 4, 5, 12].includes(service.id) && (
                  <button 
                    className="admin-detailed-pricing-btn" 
                    onClick={() => handleOpenDetailedPricing(service)}
                  >
                    <Settings size={18} />
                    Detailed Pricing
                  </button>
                )}
                <button 
                  className="admin-save-btn" 
                  onClick={() => handleSavePrice(service.id)}
                  disabled={saving}
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Pricing Modal */}
      <ServicePricingModal
        service={selectedService}
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSave={handleSaveDetailedPrices}
      />
    </div>
  );
};

export default AdminDashboard;
