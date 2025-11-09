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
    required: [true, 'Category is required']
    // No enum validation - allow any category
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  features: {
    type: [String],
    default: []
  },
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
    enum: ['mo', 'month', 'yr', 'year', 'one-time', '', null],
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
});

// Update the updatedAt timestamp before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
serviceSchema.index({ category: 1, popular: -1 });
serviceSchema.index({ id: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
