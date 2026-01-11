import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic - set to a future date
  useEffect(() => {
    const targetDate = new Date('2026-03-15T09:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          countdownRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="glass-card p-4 md:p-6 text-center min-w-[70px] md:min-w-[90px] neon-border-cyan">
      <div className="text-2xl md:text-4xl font-display font-bold neon-text-cyan">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 pt-24"
    >
      <div className="text-center z-10 max-w-5xl mx-auto flex flex-col items-center">
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-wider"
        >
          <span className="neon-text-cyan">TECH</span>
          <span className="neon-text-magenta">NOVA</span>
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 neon-text-lime">
            2026
          </span>
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          "Where Innovation Meets Imagination"
        </p>
        
        <div
          ref={countdownRef}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        >
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
        
        <button
          ref={ctaRef}
          onClick={scrollToRegistration}
          className="relative px-10 py-4 font-display text-lg font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-lg animate-pulse-neon transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_hsl(var(--neon-cyan)/0.6)]"
        >
          <span className="relative z-10">Register Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300" />
        </button>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
