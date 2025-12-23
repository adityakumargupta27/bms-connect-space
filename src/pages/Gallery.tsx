import { ArrowLeft, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import { useState } from 'react';

const initialPosts = [
  {
    id: 5,
    author: 'Ananya Reddy',
    avatar: 'AR',
    caption: 'Bangalore is turning pink! The trumpet trees are in full bloom. 🌸 #PinkBangalore',
    imageUrl: 'https://i.pinimg.com/originals/c5/d9/95/c5d995da2a9bcf1522ac0845a7b0c357.jpg',
    likes: 350,
    comments: 55,
    timestamp: '4 hours ago',
    liked: false,
  },
  {
    id: 1,
    author: 'Rohan Kumar',
    avatar: 'RK',
    caption: 'Golden hour over the Bangalore skyline is something else! ✨',
    imageUrl: 'https://i.pinimg.com/originals/3d/83/83/3d8383351369a239a25227565a6c3f11.jpg',
    likes: 180,
    comments: 25,
    timestamp: '8 hours ago',
    liked: false,
  },
  {
    id: 2,
    author: 'Priya Sharma',
    avatar: 'PS',
    caption: 'A peaceful morning walk in the lush greenery of Cubbon Park. 🌳',
    imageUrl: 'https://i.pinimg.com/originals/99/3a/42/993a429a3a96e38b1f5e6a0d2a2a0a25.jpg',
    likes: 220,
    comments: 40,
    timestamp: '12 hours ago',
    liked: false,
  },
  {
    id: 3,
    author: 'Aditya Singh',
    avatar: 'AS',
    caption: 'Exploring the delicious street food in VV Puram Food Street! 🤤',
    imageUrl: 'https://i.pinimg.com/originals/5e/24/a3/5e24a3501f6004b73f8e53a2b53573c7.jpg',
    likes: 310,
    comments: 60,
    timestamp: '1 day ago',
    liked: false,
  },
  {
    id: 4,
    author: 'Sneha Patel',
    avatar: 'SP',
    caption: 'The magnificent Vidhana Soudha, an architectural marvel. 🏛️',
    imageUrl: 'https://i.pinimg.com/originals/0d/17/87/0d17878d8a39a7c491a9cd288219808d.jpg',
    likes: 250,
    comments: 35,
    timestamp: '2 days ago',
    liked: false,
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
    ));
  };

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

              {/* Image */}
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-3 overflow-hidden">
                <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
              </div>

              {/* Caption */}
              <p className="text-foreground/80 mb-3">{post.caption}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-primary/10">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors ${post.liked ? 'text-primary' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
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
