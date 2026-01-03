'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

interface Notification {
  title: string;
  body: string;
  path?: string; // Add optional path property
}

interface NotificationContextType {
  isOpen: boolean;
  notifications: Notification[];
  openNotifications: () => void;
  closeNotifications: () => void;
  addNotification: (notification: Notification) => void;
  loadInitialNotifications: (initialNotifications: Notification[]) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [initialLoad, setInitialLoad] = useState(false);

  const openNotifications = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeNotifications = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const loadInitialNotifications = useCallback((initialNotifications: Notification[]) => {
      if (!initialLoad) {
        setNotifications(initialNotifications);
        setInitialLoad(true);
      }
    },
    [initialLoad]
  );

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        notifications,
        openNotifications,
        closeNotifications,
        addNotification,
        loadInitialNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
