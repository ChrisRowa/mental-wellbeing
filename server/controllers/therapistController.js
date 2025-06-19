exports.getTherapistProfile = async (req, res) => {
  // TODO: Use req.user for real therapist info
  res.json({ name: 'Dr. Jane Doe', specialization: ['CBT', 'Anxiety'], email: 'jane@example.com', avatar: '/placeholder.svg', availability: ['Mon 2-4pm', 'Wed 10-12am', 'Fri 1-3pm'] });
};

exports.updateAvailability = async (req, res) => {
  res.json({ message: 'Availability updated' });
};

exports.manageAppointments = async (req, res) => {
  // TODO: Use req.user for real appointments
  res.json({ appointments: [
    { id: 1, user: 'Alex Johnson', date: 'Today, 3:00 PM', status: 'pending' },
    { id: 2, user: 'Sam Lee', date: 'Tomorrow, 11:00 AM', status: 'accepted' }
  ] });
};

exports.getTherapistList = async (req, res) => {
  res.json([
    { _id: '1', name: 'Dr. Sarah Wilson', specialization: ['Anxiety', 'Depression', 'CBT'], availability: ['Today 2:00 PM', 'Tomorrow 10:00 AM'] },
    { _id: '2', name: 'Dr. Michael Chen', specialization: ['Stress Management', 'Mindfulness', 'PTSD'], availability: ['Tomorrow 11:00 AM'] }
  ]);
}; 