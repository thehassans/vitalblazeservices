import React, { useState } from 'react';
import { Users, ShoppingCart, MessageCircle, FileText, BarChart3, Zap, Check, User, Phone, Mail, Building, Package } from 'lucide-react';
import './CRMPOSConfigurator.css';

const CRMPOSConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    basePackage: 'standard',
    crmFeatures: [],
    posFeatures: [],
    integrations: [],
    addons: []
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessName: '',
    industry: '',
    employees: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Base Packages
  const basePackages = {
    basic: {
      name: 'Basic Package',
      description: 'Essential CRM and POS features for small businesses',
      baseSAR: 299,
      baseGBP: 60,
      includedFeatures: [
        'Up to 3 Users',
        'Basic CRM & POS',
        'Cloud Storage (5GB)',
        'Email Support',
        'Mobile App Access'
      ]
    },
    standard: {
      name: 'Standard Package',
      description: 'Complete solution for growing businesses',
      baseSAR: 599,
      baseGBP: 120,
      includedFeatures: [
        'Up to 10 Users',
        'Full CRM & POS Suite',
        'Cloud Storage (50GB)',
        'Priority Support',
        'Mobile App + Web Portal',
        'Basic Analytics'
      ],
      recommended: true
    },
    premium: {
      name: 'Premium Package',
      description: 'Enterprise-grade with AI and advanced automation',
      baseSAR: 1199,
      baseGBP: 240,
      includedFeatures: [
        'Unlimited Users',
        'AI-Powered CRM & POS',
        'Cloud Storage (Unlimited)',
        '24/7 Premium Support',
        'Multi-Platform Access',
        'Advanced Analytics & Reports',
        'Custom Branding'
      ]
    }
  };

  // CRM Features
  const crmFeatures = [
    {
      id: 'contact-management',
      name: 'Advanced Contact Management',
      icon: <Users size={20} />,
      description: 'Complete customer database with 360° view, interaction history, custom fields, tags, and smart segmentation',
      priceSAR: 99,
      priceGBP: 20,
      essential: false
    },
    {
      id: 'sales-pipeline',
      name: 'Sales Pipeline & Deals',
      icon: <BarChart3 size={20} />,
      description: 'Visual sales pipeline with drag-and-drop, deal tracking, forecasting, and automated stage progression',
      priceSAR: 149,
      priceGBP: 30,
      essential: false
    },
    {
      id: 'lead-scoring',
      name: 'AI Lead Scoring',
      icon: <Zap size={20} />,
      description: 'Machine learning-powered lead scoring and prioritization based on behavior and conversion probability',
      priceSAR: 199,
      priceGBP: 40,
      essential: false
    },
    {
      id: 'email-campaigns',
      name: 'Email Marketing Campaigns',
      icon: <Mail size={20} />,
      description: 'Create and send bulk email campaigns with templates, automation, A/B testing, and detailed analytics',
      priceSAR: 129,
      priceGBP: 26,
      essential: false
    },
    {
      id: 'task-automation',
      name: 'Task & Workflow Automation',
      icon: <Zap size={20} />,
      description: 'Automate repetitive tasks, create custom workflows, set triggers, and schedule follow-ups automatically',
      priceSAR: 169,
      priceGBP: 34,
      essential: false
    },
    {
      id: 'customer-portal',
      name: 'Customer Self-Service Portal',
      icon: <Users size={20} />,
      description: 'Branded customer portal for viewing orders, invoices, support tickets, and account management',
      priceSAR: 179,
      priceGBP: 36,
      essential: false
    }
  ];

  // POS Features
  const posFeatures = [
    {
      id: 'inventory-management',
      name: 'Advanced Inventory Management',
      icon: <Package size={20} />,
      description: 'Real-time stock tracking, low-stock alerts, barcode scanning, batch updates, and multi-location inventory sync',
      priceSAR: 149,
      priceGBP: 30,
      essential: false
    },
    {
      id: 'payment-processing',
      name: 'Multi-Payment Gateway',
      icon: <ShoppingCart size={20} />,
      description: 'Accept cash, cards, mobile wallets, split payments, refunds, and integrate with Stripe, PayPal, Square',
      priceSAR: 199,
      priceGBP: 40,
      essential: false
    },
    {
      id: 'receipt-printing',
      name: 'Smart Receipt & Invoice System',
      icon: <FileText size={20} />,
      description: 'Custom receipt templates, thermal printer support, email/SMS receipts, and digital invoice generation',
      priceSAR: 89,
      priceGBP: 18,
      essential: false
    },
    {
      id: 'employee-management',
      name: 'Employee & Shift Management',
      icon: <Users size={20} />,
      description: 'Track employee hours, assign roles, manage permissions, commission tracking, and performance analytics',
      priceSAR: 129,
      priceGBP: 26,
      essential: false
    },
    {
      id: 'table-management',
      name: 'Table & Order Management',
      icon: <ShoppingCart size={20} />,
      description: 'Restaurant table layout, order tracking, kitchen display system, table reservations, and waitlist',
      priceSAR: 159,
      priceGBP: 32,
      essential: false
    },
    {
      id: 'loyalty-program',
      name: 'Customer Loyalty Program',
      icon: <Users size={20} />,
      description: 'Points-based rewards, tier levels, automated rewards, birthday offers, and referral tracking',
      priceSAR: 149,
      priceGBP: 30,
      essential: false
    }
  ];

  // Integrations
  const integrations = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Business Integration',
      icon: <MessageCircle size={20} />,
      description: 'Send order confirmations, invoice reminders, promotional messages, and customer support via WhatsApp API with automated responses',
      priceSAR: 199,
      priceGBP: 40
    },
    {
      id: 'auto-invoice',
      name: 'Auto Invoice & Receipt Send',
      icon: <FileText size={20} />,
      description: 'Automatically generate and send invoices/receipts via email, SMS, or WhatsApp immediately after purchase with customizable templates',
      priceSAR: 149,
      priceGBP: 30
    },
    {
      id: 'accounting',
      name: 'Accounting Software Integration',
      icon: <BarChart3 size={20} />,
      description: 'Sync with QuickBooks, Xero, or Zoho Books for automatic transaction recording, expense tracking, and financial reporting',
      priceSAR: 179,
      priceGBP: 36
    },
    {
      id: 'sms-notifications',
      name: 'SMS Notification System',
      icon: <MessageCircle size={20} />,
      description: 'Automated SMS alerts for order status, delivery updates, appointment reminders, and promotional campaigns with bulk messaging',
      priceSAR: 129,
      priceGBP: 26
    },
    {
      id: 'e-commerce',
      name: 'E-commerce Platform Sync',
      icon: <ShoppingCart size={20} />,
      description: 'Integrate with Shopify, WooCommerce, Magento for unified inventory, orders, and customer data across all channels',
      priceSAR: 199,
      priceGBP: 40
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics & Ads',
      icon: <BarChart3 size={20} />,
      description: 'Track customer behavior, conversion funnels, ROI from marketing campaigns, and sync with Google Ads for retargeting',
      priceSAR: 99,
      priceGBP: 20
    }
  ];

  // Additional Add-ons
  const addons = [
    {
      id: 'training',
      name: 'Staff Training & Onboarding',
      icon: <Users size={20} />,
      description: '8-hour comprehensive training session for your team, video tutorials, user manuals, and 30-day onboarding support',
      priceSAR: 999,
      priceGBP: 200
    },
    {
      id: 'custom-reports',
      name: 'Custom Report Builder',
      icon: <BarChart3 size={20} />,
      description: 'Create unlimited custom reports with drag-and-drop builder, scheduled exports, and automated email delivery',
      priceSAR: 299,
      priceGBP: 60
    },
    {
      id: 'api-access',
      name: 'API Access & Webhooks',
      icon: <Zap size={20} />,
      description: 'Full REST API access for custom integrations, webhooks for real-time events, and developer documentation',
      priceSAR: 399,
      priceGBP: 80
    },
    {
      id: 'data-migration',
      name: 'Data Migration Service',
      icon: <Package size={20} />,
      description: 'Professional migration of customer data, products, orders, and history from your existing system with zero downtime',
      priceSAR: 799,
      priceGBP: 160
    }
  ];

  const toggleFeature = (category, featureId) => {
    const currentList = config[category];
    if (currentList.includes(featureId)) {
      setConfig({...config, [category]: currentList.filter(id => id !== featureId)});
    } else {
      setConfig({...config, [category]: [...currentList, featureId]});
    }
  };

  const calculateTotal = () => {
    const packageCost = currency === 'SAR' ? basePackages[config.basePackage].baseSAR : basePackages[config.basePackage].baseGBP;
    
    const crmCost = config.crmFeatures.reduce((sum, id) => {
      const feature = crmFeatures.find(f => f.id === id);
      return sum + (currency === 'SAR' ? feature.priceSAR : feature.priceGBP);
    }, 0);

    const posCost = config.posFeatures.reduce((sum, id) => {
      const feature = posFeatures.find(f => f.id === id);
      return sum + (currency === 'SAR' ? feature.priceSAR : feature.priceGBP);
    }, 0);

    const integrationCost = config.integrations.reduce((sum, id) => {
      const integration = integrations.find(i => i.id === id);
      return sum + (currency === 'SAR' ? integration.priceSAR : integration.priceGBP);
    }, 0);

    const addonCost = config.addons.reduce((sum, id) => {
      const addon = addons.find(a => a.id === id);
      return sum + (currency === 'SAR' ? addon.priceSAR : addon.priceGBP);
    }, 0);

    const monthlyTotal = packageCost + crmCost + posCost + integrationCost;
    const total = monthlyTotal + addonCost;

    return {
      packageCost,
      crmCost,
      posCost,
      integrationCost,
      addonCost,
      monthlyTotal,
      total
    };
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp || !userInfo.businessName) {
      alert('Please fill in all required fields');
      return;
    }

    const costs = calculateTotal();
    const orderDetails = {
      service: 'CRM & POS Complete Solution',
      basePackage: basePackages[config.basePackage].name,
      crmFeatures: config.crmFeatures.map(id => crmFeatures.find(f => f.id === id).name),
      posFeatures: config.posFeatures.map(id => posFeatures.find(f => f.id === id).name),
      integrations: config.integrations.map(id => integrations.find(i => i.id === id).name),
      addons: config.addons.map(id => addons.find(a => a.id === id).name),
      costs,
      userInfo,
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('crmPosOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('crmPosOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', email: '', whatsapp: '', businessName: '', industry: '', employees: '' });
  };

  const costs = calculateTotal();

  return (
    <div className="crmpos-configurator">
      <div className="configurator-header">
        <h2>Configure Your Complete CRM & POS Solution</h2>
        <p>Build a custom system with the exact features your business needs</p>
      </div>

      {/* Base Package Selection */}
      <div className="crmpos-section">
        <div className="section-header">
          <Package size={24} />
          <h3>Choose Base Package</h3>
        </div>
        <div className="base-package-grid">
          {Object.entries(basePackages).map(([key, pkg]) => (
            <div
              key={key}
              className={`base-package-card ${config.basePackage === key ? 'active' : ''} ${pkg.recommended ? 'recommended' : ''}`}
              onClick={() => setConfig({...config, basePackage: key})}
            >
              {pkg.recommended && <div className="recommended-badge">Recommended</div>}
              <div className="package-name">{pkg.name}</div>
              <div className="package-description">{pkg.description}</div>
              <div className="package-price">
                {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? pkg.baseSAR : pkg.baseGBP}
                <span className="price-period">/month</span>
              </div>
              <ul className="included-features-list">
                {pkg.includedFeatures.map((feature, idx) => (
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

      {/* CRM Features */}
      <div className="crmpos-section">
        <div className="section-header">
          <Users size={24} />
          <h3>CRM Features (Optional)</h3>
        </div>
        <div className="features-grid-crm">
          {crmFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card-crm ${config.crmFeatures.includes(feature.id) ? 'selected' : ''}`}
              onClick={() => toggleFeature('crmFeatures', feature.id)}
            >
              <div className="feature-header-crm">
                <div className="feature-icon-crm">{feature.icon}</div>
                <div className="feature-check-crm">
                  {config.crmFeatures.includes(feature.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="feature-name-crm">{feature.name}</div>
              <div className="feature-description-crm">{feature.description}</div>
              <div className="feature-price-crm">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? feature.priceSAR : feature.priceGBP}/mo
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POS Features */}
      <div className="crmpos-section">
        <div className="section-header">
          <ShoppingCart size={24} />
          <h3>POS Features (Optional)</h3>
        </div>
        <div className="features-grid-crm">
          {posFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card-crm ${config.posFeatures.includes(feature.id) ? 'selected' : ''}`}
              onClick={() => toggleFeature('posFeatures', feature.id)}
            >
              <div className="feature-header-crm">
                <div className="feature-icon-crm">{feature.icon}</div>
                <div className="feature-check-crm">
                  {config.posFeatures.includes(feature.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="feature-name-crm">{feature.name}</div>
              <div className="feature-description-crm">{feature.description}</div>
              <div className="feature-price-crm">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? feature.priceSAR : feature.priceGBP}/mo
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="crmpos-section">
        <div className="section-header">
          <Zap size={24} />
          <h3>Integrations & Automation (Optional)</h3>
        </div>
        <div className="integrations-grid">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className={`integration-card ${config.integrations.includes(integration.id) ? 'selected' : ''}`}
              onClick={() => toggleFeature('integrations', integration.id)}
            >
              <div className="integration-header">
                <div className="integration-icon">{integration.icon}</div>
                <div className="integration-check">
                  {config.integrations.includes(integration.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="integration-name">{integration.name}</div>
              <div className="integration-description">{integration.description}</div>
              <div className="integration-price">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? integration.priceSAR : integration.priceGBP}/mo
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="crmpos-section">
        <div className="section-header">
          <Package size={24} />
          <h3>One-Time Add-ons (Optional)</h3>
        </div>
        <div className="addons-grid">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className={`addon-card ${config.addons.includes(addon.id) ? 'selected' : ''}`}
              onClick={() => toggleFeature('addons', addon.id)}
            >
              <div className="addon-header">
                <div className="addon-icon">{addon.icon}</div>
                <div className="addon-check">
                  {config.addons.includes(addon.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="addon-name">{addon.name}</div>
              <div className="addon-description">{addon.description}</div>
              <div className="addon-price">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? addon.priceSAR : addon.priceGBP} (one-time)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Summary */}
      <div className="crmpos-cost-summary">
        <div className="summary-header">
          <h3>Investment Summary</h3>
        </div>
        <div className="summary-items-crm">
          <div className="summary-item-crm">
            <span>{basePackages[config.basePackage].name}:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.packageCost}/mo</span>
          </div>
          {costs.crmCost > 0 && (
            <div className="summary-item-crm">
              <span>CRM Features ({config.crmFeatures.length}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.crmCost}/mo</span>
            </div>
          )}
          {costs.posCost > 0 && (
            <div className="summary-item-crm">
              <span>POS Features ({config.posFeatures.length}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.posCost}/mo</span>
            </div>
          )}
          {costs.integrationCost > 0 && (
            <div className="summary-item-crm">
              <span>Integrations ({config.integrations.length}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.integrationCost}/mo</span>
            </div>
          )}
          <div className="summary-divider-crm"></div>
          <div className="summary-item-crm monthly-total">
            <span>Monthly Subscription:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.monthlyTotal}</span>
          </div>
          {costs.addonCost > 0 && (
            <>
              <div className="summary-divider-crm"></div>
              <div className="summary-item-crm">
                <span>One-Time Add-ons ({config.addons.length}):</span>
                <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.addonCost}</span>
              </div>
            </>
          )}
          <div className="summary-divider-crm"></div>
          <div className="summary-item-crm total-crm">
            <span>Total First Payment:</span>
            <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.total}</span>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="user-info-form">
        <h3>Your Business Information</h3>
        <div className="form-grid-crm">
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
            <label><Building size={18} />Business Name *</label>
            <input
              type="text"
              placeholder="Your business name"
              value={userInfo.businessName}
              onChange={(e) => setUserInfo({...userInfo, businessName: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label><Package size={18} />Industry (Optional)</label>
            <input
              type="text"
              placeholder="E.g., Retail, Restaurant, Services"
              value={userInfo.industry}
              onChange={(e) => setUserInfo({...userInfo, industry: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label><Users size={18} />Number of Employees (Optional)</label>
            <input
              type="text"
              placeholder="E.g., 1-10, 11-50"
              value={userInfo.employees}
              onChange={(e) => setUserInfo({...userInfo, employees: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Start Your CRM & POS System & Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            CRM & POS solution added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMPOSConfigurator;
