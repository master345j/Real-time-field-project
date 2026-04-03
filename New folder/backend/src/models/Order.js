const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  pickupLocation: {
    address: String,
    coordinates: [Number]
  },
  dropoffLocation: {
    address: String,
    coordinates: [Number]
  },
  fare: { type: Number },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
