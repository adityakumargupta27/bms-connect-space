import { ArrowLeft, User, Bell, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="mb-6 text-foreground hover:text-primary hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-8 animate-fade-in">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <FloatingCard delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Account</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Email Notifications</Label>
                  <p className="text-sm text-foreground/60">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Profile Visibility</Label>
                  <p className="text-sm text-foreground/60">Make profile public</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </FloatingCard>

          {/* Notifications */}
          <FloatingCard delay={0.2}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Event Reminders</Label>
                  <p className="text-sm text-foreground/60">Get notified about upcoming events</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">New Messages</Label>
                  <p className="text-sm text-foreground/60">Alert for new community messages</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </FloatingCard>

          {/* Privacy */}
          <FloatingCard delay={0.3}>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Anonymous Posting</Label>
                  <p className="text-sm text-foreground/60">Post anonymously by default</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Activity Tracking</Label>
                  <p className="text-sm text-foreground/60">Track activity for points</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </FloatingCard>

          {/* Language */}
          <FloatingCard delay={0.4}>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Language & Region</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground mb-2 block">Language</Label>
                <select className="w-full p-2 rounded-lg bg-background/50 border border-primary/20 text-foreground">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;
