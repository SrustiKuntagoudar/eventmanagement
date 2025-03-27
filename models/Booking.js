
   const mongoose = require('mongoose');

   const bookingSchema = new mongoose.Schema({
     hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     startTime: { type: Date, required: true },
     endTime: { type: Date, required: true },
     totalPrice: { type: Number, required: true },
     addons: [{ name: String, price: Number }],
   });

   module.exports = mongoose.model('Booking', bookingSchema);

