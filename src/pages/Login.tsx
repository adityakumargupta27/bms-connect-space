import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StarBackground from '@/components/StarBackground';
import { toast } from 'sonner';
import { auth, provider, db } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Eye, EyeOff } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, logout } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const defaultAvatar = 'https://i.imgur.com/8bXVnO4.png';

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email && user.email.endsWith('@bmsce.ac.in')) {
        const username = user.email.split('@')[0];
        const avatar = user.photoURL || defaultAvatar;

        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: avatar,
          lastLogin: serverTimestamp(),
        }, { merge: true });

        login(username, avatar);

        toast.success(`Welcome, ${user.displayName}!`);
        navigate('/dashboard');
      } else {
        await auth.signOut();
        toast.error('Access denied. Only bmsce.ac.in accounts are allowed.');
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.endsWith('@bmsce.ac.in')) {
        toast.error('Access denied. Your username must be a bmsce.ac.in email address.');
        return;
    }

    const username = email.split('@')[0];
    login(username, defaultAvatar);

    toast.success(isLogin ? 'Welcome to BMS Connect!' : 'Account created successfully!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleGuestAccess = () => {
    logout();
    toast.info('Entering as guest...');
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md animate-scale-in">
          {/* Logo/Title */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              BMS Connect
            </h1>
            <p className="text-foreground/80 text-lg">
              Your Gateway to the Student Universe
            </p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-xl bg-card/30 border-2 border-primary/30 rounded-2xl p-8 shadow-[0_0_50px_hsl(217_91%_60%/0.2)] hover:shadow-[0_0_80px_hsl(217_91%_60%/0.3)] transition-all duration-500">
            <div className="mb-6">
              <div className="flex gap-2 p-1 bg-background/20 rounded-lg">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 rounded-md transition-all duration-300 ${
                    isLogin
                      ? 'bg-primary text-white shadow-[0_0_20px_hsl(217_91%_60%/0.4)]'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 rounded-md transition-all duration-300 ${
                    !isLogin
                      ? 'bg-primary text-white shadow-[0_0_20px_hsl(217_91%_60%/0.4)]'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  BMSCE Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary text-foreground"
                  placeholder="username@bmsce.ac.in"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50 border-primary/20 focus:border-primary text-foreground pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-foreground/70 hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_hsl(217_91%_60%/0.5)] hover:shadow-[0_0_50px_hsl(217_91%_60%/0.7)] transition-all duration-300 transform hover:scale-105"
              >
                {isLogin ? 'Enter the Universe' : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/30"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card/30 px-2 text-foreground/70">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
              variant="secondary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M22.56 12.25C22.56 11.45 22.49 10.65 22.36 9.88H12V14.51H18.2C17.92 16.03 17.13 17.33 15.89 18.23V20.84H19.74C21.68 19.04 22.56 16.2 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.47 22.02 19.24 20.39L15.89 18.23C14.82 18.94 13.52 19.34 12 19.34C9.11 19.34 6.6 17.48 5.67 14.99H1.72V17.68C3.51 20.86 7.42 23 12 23Z" fill="#34A853"/>
                <path d="M5.67 14.99C5.43 14.28 5.3 13.54 5.3 12.78C5.3 12.02 5.43 11.28 5.67 10.57V7.88H1.72C0.96 9.4 0.5 11.04 0.5 12.78C0.5 14.52 0.96 16.16 1.72 17.68L5.67 14.99Z" fill="#FBBC05"/>
                <path d="M12 5.66C13.67 5.66 15.08 6.23 16.14 7.21L19.31 4.04C17.47 2.26 14.97 1 12 1C7.42 1 3.51 3.14 1.72 6.32L5.67 9C6.6 6.52 9.11 4.66 12 4.66V5.66H12Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>

            <div className="mt-6 text-center">
              <button
                onClick={handleGuestAccess}
                className="text-primary hover:text-primary/80 transition-colors duration-300 text-sm underline decoration-primary/30 hover:decoration-primary/60"
              >
                Continue as Guest
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-foreground/50 text-sm">
            <p>Connect • Collaborate • Create</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;