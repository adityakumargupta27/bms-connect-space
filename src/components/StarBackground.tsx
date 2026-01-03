import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface Connection {
  from: number;
  to: number;
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    
    const starCount = 150;
    const stars: Star[] = [];
    const connections: Connection[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    
    const maxDistance = 150;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          connections.push({ from: i, to: j });
        }
      }
    }

    
    let frame = 0;
    const animate = () => {
      frame++;
      ctx.fillStyle = '#0b193d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      
      connections.forEach((conn) => {
        const star1 = stars[conn.from];
        const star2 = stars[conn.to];
        const dx = star1.x - star2.x;
        const dy = star1.y - star2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const opacity = (1 - distance / maxDistance) * 0.3;

        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.strokeStyle = `rgba(99, 179, 237, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      
      stars.forEach((star, index) => {
        const pulseOffset = Math.sin((frame + index * 10) / 60) * 0.2;
        const currentOpacity = star.opacity + pulseOffset;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        
        if (star.size > 1.5) {
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 4
          );
          gradient.addColorStop(0, `rgba(99, 179, 237, ${currentOpacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(99, 179, 237, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(
            star.x - star.size * 4,
            star.y - star.size * 4,
            star.size * 8,
            star.size * 8
          );
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default StarBackground;