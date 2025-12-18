import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StarBackground from '@/components/StarBackground';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const JoinCommunity = () => {
  const navigate = useNavigate();
  const { communityName } = useParams();
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [usn, setUsn] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !batch || !usn) {
      toast.error('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'community-applications'), {
        communityName: communityName,
        name: name,
        batch: batch,
        usn: usn,
        appliedAt: serverTimestamp(),
      });
      toast.success(`Successfully applied to join ${communityName}!`);
      navigate('/communities');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-background/50 backdrop-blur-md border border-primary/20 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-foreground text-center mb-2">Apply to Join</h1>
            <p className="text-foreground/70 text-center mb-6">
              You are applying for the <span className="text-primary font-semibold">{communityName}</span> community.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-background/70"
                />
              </div>
              <div>
                <Label htmlFor="batch">Batch</Label>
                <Input
                  id="batch"
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="e.g., 2022-2026"
                  className="bg-background/70"
                />
              </div>
              <div>
                <Label htmlFor="usn">USN</Label>
                <Input
                  id="usn"
                  type="text"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                  placeholder="Enter your USN"
                  className="bg-background/70"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
            <Button
              variant="link"
              className="w-full mt-4 text-foreground/70"
              onClick={() => navigate('/communities')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
