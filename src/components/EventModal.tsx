import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface EventModalProps {
  event: {
    title: string;
    icon: string;
    description: string;
    rules: string[];
  } | null;
  onClose: () => void;
}

const EventModal = ({ event, onClose }: EventModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (event && modalRef.current && contentRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [event]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      const tl = gsap.timeline({
        onComplete: onClose,
      });
      tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
      }).to(
        modalRef.current,
        { opacity: 0, duration: 0.2 },
        '-=0.1'
      );
    } else {
      onClose();
    }
  };

  if (!event) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      {/* Modal content */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card border border-primary/50 p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto neon-glow-cyan"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors group"
        >
          <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
        
        {/* Event icon and title */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{event.icon}</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold neon-text-cyan">
            {event.title}
          </h2>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-secondary mb-2">
            About
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>
        
        {/* Rules */}
        <div>
          <h3 className="font-display text-lg font-semibold text-secondary mb-3">
            Rules & Regulations
          </h3>
          <ul className="space-y-2">
            {event.rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="w-2 h-2 mt-2 rounded-full bg-accent flex-shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Register button */}
        <button
          onClick={() => {
            handleClose();
            setTimeout(() => {
              document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
            }, 400);
          }}
          className="w-full mt-8 py-3 font-display font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300"
        >
          Register for this Event
        </button>
      </div>
    </div>
  );
};

export default EventModal;
