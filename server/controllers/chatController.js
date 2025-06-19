const axios = require('axios');
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log('User message:', message);
    // Fetch last 10 messages for context (flattened)
    let history = [];
    if (req.user?._id) {
      const lastChats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(10);
      let messagesArr = [];
      lastChats.reverse(); // oldest first
      lastChats.forEach(chat => {
        messagesArr = messagesArr.concat(chat.messages);
      });
      // Only keep the last 10 messages
      messagesArr = messagesArr.slice(-10);
      messagesArr.forEach(m => {
        history.push({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text });
      });
    }
    // Add the new user message
    history.push({ role: 'user', content: message });
    // Improved, dynamic system prompt
    const userName = req.user?.name || 'friend';
    const systemPrompt =
      `You are a compassionate, supportive mental wellness assistant. Address the user as ${userName}. Offer practical advice, motivational quotes, and grounding exercises. If the user seems in crisis, gently suggest contacting a human therapist. Respond in a friendly, conversational tone. Vary your responses and avoid repeating yourself.`;
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const aiReply = openaiRes.data.choices[0].message.content;
    console.log('AI reply:', aiReply);
    // Store chat in MongoDB
    await Chat.create({ user: req.user?._id, messages: [
      { sender: 'user', text: message },
      { sender: 'ai', text: aiReply }
    ] });
    res.json({ reply: aiReply });
  } catch (err) {
    console.error('AI chat error:', err?.response?.data || err.message || err);
    res.status(500).json({ message: 'AI chat failed' });
  }
};

exports.getChatHistory = async (req, res) => {
  // TODO: Fetch chat history for user/therapist
  res.json({ chats: [] });
}; 