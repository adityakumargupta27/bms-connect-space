import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Counts {
  students: number | null;
  community: number | null;
  members: number | null;
}

const LoginInfo = () => {
  const [counts, setCounts] = useState<Counts>({
    students: null,
    community: null,
    members: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentsRes, communityRes, membersRes] = await Promise.all([
        fetch('/api/students/count'),
        fetch('/api/community/online'),
        fetch('/api/members/registered'),
      ]);

      if (!studentsRes.ok || !communityRes.ok || !membersRes.ok) {
        throw new Error('Network response was not ok');
      }

      const studentsData = await studentsRes.json();
      const communityData = await communityRes.json();
      const membersData = await membersRes.json();

      setCounts({
        students: studentsData.count,
        community: communityData.count,
        members: membersData.count,
      });
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Live Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Active Students</span>
          {loading ? <Skeleton className="h-6 w-12" /> : <span className="font-bold">{counts.students ?? 'N/A'}</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Community Online</span>
          {loading ? <Skeleton className="h-6 w-12" /> : <span className="font-bold">{counts.community ?? 'N/A'}</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Registered Members</span>
          {loading ? <Skeleton className="h-6 w-12" /> : <span className="font-bold">{counts.members ?? 'N/A'}</span>}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default LoginInfo;