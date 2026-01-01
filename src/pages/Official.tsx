import { useEffect, useState } from 'react';
import { ArrowLeft, Megaphone, Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Timestamp | Date | string;
  author: string;
  pinned: boolean;
}

const Official = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsCol = collection(db, "announcements");
        const q = query(announcementsCol, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const announcementsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Announcement[];
        setAnnouncements(announcementsList);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatDate = (date: Timestamp | Date | string) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Megaphone className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Official Announcements</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Important updates from the administration
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {announcements.map((announcement, index) => (
            <FloatingCard key={announcement.id} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                {announcement.pinned && (
                  <Pin className="h-5 w-5 text-primary flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-foreground/70 mb-3">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-foreground/50">
                    <span>{announcement.author}</span>
                    <span>•</span>
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Official;
