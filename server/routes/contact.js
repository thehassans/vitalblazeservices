const express = require('express');
const router = express.Router();
const { contactMessages } = require('../data/memoryDb');

// POST contact message
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }
    
    const newMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString()
    };
    
    contactMessages.push(newMessage);
    
    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing your message'
    });
  }
});

// GET all contact messages (admin)
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      count: contactMessages.length,
      data: contactMessages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
});

module.exports = router;
