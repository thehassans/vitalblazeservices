const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ id: 1 });
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
});

// GET services by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const services = await Service.find({ 
      category: new RegExp(`^${category}$`, 'i') 
    }).sort({ id: 1 });
    
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services by category',
      error: error.message
    });
  }
});

// GET service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({ id: parseInt(req.params.id) });
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
});

module.exports = router;
