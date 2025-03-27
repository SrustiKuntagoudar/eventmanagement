// const express = require('express');
// const router = express.Router();
// const Hall = require('../models/Hall');
// const Booking = require('../models/Booking');
// const auth = require('../middleware/auth.js'); // Auth middleware is not used

// router.get('/', async (req, res) => {
//   try {
//     const halls = await Hall.find({ available: true });
//     res.json(halls);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate('hallId'); // Removed auth
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/book', async (req, res) => {
//   const { hallId, startTime, endTime, addons } = req.body;
//   const userId = req.body.userId; // Mock user ID since auth is removed

//   try {
//     const hall = await Hall.findById(hallId);
//     if (!hall) return res.status(400).json({ message: 'Hall not found' });

//     // Check for overlapping bookings
//     const overlappingBooking = await Booking.findOne({
//       hallId,
//       $or: [
//         { startTime: { $lt: endTime, $gte: startTime } },
//         { endTime: { $gt: startTime, $lte: endTime } },
//         { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
//       ]
//     });

//     if (overlappingBooking) {
//       return res.status(400).json({ message: 'Hall is already booked for the selected time slot' });
//     }

//     const duration = (new Date(endTime) - new Date(startTime)) / 3600000;
//     const addonCost = addons.reduce((sum, addon) => sum + addon.price, 0);
//     const totalPrice = (duration * hall.pricePerHour) + addonCost;

//     const booking = new Booking({ hallId, userId, startTime, endTime, totalPrice, addons });
//     await booking.save();

//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/amenities', async (req, res) => {
//   const { hallId, amenities } = req.body;
//   try {
//     const hall = await Hall.findById(hallId);
//     hall.amenities = amenities;
//     await hall.save();
//     res.json(hall);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/addons', async (req, res) => {
//   const { hallId, addons } = req.body;
//   try {
//     const hall = await Hall.findById(hallId);
//     hall.addons = addons;
//     await hall.save();
//     res.json(hall);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

import express from 'express';
import Hall from '../models/Hall.js';
import Booking from '../models/Booking.js';
// import auth from '../middleware/auth.js'; // Uncomment if authentication is added

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const halls = await Hall.find({ available: true });
    res.json(halls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('hallId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/book', async (req, res) => {
  const { hallId, startTime, endTime, addons } = req.body;
  const userId = req.body.userId;

  try {
    const hall = await Hall.findById(hallId);
    if (!hall) return res.status(400).json({ message: 'Hall not found' });

    const overlappingBooking = await Booking.findOne({
      hallId,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Hall is already booked for the selected time slot' });
    }

    const duration = (new Date(endTime) - new Date(startTime)) / 3600000;
    const addonCost = addons.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = (duration * hall.pricePerHour) + addonCost;

    const booking = new Booking({ hallId, userId, startTime, endTime, totalPrice, addons });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; // ✅ Add this line
