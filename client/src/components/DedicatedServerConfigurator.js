import React, { useState } from 'react';
import { Cpu, HardDrive, Zap, Server, ShoppingCart, Check, User, Phone, MapPin, Database } from 'lucide-react';
import './DedicatedServerConfigurator.css';

const DedicatedServerConfigurator = ({ currency = 'SAR' }) => {
  const [config, setConfig] = useState({
    processor: 'intel-xeon-e5',
    ram: 32,
    storage: 'ssd-1tb',
    bandwidth: 10,
    raid: 'raid-1'
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    whatsapp: '',
    country: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Configuration options with prices
  const options = {
    processor: [
      { value: 'intel-xeon-e5', label: 'Intel Xeon E5-2680v4 (14 Cores)', priceSAR: 800, priceGBP: 160 },
      { value: 'intel-xeon-gold', label: 'Intel Xeon Gold 6248 (20 Cores)', priceSAR: 1200, priceGBP: 240 },
      { value: 'amd-epyc-7402', label: 'AMD EPYC 7402 (24 Cores)', priceSAR: 1400, priceGBP: 280 },
      { value: 'amd-epyc-7542', label: 'AMD EPYC 7542 (32 Cores)', priceSAR: 1800, priceGBP: 360 },
      { value: 'dual-xeon-platinum', label: 'Dual Intel Xeon Platinum (56 Cores)', priceSAR: 2800, priceGBP: 560 }
    ],
    ram: [
      { value: 32, label: '32 GB DDR4 ECC', priceSAR: 0, priceGBP: 0 },
      { value: 64, label: '64 GB DDR4 ECC', priceSAR: 200, priceGBP: 40 },
      { value: 128, label: '128 GB DDR4 ECC', priceSAR: 450, priceGBP: 90 },
      { value: 256, label: '256 GB DDR4 ECC', priceSAR: 900, priceGBP: 180 },
      { value: 512, label: '512 GB DDR4 ECC', priceSAR: 1800, priceGBP: 360 }
    ],
    storage: [
      { value: 'ssd-1tb', label: '1 TB NVMe SSD', priceSAR: 0, priceGBP: 0 },
      { value: 'ssd-2tb', label: '2 TB NVMe SSD', priceSAR: 250, priceGBP: 50 },
      { value: 'ssd-4tb', label: '4 TB NVMe SSD', priceSAR: 550, priceGBP: 110 },
      { value: 'dual-ssd-4tb', label: 'Dual 4 TB NVMe SSD', priceSAR: 1100, priceGBP: 220 },
      { value: 'hybrid-8tb', label: '8 TB SSD + 16 TB HDD', priceSAR: 1500, priceGBP: 300 }
    ],
    bandwidth: [
      { value: 10, label: '10 TB/month', priceSAR: 0, priceGBP: 0 },
      { value: 20, label: '20 TB/month', priceSAR: 150, priceGBP: 30 },
      { value: 50, label: '50 TB/month', priceSAR: 350, priceGBP: 70 },
      { value: 100, label: '100 TB/month', priceSAR: 650, priceGBP: 130 },
      { value: -1, label: 'Unlimited (100Gbps)', priceSAR: 1200, priceGBP: 240 }
    ],
    raid: [
      { value: 'no-raid', label: 'No RAID', priceSAR: 0, priceGBP: 0 },
      { value: 'raid-1', label: 'RAID 1 (Mirroring)', priceSAR: 100, priceGBP: 20 },
      { value: 'raid-5', label: 'RAID 5 (Striping + Parity)', priceSAR: 200, priceGBP: 40 },
      { value: 'raid-6', label: 'RAID 6 (Double Parity)', priceSAR: 300, priceGBP: 60 },
      { value: 'raid-10', label: 'RAID 10 (Mirror + Stripe)', priceSAR: 400, priceGBP: 80 }
    ]
  };

  const calculatePrice = () => {
    const processorPrice = options.processor.find(p => p.value === config.processor);
    const ramPrice = options.ram.find(r => r.value === config.ram);
    const storagePrice = options.storage.find(s => s.value === config.storage);
    const bandwidthPrice = options.bandwidth.find(b => b.value === config.bandwidth);
    const raidPrice = options.raid.find(r => r.value === config.raid);

    const totalSAR = (processorPrice?.priceSAR || 0) + (ramPrice?.priceSAR || 0) + 
                     (storagePrice?.priceSAR || 0) + (bandwidthPrice?.priceSAR || 0) + (raidPrice?.priceSAR || 0);
    const totalGBP = (processorPrice?.priceGBP || 0) + (ramPrice?.priceGBP || 0) + 
                     (storagePrice?.priceGBP || 0) + (bandwidthPrice?.priceGBP || 0) + (raidPrice?.priceGBP || 0);

    return currency === 'SAR' ? totalSAR : totalGBP;
  };

  const handleAddToCart = () => {
    if (!userInfo.name || !userInfo.whatsapp || !userInfo.country) {
      alert('Please fill in all required fields');
      return;
    }

    const orderDetails = {
      service: 'Dedicated Server',
      config,
      userInfo,
      price: calculatePrice(),
      currency,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('serverOrders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('serverOrders', JSON.stringify(existingOrders));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUserInfo({ name: '', whatsapp: '', country: '' });
  };

  const getLabel = (type, value) => {
    return options[type].find(opt => opt.value === value)?.label || '';
  };

  return (
    <div className="dedicated-configurator">
      <div className="configurator-header">
        <h2>Configure Your Dedicated Server</h2>
        <p>Build your perfect high-performance bare-metal server</p>
      </div>

      <div className="config-grid-dedicated">
        {/* Processor Selection */}
        <div className="config-box">
          <div className="config-box-header">
            <Cpu size={28} />
            <h3>Processor</h3>
          </div>
          <div className="config-options">
            {options.processor.map((proc) => (
              <div
                key={proc.value}
                className={`config-option ${config.processor === proc.value ? 'active' : ''}`}
                onClick={() => setConfig({...config, processor: proc.value})}
              >
                <div className="option-label">{proc.label}</div>
                <div className="option-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? proc.priceSAR : proc.priceGBP}/mo
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAM Selection */}
        <div className="config-box">
          <div className="config-box-header">
            <Database size={28} />
            <h3>RAM Memory</h3>
          </div>
          <div className="config-options">
            {options.ram.map((ramOpt) => (
              <div
                key={ramOpt.value}
                className={`config-option ${config.ram === ramOpt.value ? 'active' : ''}`}
                onClick={() => setConfig({...config, ram: ramOpt.value})}
              >
                <div className="option-label">{ramOpt.label}</div>
                <div className="option-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? ramOpt.priceSAR : ramOpt.priceGBP}/mo
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Selection */}
        <div className="config-box">
          <div className="config-box-header">
            <HardDrive size={28} />
            <h3>Storage</h3>
          </div>
          <div className="config-options">
            {options.storage.map((stor) => (
              <div
                key={stor.value}
                className={`config-option ${config.storage === stor.value ? 'active' : ''}`}
                onClick={() => setConfig({...config, storage: stor.value})}
              >
                <div className="option-label">{stor.label}</div>
                <div className="option-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? stor.priceSAR : stor.priceGBP}/mo
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bandwidth Selection */}
        <div className="config-box">
          <div className="config-box-header">
            <Zap size={28} />
            <h3>Bandwidth</h3>
          </div>
          <div className="config-options">
            {options.bandwidth.map((bw) => (
              <div
                key={bw.value}
                className={`config-option ${config.bandwidth === bw.value ? 'active' : ''}`}
                onClick={() => setConfig({...config, bandwidth: bw.value})}
              >
                <div className="option-label">{bw.label}</div>
                <div className="option-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? bw.priceSAR : bw.priceGBP}/mo
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAID Configuration */}
        <div className="config-box">
          <div className="config-box-header">
            <Server size={28} />
            <h3>RAID Configuration</h3>
          </div>
          <div className="config-options">
            {options.raid.map((raidOpt) => (
              <div
                key={raidOpt.value}
                className={`config-option ${config.raid === raidOpt.value ? 'active' : ''}`}
                onClick={() => setConfig({...config, raid: raidOpt.value})}
              >
                <div className="option-label">{raidOpt.label}</div>
                <div className="option-price">
                  +{currency === 'SAR' ? 'SAR' : '£'} {currency === 'SAR' ? raidOpt.priceSAR : raidOpt.priceGBP}/mo
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="price-summary-dedicated">
        <div className="summary-left">
          <h3>Your Configuration</h3>
          <div className="summary-items">
            <div className="summary-item">
              <Cpu size={18} />
              <span>{getLabel('processor', config.processor)}</span>
            </div>
            <div className="summary-item">
              <Database size={18} />
              <span>{getLabel('ram', config.ram)}</span>
            </div>
            <div className="summary-item">
              <HardDrive size={18} />
              <span>{getLabel('storage', config.storage)}</span>
            </div>
            <div className="summary-item">
              <Zap size={18} />
              <span>{getLabel('bandwidth', config.bandwidth)}</span>
            </div>
            <div className="summary-item">
              <Server size={18} />
              <span>{getLabel('raid', config.raid)}</span>
            </div>
          </div>
        </div>
        <div className="summary-right">
          <div className="total-price-dedicated">
            <span className="price-label">Total Monthly</span>
            <span className="price-value">
              {currency === 'SAR' ? 'SAR' : '£'} {calculatePrice()}
              <span className="price-period">/mo</span>
            </span>
          </div>
        </div>
      </div>

      {/* User Information */}
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

      {/* Action Button */}
      <div className="cart-actions">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={20} />
          Request Quote & Add to Cart
        </button>
        {showSuccess && (
          <div className="success-message">
            <Check size={20} />
            Added to cart successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default DedicatedServerConfigurator;
