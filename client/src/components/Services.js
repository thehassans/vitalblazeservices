import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { 
  Server, Globe, ShieldCheck, Lock, UploadCloud, Layout, 
  Code, Wrench, Users, Brain, ShoppingCart, Layers, Shield, HardDrive, Database,
  Video, Briefcase, ShoppingBag, Store, Bot, Smartphone
} from 'lucide-react';
import './Services.css';

const iconMap = {
  'server': Server,
  'wordpress': Server,
  'hard-drive': HardDrive,
  'database': Database,
  'globe': Globe,
  'shield-check': ShieldCheck,
  'lock': Lock,
  'cloud-upload': UploadCloud,
  'layout': Layout,
  'code': Code,
  'wrench': Wrench,
  'users': Users,
  'brain': Brain,
  'shopping-cart': ShoppingCart,
  'layers': Layers,
  'shield': Shield,
  'video': Video,
  'briefcase': Briefcase,
  'shopping-bag': ShoppingBag,
  'store': Store,
  'bot': Bot,
  'smartphone': Smartphone
};

const Services = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currency, setCurrency] = useState('SAR');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(services.map(s => s.category))];
  
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const translateServiceName = (name) => {
    // Direct mapping for exact matches
    const nameMap = {
      'CRM & POS Complete Solution': t('crmPosComplete'),
      'Bug Fixer Service': t('bugFixerService'),
      'Web Development': t('webDevelopment'),
      'Advertisement Management': t('advertisementManagement'),
      'RDP & Dedicated IP': t('rdpDedicatedIp'),
      'Shopify Customization': t('shopifyCustomization'),
      'LLC & LTD Formation': t('llcLtdFormation'),
      'Mobile Development': t('mobileDevelopment'),
      'AI & Automation': t('aiAutomation'),
      'Infrastructure': t('infrastructure'),
      'Marketing & Media': t('marketingMedia'),
      'Domains & Security': t('domainsSecurity'),
      'Website Backup': t('websiteBackup'),
      'VPS Hosting': t('vpsHosting'),
      'Dedicated Server': t('dedicatedServer'),
      'Dedicated Servers': t('dedicatedServers'),
      'Domain Registration': t('domainRegistration'),
      'SSL Certificates': t('sslCertificates'),
      'Website Development': t('websiteDevelopment'),
      'SEO Services': t('seoServices'),
      'CRM Solutions': t('crmSolutions'),
      'Shopify Store Setup': t('shopifyStore'),
      'Multi-Platform E-Commerce': t('multiPlatform'),
      'Shared Hosting': t('sharedHosting')
    };
    
    return nameMap[name] || name;
  };

  const translateFeature = (feature) => {
    const featureMap = {
      'Daily Backups': t('dailyBackups'),
      'One-Click Restore': t('oneClickRestore'),
      'Cloud Storage': t('cloudStorage'),
      'Version Control': t('versionControl'),
      'Free WHOIS Privacy': t('freeWhoisPrivacy'),
      'Easy DNS Management': t('easyDnsManagement'),
      'Auto-Renewal Option': t('autoRenewalOption'),
      'TLDs Available +100': t('tldsAvailable'),
      'Complete Control': t('completeControl'),
      'Premium Hardware': t('premiumHardware'),
      'DDoS Protection': t('ddosProtection'),
      'Managed Support': t('managedSupport'),
      'Dedicated Resources': t('dedicatedResources'),
      'Full Root Access': t('fullRootAccess'),
      'SSD Storage': t('ssdStorage'),
      'Scalable RAM & CPU': t('scalableRamCpu'),
      'CRM + POS Integration': t('crmPosIntegration'),
      'AI Analytics & Insights': t('aiAnalyticsInsights'),
      'WhatsApp Integration': t('whatsappIntegration'),
      'Auto Invoice & Receipts': t('autoInvoiceReceipts'),
      'Quick Response': t('quickResponse'),
      'Expert Debugging': t('expertDebugging'),
      'All Technologies': t('allTechnologies'),
      'Guaranteed Fix': t('guaranteedFix'),
      'Custom Design': t('customDesign'),
      'Responsive Development': t('responsiveDevelopment'),
      'API Integration': t('apiIntegration'),
      'Quality Assurance': t('qualityAssurance'),
      'Multi-Platform Ad Manager': t('multiPlatformAdManager'),
      'Video Campaign Creation': t('videoCampaignCreation'),
      'Analytics & Reporting': t('analyticsReporting'),
      'Audience Targeting': t('audienceTargeting'),
      'Dedicated IP Address': t('dedicatedIpAddress'),
      'Full Administrator Access': t('fullAdministratorAccess'),
      'SSD Storage & High RAM': t('ssdStorageHighRam'),
      'Technical Support 24/7': t('technicalSupport247'),
      'Custom Theme Development': t('customThemeDevelopment'),
      'App Integration & Setup': t('appIntegrationSetup'),
      'Payment Gateway Configuration': t('paymentGatewayConfiguration'),
      'Performance Optimization': t('performanceOptimization'),
      'Amazon Seller Central Setup': t('amazonSellerCentralSetup'),
      'eBay & Etsy Integration': t('ebayEtsyIntegration'),
      'TikTok Shop Configuration': t('tiktokShopConfiguration'),
      'Product Optimization & SEO': t('productOptimizationSeo'),
      'Complete Legal Documentation': t('completeLegalDocumentation'),
      'International Registration': t('internationalRegistration'),
      'Tax Optimization Advice': t('taxOptimizationAdvice'),
      'Ongoing Compliance Support': t('ongoingComplianceSupport'),
      'By Quote': t('byQuote')
    };
    return featureMap[feature] || feature;
  };

  const translateCategory = (category) => {
    if (category === 'All') return language === 'ar' ? 'الكل' : 'All';
    const categoryMap = {
      'Hosting & Servers': t('hosting'),
      'Domains & SSL': t('domains'),
      'Business Solutions': t('business'),
      'E-Commerce': t('ecommerce')
    };
    return categoryMap[category] || category;
  };

  const getPrice = (service) => {
    const price = currency === 'SAR' ? service.priceSAR : service.priceGBP;
    const symbol = currency === 'SAR' ? 'SAR' : '£';
    
    if (!service.priceType) {
      return price;
    }
    
    const priceTypeTranslation = t(service.priceType) || `/${service.priceType}`;
    return `${symbol} ${price}${priceTypeTranslation}`;
  };

  const handleGetStarted = (service) => {
    // Navigate to service detail page
    navigate(`/service/${service.id}`);
  };

  if (loading) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge fade-in">{t('servicesTitle')}</div>
          <h2 className="section-title fade-in">
            {t('servicesSubtitle')}
            <br />
            <span className="text-gradient">{language === 'ar' ? 'لأعمالك' : 'For Your Business'}</span>
          </h2>
          <p className="section-description fade-in">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="currency-toggle fade-in">
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

        <div className="category-filter fade-in">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {translateCategory(category)}
            </button>
          ))}
        </div>

        <div className="services-grid">
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Server;
            return (
              <div 
                key={service.id} 
                className="service-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon">
                  <IconComponent size={32} />
                </div>
                
                <h3 className="service-name">{translateServiceName(service.name)}</h3>
                <p className="service-description">
                  {(() => {
                    const nameKey = service.name.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
                    const descKey = nameKey + 'Desc';
                    return t(descKey) !== descKey ? t(descKey) : service.description;
                  })()}
                </p>
                
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <ShieldCheck size={16} />
                      {translateFeature(feature)}
                    </li>
                  ))}
                </ul>
                
                <div className="service-footer">
                  <div className="service-price">
                    <span className="price-label">{t('startingFrom')}</span>
                    <span className="price-value">{getPrice(service)}</span>
                  </div>
                  <button 
                    className="service-cta"
                    onClick={() => handleGetStarted(service)}
                  >
                    {t('getStarted')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
