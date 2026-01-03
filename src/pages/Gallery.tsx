import { ArrowLeft, Image as ImageIcon, Heart, MessageCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import { useEffect, useState, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, Timestamp, doc, updateDoc, increment, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';

interface Post {
  id: string;
  author: string;
  avatar: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: number;
  timestamp: Timestamp;
  liked: boolean;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { username, avatar } = useUser();

  const fetchPosts = async () => {
    try {
      const galleryCol = collection(db, "gallery");
      const q = query(galleryCol, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const postsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        liked: false, 
        ...doc.data(),
      })) as Post[];
      setPosts(postsList);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (id: string) => {
    const postToUpdate = posts.find(p => p.id === id);
    if (!postToUpdate) return;

    const newLikedState = !postToUpdate.liked;
    const newLikesCount = newLikedState ? postToUpdate.likes + 1 : postToUpdate.likes - 1;

    setPosts(posts.map(p => 
      p.id === id ? { ...p, likes: newLikesCount, liked: newLikedState } : p
    ));

    try {
      const postRef = doc(db, 'gallery', id);
      await updateDoc(postRef, {
        likes: increment(newLikedState ? 1 : -1)
      });
    } catch (error) {
      console.error("Failed to update like in Firestore: ", error);
      setPosts(posts.map(p => 
        p.id === id ? { ...p, likes: postToUpdate.likes, liked: postToUpdate.liked } : p
      ));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const toastId = toast({
      title: "Starting Upload...",
      description: "Your photo is being prepared.",
    }).id;

    const storageRef = ref(storage, `gallery-images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        toast({
          id: toastId,
          title: `Uploading Photo: ${Math.round(progress)}%`,
          description: "Please wait...",
        });
      },
      (error) => {
        console.error("Upload failed:", error);
        toast({
          id: toastId,
          title: "Photo Upload Failed",
          description: "Could not upload your photo. Please check the console for details.",
          variant: "destructive",
        });
      },
      () => {
        console.log("Upload complete. Getting download URL...");
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          const newPost = {
            author: username || "Anonymous",
            avatar: avatar || "A",
            caption: "A new photo!",
            imageUrl: downloadURL,
            likes: 0,
            comments: 0,
            timestamp: Timestamp.now(),
          };
          try {
            console.log("Creating new post in Firestore...");
            await addDoc(collection(db, "gallery"), newPost);
            console.log("Post created. Refreshing gallery...");
            fetchPosts(); 
            toast({
              id: toastId,
              title: "Photo Uploaded Successfully!",
              description: "Your photo is now live in the gallery.",
            });
          } catch (error) {
            console.error("Error creating new post:", error);
            toast({
              id: toastId,
              title: "Failed to Save Post",
              description: "Your photo was uploaded, but we couldn't save it to the gallery.",
              variant: "destructive",
            });
          }
        }).catch((error) => {
            console.error("Failed to get download URL:", error);
            toast({
              id: toastId,
              title: "Upload Failed",
              description: "Could not get the photo URL after upload. Please check storage rules.",
              variant: "destructive",
            });
        });
      }
    );
  };
  
  const formatTimestamp = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `just now`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />

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
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Gallery</h1>
            </div>
            <Button onClick={() => fileInputRef.current?.click()} className="bg-primary/20 hover:bg-primary text-foreground hover:text-white border border-primary/30">
              <Plus className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          </div>
          <p className="text-foreground/70 text-lg">
            Share moments and memories with the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {posts.map((post, index) => (
            <FloatingCard key={post.id} delay={index * 0.1}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                  {post.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{post.author}</div>
                  <div className="text-xs text-foreground/50">{formatTimestamp(post.timestamp)}</div>
                </div>
              </div>

              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-3 overflow-hidden">
                <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
              </div>

              <p className="text-foreground/80 mb-3">{post.caption}</p>

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