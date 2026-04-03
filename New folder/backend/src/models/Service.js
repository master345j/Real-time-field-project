const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Taxi', 'Food', 'Grocery', 'Home', 'Medicine'] },
  basePrice: { type: Number, required: true },
  icon: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
