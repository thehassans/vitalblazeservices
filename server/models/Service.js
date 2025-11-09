const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Hosting & Servers', 'Domains & SSL', 'Business Solutions', 'E-Commerce']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  features: [{
    type: String
  }],
  icon: {
    type: String,
    default: 'server'
  },
  priceSAR: {
    type: String,
    required: true
  },
  priceGBP: {
    type: String,
    required: true
  },
  priceType: {
    type: String,
    enum: ['month', 'year', 'one-time', null],
    default: null
  },
  popular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ id: 1 });

module.exports = mongoose.model('Service', serviceSchema);
