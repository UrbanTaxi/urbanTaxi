import React, { useState } from 'react';
import { Bell, MapPin, Car, CheckCircle, AlertCircle } from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    type: 'ride',
    icon: <Car color="#FFC107" />,
    title: 'Ride Confirmed',
    message: 'Your ride to Downtown is confirmed. Driver arriving in 5 mins.',
    time: '2 mins ago',
    unread: true
  },
  {
    id: 2,
    type: 'location',
    icon: <MapPin color="#000000" />,
    title: 'Destination Updated',
    message: 'Your drop-off location has been changed.',
    time: '15 mins ago',
    unread: false
  },
  {
    id: 3,
    type: 'alert',
    icon: <AlertCircle color="#000000" />,
    title: 'Surge Pricing',
    message: 'High demand area. Prices are currently elevated.',
    time: '30 mins ago',
    unread: true
  },
  {
    id: 4,
    type: 'confirmation',
    icon: <CheckCircle color="#FFC107" />,
    title: 'Payment Successful',
    message: 'Payment for your recent ride has been processed.',
    time: '1 hour ago',
    unread: false
  }
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="max-w-md mx-auto bg-black text-yellow-400 shadow-lg rounded-xl p-4 mt-[5rem]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Bell color="#FFC107" className="mr-2" />
          <h2 className="text-xl font-bold text-yellow-400">Notifications</h2>
          {unreadCount > 0 && (
            <span className="ml-2 bg-yellow-500 text-black rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead} 
            className="text-yellow-400 hover:text-yellow-600 text-sm"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-yellow-600 py-8">
          No notifications
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`
                flex items-start p-3 rounded-lg 
                ${notification.unread ? 'bg-yellow-100/10' : 'bg-black'}
                hover:bg-yellow-100/20 transition-colors
              `}
            >
              <div className="mr-3">
                {notification.icon}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-yellow-400">{notification.title}</h3>
                  <span className="text-xs text-yellow-600">{notification.time}</span>
                </div>
                <p className="text-yellow-300 text-sm">{notification.message}</p>
              </div>
              <button 
                onClick={() => removeNotification(notification.id)}
                className="ml-3 text-yellow-600 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;