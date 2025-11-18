import { ArrowLeft, Book, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';

const articles = [
  {
    id: 1,
    title: 'The Future of AI in Education',
    excerpt: 'Exploring how artificial intelligence is transforming the learning experience...',
    author: 'Dr. Jane Smith',
    date: '2025-11-12',
    readTime: '5 min read',
    category: 'Technology',
  },
  {
    id: 2,
    title: 'Student Success Stories',
    excerpt: 'Meet the students who are making a difference in their communities...',
    author: 'Editorial Team',
    date: '2025-11-10',
    readTime: '8 min read',
    category: 'Features',
  },
  {
    id: 3,
    title: 'Campus Sustainability Initiative',
    excerpt: 'How our university is leading the way in environmental conservation...',
    author: 'Green Team',
    date: '2025-11-08',
    readTime: '6 min read',
    category: 'Environment',
  },
];

const Magazine = () => {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Magazine</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Articles, news, and stories from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
          {articles.map((article, index) => (
            <FloatingCard key={article.id} delay={index * 0.1}>
              <div className="mb-3">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                  {article.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">
                {article.title}
              </h3>
              <p className="text-foreground/70 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-foreground/50">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Magazine;
