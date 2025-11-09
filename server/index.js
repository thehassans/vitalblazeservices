const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const servicesRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Routes
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VitalServices API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 VitalServices server running on port ${PORT}`);
});
