import { ArrowLeft, Mail, Calendar, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import CustomCursor from '@/components/CustomCursor';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      <CustomCursor />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="mb-6 text-foreground hover:text-primary hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="animate-fade-in">
          {/* Profile Header */}
          <FloatingCard className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              JD
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">John Doe</h1>
            <p className="text-foreground/70 mb-4">Computer Science • Class of 2026</p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-foreground/60">
                <Mail className="h-4 w-4" />
                <span>john.doe@bms.edu</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60">
                <Calendar className="h-4 w-4" />
                <span>Joined Sep 2024</span>
              </div>
            </div>
          </FloatingCard>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FloatingCard delay={0.1} className="text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary mb-1">2,450</div>
              <div className="text-foreground/70 text-sm">Activity Points</div>
            </FloatingCard>

            <FloatingCard delay={0.2} className="text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-500 mb-1">12</div>
              <div className="text-foreground/70 text-sm">Events Attended</div>
            </FloatingCard>

            <FloatingCard delay={0.3} className="text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-yellow-500 mb-1">5</div>
              <div className="text-foreground/70 text-sm">Achievements</div>
            </FloatingCard>
          </div>

          {/* Recent Activity */}
          <FloatingCard delay={0.4}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { activity: 'Participated in Tech Fest 2025', points: '+150 pts', date: '2 days ago' },
                { activity: 'Joined Robotics Club', points: '+50 pts', date: '5 days ago' },
                { activity: 'Won Hackathon Challenge', points: '+300 pts', date: '1 week ago' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/10"
                >
                  <div>
                    <div className="text-foreground font-medium">{item.activity}</div>
                    <div className="text-xs text-foreground/50">{item.date}</div>
                  </div>
                  <div className="text-primary font-semibold">{item.points}</div>
                </div>
              ))}
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
