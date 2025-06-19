import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, Heart, Lightbulb, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import axios from "@/lib/axios";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI wellness companion. I'm here to provide emotional support, coping strategies, and wellness guidance. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: ["I'm feeling anxious", "I need motivation", "Help me relax", "I want to talk about stress"]
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await axios.post("/api/chat/send", { message: text.trim() });
      const aiReply = res.data.reply;
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiReply,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: undefined // Optionally parse suggestions from aiReply if you want
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: "Sorry, I couldn't connect to the AI assistant. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">AI Wellness Assistant</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Online & ready to help</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex flex-col h-[calc(100vh-200px)]">
          {/* Chat Messages */}
          <Card className="flex-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-4 overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        {message.sender === 'ai' ? (
                          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <AvatarFallback className="bg-indigo-100 text-indigo-700">{user?.name?.split(' ')[0] || "You"}</AvatarFallback>
                        )}
                      </Avatar>
                      <div className="space-y-2">
                        <div className={`p-4 rounded-2xl ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                        {/* Book Session handoff */}
                        {message.sender === 'ai' && message.text.toLowerCase().includes('book a therapy session') && (
                          <Link to="/booking">
                            <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 mt-2">Book Session</Button>
                          </Link>
                        )}
                        {/* Suggestions if any */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendMessage(suggestion)}
                                className="text-xs bg-white/50 hover:bg-indigo-50 border-indigo-200"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3 max-w-[80%]">
                      <Avatar className="w-8 h-8">
                        <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                      </Avatar>
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>

          {/* Input Area */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <Input
                  placeholder="Type your message here... I'm here to listen and support you."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  className="flex-1 bg-white/50"
                  disabled={isTyping}
                />
                <Button 
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-indigo-100 bg-white/70"
                  onClick={() => handleSendMessage("I need someone to talk to")}
                >
                  <Heart className="w-3 h-3 mr-1" />
                  Need to talk
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-indigo-100 bg-white/70"
                  onClick={() => handleSendMessage("Give me a wellness tip")}
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Wellness tip
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-indigo-100 bg-white/70"
                  onClick={() => handleSendMessage("I want to book a therapy session")}
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Book session
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
