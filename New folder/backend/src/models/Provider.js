const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  approved: { type: Boolean, default: false },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  earnings: { type: Number, default: 0 }
}, { timestamps: true });

providerSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Provider', providerSchema);
