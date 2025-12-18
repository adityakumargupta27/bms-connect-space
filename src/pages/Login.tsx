import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StarBackground from '@/components/StarBackground';
import { toast } from 'sonner';
import { auth, provider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Chrome, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email && user.email.endsWith('@bmsce.ac.in')) {
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
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!username.endsWith('@bmsce.ac.in')) {
        toast.error('Access denied. Your username must be a bmsce.ac.in email address.');
        return;
    }

    // Simulate login
    toast.success(isLogin ? 'Welcome to BMS Connect!' : 'Account created successfully!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleGuestAccess = () => {
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
                <Label htmlFor="username" className="text-foreground">
                  BMSCE Email
                </Label>
                <Input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <Chrome className="h-5 w-5 mr-3" />
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
