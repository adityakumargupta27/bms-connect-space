import { ArrowLeft, Users, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StarBackground from '@/components/StarBackground';

const communities = [
  {
    id: 1,
    name: 'Tech Enthusiasts',
    description: 'Discuss the latest in technology and innovation',
    members: 1234,
    posts: 5678,
    online: 89,
  },
  {
    id: 2,
    name: 'Art & Design',
    description: 'Share your creative works and get feedback',
    members: 892,
    posts: 3421,
    online: 45,
  },
  {
    id: 3,
    name: 'Study Groups',
    description: 'Collaborative learning and exam preparation',
    members: 2156,
    posts: 8934,
    online: 134,
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    description: 'Stay active and connect with fellow athletes',
    members: 756,
    posts: 2341,
    online: 32,
  },
];

const Communities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="mb-6 text-foreground hover:text-primary hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Communities</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Join discussions and connect with like-minded students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
          {communities.map((community, index) => (
            <div key={community.id} className="p-6 bg-background/20 rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {community.name}
              </h3>
              <p className="text-foreground/70 mb-4">
                {community.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{community.members}</div>
                  <div className="text-xs text-foreground/50">Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{community.posts}</div>
                  <div className="text-xs text-foreground/50">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">{community.online}</div>
                  <div className="text-xs text-foreground/50">Online</div>
                </div>
              </div>

              <Button
                className="w-full bg-primary/20 hover:bg-primary text-foreground hover:text-white border border-primary/30"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Join Community
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
