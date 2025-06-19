const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema); 