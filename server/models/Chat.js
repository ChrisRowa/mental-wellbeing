const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'therapist', 'ai'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  messages: [MessageSchema],
  summary: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema); 