import { useEffect } from 'react';
import { Book, Briefcase, Image, Megaphone, Users, Award, LogOut, User, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import NotificationBell from '@/components/NotificationBell';
import CommentsSection from '@/components/CommentsSection';
import { Button } from '@/components/ui/button';
import { useNotification } from '@/context/NotificationContext';
import { getNotifications } from '@/api/getNotifications';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

const sections = [
  {
    title: 'Official',
    description: 'Announcements & Admin Updates',
    icon: Megaphone,
    color: 'from-blue-500 to-cyan-500',
    delay: 0,
    path: '/official',
  },
  {
    title: 'Magazine',
    description: 'Articles, News & Media',
    icon: Book,
    color: 'from-purple-500 to-pink-500',
    delay: 0.1,
    path: '/magazine',
  },
  {
    title: 'Study Corner',
    description: 'Resources & Academic Forums',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    delay: 0.2,
    path: '/study-corner',
  },
  {
    title: 'Communities',
    description: 'User Groups & Discussions',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    delay: 0.3,
    path: '/communities',
  },
  {
    title: 'Gallery',
    description: 'Photo & Video Sharing',
    icon: Image,
    color: 'from-yellow-500 to-amber-500',
    delay: 0.4,
    path: '/gallery',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { loadInitialNotifications } = useNotification();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("You have been logged out.");
      navigate('/');
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const initialNotifications = [
      {
        title: 'Welcome to BMS Connect!',
        body: 'Explore the dashboard and connect with your peers.',
      },
      ...getNotifications().map(n => ({ title: n.title, body: n.description }))
    ];
    loadInitialNotifications(initialNotifications);
  }, [loadInitialNotifications]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-primary/20 backdrop-blur-lg bg-background/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">
            BMS Connect
          </h1>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="text-foreground hover:text-primary hover:bg-primary/10"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-foreground hover:text-primary hover:bg-primary/10"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-foreground hover:text-primary hover:bg-primary/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Welcome to Your Universe
          </h2>
          <p className="text-foreground/70 text-xl">
            Explore, connect, and collaborate with the BMS community
          </p>
        </div>

        {/* Activity Points Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <FloatingCard delay={0}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Your Activity Score</h3>
                  <p className="text-foreground/70">Earned through events and participation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">2,450</div>
                <div className="text-sm text-foreground/60">Total Points</div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-green-500">+150</div>
                <p className="text-xs text-foreground/60">This Week</p>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-500">12</div>
                <p className="text-xs text-foreground/60">Events</p>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-500">5</div>
                <p className="text-xs text-foreground/60">Achievements</p>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <FloatingCard
                key={section.title}
                delay={section.delay}
                className="group"
              >
                <div className="relative">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 shadow-[0_0_30px_hsl(217_91%_60%/0.3)] group-hover:shadow-[0_0_50px_hsl(217_91%_60%/0.5)] transition-all duration-500`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-4">
                    {section.description}
                  </p>

                  <Button
                    onClick={() => navigate(section.path)}
                    className="w-full bg-primary/20 hover:bg-primary text-foreground hover:text-white border border-primary/30 hover:border-primary transition-all duration-300 shadow-[0_0_20px_hsl(217_91%_60%/0.2)] hover:shadow-[0_0_40px_hsl(217_91%_60%/0.4)]"
                  >
                    Explore
                  </Button>
                </div>
              </FloatingCard>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <FloatingCard delay={0.5} className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1,234</div>
            <div className="text-foreground/70">Active Users</div>
          </FloatingCard>
          
          <FloatingCard delay={0.6} className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">567</div>
            <div className="text-foreground/70">Communities</div>
          </FloatingCard>
          
          <FloatingCard delay={0.7} className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">8,901</div>
            <div className="text-foreground/70">Posts Today</div>
          </FloatingCard>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <CommentsSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
