import React, { useState } from 'react';
import { Search, Check, X, ShoppingCart, Globe, User, Phone, MapPin, Loader } from 'lucide-react';
import './DomainSearchConfigurator.css';

const DomainSearchConfigurator = ({ currency = 'SAR' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    whatsapp: '',
    country: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // TLD options with prices
  const tlds = [
    { extension: '.com', priceSAR: 45, priceGBP: 9, popular: true },
    { extension: '.net', priceSAR: 50, priceGBP: 10, popular: true },
    { extension: '.org', priceSAR: 48, priceGBP: 10, popular: true },
    { extension: '.sa', priceSAR: 120, priceGBP: 24, popular: true },
    { extension: '.com.sa', priceSAR: 95, priceGBP: 19, popular: false },
    { extension: '.io', priceSAR: 150, priceGBP: 30, popular: false },
    { extension: '.co', priceSAR: 130, priceGBP: 26, popular: false },
    { extension: '.me', priceSAR: 85, priceGBP: 17, popular: false },
    { extension: '.info', priceSAR: 55, priceGBP: 11, popular: false },
    { extension: '.online', priceSAR: 60, priceGBP: 12, popular: false },
    { extension: '.store', priceSAR: 90, priceGBP: 18, popular: false },
    { extension: '.tech', priceSAR: 95, priceGBP: 19, popular: false }
  ];

  const handleSearch = async () => {
    if (!searchTerm || searchTerm.length < 2) {
      alert('Please enter a domain name (minimum 2 characters)');
      return;
    }

    setSearching(true);
    setSearchResults([]);

    // Simulate API call - In production, replace with actual domain API
    setTimeout(() => {
      const results = tlds.map(tld => ({
        domain: searchTerm + tld.extension,
        extension: tld.extension,
        available: Math.random() > 0.4, // Simulate 60% availability
        priceSAR: tld.priceSAR,
        priceGBP: tld.priceGBP,
        popular: tld.popular
      }));
      setSearchResults(results);
      setSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDomainSelection = (domain) => {
    if (!domain.available) return;

    if (selectedDomains.find(d => d.domain === domain.domain)) {
      setSelectedDomains(selectedDomains.filter(d => d.domain !== domain.domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const calculateTotal = () => {
    const total = selectedDomains.reduce((sum, domain) => {
      return sum + (currency === 'SAR' ? domain.priceSAR : domain.priceGBP);
    }, 0);
    return total;
  };

  const handleAddToCart = () => {
    if (selectedDomains.length === 0) {
      alert('Please select at least one domain');
      return;
    }

    if (!userInfo.name || !userInfo.whatsapp || !userInfo.country) {
      alert('Please fill in all required fields');
      return;
    }

    const orderDetails = {
      service: 'Domain Registration',
      domains: selectedDomains,
      userInfo,
      total: calculateTotal(),
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('domainOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('domainOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    setSelectedDomains([]);
    setSearchResults([]);
    setSearchTerm('');
    setUserInfo({ name: '', whatsapp: '', country: '' });
  };

  return (
    <div className="domain-configurator">
      <div className="configurator-header">
        <h2>Search & Register Your Domain</h2>
        <p>Find your perfect domain name across multiple extensions</p>
      </div>

      {/* Search Bar */}
      <div className="domain-search-bar">
        <div className="search-input-wrapper">
          <Globe size={24} />
          <input
            type="text"
            placeholder="Enter your domain name (e.g., mybusiness)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            onKeyPress={handleKeyPress}
            className="domain-input"
          />
          <button className="search-btn" onClick={handleSearch} disabled={searching}>
            {searching ? <Loader size={20} className="spinner" /> : <Search size={20} />}
            Search
          </button>
        </div>
        <div className="search-hint">
          Search across .com, .net, .org, .sa and 8 more extensions
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results for "{searchTerm}"</h3>
          <div className="results-grid">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className={`result-card ${result.available ? 'available' : 'unavailable'} ${
                  selectedDomains.find(d => d.domain === result.domain) ? 'selected' : ''
                }`}
                onClick={() => toggleDomainSelection(result)}
              >
                <div className="result-header">
                  <div className="domain-name">
                    {result.domain}
                    {result.popular && <span className="popular-badge">Popular</span>}
                  </div>
                  <div className="availability-badge">
                    {result.available ? (
                      <>
                        <Check size={16} />
                        Available
                      </>
                    ) : (
                      <>
                        <X size={16} />
                        Taken
                      </>
                    )}
                  </div>
                </div>
                {result.available && (
                  <div className="result-footer">
                    <div className="domain-price">
                      {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? result.priceSAR : result.priceGBP}/year
                    </div>
                    <div className="select-indicator">
                      {selectedDomains.find(d => d.domain === result.domain) ? (
                        <Check size={20} />
                      ) : (
                        <span>Click to select</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Domains Cart */}
      {selectedDomains.length > 0 && (
        <div className="selected-domains-cart">
          <h3>Selected Domains ({selectedDomains.length})</h3>
          <div className="cart-items">
            {selectedDomains.map((domain, index) => (
              <div key={index} className="cart-item">
                <Globe size={18} />
                <span className="cart-domain-name">{domain.domain}</span>
                <span className="cart-domain-price">
                  {currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? domain.priceSAR : domain.priceGBP}/yr
                </span>
                <button
                  className="remove-btn"
                  onClick={() => setSelectedDomains(selectedDomains.filter(d => d.domain !== domain.domain))}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total (First Year):</span>
            <span className="total-amount">
              {currency === 'SAR' ? 'SAR' : '£'} {calculateTotal()}
            </span>
          </div>
        </div>
      )}

      {/* User Information Form */}
      {selectedDomains.length > 0 && (
        <>
          <div className="user-info-form">
            <h3>Contact Information</h3>
            <div className="form-grid">
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
                <label><Phone size={18} />WhatsApp Number *</label>
                <input
                  type="tel"
                  placeholder="+966 XX XXX XXXX"
                  value={userInfo.whatsapp}
                  onChange={(e) => setUserInfo({...userInfo, whatsapp: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label><MapPin size={18} />Country *</label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  value={userInfo.country}
                  onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="cart-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Register Domains & Add to Cart
            </button>
            {showSuccess && (
              <div className="success-message">
                <Check size={20} />
                Domains added to cart successfully!
              </div>
            )}
          </div>
        </>
      )}

      {/* Features Info */}
      <div className="domain-features">
        <div className="feature-item">
          <Check size={20} />
          <span>Free WHOIS Privacy Protection</span>
        </div>
        <div className="feature-item">
          <Check size={20} />
          <span>Easy DNS Management</span>
        </div>
        <div className="feature-item">
          <Check size={20} />
          <span>24/7 Support Included</span>
        </div>
        <div className="feature-item">
          <Check size={20} />
          <span>Auto-Renewal Option</span>
        </div>
      </div>
    </div>
  );
};

export default DomainSearchConfigurator;
