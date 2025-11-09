import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building2, FileText, DollarSign, ShoppingCart, Check, User, Phone, Mail, Calculator, Search, CheckCircle, XCircle, Loader } from 'lucide-react';
import './BusinessFormationConfigurator.css';

const BusinessFormationConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    jurisdiction: 'uk',
    entityType: 'ltd',
    services: []
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessName: ''
  });

  const [nameCheck, setNameCheck] = useState({
    searching: false,
    checked: false,
    available: null,
    suggestions: []
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Jurisdictions with base prices and fees
  const jurisdictions = {
    'uk': {
      name: 'United Kingdom',
      flag: '🇬🇧',
      entities: {
        'ltd': { 
          name: 'Limited Company (Ltd)', 
          baseSAR: 1499, 
          baseGBP: 300,
          govFeeSAR: 375,
          govFeeGBP: 75,
          timeline: '5-7 business days'
        },
        'llp': { 
          name: 'Limited Liability Partnership (LLP)', 
          baseSAR: 1749, 
          baseGBP: 350,
          govFeeSAR: 425,
          govFeeGBP: 85,
          timeline: '7-10 business days'
        },
        'plc': { 
          name: 'Public Limited Company (PLC)', 
          baseSAR: 3749, 
          baseGBP: 750,
          govFeeSAR: 1250,
          govFeeGBP: 250,
          timeline: '10-15 business days'
        }
      }
    },
    'saudi': {
      name: 'Saudi Arabia',
      flag: '🇸🇦',
      entities: {
        'llc': { 
          name: 'Limited Liability Company (LLC)', 
          baseSAR: 2499, 
          baseGBP: 500,
          govFeeSAR: 1000,
          govFeeGBP: 200,
          timeline: '7-14 business days'
        },
        'establishment': { 
          name: 'Sole Establishment', 
          baseSAR: 1999, 
          baseGBP: 400,
          govFeeSAR: 500,
          govFeeGBP: 100,
          timeline: '5-10 business days'
        },
        'branch': { 
          name: 'Foreign Company Branch', 
          baseSAR: 4999, 
          baseGBP: 1000,
          govFeeSAR: 2000,
          govFeeGBP: 400,
          timeline: '15-30 business days'
        }
      }
    },
    'uae': {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      entities: {
        'llc': { 
          name: 'Limited Liability Company (LLC)', 
          baseSAR: 3749, 
          baseGBP: 750,
          govFeeSAR: 1875,
          govFeeGBP: 375,
          timeline: '7-14 business days'
        },
        'freezone': { 
          name: 'Free Zone Company (FZC)', 
          baseSAR: 2999, 
          baseGBP: 600,
          govFeeSAR: 1500,
          govFeeGBP: 300,
          timeline: '5-10 business days'
        },
        'branch': { 
          name: 'Foreign Company Branch', 
          baseSAR: 5749, 
          baseGBP: 1150,
          govFeeSAR: 2500,
          govFeeGBP: 500,
          timeline: '20-40 business days'
        }
      }
    },
    'usa': {
      name: 'United States',
      flag: '🇺🇸',
      entities: {
        'llc': { 
          name: 'Limited Liability Company (LLC)', 
          baseSAR: 1999, 
          baseGBP: 400,
          govFeeSAR: 500,
          govFeeGBP: 100,
          timeline: '5-10 business days'
        },
        'c-corp': { 
          name: 'C Corporation', 
          baseSAR: 2499, 
          baseGBP: 500,
          govFeeSAR: 750,
          govFeeGBP: 150,
          timeline: '10-15 business days'
        },
        's-corp': { 
          name: 'S Corporation', 
          baseSAR: 2499, 
          baseGBP: 500,
          govFeeSAR: 750,
          govFeeGBP: 150,
          timeline: '10-15 business days'
        }
      }
    },
    'singapore': {
      name: 'Singapore',
      flag: '🇸🇬',
      entities: {
        'pte': { 
          name: 'Private Limited Company (Pte Ltd)', 
          baseSAR: 2249, 
          baseGBP: 450,
          govFeeSAR: 750,
          govFeeGBP: 150,
          timeline: '3-5 business days'
        },
        'branch': { 
          name: 'Foreign Company Branch', 
          baseSAR: 3749, 
          baseGBP: 750,
          govFeeSAR: 1500,
          govFeeGBP: 300,
          timeline: '10-20 business days'
        }
      }
    },
    'offshore': {
      name: 'Offshore Jurisdictions',
      flag: '🌍',
      entities: {
        'seychelles': { 
          name: 'Seychelles IBC', 
          baseSAR: 1499, 
          baseGBP: 300,
          govFeeSAR: 500,
          govFeeGBP: 100,
          timeline: '3-5 business days'
        },
        'bvi': { 
          name: 'BVI Business Company', 
          baseSAR: 1999, 
          baseGBP: 400,
          govFeeSAR: 750,
          govFeeGBP: 150,
          timeline: '5-7 business days'
        },
        'cayman': { 
          name: 'Cayman Islands Exempted Company', 
          baseSAR: 2999, 
          baseGBP: 600,
          govFeeSAR: 1250,
          govFeeGBP: 250,
          timeline: '7-10 business days'
        }
      }
    }
  };

  // Additional services
  const additionalServices = [
    { 
      id: 'registered-office', 
      name: 'Registered Office Address (1 Year)', 
      priceSAR: 750, 
      priceGBP: 150,
      description: 'Professional business address for official correspondence'
    },
    { 
      id: 'bank-intro', 
      name: 'Business Bank Account Introduction', 
      priceSAR: 1250, 
      priceGBP: 250,
      description: 'Assistance with opening corporate bank account'
    },
    { 
      id: 'tax-number', 
      name: 'Tax Registration & VAT Number', 
      priceSAR: 625, 
      priceGBP: 125,
      description: 'Registration for tax identification and VAT number'
    },
    { 
      id: 'nominee-director', 
      name: 'Nominee Director Service (1 Year)', 
      priceSAR: 2500, 
      priceGBP: 500,
      description: 'Professional nominee director for privacy and compliance'
    },
    { 
      id: 'trademark', 
      name: 'Trademark Registration', 
      priceSAR: 1875, 
      priceGBP: 375,
      description: 'Register and protect your business name and logo'
    },
    { 
      id: 'compliance', 
      name: 'Annual Compliance Package', 
      priceSAR: 1500, 
      priceGBP: 300,
      description: 'Annual filing, secretarial services, and compliance management'
    },
    { 
      id: 'express', 
      name: 'Express Formation (Rush Service)', 
      priceSAR: 1250, 
      priceGBP: 250,
      description: 'Priority processing for faster company formation'
    },
    { 
      id: 'apostille', 
      name: 'Document Apostille & Legalization', 
      priceSAR: 875, 
      priceGBP: 175,
      description: 'International document authentication and legalization'
    }
  ];

  const toggleService = (serviceId) => {
    if (config.services.includes(serviceId)) {
      setConfig({...config, services: config.services.filter(s => s !== serviceId)});
    } else {
      setConfig({...config, services: [...config.services, serviceId]});
    }
  };

  // Simulated database of taken business names (in production, this would be an API call)
  const takenNames = [
    'global solutions', 'innovative tech', 'prime investments', 'elite services',
    'royal group', 'diamond enterprises', 'platinum holdings', 'golden ventures',
    'supreme corporation', 'advanced systems', 'smart solutions', 'mega corp',
    'ultra tech', 'best services', 'top quality', 'premier group'
  ];

  const checkBusinessName = async (name) => {
    if (!name || name.trim().length < 2) {
      setNameCheck({ searching: false, checked: false, available: null, suggestions: [] });
      return;
    }

    setNameCheck({ searching: true, checked: false, available: null, suggestions: [] });

    // Simulate API delay
    setTimeout(() => {
      const normalizedName = name.toLowerCase().trim();
      const isTaken = takenNames.some(taken => 
        taken.includes(normalizedName) || normalizedName.includes(taken)
      );

      // Generate suggestions if name is taken
      let suggestions = [];
      if (isTaken) {
        const baseName = normalizedName;
        suggestions = [
          `${baseName} ${config.jurisdiction.toUpperCase()}`,
          `${baseName} International`,
          `${baseName} Group`,
          `${baseName} Holdings`,
          `New ${baseName}`,
          `${baseName} Plus`
        ].slice(0, 4);
      }

      setNameCheck({
        searching: false,
        checked: true,
        available: !isTaken,
        suggestions
      });
    }, 1200);
  };

  // Debounce name checking
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInfo.businessName) {
        checkBusinessName(userInfo.businessName);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [userInfo.businessName, config.jurisdiction]);

  const calculateCosts = () => {
    const jurisdiction = jurisdictions[config.jurisdiction];
    const entity = jurisdiction.entities[config.entityType];
    
    const serviceFee = currency === 'SAR' ? entity.baseSAR : entity.baseGBP;
    const govFee = currency === 'SAR' ? entity.govFeeSAR : entity.govFeeGBP;
    
    const additionalCost = config.services.reduce((sum, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return sum + (currency === 'SAR' ? service.priceSAR : service.priceGBP);
    }, 0);

    return {
      serviceFee,
      govFee,
      additionalCost,
      subtotal: serviceFee + govFee + additionalCost,
      total: serviceFee + govFee + additionalCost
    };
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.whatsapp || !userInfo.businessName) {
      alert('Please fill in all required fields');
      return;
    }

    if (!nameCheck.checked) {
      alert('Please wait for business name availability check to complete');
      return;
    }

    if (!nameCheck.available) {
      alert('The business name you entered is already taken. Please choose a different name or select one of the suggestions.');
      return;
    }

    const costs = calculateCosts();
    const jurisdiction = jurisdictions[config.jurisdiction];
    const entity = jurisdiction.entities[config.entityType];

    const orderDetails = {
      service: 'LLC & LTD Formation',
      jurisdiction: jurisdiction.name,
      entityType: entity.name,
      timeline: entity.timeline,
      additionalServices: config.services.map(id => 
        additionalServices.find(s => s.id === id).name
      ),
      costs,
      userInfo,
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('formationOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('formationOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', email: '', whatsapp: '', businessName: '' });
  };

  const costs = calculateCosts();
  const currentJurisdiction = jurisdictions[config.jurisdiction];
  const currentEntity = currentJurisdiction.entities[config.entityType];

  return (
    <div className="formation-configurator">
      <div className="configurator-header">
        <h2>Configure Your Business Formation</h2>
        <p>Select jurisdiction, entity type, and additional services</p>
      </div>

      {/* Jurisdiction Selection */}
      <div className="formation-section">
        <div className="section-header">
          <MapPin size={24} />
          <h3>Select Jurisdiction</h3>
        </div>
        <div className="jurisdiction-grid">
          {Object.entries(jurisdictions).map(([key, jurisdiction]) => (
            <div
              key={key}
              className={`jurisdiction-card ${config.jurisdiction === key ? 'active' : ''}`}
              onClick={() => setConfig({...config, jurisdiction: key, entityType: Object.keys(jurisdiction.entities)[0]})}
            >
              <div className="jurisdiction-flag">{jurisdiction.flag}</div>
              <div className="jurisdiction-name">{jurisdiction.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Entity Type Selection */}
      <div className="formation-section">
        <div className="section-header">
          <Building2 size={24} />
          <h3>Select Entity Type</h3>
        </div>
        <div className="entity-grid">
          {Object.entries(currentJurisdiction.entities).map(([key, entity]) => (
            <div
              key={key}
              className={`entity-card ${config.entityType === key ? 'active' : ''}`}
              onClick={() => setConfig({...config, entityType: key})}
            >
              <div className="entity-name">{entity.name}</div>
              <div className="entity-details">
                <div className="entity-price">
                  {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? entity.baseSAR : entity.baseGBP}
                </div>
                <div className="entity-timeline">⏱ {entity.timeline}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="formation-section">
        <div className="section-header">
          <FileText size={24} />
          <h3>Additional Services (Optional)</h3>
        </div>
        <div className="services-grid">
          {additionalServices.map((service) => (
            <div
              key={service.id}
              className={`service-card ${config.services.includes(service.id) ? 'selected' : ''}`}
              onClick={() => toggleService(service.id)}
            >
              <div className="service-header">
                <div className="service-name">{service.name}</div>
                <div className="service-check">
                  {config.services.includes(service.id) ? <Check size={20} /> : <span>+</span>}
                </div>
              </div>
              <div className="service-description">{service.description}</div>
              <div className="service-price">
                +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? service.priceSAR : service.priceGBP}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="cost-breakdown">
        <div className="breakdown-header">
          <Calculator size={28} />
          <h3>Cost Breakdown</h3>
        </div>
        <div className="breakdown-content">
          <div className="breakdown-left">
            <div className="breakdown-item">
              <span>Service Fee ({currentEntity.name}):</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.serviceFee}</span>
            </div>
            <div className="breakdown-item">
              <span>Government Filing Fees:</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.govFee}</span>
            </div>
            {costs.additionalCost > 0 && (
              <div className="breakdown-item">
                <span>Additional Services ({config.services.length}):</span>
                <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.additionalCost}</span>
              </div>
            )}
            <div className="breakdown-divider"></div>
            <div className="breakdown-item subtotal">
              <span>Subtotal:</span>
              <span>{currency === 'SAR' ? 'SAR' : '£'} {costs.subtotal}</span>
            </div>
          </div>
          <div className="breakdown-right">
            <div className="total-label">Total Investment</div>
            <div className="total-amount">
              {currency === 'SAR' ? 'SAR' : '£'} {costs.total}
            </div>
            <div className="timeline-info">
              ⏱ Estimated: {currentEntity.timeline}
            </div>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="user-info-form">
        <h3>Your Information</h3>
        <div className="form-grid-formation">
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
          <div className="form-group business-name-group">
            <label><Briefcase size={18} />Proposed Business Name *</label>
            <div className="business-name-input-wrapper">
              <input
                type="text"
                placeholder="Enter desired business name"
                value={userInfo.businessName}
                onChange={(e) => setUserInfo({...userInfo, businessName: e.target.value})}
                className={`${nameCheck.checked ? (nameCheck.available ? 'name-available' : 'name-taken') : ''}`}
              />
              <div className="name-check-icon">
                {nameCheck.searching && <Loader size={20} className="spinner" />}
                {nameCheck.checked && nameCheck.available && <CheckCircle size={20} className="available-icon" />}
                {nameCheck.checked && !nameCheck.available && <XCircle size={20} className="taken-icon" />}
              </div>
            </div>
            
            {/* Availability Status */}
            {nameCheck.checked && (
              <div className={`name-status ${nameCheck.available ? 'available' : 'taken'}`}>
                {nameCheck.available ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Great! This business name is available</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    <span>Sorry, this business name is already taken</span>
                  </>
                )}
              </div>
            )}

            {/* Name Suggestions */}
            {nameCheck.checked && !nameCheck.available && nameCheck.suggestions.length > 0 && (
              <div className="name-suggestions">
                <div className="suggestions-header">
                  <Search size={16} />
                  <span>Available alternatives:</span>
                </div>
                <div className="suggestions-list">
                  {nameCheck.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        setUserInfo({...userInfo, businessName: suggestion});
                        setNameCheck({ searching: false, checked: false, available: null, suggestions: [] });
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Request Formation & Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Formation request added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessFormationConfigurator;
