const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  razorpay_payment_id: { type: String },
  razorpay_order_id: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['created', 'successful', 'failed'], default: 'created' },
  method: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
