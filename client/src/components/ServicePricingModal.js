import React, { useState } from 'react';
import { X, DollarSign, Save, Package, Settings } from 'lucide-react';
import './ServicePricingModal.css';

const ServicePricingModal = ({ service, isOpen, onClose, onSave }) => {
  const [detailedPrices, setDetailedPrices] = useState({});

  if (!isOpen || !service) return null;

  // Define configurator pricing structures for each service
  const getConfiguratorPricing = (serviceId) => {
    switch (serviceId) {
      case 3: // VPS Hosting
        return {
          basePrices: [
            { id: 'base_sar', label: 'Base SAR Price', value: '99' },
            { id: 'base_gbp', label: 'Base GBP Price', value: '20' }
          ],
          components: [
            { id: 'cpu_per_core', label: 'CPU per Core (SAR/mo)', value: '30', gbp: '6' },
            { id: 'ram_per_gb', label: 'RAM per GB (SAR/mo)', value: '15', gbp: '3' },
            { id: 'storage_per_gb', label: 'Storage per GB (SAR/mo)', value: '2', gbp: '0.4' },
            { id: 'bandwidth_per_tb', label: 'Bandwidth per TB (SAR/mo)', value: '20', gbp: '4' },
            { id: 'email_per_account', label: 'Email per Account (SAR/mo)', value: '5', gbp: '1' }
          ]
        };
      
      case 4: // Dedicated Server
        return {
          processors: [
            { id: 'intel_xeon_e3', label: 'Intel Xeon E3 (SAR)', value: '499', gbp: '100' },
            { id: 'intel_xeon_e5', label: 'Intel Xeon E5 (SAR)', value: '799', gbp: '160' },
            { id: 'amd_epyc', label: 'AMD EPYC (SAR)', value: '999', gbp: '200' }
          ],
          ram: [
            { id: 'ram_16gb', label: '16GB RAM (SAR)', value: '0', gbp: '0' },
            { id: 'ram_32gb', label: '32GB RAM (SAR)', value: '200', gbp: '40' },
            { id: 'ram_64gb', label: '64GB RAM (SAR)', value: '400', gbp: '80' },
            { id: 'ram_128gb', label: '128GB RAM (SAR)', value: '800', gbp: '160' }
          ],
          storage: [
            { id: 'storage_500gb', label: '500GB SSD (SAR)', value: '0', gbp: '0' },
            { id: 'storage_1tb', label: '1TB SSD (SAR)', value: '150', gbp: '30' },
            { id: 'storage_2tb', label: '2TB SSD (SAR)', value: '300', gbp: '60' }
          ]
        };
      
      case 5: // Domain Registration
        return {
          tlds: [
            { id: 'com', label: '.com (SAR/yr)', value: '45', gbp: '9' },
            { id: 'net', label: '.net (SAR/yr)', value: '50', gbp: '10' },
            { id: 'org', label: '.org (SAR/yr)', value: '55', gbp: '11' },
            { id: 'io', label: '.io (SAR/yr)', value: '150', gbp: '30' },
            { id: 'co', label: '.co (SAR/yr)', value: '120', gbp: '24' },
            { id: 'tech', label: '.tech (SAR/yr)', value: '100', gbp: '20' }
          ]
        };
      
      case 12: // CRM & POS Complete Solution
        return {
          basePackages: [
            { id: 'basic', label: 'Basic Package (SAR/mo)', value: '299', gbp: '60' },
            { id: 'standard', label: 'Standard Package (SAR/mo)', value: '599', gbp: '120' },
            { id: 'premium', label: 'Premium Package (SAR/mo)', value: '1199', gbp: '240' }
          ],
          crmFeatures: [
            { id: 'contact_mgmt', label: 'Contact Management (SAR/mo)', value: '99', gbp: '20' },
            { id: 'sales_pipeline', label: 'Sales Pipeline (SAR/mo)', value: '149', gbp: '30' },
            { id: 'lead_scoring', label: 'AI Lead Scoring (SAR/mo)', value: '199', gbp: '40' },
            { id: 'email_campaigns', label: 'Email Campaigns (SAR/mo)', value: '129', gbp: '26' },
            { id: 'task_automation', label: 'Task Automation (SAR/mo)', value: '169', gbp: '34' },
            { id: 'customer_portal', label: 'Customer Portal (SAR/mo)', value: '179', gbp: '36' }
          ],
          posFeatures: [
            { id: 'inventory_mgmt', label: 'Inventory Management (SAR/mo)', value: '149', gbp: '30' },
            { id: 'payment_gateway', label: 'Payment Gateway (SAR/mo)', value: '199', gbp: '40' },
            { id: 'receipt_system', label: 'Receipt System (SAR/mo)', value: '89', gbp: '18' },
            { id: 'employee_mgmt', label: 'Employee Management (SAR/mo)', value: '129', gbp: '26' },
            { id: 'table_mgmt', label: 'Table Management (SAR/mo)', value: '159', gbp: '32' },
            { id: 'loyalty_program', label: 'Loyalty Program (SAR/mo)', value: '149', gbp: '30' }
          ],
          integrations: [
            { id: 'whatsapp', label: 'WhatsApp Integration (SAR/mo)', value: '199', gbp: '40' },
            { id: 'auto_invoice', label: 'Auto Invoice (SAR/mo)', value: '149', gbp: '30' },
            { id: 'accounting', label: 'Accounting Software (SAR/mo)', value: '179', gbp: '36' },
            { id: 'sms', label: 'SMS Notifications (SAR/mo)', value: '129', gbp: '26' },
            { id: 'ecommerce', label: 'E-commerce Sync (SAR/mo)', value: '199', gbp: '40' },
            { id: 'analytics', label: 'Google Analytics (SAR/mo)', value: '99', gbp: '20' }
          ]
        };
      
      default:
        return null;
    }
  };

  const pricingStructure = getConfiguratorPricing(service.id);

  if (!pricingStructure) {
    return (
      <div className="service-pricing-modal-overlay" onClick={onClose}>
        <div className="service-pricing-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-pricing">
            <div className="modal-title-pricing">
              <Package size={24} />
              <h2>{service.name}</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body-pricing">
            <p className="no-configurator-msg">
              This service doesn't have a configurator with detailed pricing options.
              You can only edit the base SAR and GBP prices from the main admin panel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handlePriceChange = (category, itemId, field, value) => {
    setDetailedPrices({
      ...detailedPrices,
      [`${category}_${itemId}_${field}`]: value
    });
  };

  const handleSaveAll = () => {
    // Save all detailed prices
    onSave(service.id, detailedPrices);
    onClose();
  };

  const renderPricingSection = (title, items, category) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="pricing-section-detail">
        <h3 className="pricing-section-title">
          <Settings size={18} />
          {title}
        </h3>
        <div className="pricing-items-grid">
          {items.map((item) => (
            <div key={item.id} className="pricing-item-card">
              <label className="pricing-item-label">{item.label}</label>
              <div className="pricing-item-inputs">
                <div className="pricing-input-group">
                  <span className="currency-symbol">SAR</span>
                  <input
                    type="text"
                    defaultValue={item.value}
                    onChange={(e) => handlePriceChange(category, item.id, 'sar', e.target.value)}
                    placeholder="0"
                  />
                </div>
                {item.gbp !== undefined && (
                  <div className="pricing-input-group">
                    <span className="currency-symbol">GBP</span>
                    <input
                      type="text"
                      defaultValue={item.gbp}
                      onChange={(e) => handlePriceChange(category, item.id, 'gbp', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="service-pricing-modal-overlay" onClick={onClose}>
      <div className="service-pricing-modal large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-pricing">
          <div className="modal-title-pricing">
            <DollarSign size={24} />
            <div>
              <h2>{service.name}</h2>
              <p>Configure detailed pricing for all features</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body-pricing">
          {/* VPS Pricing */}
          {service.id === 3 && (
            <>
              {renderPricingSection('Base Pricing', pricingStructure.basePrices, 'base')}
              {renderPricingSection('Component Pricing', pricingStructure.components, 'components')}
            </>
          )}

          {/* Dedicated Server Pricing */}
          {service.id === 4 && (
            <>
              {renderPricingSection('Processors', pricingStructure.processors, 'processors')}
              {renderPricingSection('RAM Options', pricingStructure.ram, 'ram')}
              {renderPricingSection('Storage Options', pricingStructure.storage, 'storage')}
            </>
          )}

          {/* Domain Pricing */}
          {service.id === 5 && (
            <>
              {renderPricingSection('Top-Level Domains', pricingStructure.tlds, 'tlds')}
            </>
          )}

          {/* CRM & POS Pricing */}
          {service.id === 12 && (
            <>
              {renderPricingSection('Base Packages', pricingStructure.basePackages, 'basePackages')}
              {renderPricingSection('CRM Features', pricingStructure.crmFeatures, 'crmFeatures')}
              {renderPricingSection('POS Features', pricingStructure.posFeatures, 'posFeatures')}
              {renderPricingSection('Integrations', pricingStructure.integrations, 'integrations')}
            </>
          )}
        </div>

        <div className="modal-footer-pricing">
          <button className="btn-cancel-pricing" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save-pricing" onClick={handleSaveAll}>
            <Save size={20} />
            Save All Prices
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePricingModal;
