export interface PointsData {
    totalPoints: number;
    weeklyPoints: number;
    events: number;
    achievements: number;
  }
  
  export const getPoints = (): PointsData => {
    
    return {
      totalPoints: 3500,
      weeklyPoints: 250,
      events: 15,
      achievements: 7,
    };
  };