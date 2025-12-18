import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FloatingCard = ({ children, className, delay = 0 }: FloatingCardProps) => {

  return (
    <div
      className={cn(
        "relative backdrop-blur-md bg-card/50 border border-primary/20 rounded-xl p-6",
        "hover:border-primary/50 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.3)]",
        "transition-all duration-500",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default FloatingCard;
