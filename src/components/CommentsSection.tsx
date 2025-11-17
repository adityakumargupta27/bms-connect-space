import { useState } from 'react';
import { Send, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import FloatingCard from './FloatingCard';
import { toast } from 'sonner';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: 'Alex Johnson',
    avatar: 'AJ',
    content: 'Just finished the hackathon prep! Who else is excited for the Tech Fest? 🚀',
    timestamp: '2 hours ago',
    likes: 24,
    replies: 5,
  },
  {
    id: 2,
    author: 'Sarah Chen',
    avatar: 'SC',
    content: 'The new Robotics Club sounds amazing! Can\'t wait for the first meeting.',
    timestamp: '5 hours ago',
    likes: 18,
    replies: 3,
  },
  {
    id: 3,
    author: 'Mike Wilson',
    avatar: 'MW',
    content: 'Anyone forming study groups for the upcoming exams? Let me know!',
    timestamp: '1 day ago',
    likes: 31,
    replies: 12,
  },
];

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: 'YO',
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const handleLike = (id: number) => {
    setComments(comments.map(c => 
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground mb-6">
        Community Discussion
      </h2>

      {/* New Comment Input */}
      <div className="mb-6 p-6 bg-background/20 rounded-lg z-10">
        <form onSubmit={handleSubmit}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts with the community..."
            className="bg-background/50 border-primary/20 focus:border-primary text-foreground min-h-[100px] resize-none"
          />
          <div className="flex justify-end mt-3">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_hsl(217_91%_60%/0.4)] hover:shadow-[0_0_30px_hsl(217_91%_60%/0.6)]"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <FloatingCard key={comment.id}>
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {comment.avatar}
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">
                    {comment.author}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {comment.timestamp}
                  </span>
                </div>

                <p className="text-foreground/80 mb-3">
                  {comment.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{comment.replies} replies</span>
                  </button>
                </div>
              </div>
            </div>
          </FloatingCard>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
