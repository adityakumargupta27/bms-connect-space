import { ArrowLeft, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Gallery = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'gallery');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  const handleLike = (id) => {
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
