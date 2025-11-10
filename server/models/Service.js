const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Hosting & Servers', 'Domains & SSL', 'Business Solutions', 'E-Commerce']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    required: true
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
    default: null
  },
  icon: {
    type: String,
    required: true
  },
  popular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
serviceSchema.index({ category: 1 });
serviceSchema.index({ id: 1 });
serviceSchema.index({ popular: 1 });

module.exports = mongoose.model('Service', serviceSchema);
