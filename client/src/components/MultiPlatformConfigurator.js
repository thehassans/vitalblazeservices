import React, { useState } from 'react';
import { ShoppingBag, Package, TrendingUp, Truck, ShoppingCart, Check, User, Phone, Mail, Store } from 'lucide-react';
import './MultiPlatformConfigurator.css';

const MultiPlatformConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    platforms: [],
    services: [],
    productCount: 'basic'
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessName: '',
    productCategory: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Platforms with pricing
  const platforms = [
    {
      id: 'amazon',
      name: 'Amazon Seller Central',
      icon: '📦',
      description: 'Full seller account setup with product listings and optimization',
      baseSAR: 1999,
      baseGBP: 400,
      features: ['Account Registration', 'Brand Registry', 'Product Listing (up to 50)', 'SEO Optimization', 'A+ Content Setup']
    },
    {
      id: 'ebay',
      name: 'eBay Store',
      icon: '🛒',
      description: 'Professional eBay store with custom branding and listings',
      baseSAR: 1499,
      baseGBP: 300,
      features: ['Store Setup', 'Custom Branding', 'Product Listing (up to 50)', 'Category Optimization', 'Promotion Tools']
    },
    {
      id: 'etsy',
      name: 'Etsy Shop',
      icon: '🎨',
      description: 'Unique handmade & vintage marketplace presence',
      baseSAR: 1299,
      baseGBP: 260,
      features: ['Shop Creation', 'Branding & Logo', 'Product Photography Tips', 'SEO Keywords', 'Shipping Setup']
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      icon: '🎵',
      description: 'Social commerce setup with video marketing integration',
      baseSAR: 1799,
      baseGBP: 360,
      features: ['Shop Registration', 'Product Showcase', 'Live Shopping Setup', 'Content Strategy', 'Creator Marketplace']
    }
  ];

  // Additional Services
  const additionalServices = [
    {
      id: 'inventory',
      name: 'Multi-Channel Inventory Management',
      description: 'Centralized inventory sync across all platforms',
      priceSAR: 1500,
      priceGBP: 300
    },
    {
      id: 'fulfillment',
      name: 'Fulfillment Strategy Setup',
      description: 'FBA, FBM, and dropshipping configuration',
      priceSAR: 1000,
      priceGBP: 200
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics Dashboard',
      description: 'Cross-platform sales tracking and reporting',
      priceSAR: 750,
      priceGBP: 150
    },
    {
      id: 'ads',
      name: 'Platform Advertising Setup',
      description: 'PPC campaigns and sponsored product ads',
      priceSAR: 1250,
      priceGBP: 250
    },
    {
      id: 'photography',
      name: 'Professional Product Photography',
      description: '10 products with white background and lifestyle shots',
      priceSAR: 2000,
      priceGBP: 400
    },
    {
      id: 'copywriting',
      name: 'Premium Product Copywriting',
      description: 'SEO-optimized descriptions for 50 products',
      priceSAR: 1500,
      priceGBP: 300
    },
    {
      id: 'compliance',
      name: 'Compliance & Legal Documentation',
      description: 'Terms, policies, and platform compliance',
      priceSAR: 750,
      priceGBP: 150
    },
    {
      id: 'training',
      name: 'Platform Management Training',
      description: '4-hour training session on managing all platforms',
      priceSAR: 1000,
      priceGBP: 200
    }
  ];

  // Product Count Tiers
  const productTiers = {
    basic: {
      name: 'Basic Catalog',
      products: '1-50 products',
      multiplier: 1,
      priceSAR: 0,
      priceGBP: 0
    },
    standard: {
      name: 'Standard Catalog',
      products: '51-100 products',
      multiplier: 1.3,
      priceSAR: 1500,
      priceGBP: 300
    },
    premium: {
      name: 'Premium Catalog',
      products: '101-250 products',
      multiplier: 1.6,
      priceSAR: 3000,
      priceGBP: 600
    },
    enterprise: {
      name: 'Enterprise Catalog',
      products: '250+ products',
      multiplier: 2,
      priceSAR: 5000,
      priceGBP: 1000
    }
  };

  const togglePlatform = (platformId) => {
    if (config.platforms.includes(platformId)) {
      setConfig({...config, platforms: config.platforms.filter(p => p !== platformId)});
    } else {
      setConfig({...config, platforms: [...config.platforms, platformId]});
    }
  };

  const toggleService = (serviceId) => {
    if (config.services.includes(serviceId)) {
      setConfig({...config, services: config.services.filter(s => s !== serviceId)});
    } else {
      setConfig({...config, services: [...config.services, serviceId]});
    }
  };

  const calculateTotal = () => {
    const platformsCost = config.platforms.reduce((sum, platformId) => {
      const platform = platforms.find(p => p.id === platformId);
      return sum + (currency === 'SAR' ? platform.baseSAR : platform.baseGBP);
    }, 0);

    const servicesCost = config.services.reduce((sum, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return sum + (currency === 'SAR' ? service.priceSAR : service.priceGBP);
    }, 0);

    const tierCost = currency === 'SAR' ? productTiers[config.productCount].priceSAR : productTiers[config.productCount].priceGBP;

    const subtotal = platformsCost + servicesCost + tierCost;
    const discount = config.platforms.length >= 3 ? 0.1 : 0;
    const total = subtotal * (1 - discount);

    return {
      platformsCost,
      servicesCost,
      tierCost,
      subtotal,
      discount: subtotal * discount,
      total: Math.round(total)
    };
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp || !userInfo.businessName) {
      alert('Please fill in all required fields');
      return;
    }

    if (config.platforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }

    const costs = calculateTotal();
    const orderDetails = {
      service: 'Multi-Platform Store Setup',
      platforms: config.platforms.map(id => platforms.find(p => p.id === id).name),
      additionalServices: config.services.map(id => additionalServices.find(s => s.id === id).name),
      productTier: productTiers[config.productCount].name,
      costs,
      userInfo,
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('multiPlatformOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('multiPlatformOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', email: '', whatsapp: '', businessName: '', productCategory: '' });
  };

  const costs = calculateTotal();

  return (
    <div className="multiplatform-configurator">
      <div className="configurator-header">
        <h2>Configure Your Multi-Platform Store Setup</h2>
        <p>Expert setup for Amazon, eBay, Etsy, and TikTok Shop with optimization</p>
      </div>

      {/* Platform Selection */}
      <div className="multiplatform-section">
        <div className="section-header">
          <Store size={24} />
          <h3>Select Platforms</h3>
        </div>
        <div className="platforms-grid-multi">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`platform-card-multi ${config.platforms.includes(platform.id) ? 'selected' : ''}`}
              onClick={() => togglePlatform(platform.id)}
            >
              <div className="platform-header-multi">
                <div className="platform-icon-multi">{platform.icon}</div>
                <div className="platform-check-multi">
                  {config.platforms.includes(platform.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="platform-name-multi">{platform.name}</div>
              <div className="platform-description-multi">{platform.description}</div>
              <div className="platform-price-multi">
                {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? platform.baseSAR : platform.baseGBP}
              </div>
              <div className="platform-features-multi">
                {platform.features.map((feature, idx) => (
                  <div key={idx} className="feature-item-multi">
                    <Check size={14} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {config.platforms.length >= 3 && (
          <div className="discount-notice">
            <TrendingUp size={20} />
            <span>Great! You're getting 10% discount for selecting 3+ platforms</span>
          </div>
        )}
      </div>

      {/* Product Count Tier */}
      <div className="multiplatform-section">
        <div className="section-header">
          <Package size={24} />
          <h3>Product Catalog Size</h3>
        </div>
        <div className="tier-grid">
          {Object.entries(productTiers).map(([key, tier]) => (
            <div
              key={key}
              className={`tier-card ${config.productCount === key ? 'active' : ''}`}
              onClick={() => setConfig({...config, productCount: key})}
            >
              <div className="tier-name">{tier.name}</div>
              <div className="tier-products">{tier.products}</div>
              {tier.priceSAR > 0 && (
                <div className="tier-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? tier.priceSAR : tier.priceGBP}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="multiplatform-section">
        <div className="section-header">
          <TrendingUp size={24} />
          <h3>Additional Services (Optional)</h3>
        </div>
        <div className="services-grid-multi">
          {additionalServices.map((service) => (
            <div
              key={service.id}
              className={`service-card-multi ${config.services.includes(service.id) ? 'selected' : ''}`}
              onClick={() => toggleService(service.id)}
            >
              <div className="service-header-multi">
                <div className="service-name-multi">{service.name}</div>
                <div className="service-check-multi">
                  {config.services.includes(service.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="service-description-multi">{service.description}</div>
              <div className="service-price-multi">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? service.priceSAR : service.priceGBP}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Summary */}
      <div className="multiplatform-cost-summary">
        <div className="summary-header">
          <h3>Investment Summary</h3>
        </div>
        <div className="summary-items">
          <div className="summary-item">
            <span>Platform Setup ({config.platforms.length} selected):</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.platformsCost}</span>
          </div>
          {costs.tierCost > 0 && (
            <div className="summary-item">
              <span>Product Catalog ({productTiers[config.productCount].name}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.tierCost}</span>
            </div>
          )}
          {costs.servicesCost > 0 && (
            <div className="summary-item">
              <span>Additional Services ({config.services.length}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.servicesCost}</span>
            </div>
          )}
          <div className="summary-divider"></div>
          <div className="summary-item subtotal">
            <span>Subtotal:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.subtotal}</span>
          </div>
          {costs.discount > 0 && (
            <div className="summary-item discount">
              <span>Multi-Platform Discount (10%):</span>
              <span>-{currency === 'SAR' ? 'SAR' : '£'} {costs.discount}</span>
            </div>
          )}
          <div className="summary-divider"></div>
          <div className="summary-item total">
            <span>Total Investment:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.total}</span>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="user-info-form">
        <h3>Your Information</h3>
        <div className="form-grid-multi">
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
            <label><Store size={18} />Business Name *</label>
            <input
              type="text"
              placeholder="Your business name"
              value={userInfo.businessName}
              onChange={(e) => setUserInfo({...userInfo, businessName: e.target.value})}
            />
          </div>
          <div className="form-group full-width-multi">
            <label><Package size={18} />Product Category (Optional)</label>
            <input
              type="text"
              placeholder="E.g., Electronics, Fashion, Home & Garden"
              value={userInfo.productCategory}
              onChange={(e) => setUserInfo({...userInfo, productCategory: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Launch Your Stores & Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Multi-platform setup added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPlatformConfigurator;
