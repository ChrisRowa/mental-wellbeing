exports.bookAppointment = async (req, res) => {
  // TODO: Save appointment to DB
  res.json({ message: 'Appointment booked!' });
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