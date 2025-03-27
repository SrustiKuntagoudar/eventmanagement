
const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  available: { type: Boolean, default: true },
  amenities: [{ type: String }],
  addons: [{ name: String, price: Number }],
});

module.exports = mongoose.model('Hall', hallSchema);
