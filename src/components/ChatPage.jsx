import React, { useState, useRef, useEffect } from 'react';
import { Send, UserCircle2, PhoneCall, MoreVertical } from 'lucide-react';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'driver',
      text: 'I\'m arriving at your pickup location in 3 minutes.',
      timestamp: '2:34 PM'
    },
    {
      id: 2,
      sender: 'rider',
      text: 'Great, thanks for the update!',
      timestamp: '2:35 PM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  return (
    <div className="max-w-md mx-auto bg-black text-yellow-400 h-[600px] flex flex-col m-[5rem]">
      {/* Header */}
      <div className="bg-yellow-500 text-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <UserCircle2 className="mr-3" size={40} />
          <div>
            <h2 className="font-bold">John (Driver)</h2>
            <p className="text-xs text-black/70">Toyota Camry - ABC 123</p>
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
            className={`flex ${
              msg.sender === 'rider' 
                ? 'justify-end' 
                : 'justify-start'
            }`}
          >
            <div 
              className={`
                max-w-[70%] p-3 rounded-lg 
                ${
                  msg.sender === 'rider'
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
          className="
            flex-grow 
            bg-black 
            text-yellow-400 
            p-2 
            rounded-lg 
            mr-3
            placeholder-yellow-600
          "
        />
        <button 
          onClick={handleSendMessage}
          className="
            bg-yellow-500 
            text-black 
            p-2 
            rounded-full 
            hover:bg-yellow-400
          "
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;