const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: user.name,
      email: user.email,
      joinDate: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

exports.getBookingHistory = async (req, res) => {
  // TODO: Use req.user for real bookings
  res.json({
    appointments: [
      { id: 1, therapist: 'Dr. Sarah Wilson', date: 'Today, 2:00 PM', type: 'Individual Therapy', avatar: '/placeholder.svg' },
      { id: 2, therapist: 'Dr. Michael Chen', date: 'Tomorrow, 10:00 AM', type: 'Anxiety Management', avatar: '/placeholder.svg' }
    ],
    activities: [
      { id: 1, type: 'chat', message: 'Completed wellness check-in', time: '2 hours ago' },
      { id: 2, type: 'session', message: 'Session with Dr. Sarah Wilson', time: 'Yesterday' },
      { id: 3, type: 'milestone', message: '7-day wellness streak!', time: '2 days ago' }
    ]
  });
};

exports.getReminders = async (req, res) => {
  res.json({ reminders: [] });
}; 