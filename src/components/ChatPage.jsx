import React, { useState, useRef, useEffect } from 'react';
import { Send, UserCircle2, PhoneCall, MoreVertical } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { driver, pickup, dropoff, returnPath, estimatedFare } = location.state || {};

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'driver',
      text: `I'm heading to pick you up at ${pickup}.`,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'rider',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setNewMessage('');
    }
  };

  // Handle back button
  const handleBack = () => {
    if (returnPath) {
      navigate(returnPath, { 
        state: { 
          pickup: pickup, 
          dropoff: dropoff,
          estimatedFare: estimatedFare,
          returnFromChat: true
        } 
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black text-yellow-400 h-[600px] flex flex-col m-[5rem]">
      {/* Header */}
      <div className="bg-yellow-500 text-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <UserCircle2 className="mr-3" size={40} />
          <div>
            <h2 className="font-bold">{driver?.name || 'Driver'}</h2>
            <p className="text-xs text-black/70">{driver?.carModel} - {driver?.plateNumber}</p>
          </div>
        </div>
        <div className="flex items-center">
          <PhoneCall className="mr-3 text-black hover:text-yellow-700" />
          <MoreVertical className="text-black hover:text-yellow-700" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'rider' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[70%] p-3 rounded-lg 
                ${msg.sender === 'rider'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-yellow-700 text-white'
                }
              `}
            >
              <p className="text-sm">{msg.text}</p>
              <div className="text-xs text-right opacity-70 mt-1">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-yellow-600 p-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message"
          className="flex-grow bg-black text-yellow-400 p-2 rounded-lg mr-3 placeholder-yellow-600"
        />
        <button 
          onClick={handleSendMessage}
          className="bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-400"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;