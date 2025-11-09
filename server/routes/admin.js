const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Service = require('../models/Service');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by username (email field is used as username)
    const admin = await Admin.findOne({ 
      $or: [{ username: email }, { email: email }]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is disabled'
      });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username,
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Verify JWT middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Get all services (protected)
router.get('/services', verifyToken, async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ id: 1 });
    res.json({
      success: true,
      services: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services'
    });
  }
});

// Update service price (protected)
router.put('/services/:id/price', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { priceSAR, priceGBP } = req.body;

    const service = await Service.findOneAndUpdate(
      { id: parseInt(id) },
      { 
        priceSAR, 
        priceGBP,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Price updated successfully',
      service: service
    });
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating price'
    });
  }
});

// Update all prices with conversion rate (protected)
router.post('/services/convert', verifyToken, async (req, res) => {
  try {
    const { rate, direction } = req.body;
    const conversionRate = parseFloat(rate);

    // Get all services
    const services = await Service.find({ isActive: true });
    const updatedServices = [];

    for (const service of services) {
      // Skip services with 'Contact Us' or 'By Quote' prices
      if (service.priceSAR === 'Contact Us' || service.priceSAR === 'By Quote' ||
          service.priceGBP === 'Contact Us' || service.priceGBP === 'By Quote') {
        updatedServices.push(service);
        continue;
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

      service.updatedAt = new Date();
      await service.save();
      updatedServices.push(service);
    }

    res.json({
      success: true,
      message: 'All prices converted successfully',
      services: updatedServices
    });
  } catch (error) {
    console.error('Error converting prices:', error);
    res.status(500).json({
      success: false,
      message: 'Error converting prices'
    });
  }
});

// Logout (JWT tokens are stateless, so this just returns success)
router.post('/logout', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
