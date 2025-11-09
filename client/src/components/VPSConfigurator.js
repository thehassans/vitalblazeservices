import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, Mail, ShoppingCart, Check, User, Phone, MapPin } from 'lucide-react';
import './VPSConfigurator.css';

const VPSConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    cores: 2,
    bandwidth: 1,
    storage: 50,
    mail: 0
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    whatsapp: '',
    country: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Configuration options with prices in SAR
  const options = {
    cores: [
      { value: 1, label: '1 Core', priceSAR: 50, priceGBP: 10 },
      { value: 2, label: '2 Cores', priceSAR: 99, priceGBP: 20 },
      { value: 4, label: '4 Cores', priceSAR: 180, priceGBP: 36 },
      { value: 8, label: '8 Cores', priceSAR: 350, priceGBP: 70 },
      { value: 16, label: '16 Cores', priceSAR: 650, priceGBP: 130 }
    ],
    bandwidth: [
      { value: 1, label: '1 TB/month', priceSAR: 0, priceGBP: 0 },
      { value: 2, label: '2 TB/month', priceSAR: 30, priceGBP: 6 },
      { value: 5, label: '5 TB/month', priceSAR: 70, priceGBP: 14 },
      { value: 10, label: '10 TB/month', priceSAR: 130, priceGBP: 26 },
      { value: -1, label: 'Unlimited', priceSAR: 250, priceGBP: 50 }
    ],
    storage: [
      { value: 50, label: '50 GB SSD', priceSAR: 0, priceGBP: 0 },
      { value: 100, label: '100 GB SSD', priceSAR: 25, priceGBP: 5 },
      { value: 250, label: '250 GB SSD', priceSAR: 60, priceGBP: 12 },
      { value: 500, label: '500 GB SSD', priceSAR: 110, priceGBP: 22 },
      { value: 1000, label: '1 TB SSD', priceSAR: 200, priceGBP: 40 }
    ],
    mail: [
      { value: 0, label: 'No Email', priceSAR: 0, priceGBP: 0 },
      { value: 10, label: '10 Email Accounts', priceSAR: 20, priceGBP: 4 },
      { value: 25, label: '25 Email Accounts', priceSAR: 40, priceGBP: 8 },
      { value: 50, label: '50 Email Accounts', priceSAR: 70, priceGBP: 14 },
      { value: -1, label: 'Unlimited Email', priceSAR: 120, priceGBP: 24 }
    ]
  };

  const calculatePrice = () => {
    const coresPrice = options.cores.find(c => c.value === config.cores);
    const bandwidthPrice = options.bandwidth.find(b => b.value === config.bandwidth);
    const storagePrice = options.storage.find(s => s.value === config.storage);
    const mailPrice = options.mail.find(m => m.value === config.mail);

    const totalSAR = (coresPrice?.priceSAR || 0) + (bandwidthPrice?.priceSAR || 0) + 
                     (storagePrice?.priceSAR || 0) + (mailPrice?.priceSAR || 0);
    const totalGBP = (coresPrice?.priceGBP || 0) + (bandwidthPrice?.priceGBP || 0) + 
                     (storagePrice?.priceGBP || 0) + (mailPrice?.priceGBP || 0);

    return currency === 'SAR' ? totalSAR : totalGBP;
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.whatsapp || !userInfo.country) {
      alert('Please fill in all required fields');
      return;
    }

    const orderDetails = {
      config,
      userInfo,
      price: calculatePrice(),
      currency,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage (in production, send to backend)
    const existingOrders = JSON.parse(localStorage.getItem('vpsOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('vpsOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setUserInfo({ name: '', whatsapp: '', country: '' });
  };

  const getConfigLabel = (type, value) => {
    return options[type].find(opt => opt.value === value)?.label || '';
  };

  return (
    <div className="vps-configurator">
      <div className="configurator-header">
        <h2>Configure Your VPS</h2>
        <p>Customize your server to match your exact needs</p>
      </div>

      <div className="configurator-grid">
        {/* CPU Cores */}
        <div className="config-section">
          <div className="config-icon">
            <Cpu size={24} />
          </div>
          <div className="config-content">
            <label className="config-label">CPU Cores</label>
            <div className="config-slider">
              <input
                type="range"
                min="0"
                max={options.cores.length - 1}
                value={options.cores.findIndex(c => c.value === config.cores)}
                onChange={(e) => setConfig({...config, cores: options.cores[parseInt(e.target.value)].value})}
                className="slider"
              />
              <div className="slider-labels">
                {options.cores.map((option, idx) => (
                  <span key={idx} className={config.cores === option.value ? 'active' : ''}>
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="config-value">{getConfigLabel('cores', config.cores)}</div>
          </div>
        </div>

        {/* Bandwidth */}
        <div className="config-section">
          <div className="config-icon">
            <Wifi size={24} />
          </div>
          <div className="config-content">
            <label className="config-label">Bandwidth</label>
            <div className="config-slider">
              <input
                type="range"
                min="0"
                max={options.bandwidth.length - 1}
                value={options.bandwidth.findIndex(b => b.value === config.bandwidth)}
                onChange={(e) => setConfig({...config, bandwidth: options.bandwidth[parseInt(e.target.value)].value})}
                className="slider"
              />
              <div className="slider-labels">
                {options.bandwidth.map((option, idx) => (
                  <span key={idx} className={config.bandwidth === option.value ? 'active' : ''}>
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="config-value">{getConfigLabel('bandwidth', config.bandwidth)}</div>
          </div>
        </div>

        {/* Storage */}
        <div className="config-section">
          <div className="config-icon">
            <HardDrive size={24} />
          </div>
          <div className="config-content">
            <label className="config-label">SSD Storage</label>
            <div className="config-slider">
              <input
                type="range"
                min="0"
                max={options.storage.length - 1}
                value={options.storage.findIndex(s => s.value === config.storage)}
                onChange={(e) => setConfig({...config, storage: options.storage[parseInt(e.target.value)].value})}
                className="slider"
              />
              <div className="slider-labels">
                {options.storage.map((option, idx) => (
                  <span key={idx} className={config.storage === option.value ? 'active' : ''}>
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="config-value">{getConfigLabel('storage', config.storage)}</div>
          </div>
        </div>

        {/* Email Accounts */}
        <div className="config-section">
          <div className="config-icon">
            <Mail size={24} />
          </div>
          <div className="config-content">
            <label className="config-label">Email Accounts</label>
            <div className="config-slider">
              <input
                type="range"
                min="0"
                max={options.mail.length - 1}
                value={options.mail.findIndex(m => m.value === config.mail)}
                onChange={(e) => setConfig({...config, mail: options.mail[parseInt(e.target.value)].value})}
                className="slider"
              />
              <div className="slider-labels">
                {options.mail.map((option, idx) => (
                  <span key={idx} className={config.mail === option.value ? 'active' : ''}>
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="config-value">{getConfigLabel('mail', config.mail)}</div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="price-summary">
        <div className="price-breakdown">
          <h3>Configuration Summary</h3>
          <div className="breakdown-items">
            <div className="breakdown-item">
              <span>CPU Cores:</span>
              <span>{getConfigLabel('cores', config.cores)}</span>
            </div>
            <div className="breakdown-item">
              <span>Bandwidth:</span>
              <span>{getConfigLabel('bandwidth', config.bandwidth)}</span>
            </div>
            <div className="breakdown-item">
              <span>Storage:</span>
              <span>{getConfigLabel('storage', config.storage)}</span>
            </div>
            <div className="breakdown-item">
              <span>Email:</span>
              <span>{getConfigLabel('mail', config.mail)}</span>
            </div>
          </div>
        </div>
        <div className="total-price">
          <span className="price-label">Total Monthly Price</span>
          <span className="price-amount">
            {currency === 'SAR' ? 'SAR' : '£'} {calculatePrice()}
            <span className="price-period">/month</span>
          </span>
        </div>
      </div>

      {/* User Information Form */}
      <div className="user-info-form">
        <h3>Your Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>
              <User size={18} />
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <Phone size={18} />
              WhatsApp Number *
            </label>
            <input
              type="tel"
              placeholder="+966 XX XXX XXXX"
              value={userInfo.whatsapp}
              onChange={(e) => setUserInfo({...userInfo, whatsapp: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <MapPin size={18} />
              Country *
            </label>
            <input
              type="text"
              placeholder="Enter your country"
              value={userInfo.country}
              onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}
              required
            />
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default VPSConfigurator;
