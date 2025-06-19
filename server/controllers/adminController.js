exports.manageUsers = async (req, res) => {
  res.json([
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'user' },
    { id: 2, name: 'Dr. Jane Doe', email: 'jane@example.com', role: 'therapist' }
  ]);
};

exports.manageTherapists = async (req, res) => {
  res.json([
    { id: 2, name: 'Dr. Jane Doe', email: 'jane@example.com', specialization: ['CBT', 'Anxiety'] }
  ]);
};

exports.monitorChatbot = async (req, res) => {
  res.json({ usage: 42 });
};

exports.viewReports = async (req, res) => {
  res.json({ reports: [{ id: 1, type: 'appointments', count: 10 }, { id: 2, type: 'activity', count: 25 }] });
};

exports.controlAIContent = async (req, res) => {
  res.json({ message: 'AI content updated' });
}; 