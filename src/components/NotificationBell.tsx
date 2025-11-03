import { useState } from 'react';
import { Bell, Calendar, Users, Trophy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingCard from './FloatingCard';

interface Notification {
  id: number;
  title: string;
  description: string;
  type: 'event' | 'club' | 'achievement';
  date: string;
  icon: typeof Calendar;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Tech Fest 2025',
    description: 'Annual technology festival - Register now!',
    type: 'event',
    date: '2025-12-15',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Robotics Club Opening',
    description: 'New club accepting members. First meeting this Friday',
    type: 'club',
    date: '2025-11-20',
    icon: Users,
  },
  {
    id: 3,
    title: 'Hackathon Challenge',
    description: '24-hour coding competition with amazing prizes',
    type: 'event',
    date: '2025-11-25',
    icon: Trophy,
  },
  {
    id: 4,
    title: 'Photography Club招募',
    description: 'Join our creative photography community',
    type: 'club',
    date: '2025-11-18',
    icon: Users,
  },
  {
    id: 5,
    title: 'Guest Lecture Series',
    description: 'Industry experts sharing insights - Free entry',
    type: 'event',
    date: '2025-11-22',
    icon: Calendar,
  },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-foreground hover:text-primary hover:bg-primary/10"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 max-h-[600px] overflow-y-auto z-50 animate-scale-in">
          <FloatingCard className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">
                Notifications
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        notification.type === 'event' 
                          ? 'bg-blue-500/20' 
                          : notification.type === 'club'
                          ? 'bg-purple-500/20'
                          : 'bg-green-500/20'
                      }`}>
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-foreground/70 mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-primary mt-2">
                          {new Date(notification.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-primary/50 text-foreground hover:bg-primary/10"
            >
              View All Events
            </Button>
          </FloatingCard>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
