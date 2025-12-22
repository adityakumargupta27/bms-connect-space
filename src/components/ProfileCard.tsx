import { useUser } from '@/context/UserContext';
import AnimatedAvatar from './AnimatedAvatar';

const ProfileCard = () => {
  const { username, loading } = useUser();

  if (loading) {
    return null; 
  }

  return (
    <div className="bg-card/50 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
      <AnimatedAvatar className="w-20 h-20 rounded-full border-4 border-primary/40 shadow-md" />
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome,</h2>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
          {username || 'Guest'}
        </h1>
      </div>
    </div>
  );
};

export default ProfileCard;
