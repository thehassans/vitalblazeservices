import React, { useState } from 'react';
import { Video, TrendingUp, Target, BarChart3, Users, ShoppingCart, Check, User, Phone, Mail, Globe } from 'lucide-react';
import './AdvertisementConfigurator.css';

const AdvertisementConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    package: 'standard',
    platforms: [],
    adFormats: [],
    duration: 1
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    website: '',
    businessType: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Packages
  const packages = {
    starter: {
      name: 'Starter Package',
      priceSAR: 599,
      priceGBP: 120,
      features: [
        'Up to 2 Ad Platforms',
        '5 Ad Campaigns Per Month',
        'Basic Analytics Dashboard',
        'Monthly Performance Report',
        'Email Support'
      ],
      recommended: false
    },
    standard: {
      name: 'Standard Package',
      priceSAR: 1199,
      priceGBP: 240,
      features: [
        'Up to 4 Ad Platforms',
        '15 Ad Campaigns Per Month',
        'Advanced Analytics Dashboard',
        'Bi-weekly Performance Reports',
        'A/B Testing (5 tests)',
        'Priority Email Support'
      ],
      recommended: true
    },
    premium: {
      name: 'Premium Package',
      priceSAR: 2499,
      priceGBP: 500,
      features: [
        'Unlimited Ad Platforms',
        'Unlimited Ad Campaigns',
        'Real-time Analytics & AI Insights',
        'Weekly Performance Reports',
        'Advanced A/B Testing (Unlimited)',
        'Video Ad Creation (3 videos/month)',
        'Dedicated Account Manager',
        '24/7 Priority Support'
      ],
      recommended: false
    }
  };

  // Platforms
  const platforms = [
    { id: 'google', name: 'Google Ads', icon: '🔍', priceSAR: 0, priceGBP: 0 },
    { id: 'facebook', name: 'Facebook Ads', icon: '👥', priceSAR: 0, priceGBP: 0 },
    { id: 'instagram', name: 'Instagram Ads', icon: '📸', priceSAR: 0, priceGBP: 0 },
    { id: 'youtube', name: 'YouTube Ads', icon: '▶️', priceSAR: 250, priceGBP: 50 },
    { id: 'linkedin', name: 'LinkedIn Ads', icon: '💼', priceSAR: 300, priceGBP: 60 },
    { id: 'tiktok', name: 'TikTok Ads', icon: '🎵', priceSAR: 250, priceGBP: 50 },
    { id: 'twitter', name: 'Twitter/X Ads', icon: '🐦', priceSAR: 200, priceGBP: 40 },
    { id: 'snapchat', name: 'Snapchat Ads', icon: '👻', priceSAR: 200, priceGBP: 40 }
  ];

  // Ad Formats
  const adFormats = [
    { 
      id: 'display', 
      name: 'Display Ads', 
      description: 'Banner and visual ads across networks',
      priceSAR: 0, 
      priceGBP: 0 
    },
    { 
      id: 'video', 
      name: 'Video Ads', 
      description: 'Engaging video content for campaigns',
      priceSAR: 300, 
      priceGBP: 60 
    },
    { 
      id: 'carousel', 
      name: 'Carousel Ads', 
      description: 'Multi-image interactive ads',
      priceSAR: 150, 
      priceGBP: 30 
    },
    { 
      id: 'story', 
      name: 'Story Ads', 
      description: 'Full-screen vertical ads',
      priceSAR: 150, 
      priceGBP: 30 
    },
    { 
      id: 'shopping', 
      name: 'Shopping Ads', 
      description: 'Product catalog integration',
      priceSAR: 200, 
      priceGBP: 40 
    },
    { 
      id: 'lead', 
      name: 'Lead Generation Ads', 
      description: 'Capture customer information',
      priceSAR: 200, 
      priceGBP: 40 
    }
  ];

  const togglePlatform = (platformId) => {
    if (config.platforms.includes(platformId)) {
      setConfig({...config, platforms: config.platforms.filter(p => p !== platformId)});
    } else {
      setConfig({...config, platforms: [...config.platforms, platformId]});
    }
  };

  const toggleAdFormat = (formatId) => {
    if (config.adFormats.includes(formatId)) {
      setConfig({...config, adFormats: config.adFormats.filter(f => f !== formatId)});
    } else {
      setConfig({...config, adFormats: [...config.adFormats, formatId]});
    }
  };

  const calculateTotal = () => {
    const packagePrice = currency === 'SAR' ? packages[config.package].priceSAR : packages[config.package].priceGBP;
    
    const platformCost = config.platforms.reduce((sum, platformId) => {
      const platform = platforms.find(p => p.id === platformId);
      return sum + (currency === 'SAR' ? platform.priceSAR : platform.priceGBP);
    }, 0);

    const formatCost = config.adFormats.reduce((sum, formatId) => {
      const format = adFormats.find(f => f.id === formatId);
      return sum + (currency === 'SAR' ? format.priceSAR : format.priceGBP);
    }, 0);

    const monthlyTotal = packagePrice + platformCost + formatCost;
    const contractTotal = monthlyTotal * config.duration;

    return { monthlyTotal, contractTotal };
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp) {
      alert('Please fill in all required fields');
      return;
    }

    const totals = calculateTotal();
    const orderDetails = {
      service: 'Advertisement Management',
      package: packages[config.package].name,
      platforms: config.platforms.map(id => platforms.find(p => p.id === id).name),
      adFormats: config.adFormats.map(id => adFormats.find(f => f.id === id).name),
      duration: config.duration,
      monthlyTotal: totals.monthlyTotal,
      contractTotal: totals.contractTotal,
      userInfo,
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('adOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('adOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', email: '', whatsapp: '', website: '', businessType: '' });
  };

  const totals = calculateTotal();

  return (
    <div className="ad-configurator">
      <div className="configurator-header">
        <h2>Configure Your Advertisement Campaign</h2>
        <p>Professional ad management with advanced video marketing capabilities</p>
      </div>

      {/* Package Selection */}
      <div className="ad-section">
        <div className="section-header">
          <Target size={24} />
          <h3>Select Your Package</h3>
        </div>
        <div className="package-grid">
          {Object.entries(packages).map(([key, pkg]) => (
            <div
              key={key}
              className={`package-card ${config.package === key ? 'active' : ''} ${pkg.recommended ? 'recommended' : ''}`}
              onClick={() => setConfig({...config, package: key})}
            >
              {pkg.recommended && <div className="recommended-badge">Recommended</div>}
              <div className="package-name">{pkg.name}</div>
              <div className="package-price">
                {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? pkg.priceSAR : pkg.priceGBP}
                <span className="price-period">/month</span>
              </div>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Selection */}
      <div className="ad-section">
        <div className="section-header">
          <Globe size={24} />
          <h3>Select Ad Platforms</h3>
        </div>
        <div className="platforms-grid">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`platform-card ${config.platforms.includes(platform.id) ? 'selected' : ''}`}
              onClick={() => togglePlatform(platform.id)}
            >
              <div className="platform-icon">{platform.icon}</div>
              <div className="platform-name">{platform.name}</div>
              {platform.priceSAR > 0 && (
                <div className="platform-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? platform.priceSAR : platform.priceGBP}/mo
                </div>
              )}
              <div className="platform-check">
                {config.platforms.includes(platform.id) && <Check size={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Format Selection */}
      <div className="ad-section">
        <div className="section-header">
          <Video size={24} />
          <h3>Select Ad Formats</h3>
        </div>
        <div className="formats-grid">
          {adFormats.map((format) => (
            <div
              key={format.id}
              className={`format-card ${config.adFormats.includes(format.id) ? 'selected' : ''}`}
              onClick={() => toggleAdFormat(format.id)}
            >
              <div className="format-header">
                <div className="format-name">{format.name}</div>
                <div className="format-check">
                  {config.adFormats.includes(format.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="format-description">{format.description}</div>
              {format.priceSAR > 0 && (
                <div className="format-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? format.priceSAR : format.priceGBP}/mo
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contract Duration */}
      <div className="ad-section">
        <div className="section-header">
          <BarChart3 size={24} />
          <h3>Contract Duration</h3>
        </div>
        <div className="duration-selector">
          {[1, 3, 6, 12].map((months) => (
            <button
              key={months}
              className={`duration-btn ${config.duration === months ? 'active' : ''}`}
              onClick={() => setConfig({...config, duration: months})}
            >
              {months} {months === 1 ? 'Month' : 'Months'}
              {months >= 6 && <span className="discount-badge">Save {months === 6 ? '10' : '15'}%</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="ad-pricing-summary">
        <div className="summary-content">
          <div className="summary-left">
            <h3>Your Campaign Summary</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span>Package:</span>
                <span>{packages[config.package].name}</span>
              </div>
              <div className="summary-item">
                <span>Platforms:</span>
                <span>{config.platforms.length} selected</span>
              </div>
              <div className="summary-item">
                <span>Ad Formats:</span>
                <span>{config.adFormats.length} selected</span>
              </div>
              <div className="summary-item">
                <span>Duration:</span>
                <span>{config.duration} {config.duration === 1 ? 'month' : 'months'}</span>
              </div>
            </div>
          </div>
          <div className="summary-right">
            <div className="monthly-price">
              <span>Monthly Total</span>
              <span className="price">{currency === 'SAR' ? 'SAR' : '£'} {totals.monthlyTotal}</span>
            </div>
            <div className="contract-price">
              <span>Contract Total</span>
              <span className="total-price">{currency === 'SAR' ? 'SAR' : '£'} {totals.contractTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="user-info-form">
        <h3>Your Information</h3>
        <div className="form-grid-ad">
          <div className="form-group">
            <label><User size={18} />Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label><Mail size={18} />Email Address *</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label><Phone size={18} />WhatsApp Number *</label>
            <input
              type="tel"
              placeholder="+966 XX XXX XXXX"
              value={userInfo.whatsapp}
              onChange={(e) => setUserInfo({...userInfo, whatsapp: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label><Globe size={18} />Website (Optional)</label>
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              value={userInfo.website}
              onChange={(e) => setUserInfo({...userInfo, website: e.target.value})}
            />
          </div>
          <div className="form-group full-width">
            <label><TrendingUp size={18} />Business Type (Optional)</label>
            <input
              type="text"
              placeholder="E.g., E-commerce, SaaS, Local Business"
              value={userInfo.businessType}
              onChange={(e) => setUserInfo({...userInfo, businessType: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Start Campaign & Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Campaign added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementConfigurator;
