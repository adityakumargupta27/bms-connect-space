
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getPoints, PointsData } from '@/api/getPoints';

interface PointContextType {
  pointsData: PointsData | null;
  loading: boolean;
}

const PointContext = createContext<PointContextType | undefined>(undefined);

export const PointProvider = ({ children }: { children: ReactNode }) => {
  const [pointsData, setPointsData] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = () => {
      const data = getPoints();
      setPointsData(data);
      setLoading(false);
    };

    fetchPoints();
  }, []);

  return (
    <PointContext.Provider value={{ pointsData, loading }}>
      {children}
    </PointContext.Provider>
  );
};

export const usePoint = () => {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error('usePoint must be used within a PointProvider');
  }
  return context;
};
