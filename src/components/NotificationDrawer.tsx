'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const NotificationDrawer = () => {
  const { isOpen, closeNotifications, notifications } = useNotification();
  const navigate = useNavigate();

  const handleNotificationClick = (path?: string) => {
    if (path) {
      navigate(path);
      closeNotifications();
    }
  };

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={closeNotifications}
          className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[9998]"
        />
      )}

      {/* RIGHT DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] bg-[#0D1224]/95 
          shadow-2xl border-l border-white/10 z-[9999] 
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-bold">Notifications</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeNotifications}
            className="text-red-400 hover:text-red-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* LIST */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-70px)]">
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNotificationClick(item.path)}
                className={`p-4 bg-white/5 rounded-xl border border-white/10 
                ${item.path ? 'hover:bg-white/10 transition cursor-pointer' : 'cursor-default'}`}
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-white/60 mt-1">{item.body}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-white/60 mt-10">No new notifications</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
