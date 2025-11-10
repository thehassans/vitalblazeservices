import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Clock, CheckCircle, Star, Shield, Zap, Award,
  Headphones, Lock, Rocket, Target, BarChart3, Settings
} from 'lucide-react';
import config from '../config';
import { getServiceDetails } from '../data/serviceDetails';
import VPSConfigurator from '../components/VPSConfigurator';
import DedicatedServerConfigurator from '../components/DedicatedServerConfigurator';
import DomainSearchConfigurator from '../components/DomainSearchConfigurator';
import BusinessFormationConfigurator from '../components/BusinessFormationConfigurator';
import AdvertisementConfigurator from '../components/AdvertisementConfigurator';
import WebDevelopmentConfigurator from '../components/WebDevelopmentConfigurator';
import MultiPlatformConfigurator from '../components/MultiPlatformConfigurator';
import ShopifyConfigurator from '../components/ShopifyConfigurator';
import CRMPOSConfigurator from '../components/CRMPOSConfigurator';
import './ServiceDetailPage.css';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('SAR');

  useEffect(() => {
    fetchServiceDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchServiceDetail = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/services/${id}`);
      setService(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service:', error);
      setLoading(false);
    }
  };

  const getPrice = () => {
    if (!service) return '';
    const price = currency === 'SAR' ? service.priceSAR : service.priceGBP;
    const symbol = currency === 'SAR' ? 'SAR' : '£';
    
    if (!service.priceType) {
      return `${symbol} ${price}`;
    }
    
    return `${symbol} ${price}/${service.priceType}`;
  };

  const serviceDetails = getServiceDetails(parseInt(id));

  const handleContact = () => {
    navigate('/#contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="service-detail-page loading-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-detail-page error-page">
        <div className="error-content">
          <h2>Service Not Found</h2>
          <p>The service you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="detail-hero">
        <div className="hero-background"></div>
        <div className="container">
          <button onClick={() => navigate('/')} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </button>

          <div className="hero-content">
            <div className="hero-badge">{service.category}</div>
            <h1 className="hero-title">{service.name}</h1>
            <p className="hero-description">{service.description}</p>

            <div className="hero-meta">
              <div className="meta-item">
                <Clock size={20} />
                <div>
                  <span className="meta-label">Estimated Time</span>
                  <span className="meta-value">{serviceDetails.estimatedTime}</span>
                </div>
              </div>
              <div className="meta-item">
                <Award size={20} />
                <div>
                  <span className="meta-label">Service Level</span>
                  <span className="meta-value">Premium</span>
                </div>
              </div>
              {service.popular && (
                <div className="meta-item popular">
                  <Star size={20} />
                  <div>
                    <span className="meta-label">Status</span>
                    <span className="meta-value">Most Popular</span>
                  </div>
                </div>
              )}
            </div>

            <div className="hero-pricing">
              <div className="currency-switch">
                <button 
                  className={currency === 'SAR' ? 'active' : ''}
                  onClick={() => setCurrency('SAR')}
                >
                  SAR
                </button>
                <button 
                  className={currency === 'GBP' ? 'active' : ''}
                  onClick={() => setCurrency('GBP')}
                >
                  GBP
                </button>
              </div>
              <div className="price-display">
                <span className="price-label">Starting from</span>
                <span className="price-amount">{getPrice()}</span>
              </div>
              <button className="cta-primary" onClick={handleContact}>
                Get Started Now
                <Zap size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VPS Configurator - Only for VPS Hosting (ID 3) */}
      {parseInt(id) === 3 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <VPSConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Dedicated Server Configurator - Only for Dedicated Servers (ID 4) */}
      {parseInt(id) === 4 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <DedicatedServerConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Domain Search Configurator - Only for Domain Registration (ID 5) */}
      {parseInt(id) === 5 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <DomainSearchConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Business Formation Configurator - Only for LLC & LTD Formation (ID 16) */}
      {parseInt(id) === 16 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <BusinessFormationConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Advertisement Configurator - Only for Advertisement Management (ID 9) */}
      {parseInt(id) === 9 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <AdvertisementConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Web Development Configurator - Only for Web Development (ID 10) */}
      {parseInt(id) === 10 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <WebDevelopmentConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Multi-Platform Configurator - Only for Multi-Platform Store Setup (ID 17) */}
      {parseInt(id) === 17 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <MultiPlatformConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Shopify Configurator - Only for Shopify Customization (ID 18) */}
      {parseInt(id) === 18 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <ShopifyConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* CRM + POS Configurator - Only for CRM & POS Complete Solution (ID 12) */}
      {parseInt(id) === 12 && (
        <section className="detail-section configurator-section">
          <div className="container">
            <CRMPOSConfigurator currency={currency} />
          </div>
        </section>
      )}

      {/* Introduction Section */}
      <section className="detail-section intro-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">Service Overview</h2>
            <div className="intro-overview">
              <p className="intro-text">{serviceDetails.intro}</p>
            </div>
            <div className="intro-grid">
              <div className="intro-card">
                <div className="intro-icon">
                  <Rocket size={28} />
                </div>
                <h3>Rapid Deployment</h3>
                <p>Fast-track implementation with optimized workflows and expert project management for quick results.</p>
              </div>
              <div className="intro-card">
                <div className="intro-icon">
                  <Target size={28} />
                </div>
                <h3>Precision Delivery</h3>
                <p>Tailored solutions designed specifically for your business requirements and industry standards.</p>
              </div>
              <div className="intro-card">
                <div className="intro-icon">
                  <BarChart3 size={28} />
                </div>
                <h3>Measurable Results</h3>
                <p>Track progress with detailed analytics and comprehensive reporting throughout the entire process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="detail-section features-section">
        <div className="container">
          <h2 className="section-title">Key Features & Benefits</h2>
          <div className="features-grid">
            {service.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-check">
                  <CheckCircle size={24} />
                </div>
                <div className="feature-content">
                  <h4>{feature}</h4>
                  <p>Premium implementation with industry best practices and ongoing optimization.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="detail-section timeline-section">
        <div className="container">
          <h2 className="section-title">Implementation Timeline</h2>
          <p className="section-subtitle">Our proven step-by-step process ensures successful delivery</p>
          <div className="timeline">
            {serviceDetails.timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">{index + 1}</div>
                <div className="timeline-content">
                  <h3>{item.step}</h3>
                  <p className="timeline-duration">{item.duration}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="detail-section included-section">
        <div className="container">
          <h2 className="section-title">Deliverables</h2>
          <p className="section-subtitle">Everything you get with this premium service</p>
          <div className="deliverables-list">
            {serviceDetails.deliverables.map((item, index) => (
              <div key={index} className="deliverable-item">
                <CheckCircle size={24} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="detail-section tech-section">
        <div className="container">
          <h2 className="section-title">Technologies & Tools</h2>
          <p className="section-subtitle">Industry-leading technology stack for optimal performance</p>
          <div className="tech-grid">
            {serviceDetails.technologies.map((tech, index) => (
              <div key={index} className="tech-badge">
                <Settings size={18} />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Guarantee Section */}
      <section className="detail-section guarantee-section">
        <div className="container">
          <div className="guarantee-grid">
            <div className="guarantee-card">
              <Shield size={40} />
              <h3>Quality Guarantee</h3>
              <p>100% satisfaction guaranteed or your money back</p>
            </div>
            <div className="guarantee-card">
              <Headphones size={40} />
              <h3>24/7 Support</h3>
              <p>Round-the-clock expert assistance whenever you need it</p>
            </div>
            <div className="guarantee-card">
              <Lock size={40} />
              <h3>Secure & Private</h3>
              <p>Enterprise-grade security with complete data privacy</p>
            </div>
            <div className="guarantee-card">
              <Award size={40} />
              <h3>Premium Quality</h3>
              <p>Industry-leading standards and best practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="detail-section cta-section">
        <div className="container">
          <div className="cta-card-final">
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of satisfied clients who have transformed their business with our services</p>
              <div className="cta-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Active Clients</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime SLA</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
              <div className="cta-buttons">
                <button className="btn-primary" onClick={handleContact}>
                  Contact Us Now
                  <Zap size={20} />
                </button>
                <button className="btn-secondary" onClick={() => navigate('/')}>
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
