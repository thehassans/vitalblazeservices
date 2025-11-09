import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Languages } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../LanguageContext';
import './Navbar.css';

const Navbar = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
            <Zap className="logo-icon" size={28} />
            <span className="logo-text">
              VITAL<span className="logo-accent">BLAZE</span>
            </span>
          </div>

          <div className="navbar-right">
            <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
              <a onClick={() => scrollToSection('services')} className="nav-link">{t('services')}</a>
              <a onClick={() => scrollToSection('features')} className="nav-link">{t('features')}</a>
              <a onClick={() => scrollToSection('contact')} className="nav-link">{t('contact')}</a>
              <button className="nav-cta" onClick={() => {
                onGetStarted();
                setIsMobileMenuOpen(false);
              }}>
                {t('getStarted')}
              </button>
            </div>

            <ThemeToggle />
            
            <button 
              className="language-toggle"
              onClick={toggleLanguage}
              title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
            >
              <Languages size={20} />
              <span className="language-text">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
