import React from 'react';
import { X, Check, Star, Shield, Zap, Users, TrendingUp, Clock, Globe, Headphones } from 'lucide-react';
import './ServiceDetailModal.css';

const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  const serviceDetails = {
    'Customer Relationship Management': {
      subtitle: 'Complete CRM Solution',
      description: 'Transform your customer relationships with our comprehensive CRM platform. Manage contacts, track sales pipelines, and boost customer satisfaction with powerful automation and analytics.',
      hero: 'Build stronger customer relationships and drive sales growth',
      benefits: [
        'Centralize all customer data in one secure platform',
        'Track every interaction across all touchpoints',
        'Automate repetitive tasks and save time',
        'Gain actionable insights with advanced analytics'
      ],
      features: [
        {
          category: 'Contact Management',
          items: [
            'Unlimited contact storage with custom fields',
            'Contact segmentation and tagging',
            'Complete interaction history timeline',
            'Social media profile integration',
            'Duplicate detection and merging',
            'Contact import/export tools'
          ]
        },
        {
          category: 'Sales Pipeline',
          items: [
            'Visual drag-and-drop pipeline management',
            'Customizable sales stages',
            'Deal tracking with probability scoring',
            'Sales forecasting and reporting',
            'Activity reminders and task management',
            'Win/loss analysis'
          ]
        },
        {
          category: 'Analytics Dashboard',
          items: [
            'Real-time sales performance metrics',
            'Custom report builder',
            'Revenue tracking and forecasting',
            'Team performance analytics',
            'Customer behavior insights',
            'Export reports to PDF/Excel'
          ]
        },
        {
          category: 'Email Integration',
          items: [
            'Two-way email sync with Gmail/Outlook',
            'Email templates and scheduling',
            'Email tracking and open rates',
            'Bulk email campaigns',
            'Auto-logging of email conversations',
            'Email sequence automation'
          ]
        }
      ],
      specs: [
        { label: 'Users Included', value: '5 Users' },
        { label: 'Contact Limit', value: 'Unlimited' },
        { label: 'Storage', value: '50 GB' },
        { label: 'Support', value: '24/7 Email & Chat' },
        { label: 'API Access', value: 'REST API Included' },
        { label: 'Mobile Apps', value: 'iOS & Android' }
      ],
      includes: [
        'Contact & Lead Management',
        'Sales Pipeline Tracking',
        'Email Integration',
        'Analytics Dashboard',
        'Mobile Access',
        'API Access',
        'Email Support',
        'Regular Updates'
      ]
    },
    'Advanced CRM Suite': {
      subtitle: 'Enterprise-Grade CRM with AI',
      description: 'Harness the power of artificial intelligence to supercharge your sales and marketing. Our Advanced CRM Suite combines automation, AI analytics, and multi-channel support for enterprise success.',
      hero: 'Leverage AI-powered insights for exponential business growth',
      benefits: [
        'AI-driven lead scoring and predictions',
        'Automate complex marketing workflows',
        'Engage customers across all channels',
        'Scale your operations effortlessly'
      ],
      features: [
        {
          category: 'AI Analytics',
          items: [
            'Predictive lead scoring with machine learning',
            'AI-powered sales forecasting',
            'Customer churn prediction',
            'Sentiment analysis on customer interactions',
            'Automated insight generation',
            'Revenue optimization recommendations'
          ]
        },
        {
          category: 'Marketing Automation',
          items: [
            'Multi-channel campaign orchestration',
            'Behavioral trigger automation',
            'Dynamic content personalization',
            'A/B testing and optimization',
            'Lead nurturing workflows',
            'Campaign ROI tracking'
          ]
        },
        {
          category: 'Multi-Channel Support',
          items: [
            'Unified inbox for all channels',
            'WhatsApp Business integration',
            'Social media management',
            'Live chat and chatbot',
            'SMS marketing campaigns',
            'Voice call integration'
          ]
        },
        {
          category: 'Custom Workflows',
          items: [
            'Visual workflow builder (no-code)',
            'Advanced conditional logic',
            'Custom approval processes',
            'Automated data enrichment',
            'Integration with 1000+ apps',
            'Workflow analytics and optimization'
          ]
        }
      ],
      specs: [
        { label: 'Users Included', value: '20 Users' },
        { label: 'Contact Limit', value: 'Unlimited' },
        { label: 'Storage', value: '500 GB' },
        { label: 'Support', value: '24/7 Priority Support' },
        { label: 'API Access', value: 'Advanced API + Webhooks' },
        { label: 'AI Features', value: 'Full AI Suite' }
      ],
      includes: [
        'Everything in Basic CRM',
        'AI-Powered Analytics',
        'Marketing Automation',
        'Multi-Channel Support',
        'Custom Workflows',
        'Advanced Integrations',
        'Priority Support',
        'Dedicated Account Manager'
      ]
    },
    'Point of Sale System': {
      subtitle: 'Modern Cloud-Based POS',
      description: 'Streamline your retail or restaurant operations with our intuitive cloud POS system. Real-time inventory, payment processing, and powerful reporting—all in one platform.',
      hero: 'Modernize your business with intelligent POS technology',
      benefits: [
        'Accept payments anywhere, anytime',
        'Real-time inventory synchronization',
        'Manage multiple locations effortlessly',
        'Detailed insights into business performance'
      ],
      features: [
        {
          category: 'Inventory Management',
          items: [
            'Real-time stock level tracking',
            'Automatic low-stock alerts',
            'Barcode scanning and generation',
            'Product variants and bundles',
            'Multi-location inventory sync',
            'Supplier management and purchase orders'
          ]
        },
        {
          category: 'Real-Time Reporting',
          items: [
            'Live sales dashboard',
            'Product performance analytics',
            'Employee sales tracking',
            'Hourly/daily/monthly reports',
            'Tax reporting and compliance',
            'Custom report generation'
          ]
        },
        {
          category: 'Payment Processing',
          items: [
            'Accept all major credit/debit cards',
            'Digital wallet support (Apple Pay, Google Pay)',
            'Split payments and tips',
            'Offline payment mode',
            'Secure EMV chip processing',
            'Cash drawer management'
          ]
        },
        {
          category: 'Multi-Location Support',
          items: [
            'Centralized management dashboard',
            'Location-specific pricing',
            'Transfer stock between locations',
            'Consolidated reporting',
            'Employee management across stores',
            'Cloud-based data synchronization'
          ]
        }
      ],
      specs: [
        { label: 'Registers', value: '3 Registers' },
        { label: 'Products', value: 'Unlimited' },
        { label: 'Locations', value: '5 Locations' },
        { label: 'Support', value: '24/7 Phone & Email' },
        { label: 'Hardware', value: 'Compatible with Standard Hardware' },
        { label: 'Integrations', value: 'Accounting & E-commerce' }
      ],
      includes: [
        'Inventory Management',
        'Payment Processing',
        'Real-Time Reporting',
        'Multi-Location Support',
        'Employee Management',
        'Customer Database',
        'Receipt Customization',
        'Hardware Support'
      ]
    },
    'Integrated CRM + POS': {
      subtitle: 'Complete Business Solution',
      description: 'Unite your customer management and point-of-sale operations in one powerful platform. Get a 360° view of your business with seamless data flow between CRM and POS.',
      hero: 'The ultimate all-in-one solution for retail and service businesses',
      benefits: [
        'Single source of truth for all business data',
        'Seamless customer experience across channels',
        'Unified reporting and analytics',
        'Reduce costs with one integrated platform'
      ],
      features: [
        {
          category: 'Unified Dashboard',
          items: [
            '360° customer view with purchase history',
            'Combined sales and CRM metrics',
            'Real-time business intelligence',
            'Cross-channel customer journey tracking',
            'Consolidated financial reporting',
            'Executive overview dashboard'
          ]
        },
        {
          category: 'Customer Insights',
          items: [
            'Purchase behavior analysis',
            'Customer lifetime value tracking',
            'RFM (Recency, Frequency, Monetary) analysis',
            'Predictive customer segmentation',
            'Personalized product recommendations',
            'Customer satisfaction scoring'
          ]
        },
        {
          category: 'Sales Analytics',
          items: [
            'Omnichannel sales tracking',
            'Product affinity analysis',
            'Sales funnel visualization',
            'Attribution modeling',
            'Inventory turnover metrics',
            'Profitability analysis by product/customer'
          ]
        },
        {
          category: 'Loyalty Programs',
          items: [
            'Points-based rewards system',
            'Tiered membership levels',
            'Automated reward triggers',
            'Digital punch cards',
            'Referral program management',
            'Birthday and anniversary rewards'
          ]
        }
      ],
      specs: [
        { label: 'Users', value: '25 Users' },
        { label: 'Registers', value: '10 Registers' },
        { label: 'Locations', value: 'Unlimited' },
        { label: 'Support', value: '24/7 Premium Support' },
        { label: 'Storage', value: '1 TB' },
        { label: 'Integrations', value: 'Full Suite + Custom' }
      ],
      includes: [
        'Complete CRM Features',
        'Full POS Functionality',
        'Unified Dashboard',
        'Customer Loyalty Program',
        'Advanced Analytics',
        'Marketing Automation',
        'Multi-Location Management',
        'White-Label Options',
        'Dedicated Support Team',
        'Custom Development'
      ]
    }
  };

  const details = serviceDetails[service.name];
  if (!details) return null;

  return (
    <div className="service-detail-overlay" onClick={onClose}>
      <div className="service-detail-container" onClick={(e) => e.stopPropagation()}>
        <button className="service-detail-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="service-detail-hero">
          <div className="service-detail-hero-content">
            <div className="service-detail-badge">{details.subtitle}</div>
            <h1 className="service-detail-title">{service.name}</h1>
            <p className="service-detail-hero-text">{details.hero}</p>
            <div className="service-detail-price">
              <span className="price-amount">{service.priceSAR} SAR</span>
              <span className="price-period">/month</span>
            </div>
            <button className="service-detail-cta">Start Free Trial</button>
          </div>
        </div>

        {/* Content */}
        <div className="service-detail-content">
          {/* Description */}
          <section className="service-detail-section">
            <p className="service-detail-description">{details.description}</p>
          </section>

          {/* Benefits */}
          <section className="service-detail-section">
            <h2 className="section-title">Key Benefits</h2>
            <div className="benefits-grid">
              {details.benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <Check className="benefit-icon" size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="service-detail-section">
            <h2 className="section-title">Complete Feature Set</h2>
            <div className="features-detailed-grid">
              {details.features.map((featureGroup, index) => (
                <div key={index} className="feature-detailed-card">
                  <h3 className="feature-detailed-title">{featureGroup.category}</h3>
                  <ul className="feature-detailed-list">
                    {featureGroup.items.map((item, idx) => (
                      <li key={idx}>
                        <Zap size={16} className="feature-check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Specifications */}
          <section className="service-detail-section">
            <h2 className="section-title">Technical Specifications</h2>
            <div className="specs-grid">
              {details.specs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* What's Included */}
          <section className="service-detail-section">
            <h2 className="section-title">What's Included</h2>
            <div className="includes-grid">
              {details.includes.map((item, index) => (
                <div key={index} className="include-item">
                  <Star className="include-icon" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Guarantees */}
          <section className="service-detail-section guarantees-section">
            <h2 className="section-title">Our Guarantee to You</h2>
            <div className="guarantees-grid">
              <div className="guarantee-card">
                <Shield size={32} />
                <h4>99.9% Uptime SLA</h4>
                <p>Enterprise-grade reliability</p>
              </div>
              <div className="guarantee-card">
                <Headphones size={32} />
                <h4>24/7 Support</h4>
                <p>Expert help when you need it</p>
              </div>
              <div className="guarantee-card">
                <Clock size={32} />
                <h4>30-Day Trial</h4>
                <p>No credit card required</p>
              </div>
              <div className="guarantee-card">
                <Globe size={32} />
                <h4>Global Reach</h4>
                <p>Serving 7+ countries</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="service-detail-cta-section">
            <div className="cta-card">
              <h2>Ready to Transform Your Business?</h2>
              <p>Join thousands of businesses already using our platform</p>
              <div className="cta-buttons">
                <button className="cta-primary">Start Free Trial</button>
                <button className="cta-secondary" onClick={onClose}>Compare Plans</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
