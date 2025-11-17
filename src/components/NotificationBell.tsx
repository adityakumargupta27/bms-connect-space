'use client';
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotification } from '@/context/NotificationContext';

const NotificationBell = () => {
  const { openNotifications, notifications } = useNotification();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={openNotifications}
      className="relative text-foreground hover:text-primary"
    >
      <Bell className="h-5 w-5" />
      {notifications.length > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      )}
    </Button>
  );
};

export default NotificationBell;
