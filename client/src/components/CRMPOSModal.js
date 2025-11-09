import React from 'react';
import { X, Users, MessageCircle, TrendingUp, Package, DollarSign, Truck, BarChart3, Shield } from 'lucide-react';
import './CRMPOSModal.css';

const CRMPOSModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const platforms = [
    {
      icon: Users,
      title: 'Admin Panel',
      description: 'Complete system administration',
      features: [
        'User management across all roles',
        'WhatsApp Inbox & Connect (QR authentication)',
        'Business intelligence with regional analytics (UAE, KSA, Oman, Bahrain, Kuwait, Qatar, India)',
        'Website & product catalog management',
        'Theme customization'
      ]
    },
    {
      icon: BarChart3,
      title: 'User Panel (Business Owner)',
      description: 'Comprehensive business management',
      features: [
        'Dashboard with total sales, COD, prepaid analytics',
        'Multi-country analytics with interactive charts',
        'WhatsApp CRM with unified inbox & media support',
        'Team management (Agents, Managers, Drivers, Investors)',
        'Financial management & business intelligence'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Agent Panel',
      description: 'Customer service focused',
      features: [
        'Performance dashboard (chats, orders, response time)',
        'WhatsApp Inbox with assigned conversations',
        'Order submission from chat',
        'Quick reply templates',
        'Commission tracking'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Manager Panel',
      description: 'Regional operations management',
      features: [
        'Regional overview dashboard',
        'Agent supervision & performance evaluation',
        'Driver operations & route optimization',
        'Financial management (settlements, commissions)',
        'Warehouse & inventory oversight'
      ]
    },
    {
      icon: Truck,
      title: 'Driver Panel',
      description: 'Delivery management',
      features: [
        'Daily overview (deliveries, cash, earnings)',
        'GPS route optimization',
        'Order actions (pick up, deliver, COD collection)',
        'Native mobile app with offline mode',
        'Barcode scanning & digital signatures'
      ]
    },
    {
      icon: Package,
      title: 'Warehouse Panel',
      description: 'Inventory & fulfillment',
      features: [
        'Real-time inventory across locations',
        'Order fulfillment with pick & pack',
        'Stock transfers between warehouses',
        'Purchase order receiving',
        'Returns processing'
      ]
    },
    {
      icon: DollarSign,
      title: 'Finance Panel',
      description: 'Financial operations',
      features: [
        'Transaction management',
        'Expense tracking with approvals',
        'P&L and Cash Flow reports',
        'Multi-currency support (8 currencies)',
        'Reconciliation & export tools'
      ]
    },
    {
      icon: Shield,
      title: 'Investor Panel',
      description: 'Investment tracking',
      features: [
        'Investment overview & valuation',
        'Returns & performance metrics',
        'Monthly statements',
        'ROI tracking',
        'Historical performance'
      ]
    }
  ];

  const crmFeatures = [
    {
      title: 'WhatsApp Business CRM',
      items: [
        'Unified inbox for all conversations',
        'Rich media support (images, videos, documents, voice)',
        'QR code-based WhatsApp Business API integration',
        'Chat assignment to agents (manual, round-robin, load balancing)',
        'Real-time notifications (desktop & browser)',
        'Quick reply templates with categories',
        'Direct order creation from chat',
        'Customer context integration (order history, profile)'
      ]
    },
    {
      title: 'E-commerce & POS',
      items: [
        'Quick product search & barcode scanning',
        'Payment processing (COD, prepaid, multiple methods)',
        'Shopify integration (two-way sync)',
        'Shopping cart with promo codes',
        'Customer portal with order tracking',
        'Real-time stock integration',
        'Multi-currency support across GCC & South Asia',
        'Guest and registered checkout'
      ]
    },
    {
      title: 'Analytics & Intelligence',
      items: [
        'Comprehensive metrics: sales, orders, revenue',
        'Multi-country analytics with visual reports',
        'Regional sales analytics (7 countries)',
        'Custom report builder with exports (PDF, Excel)',
        'Campaign management',
        'Financial insights & forecasting',
        'Performance tracking & KPIs',
        'Real-time dashboard updates'
      ]
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">BuySial Commerce Platform</div>
          <h2 className="modal-title">
            Complete Business Management
            <br />
            <span className="text-gradient">CRM & POS Solution</span>
          </h2>
          <p className="modal-description">
            Unified platform with 8 specialized panels, WhatsApp CRM integration, multi-currency support,
            and real-time analytics for modern e-commerce operations.
          </p>
        </div>

        <div className="modal-content">
          <div className="platforms-section">
            <h3 className="section-heading">Platform Panels Overview</h3>
            <div className="platforms-grid">
              {platforms.map((platform, index) => {
                const IconComponent = platform.icon;
                return (
                  <div key={index} className="platform-card">
                    <div className="platform-icon">
                      <IconComponent size={24} />
                    </div>
                    <h4 className="platform-title">{platform.title}</h4>
                    <p className="platform-description">{platform.description}</p>
                    <ul className="platform-features">
                      {platform.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="features-section">
            <h3 className="section-heading">Core Features</h3>
            <div className="features-grid">
              {crmFeatures.map((feature, index) => (
                <div key={index} className="feature-block">
                  <h4 className="feature-title">{feature.title}</h4>
                  <ul className="feature-list">
                    {feature.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-section">
            <h3 className="section-heading">Technology & Support</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Technology Stack</h4>
                <p>MERN (MongoDB, Express, React, Node.js) + Socket.IO + React Native</p>
              </div>
              <div className="tech-item">
                <h4>Multi-Region Support</h4>
                <p>UAE, KSA, Oman, Bahrain, Kuwait, Qatar, India</p>
              </div>
              <div className="tech-item">
                <h4>Deployment</h4>
                <p>Plesk with CI/CD automation & SSL certificates</p>
              </div>
              <div className="tech-item">
                <h4>Security</h4>
                <p>JWT authentication, RBAC, encryption, GDPR compliance</p>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button className="modal-cta primary">Request Demo</button>
            <button className="modal-cta secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMPOSModal;
