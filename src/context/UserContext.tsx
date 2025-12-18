import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface UserContextType {
  username: string | null;
  avatar: string | null;
  loading: boolean;
  login: (username: string, avatar: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem('username');
      const storedAvatar = localStorage.getItem('avatar');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedAvatar) {
        setAvatar(storedAvatar);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((newUsername: string, newAvatar: string) => {
    localStorage.setItem('username', newUsername);
    localStorage.setItem('avatar', newAvatar);
    setUsername(newUsername);
    setAvatar(newAvatar);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    setUsername(null);
    setAvatar(null);
  }, []);

  return (
    <UserContext.Provider value={{ username, avatar, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
