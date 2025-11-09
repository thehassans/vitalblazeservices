import React, { useState } from 'react';
import { Layers, Palette, Zap, CreditCard, ShoppingCart, Check, User, Phone, Mail, Globe } from 'lucide-react';
import './ShopifyConfigurator.css';

const ShopifyConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    package: 'standard',
    customizations: [],
    apps: [],
    pages: 5
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    storeUrl: '',
    industry: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Packages
  const packages = {
    basic: {
      name: 'Basic Setup',
      description: 'Essential Shopify store setup with standard theme',
      baseSAR: 2499,
      baseGBP: 500,
      features: [
        'Store Setup & Configuration',
        'Standard Theme Installation',
        'Up to 5 Custom Pages',
        'Basic SEO Setup',
        'Mobile Responsive Design',
        'Social Media Integration',
        '1 Month Support'
      ]
    },
    standard: {
      name: 'Standard Customization',
      description: 'Custom theme with advanced features and integrations',
      baseSAR: 4999,
      baseGBP: 1000,
      features: [
        'Everything in Basic',
        'Custom Theme Development',
        'Up to 10 Custom Pages',
        'Advanced SEO Optimization',
        'Payment Gateway Integration (3)',
        'Email Marketing Setup',
        'Product Import (100 items)',
        '3 Months Support'
      ],
      recommended: true
    },
    premium: {
      name: 'Premium Development',
      description: 'Fully custom Shopify store with advanced functionality',
      baseSAR: 9999,
      baseGBP: 2000,
      features: [
        'Everything in Standard',
        'Complete Custom Theme',
        'Unlimited Custom Pages',
        'Advanced App Integration (10+)',
        'Custom Checkout Experience',
        'Multi-Currency Support',
        'Product Import (500 items)',
        'Performance Optimization',
        'Conversion Rate Optimization',
        '6 Months Premium Support'
      ]
    }
  };

  // Custom Customizations
  const customizations = [
    {
      id: 'custom-homepage',
      name: 'Custom Homepage Design',
      description: 'Unique hero section, featured products, and custom sections',
      priceSAR: 1500,
      priceGBP: 300
    },
    {
      id: 'product-page',
      name: 'Enhanced Product Pages',
      description: 'Custom layouts, size guides, reviews, and AR preview',
      priceSAR: 1200,
      priceGBP: 240
    },
    {
      id: 'mega-menu',
      name: 'Mega Menu Navigation',
      description: 'Advanced navigation with images and categories',
      priceSAR: 800,
      priceGBP: 160
    },
    {
      id: 'blog',
      name: 'Blog & Content System',
      description: 'Custom blog design with category and tag system',
      priceSAR: 1000,
      priceGBP: 200
    },
    {
      id: 'subscription',
      name: 'Subscription Products',
      description: 'Recurring payment and subscription management',
      priceSAR: 1500,
      priceGBP: 300
    },
    {
      id: 'wishlist',
      name: 'Wishlist & Favorites',
      description: 'Customer wishlist with save for later functionality',
      priceSAR: 750,
      priceGBP: 150
    },
    {
      id: 'reviews',
      name: 'Advanced Review System',
      description: 'Product reviews with photos and verified badges',
      priceSAR: 900,
      priceGBP: 180
    },
    {
      id: 'quickview',
      name: 'Quick View & Quick Add',
      description: 'Fast product preview and add to cart',
      priceSAR: 600,
      priceGBP: 120
    },
    {
      id: 'bundling',
      name: 'Product Bundling',
      description: 'Bundle products with discount logic',
      priceSAR: 1200,
      priceGBP: 240
    },
    {
      id: 'loyalty',
      name: 'Loyalty Program',
      description: 'Points-based rewards and referral system',
      priceSAR: 1800,
      priceGBP: 360
    }
  ];

  // App Integrations
  const apps = [
    {
      id: 'klaviyo',
      name: 'Klaviyo Email Marketing',
      description: 'Advanced email automation and campaigns',
      priceSAR: 500,
      priceGBP: 100
    },
    {
      id: 'yotpo',
      name: 'Yotpo Reviews & Loyalty',
      description: 'User-generated content and loyalty programs',
      priceSAR: 600,
      priceGBP: 120
    },
    {
      id: 'privy',
      name: 'Privy Pop-ups & Banners',
      description: 'Email capture and exit-intent pop-ups',
      priceSAR: 400,
      priceGBP: 80
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics 4',
      description: 'Advanced tracking and conversion setup',
      priceSAR: 300,
      priceGBP: 60
    },
    {
      id: 'facebook-pixel',
      name: 'Facebook Pixel & Conversions API',
      description: 'Meta tracking and retargeting setup',
      priceSAR: 400,
      priceGBP: 80
    },
    {
      id: 'aftership',
      name: 'AfterShip Shipping Tracking',
      description: 'Automated shipping notifications',
      priceSAR: 350,
      priceGBP: 70
    }
  ];

  const toggleCustomization = (customId) => {
    if (config.customizations.includes(customId)) {
      setConfig({...config, customizations: config.customizations.filter(c => c !== customId)});
    } else {
      setConfig({...config, customizations: [...config.customizations, customId]});
    }
  };

  const toggleApp = (appId) => {
    if (config.apps.includes(appId)) {
      setConfig({...config, apps: config.apps.filter(a => a !== appId)});
    } else {
      setConfig({...config, apps: [...config.apps, appId]});
    }
  };

  const calculateTotal = () => {
    const packagePrice = currency === 'SAR' ? packages[config.package].baseSAR : packages[config.package].baseGBP;
    
    const customizationsCost = config.customizations.reduce((sum, customId) => {
      const custom = customizations.find(c => c.id === customId);
      return sum + (currency === 'SAR' ? custom.priceSAR : custom.priceGBP);
    }, 0);

    const appsCost = config.apps.reduce((sum, appId) => {
      const app = apps.find(a => a.id === appId);
      return sum + (currency === 'SAR' ? app.priceSAR : app.priceGBP);
    }, 0);

    const extraPages = config.pages > (config.package === 'basic' ? 5 : config.package === 'standard' ? 10 : 999);
    const pagesCost = extraPages > 0 ? (config.pages - (config.package === 'basic' ? 5 : 10)) * (currency === 'SAR' ? 300 : 60) : 0;

    const subtotal = packagePrice + customizationsCost + appsCost + pagesCost;
    const total = subtotal;

    return {
      packagePrice,
      customizationsCost,
      appsCost,
      pagesCost,
      subtotal,
      total
    };
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp) {
      alert('Please fill in all required fields');
      return;
    }

    const costs = calculateTotal();
    const orderDetails = {
      service: 'Shopify Customization',
      package: packages[config.package].name,
      customizations: config.customizations.map(id => customizations.find(c => c.id === id).name),
      apps: config.apps.map(id => apps.find(a => a.id === id).name),
      pages: config.pages,
      costs,
      userInfo,
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('shopifyOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('shopifyOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', email: '', whatsapp: '', storeUrl: '', industry: '' });
  };

  const costs = calculateTotal();

  return (
    <div className="shopify-configurator">
      <div className="configurator-header">
        <h2>Configure Your Shopify Store</h2>
        <p>Premium store design with custom themes, app integration, and optimization</p>
      </div>

      {/* Package Selection */}
      <div className="shopify-section">
        <div className="section-header">
          <Layers size={24} />
          <h3>Select Your Package</h3>
        </div>
        <div className="shopify-package-grid">
          {Object.entries(packages).map(([key, pkg]) => (
            <div
              key={key}
              className={`shopify-package-card ${config.package === key ? 'active' : ''} ${pkg.recommended ? 'recommended' : ''}`}
              onClick={() => setConfig({...config, package: key})}
            >
              {pkg.recommended && <div className="recommended-badge">Most Popular</div>}
              <div className="package-name">{pkg.name}</div>
              <div className="package-description">{pkg.description}</div>
              <div className="package-price">
                {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? pkg.baseSAR : pkg.baseGBP}
              </div>
              <ul className="package-features-list">
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

      {/* Custom Pages Slider */}
      <div className="shopify-section">
        <div className="section-header">
          <Palette size={24} />
          <h3>Custom Pages</h3>
        </div>
        <div className="pages-slider-container">
          <input
            type="range"
            min="1"
            max="30"
            value={config.pages}
            onChange={(e) => setConfig({...config, pages: parseInt(e.target.value)})}
            className="shopify-pages-slider"
          />
          <div className="pages-display-shopify">
            <span className="pages-number-shopify">{config.pages}</span>
            <span className="pages-label-shopify">Custom Pages</span>
            {config.pages > (config.package === 'basic' ? 5 : config.package === 'standard' ? 10 : 999) && (
              <span className="pages-extra-shopify">
                +{currency === 'SAR' ? 'SAR' : '£'} {costs.pagesCost} for extra pages
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Customizations */}
      <div className="shopify-section">
        <div className="section-header">
          <Zap size={24} />
          <h3>Custom Features</h3>
        </div>
        <div className="customizations-grid">
          {customizations.map((custom) => (
            <div
              key={custom.id}
              className={`customization-card ${config.customizations.includes(custom.id) ? 'selected' : ''}`}
              onClick={() => toggleCustomization(custom.id)}
            >
              <div className="customization-header">
                <div className="customization-name">{custom.name}</div>
                <div className="customization-check">
                  {config.customizations.includes(custom.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="customization-description">{custom.description}</div>
              <div className="customization-price">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? custom.priceSAR : custom.priceGBP}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Integrations */}
      <div className="shopify-section">
        <div className="section-header">
          <CreditCard size={24} />
          <h3>App Integrations</h3>
        </div>
        <div className="apps-grid">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`app-card ${config.apps.includes(app.id) ? 'selected' : ''}`}
              onClick={() => toggleApp(app.id)}
            >
              <div className="app-header">
                <div className="app-name">{app.name}</div>
                <div className="app-check">
                  {config.apps.includes(app.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="app-description">{app.description}</div>
              <div className="app-price">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? app.priceSAR : app.priceGBP}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="shopify-cost-breakdown">
        <div className="breakdown-header">
          <h3>Investment Breakdown</h3>
        </div>
        <div className="breakdown-items-shopify">
          <div className="breakdown-item-shopify">
            <span>{packages[config.package].name} Package:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.packagePrice}</span>
          </div>
          {costs.customizationsCost > 0 && (
            <div className="breakdown-item-shopify">
              <span>Custom Features ({config.customizations.length}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.customizationsCost}</span>
            </div>
          )}
          {costs.appsCost > 0 && (
            <div className="breakdown-item-shopify">
              <span>App Integrations ({config.apps.length}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.appsCost}</span>
            </div>
          )}
          {costs.pagesCost > 0 && (
            <div className="breakdown-item-shopify">
              <span>Extra Pages:</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.pagesCost}</span>
            </div>
          )}
          <div className="breakdown-divider-shopify"></div>
          <div className="breakdown-item-shopify total-shopify">
            <span>Total Investment:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.total}</span>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="user-info-form">
        <h3>Your Information</h3>
        <div className="form-grid-shopify">
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
            <label><Globe size={18} />Existing Store URL (Optional)</label>
            <input
              type="url"
              placeholder="https://yourstore.myshopify.com"
              value={userInfo.storeUrl}
              onChange={(e) => setUserInfo({...userInfo, storeUrl: e.target.value})}
            />
          </div>
          <div className="form-group full-width-shopify">
            <label><Layers size={18} />Industry/Niche (Optional)</label>
            <input
              type="text"
              placeholder="E.g., Fashion, Electronics, Beauty"
              value={userInfo.industry}
              onChange={(e) => setUserInfo({...userInfo, industry: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Launch Your Shopify Store & Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Shopify customization added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopifyConfigurator;
