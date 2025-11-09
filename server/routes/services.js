const express = require('express');
const router = express.Router();
const { services } = require('../data/memoryDb');

// GET all services
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services'
    });
  }
});

// GET services by category
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const filteredServices = services.filter(
      service => service.category.toLowerCase() === category.toLowerCase()
    );
    
    res.json({
      success: true,
      count: filteredServices.length,
      data: filteredServices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services by category'
    });
  }
});

// GET service by ID
router.get('/:id', (req, res) => {
  try {
    const service = services.find(s => s.id === parseInt(req.params.id));
    
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
    res.status(500).json({
      success: false,
      message: 'Error fetching service'
    });
  }
});

module.exports = router;
