import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        setStatus({
          type: 'success',
          message: t('successMessage')
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: t('errorMessage')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge fade-in">{t('contactTitle')}</div>
          <h2 className="section-title fade-in">
            {t('contactSubtitle')}
            <br />
            <span className="text-gradient">{t('contactSubtitle2')}</span>
          </h2>
          <p className="section-description fade-in">
            {t('contactDescription')}
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h3 className="info-title">{t('contactInfoTitle')}</h3>
            <p className="info-description">
              {t('contactInfoDesc')}
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">{t('phone')}</div>
                  <div className="contact-item-value">+966 59 373 4692</div>
                  <div className="contact-item-value">+971 54 410 4925</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">{t('email')}</div>
                  <div className="contact-item-value">info@vitalblaze.com</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">{t('locations')}</div>
                  <div className="contact-item-value">Manchester, United Kingdom</div>
                  <div className="contact-item-value">Riyadh, Saudi Arabia</div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('fullName')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('namePlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('emailAddress')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('emailPlaceholder')}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t('subject')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('subjectPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder={t('messagePlaceholder')}
              ></textarea>
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.type === 'success' && <CheckCircle size={18} />}
                {status.message}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? t('sending') : (
                <>
                  {t('sendMessage')}
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
