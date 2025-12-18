
import { useState, useEffect } from 'react';
import { Send, Heart, MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { db } from '@/lib/firebase'; // Import the Firestore database instance
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const commentsCollection = collection(db, 'comments');
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsList = commentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Comment[];
      setComments(commentsList);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        author: 'You',
        avatar: 'YO',
        content: newComment,
        timestamp: new Date().toLocaleDateString(),
        likes: 0,
        replies: 0,
      });

      setNewComment('');
      toast.success('Comment posted!');
      fetchComments(); // Refresh comments after posting
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    }
  };

  const handleLike = async (id: string) => {
    try {
      const commentRef = doc(db, 'comments', id);
      await updateDoc(commentRef, {
        likes: increment(1)
      });
      fetchComments(); // Refresh comments to show the new like count
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'comments', id));
      toast.success('Comment deleted!');
      fetchComments(); // Refresh comments after deleting
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
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
          <div key={comment.id} className="p-6 bg-background/20 rounded-lg">
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
                  {comment.author === 'You' && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="flex items-center gap-1 text-sm text-foreground/60 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
