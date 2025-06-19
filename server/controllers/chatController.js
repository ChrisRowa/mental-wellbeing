const axios = require('axios');
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    // Call OpenAI API
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful mental wellness assistant.' },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
        }
      }
    );
    const aiReply = openaiRes.data.choices[0].message.content;
    // Store chat in MongoDB (optional, simplified)
    await Chat.create({ user: req.user?._id, messages: [
      { sender: 'user', text: message },
      { sender: 'ai', text: aiReply }
    ] });
    res.json({ reply: aiReply });
  } catch (err) {
    res.status(500).json({ message: 'AI chat failed' });
  }
};

exports.getChatHistory = async (req, res) => {
  // TODO: Fetch chat history for user/therapist
  res.json({ chats: [] });
}; 