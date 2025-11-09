const express = require('express');
const router = express.Router();
const { services } = require('../data/memoryDb');

// Admin credentials
const ADMIN_EMAIL = 'vitalservices@vitalblaze.com';
const ADMIN_PASSWORD = 'vitalservice975312468';

// Simple in-memory session storage (in production, use proper session management)
const sessions = new Set();

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const sessionToken = `session_${Date.now()}_${Math.random()}`;
    sessions.add(sessionToken);
    
    res.json({
      success: true,
      message: 'Login successful',
      token: sessionToken
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Verify session middleware
const verifySession = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !sessions.has(token)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }
  
  next();
};

// Get all services (protected)
router.get('/services', verifySession, (req, res) => {
  res.json({
    success: true,
    services: services
  });
});

// Update service price (protected)
router.put('/services/:id/price', verifySession, (req, res) => {
  const { id } = req.params;
  const { priceSAR, priceGBP } = req.body;

  const service = services.find(s => s.id === parseInt(id));
  
  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  service.priceSAR = priceSAR;
  service.priceGBP = priceGBP;

  res.json({
    success: true,
    message: 'Price updated successfully',
    service: service
  });
});

// Update all prices with conversion rate (protected)
router.post('/services/convert', verifySession, (req, res) => {
  const { conversionRate, direction } = req.body;
  // direction: 'SAR_TO_GBP' or 'GBP_TO_SAR'

  services.forEach(service => {
    // Skip services with 'Contact Us' or 'By Quote' prices
    if (service.priceSAR === 'Contact Us' || service.priceSAR === 'By Quote' ||
        service.priceGBP === 'Contact Us' || service.priceGBP === 'By Quote') {
      return;
    }

    if (direction === 'SAR_TO_GBP') {
      const sarPrice = parseFloat(service.priceSAR.replace(/,/g, ''));
      const gbpPrice = Math.round(sarPrice * conversionRate);
      service.priceGBP = gbpPrice.toString();
    } else if (direction === 'GBP_TO_SAR') {
      const gbpPrice = parseFloat(service.priceGBP.replace(/,/g, ''));
      const sarPrice = Math.round(gbpPrice * conversionRate);
      service.priceSAR = sarPrice.toString();
    }
  });

  res.json({
    success: true,
    message: 'All prices converted successfully',
    services: services
  });
});

// Logout
router.post('/logout', verifySession, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
