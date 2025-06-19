const Appointment = require('../models/Appointment');
const Therapist = require('../models/Therapist');

exports.bookAppointment = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { therapistId, date, time } = req.body;
    if (!therapistId || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Check therapist exists
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    const appointment = new Appointment({
      user: req.user._id,
      therapist: therapistId,
      date,
      time,
      status: 'pending'
    });
    await appointment.save();
    res.json({ message: 'Appointment booked!', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to book appointment' });
  }
};

exports.acceptAppointment = async (req, res) => {
  res.json({ message: 'Appointment accepted' });
};

exports.rejectAppointment = async (req, res) => {
  res.json({ message: 'Appointment rejected' });
};

exports.getAppointments = async (req, res) => {
  // TODO: Use req.user for real appointments
  res.json({ appointments: [] });
};

exports.getReminders = async (req, res) => {
  try {
    if (!req.user || !req.user._id) return res.status(401).json({ message: 'Unauthorized' });
    const now = new Date();
    const reminders = await Appointment.find({
      user: req.user._id,
      reminderTime: { $gte: now },
      reminderSent: false
    });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reminders' });
  }
}; 