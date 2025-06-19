const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: [String], required: true },
  availability: [{
    day: String,
    slots: [String], // e.g., ['10:00', '11:00']
  }],
  // Add more profile fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Therapist', TherapistSchema); 