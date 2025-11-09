const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        email: user.email,
        role: user.role
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
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    req.user = decoded;
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
    const services = await Service.find().sort({ id: 1 });
    
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

    const service = await Service.findOne({ id: parseInt(id) });
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service.priceSAR = priceSAR;
    service.priceGBP = priceGBP;
    await service.save();

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
    // direction: 'SAR_TO_GBP' or 'GBP_TO_SAR'

    const services = await Service.find();
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
        const gbpPrice = Math.round(sarPrice * rate);
        service.priceGBP = gbpPrice.toString();
      } else if (direction === 'GBP_TO_SAR') {
        const gbpPrice = parseFloat(service.priceGBP.replace(/,/g, ''));
        const sarPrice = Math.round(gbpPrice * rate);
        service.priceSAR = sarPrice.toString();
      }

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

// Logout
router.post('/logout', verifyToken, (req, res) => {
  // With JWT, logout is handled client-side by removing the token
  // We just confirm the request
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
