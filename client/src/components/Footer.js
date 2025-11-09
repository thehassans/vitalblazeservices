import React from 'react';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Zap className="logo-icon" size={28} />
              <span className="logo-text">
                VITAL<span className="logo-accent">BLAZE</span>
              </span>
            </div>
            <p className="footer-description">
              {t('footerDescription')}
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t('servicesFooter')}</h4>
            <ul className="footer-links">
              <li><a href="#services">{t('sharedHosting')}</a></li>
              <li><a href="#services">WordPress {t('hosting')}</a></li>
              <li><a href="#services">{t('vpsHosting')}</a></li>
              <li><a href="#services">{t('domainRegistration')}</a></li>
              <li><a href="#services">{t('sslCertificates')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t('company')}</h4>
            <ul className="footer-links">
              <li><a href="#about">{t('aboutUs')}</a></li>
              <li><a href="#features">{t('features')}</a></li>
              <li><a href="#contact">{t('contact')}</a></li>
              <li><a href="#careers">{t('careers')}</a></li>
              <li><a href="#partners">{t('partners')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">{t('contactInfo')}</h4>
            <ul className="footer-contact">
              <li>
                <Phone size={16} />
                <span>+966 XX XXX XXXX</span>
              </li>
              <li>
                <Mail size={16} />
                <span>info@vitalservices.com</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>Riyadh, Saudi Arabia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} VitalBlaze. {t('allRightsReserved')}</p>
          <div className="footer-legal">
            <a href="#privacy">{t('privacyPolicy')}</a>
            <span className="separator">•</span>
            <a href="#terms">{t('termsOfService')}</a>
            <span className="separator">•</span>
            <a href="#cookies">{t('cookiePolicy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
