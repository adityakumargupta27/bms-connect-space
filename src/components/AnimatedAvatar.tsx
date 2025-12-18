import React, { useRef, useEffect } from 'react';

interface AnimatedAvatarProps {
  className?: string;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const particleCount = 20;
    const canvasSize = 80;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const mouse = {
      x: -100,
      y: -100,
      radius: 50
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -100;
      mouse.y = -100;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(11, 25, 61, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const forceDirectionX = distance !== 0 ? dx / distance : 0;
        const forceDirectionY = distance !== 0 ? dy / distance : 0;

        const force = (mouse.radius - distance) / mouse.radius;

        let directionX = 0;
        let directionY = 0;

        if (distance < mouse.radius) {
          directionX = forceDirectionX * force * 2;
          directionY = forceDirectionY * force * 2;
        }

        p.x += directionX + p.vx;
        p.y += directionY + p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default AnimatedAvatar;
