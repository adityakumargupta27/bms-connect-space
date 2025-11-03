import { ArrowLeft, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import CustomCursor from '@/components/CustomCursor';

const posts = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'SJ',
    caption: 'Amazing sunset from the campus rooftop! 🌅',
    likes: 142,
    comments: 23,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: 'Mike Chen',
    avatar: 'MC',
    caption: 'Study group vibes ☕📚',
    likes: 89,
    comments: 12,
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    author: 'Emily Davis',
    avatar: 'ED',
    caption: 'Won first place at the hackathon! 🏆',
    likes: 256,
    comments: 45,
    timestamp: '1 day ago',
  },
  {
    id: 4,
    author: 'Alex Kumar',
    avatar: 'AK',
    caption: 'New art installation in the main hall',
    likes: 178,
    comments: 31,
    timestamp: '1 day ago',
  },
];

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      <CustomCursor />

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Gallery</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Share moments and memories with the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {posts.map((post, index) => (
            <FloatingCard key={post.id} delay={index * 0.1}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{post.author}</div>
                  <div className="text-xs text-foreground/50">{post.timestamp}</div>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-3 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-primary/50" />
              </div>

              {/* Caption */}
              <p className="text-foreground/80 mb-3">{post.caption}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-primary/10">
                <button className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
