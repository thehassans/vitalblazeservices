import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import './Hero.css';

const Hero = ({ onGetStarted }) => {
  const { t } = useLanguage();
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <CheckCircle2 size={16} />
            <span>{t('heroTrusted')}</span>
          </div>
          
          <h1 className="hero-title slide-in-left">
            {t('heroTitle')}
            <br />
            <span className="text-gradient">{t('heroSubtitle')}</span>
          </h1>
          
          <p className="hero-description slide-in-left">
            {t('heroDescription')}
          </p>
          
          <div className="hero-cta-group slide-in-right">
            <button className="hero-cta primary" onClick={onGetStarted}>
              {t('heroButton')}
              <ArrowRight size={20} />
            </button>
            <button className="hero-cta secondary" onClick={() => scrollToSection('contact')}>
              {t('heroButtonAlt')}
            </button>
          </div>
          
          <div className="hero-stats scale-in">
            <div className="stat-item">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">{t('uptimeSla')}</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">24/7</div>
              <div className="stat-label">{t('expertSupport')}</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">+10K</div>
              <div className="stat-label">{t('activeClients')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
