import { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface EventCardProps {
  title: string;
  icon: string;
  index: number;
  onClick: () => void;
}

const EventCard = ({ title, icon, index, onClick }: EventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const glowColors = [
    'hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)]',
    'hover:shadow-[0_0_30px_hsl(var(--neon-magenta)/0.5)]',
    'hover:shadow-[0_0_30px_hsl(var(--neon-lime)/0.5)]',
    'hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.5)]',
  ];

  const borderColors = [
    'border-neon-cyan/30 hover:border-neon-cyan',
    'border-neon-magenta/30 hover:border-neon-magenta',
    'border-neon-lime/30 hover:border-neon-lime',
    'border-neon-purple/30 hover:border-neon-purple',
  ];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`
        event-card glass-card p-6 cursor-pointer
        border transition-all duration-300
        ${borderColors[index % 4]}
        ${glowColors[index % 4]}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-display text-lg font-bold text-foreground">
        {title}
      </h3>
      <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
    </div>
  );
};

export default EventCard;
