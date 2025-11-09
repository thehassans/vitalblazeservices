const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const servicesRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'VitalBlaze Services API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Serve React App in Production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build folder
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  
  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 VitalBlaze Services server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS Allowed Origins: ${allowedOrigins.join(', ')}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`✅ Serving React build from: ${path.join(__dirname, '../client/build')}`);
  }
});
