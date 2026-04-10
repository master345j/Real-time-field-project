const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  currency: { type: String, default: '₹' },
  rating: { type: Number, default: 4.5 },
  deliveryDays: { type: Number, default: 2 },
  url: { type: String, required: true },
  color: { type: String, default: '#4facfe' },
  image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

productSchema.index({ name: 'text', description: 'text', platform: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
