import { ArrowLeft, Briefcase, Download, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingCard from '@/components/FloatingCard';
import StarBackground from '@/components/StarBackground';

const resources = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    description: 'Complete lecture notes and practice problems',
    type: 'PDF',
    subject: 'Computer Science',
    downloads: 234,
  },
  {
    id: 2,
    title: 'Calculus Study Guide',
    description: 'Comprehensive formulas and solved examples',
    type: 'PDF',
    subject: 'Mathematics',
    downloads: 189,
  },
  {
    id: 3,
    title: 'Physics Lab Manual',
    description: 'Experiment procedures and observations',
    type: 'PDF',
    subject: 'Physics',
    downloads: 156,
  },
  {
    id: 4,
    title: 'English Literature Notes',
    description: 'Character analysis and themes breakdown',
    type: 'PDF',
    subject: 'English',
    downloads: 143,
  },
];

const StudyCorner = () => {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Study Corner</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Academic resources and study materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
          {resources.map((resource, index) => (
            <FloatingCard key={resource.id} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="px-2 py-1 bg-background/50 text-primary text-xs rounded">
                      {resource.subject}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-foreground/70 mb-3 text-sm">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground/50">
                      {resource.downloads} downloads
                    </span>
                    <Button
                      size="sm"
                      className="bg-primary/20 hover:bg-primary text-foreground hover:text-white border border-primary/30"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
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

export default StudyCorner;
