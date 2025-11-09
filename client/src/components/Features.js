import React from 'react';
import { Zap, Shield, Headphones, Award, Globe2, Lock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import './Features.css';

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Zap,
      titleKey: 'lightningFast',
      descKey: 'lightningFastDesc'
    },
    {
      icon: Shield,
      titleKey: 'enterpriseSecurity',
      descKey: 'enterpriseSecurityDesc'
    },
    {
      icon: Headphones,
      titleKey: 'support247',
      descKey: 'support247Desc'
    },
    {
      icon: Award,
      titleKey: 'uptimeGuarantee',
      descKey: 'uptimeGuaranteeDesc'
    },
    {
      icon: Globe2,
      titleKey: 'globalNetwork',
      descKey: 'globalNetworkDesc'
    },
    {
      icon: Lock,
      titleKey: 'freeSsl',
      descKey: 'freeSslDesc'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge fade-in">{t('featuresTitle')}</div>
          <h2 className="section-title fade-in">
            {t('featuresSubtitle')}
            <br />
            <span className="text-gradient">{t('featuresSubtitle2')}</span>
          </h2>
          {t('featuresDescription') && (
            <p className="section-description fade-in">
              {t('featuresDescription')}
            </p>
          )}
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">
                  <IconComponent size={28} />
                </div>
                <h3 className="feature-title">{t(feature.titleKey)}</h3>
                <p className="feature-description">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
