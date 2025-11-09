import React, { useState } from 'react';
import { Code, Layers, Smartphone, Zap, ShoppingCart, Check, User, Phone, Mail, FileText } from 'lucide-react';
import './WebDevelopmentConfigurator.css';

const WebDevelopmentConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    projectType: 'landing',
    features: [],
    pages: 5,
    timeline: 'standard'
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    projectDescription: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Project Types
  const projectTypes = {
    landing: {
      name: 'Landing Page',
      description: 'Single-page website for campaigns or product launches',
      baseSAR: 1999,
      baseGBP: 400,
      timeline: '1-2 weeks'
    },
    business: {
      name: 'Business Website',
      description: 'Professional multi-page corporate website',
      baseSAR: 4999,
      baseGBP: 1000,
      timeline: '3-4 weeks'
    },
    ecommerce: {
      name: 'E-commerce Store',
      description: 'Full-featured online store with payment integration',
      baseSAR: 9999,
      baseGBP: 2000,
      timeline: '6-8 weeks'
    },
    webapp: {
      name: 'Web Application',
      description: 'Custom web app with advanced functionality',
      baseSAR: 19999,
      baseGBP: 4000,
      timeline: '8-12 weeks'
    },
    custom: {
      name: 'Custom Solution',
      description: 'Tailored development for unique requirements',
      baseSAR: 0,
      baseGBP: 0,
      timeline: 'To be determined',
      quote: true
    }
  };

  // Features & Add-ons
  const features = [
    {
      id: 'responsive',
      name: 'Responsive Design',
      description: 'Mobile, tablet, and desktop optimization',
      priceSAR: 0,
      priceGBP: 0,
      essential: true
    },
    {
      id: 'cms',
      name: 'CMS Integration',
      description: 'Content management system for easy updates',
      priceSAR: 1500,
      priceGBP: 300
    },
    {
      id: 'seo',
      name: 'SEO Optimization',
      description: 'Search engine optimization and meta tags',
      priceSAR: 1000,
      priceGBP: 200
    },
    {
      id: 'analytics',
      name: 'Analytics Setup',
      description: 'Google Analytics and tracking integration',
      priceSAR: 500,
      priceGBP: 100
    },
    {
      id: 'payment',
      name: 'Payment Gateway',
      description: 'Stripe, PayPal, or local payment integration',
      priceSAR: 2000,
      priceGBP: 400
    },
    {
      id: 'api',
      name: 'API Integration',
      description: 'Third-party service API connections',
      priceSAR: 2500,
      priceGBP: 500
    },
    {
      id: 'multilingual',
      name: 'Multi-language Support',
      description: 'Support for multiple languages (2 languages)',
      priceSAR: 1500,
      priceGBP: 300
    },
    {
      id: 'admin',
      name: 'Admin Dashboard',
      description: 'Custom admin panel for management',
      priceSAR: 3000,
      priceGBP: 600
    },
    {
      id: 'security',
      name: 'Advanced Security',
      description: 'SSL, encryption, and security hardening',
      priceSAR: 1000,
      priceGBP: 200
    },
    {
      id: 'chat',
      name: 'Live Chat Integration',
      description: 'Customer support chat widget',
      priceSAR: 750,
      priceGBP: 150
    },
    {
      id: 'email',
      name: 'Email Marketing Integration',
      description: 'Mailchimp, SendGrid integration',
      priceSAR: 750,
      priceGBP: 150
    },
    {
      id: 'social',
      name: 'Social Media Integration',
      description: 'Social login and sharing features',
      priceSAR: 500,
      priceGBP: 100
    }
  ];

  const timelines = {
    express: {
      name: 'Express Delivery',
      multiplier: 1.5,
      description: 'Rush delivery with priority development'
    },
    standard: {
      name: 'Standard Timeline',
      multiplier: 1,
      description: 'Regular development schedule'
    },
    flexible: {
      name: 'Flexible Schedule',
      multiplier: 0.85,
      description: 'Extended timeline for budget optimization'
    }
  };

  const toggleFeature = (featureId) => {
    const feature = features.find(f => f.id === featureId);
    if (feature.essential) return;

    if (config.features.includes(featureId)) {
      setConfig({...config, features: config.features.filter(f => f !== featureId)});
    } else {
      setConfig({...config, features: [...config.features, featureId]});
    }
  };

  const calculateTotal = () => {
    const projectType = projectTypes[config.projectType];
    if (projectType.quote) {
      return { total: 0, quote: true };
    }

    const basePrice = currency === 'SAR' ? projectType.baseSAR : projectType.baseGBP;
    
    const featuresCost = config.features.reduce((sum, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return sum + (currency === 'SAR' ? feature.priceSAR : feature.priceGBP);
    }, 0);

    const pagesCost = config.pages > 5 ? (config.pages - 5) * (currency === 'SAR' ? 500 : 100) : 0;
    
    const subtotal = basePrice + featuresCost + pagesCost;
    const total = subtotal * timelines[config.timeline].multiplier;

    return { 
      basePrice, 
      featuresCost, 
      pagesCost, 
      subtotal, 
      total: Math.round(total),
      quote: false 
    };
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp || !userInfo.projectDescription) {
      alert('Please fill in all required fields');
      return;
    }

    const costs = calculateTotal();
    const orderDetails = {
      service: 'Web Development',
      projectType: projectTypes[config.projectType].name,
      features: config.features.map(id => features.find(f => f.id === id).name),
      pages: config.pages,
      timeline: timelines[config.timeline].name,
      costs,
      userInfo,
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('webDevOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('webDevOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', email: '', whatsapp: '', projectDescription: '' });
  };

  const costs = calculateTotal();

  return (
    <div className="webdev-configurator">
      <div className="configurator-header">
        <h2>Configure Your Web Development Project</h2>
        <p>Custom coding, features, and design from our expert developers</p>
      </div>

      {/* Project Type Selection */}
      <div className="webdev-section">
        <div className="section-header">
          <Code size={24} />
          <h3>Select Project Type</h3>
        </div>
        <div className="project-types-grid">
          {Object.entries(projectTypes).map(([key, type]) => (
            <div
              key={key}
              className={`project-type-card ${config.projectType === key ? 'active' : ''}`}
              onClick={() => setConfig({...config, projectType: key})}
            >
              <div className="type-name">{type.name}</div>
              <div className="type-description">{type.description}</div>
              <div className="type-footer">
                {!type.quote ? (
                  <>
                    <div className="type-price">
                      {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? type.baseSAR : type.baseGBP}
                    </div>
                    <div className="type-timeline">⏱ {type.timeline}</div>
                  </>
                ) : (
                  <div className="type-quote">Custom Quote Required</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Selection */}
      {!projectTypes[config.projectType].quote && (
        <>
          <div className="webdev-section">
            <div className="section-header">
              <Layers size={24} />
              <h3>Select Features & Add-ons</h3>
            </div>
            <div className="features-grid-web">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`feature-card-web ${config.features.includes(feature.id) || feature.essential ? 'selected' : ''} ${feature.essential ? 'essential' : ''}`}
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="feature-header-web">
                    <div className="feature-name-web">{feature.name}</div>
                    {feature.essential ? (
                      <div className="essential-badge">Included</div>
                    ) : (
                      <div className="feature-check-web">
                        {config.features.includes(feature.id) ? <Check size={20} /> : <span>+</span>}
                      </div>
                    )}
                  </div>
                  <div className="feature-description-web">{feature.description}</div>
                  {!feature.essential && feature.priceSAR > 0 && (
                    <div className="feature-price-web">
                      +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? feature.priceSAR : feature.priceGBP}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pages Selector */}
          <div className="webdev-section">
            <div className="section-header">
              <FileText size={24} />
              <h3>Number of Pages</h3>
            </div>
            <div className="pages-selector">
              <input
                type="range"
                min="1"
                max="20"
                value={config.pages}
                onChange={(e) => setConfig({...config, pages: parseInt(e.target.value)})}
                className="pages-slider"
              />
              <div className="pages-display">
                <span className="pages-number">{config.pages}</span>
                <span className="pages-label">Pages</span>
                {config.pages > 5 && (
                  <span className="pages-extra">
                    +{currency === 'SAR' ? 'SAR' : '£'} {(config.pages - 5) * (currency === 'SAR' ? 500 : 100)} for extra pages
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Timeline Selection */}
          <div className="webdev-section">
            <div className="section-header">
              <Zap size={24} />
              <h3>Development Timeline</h3>
            </div>
            <div className="timeline-grid">
              {Object.entries(timelines).map(([key, timeline]) => (
                <div
                  key={key}
                  className={`timeline-card ${config.timeline === key ? 'active' : ''}`}
                  onClick={() => setConfig({...config, timeline: key})}
                >
                  <div className="timeline-name">{timeline.name}</div>
                  <div className="timeline-description">{timeline.description}</div>
                  <div className="timeline-multiplier">
                    {timeline.multiplier > 1 ? `+${((timeline.multiplier - 1) * 100)}%` : 
                     timeline.multiplier < 1 ? `-${((1 - timeline.multiplier) * 100)}%` : 
                     'Standard Price'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="webdev-cost-breakdown">
            <div className="breakdown-header">
              <h3>Project Cost Breakdown</h3>
            </div>
            <div className="breakdown-items-web">
              <div className="breakdown-item-web">
                <span>{projectTypes[config.projectType].name} (Base):</span>
                <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.basePrice}</span>
              </div>
              {costs.featuresCost > 0 && (
                <div className="breakdown-item-web">
                  <span>Features & Add-ons ({config.features.length}):</span>
                  <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.featuresCost}</span>
                </div>
              )}
              {costs.pagesCost > 0 && (
                <div className="breakdown-item-web">
                  <span>Additional Pages ({config.pages - 5}):</span>
                  <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.pagesCost}</span>
                </div>
              )}
              <div className="breakdown-divider-web"></div>
              <div className="breakdown-item-web subtotal-web">
                <span>Subtotal:</span>
                <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.subtotal}</span>
              </div>
              {timelines[config.timeline].multiplier !== 1 && (
                <div className="breakdown-item-web">
                  <span>Timeline Adjustment ({timelines[config.timeline].name}):</span>
                  <span>×{timelines[config.timeline].multiplier}</span>
                </div>
              )}
              <div className="breakdown-divider-web"></div>
              <div className="breakdown-item-web total-web">
                <span>Total Project Cost:</span>
                <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.total}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* User Info */}
      <div className="user-info-form">
        <h3>Your Information</h3>
        <div className="form-grid-webdev">
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
          <div className="form-group full-width-web">
            <label><FileText size={18} />Project Description *</label>
            <textarea
              placeholder="Describe your project requirements, goals, and any specific features you need..."
              value={userInfo.projectDescription}
              onChange={(e) => setUserInfo({...userInfo, projectDescription: e.target.value})}
              rows="4"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          {projectTypes[config.projectType].quote ? 'Request Custom Quote' : 'Start Project & Add to Cart'}
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Project added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default WebDevelopmentConfigurator;
