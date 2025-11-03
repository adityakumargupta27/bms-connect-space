import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add trail particles
      if (Math.random() > 0.7) {
        const newTrail = {
          x: e.clientX,
          y: e.clientY,
          id: trailId++,
        };
        setTrails((prev) => [...prev.slice(-8), newTrail]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="custom-cursor fixed w-6 h-6 rounded-full border-2 border-primary pointer-events-none transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          boxShadow: '0 0 20px hsl(217 91% 60% / 0.6)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-primary opacity-30 animate-pulse-glow" />
      </div>

      {/* Trail particles */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="custom-cursor fixed w-2 h-2 rounded-full bg-primary pointer-events-none animate-fade-out"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.6,
            boxShadow: '0 0 10px hsl(217 91% 60% / 0.8)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
