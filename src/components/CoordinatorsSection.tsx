import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Coordinator {
  name: string;
  role: string;
  image: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

const coordinators: Coordinator[] = [
  {
    name: 'Alex Chen',
    role: 'Event Head',
    image: 'https://i.pravatar.cc/300?img=11',
    socials: { instagram: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Priya Sharma',
    role: 'Technical Lead',
    image: 'https://i.pravatar.cc/300?img=5',
    socials: { instagram: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'Marcus Johnson',
    role: 'Creative Director',
    image: 'https://i.pravatar.cc/300?img=12',
    socials: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Sarah Williams',
    role: 'Sponsorship Head',
    image: 'https://i.pravatar.cc/300?img=9',
    socials: { instagram: '#', linkedin: '#', github: '#' },
  },
  {
    name: 'David Park',
    role: 'Logistics Manager',
    image: 'https://i.pravatar.cc/300?img=13',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Emma Rodriguez',
    role: 'PR & Marketing',
    image: 'https://i.pravatar.cc/300?img=16',
    socials: { instagram: '#', linkedin: '#' },
  },
];

const CoordinatorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.coordinator-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateY: 20 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="coordinators"
      className="relative py-20 md:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="neon-text-lime">Meet the Team</span>
        </h2>
        
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {coordinators.map((coordinator, index) => (
            <div
              key={coordinator.name}
              className="coordinator-card glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Profile image */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-[3px] animate-glow-pulse">
                  <div className="w-full h-full rounded-full overflow-hidden bg-card">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Name and role */}
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                {coordinator.name}
              </h3>
              <p className="text-secondary text-sm font-medium mb-4">
                {coordinator.role}
              </p>
              
              {/* Social links */}
              <div className="flex justify-center gap-3">
                {coordinator.socials.instagram && (
                  <a
                    href={coordinator.socials.instagram}
                    className="p-2 rounded-full bg-muted/50 hover:bg-secondary/20 hover:text-secondary transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {coordinator.socials.linkedin && (
                  <a
                    href={coordinator.socials.linkedin}
                    className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {coordinator.socials.github && (
                  <a
                    href={coordinator.socials.github}
                    className="p-2 rounded-full bg-muted/50 hover:bg-accent/20 hover:text-accent transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                style={{ 
                  boxShadow: `0 0 30px hsl(var(--neon-${['cyan', 'magenta', 'lime'][index % 3]}) / 0.3)`
                }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
