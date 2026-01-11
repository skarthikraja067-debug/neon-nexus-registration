import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventCard from './EventCard';
import EventModal from './EventModal';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  title: string;
  icon: string;
  description: string;
  rules: string[];
  sound?: string;
}

const events: Event[] = [
  {
    title: 'Build-A-Thon',
    icon: '🔨',
    description: 'A 24-hour hackathon where teams build innovative solutions from scratch. Push your limits and create something extraordinary with cutting-edge technology.',
    rules: [
      'Teams of 2-4 members allowed',
      'All code must be written during the event',
      'Use of open-source libraries permitted',
      'Projects will be judged on innovation, functionality, and presentation',
      'Bring your own laptops and equipment',
    ],
    sound: 'tech',
  },
  {
    title: 'Bug Smash',
    icon: '🐛',
    description: 'Hunt down bugs in complex codebases faster than anyone else. Test your debugging skills under pressure in this thrilling competition.',
    rules: [
      'Individual participation only',
      'Multiple rounds of increasing difficulty',
      'Languages: Python, JavaScript, Java, C++',
      'Time limit: 90 minutes per round',
      'No external help or resources allowed',
    ],
    sound: 'glitch',
  },
  {
    title: 'Paper Presentation',
    icon: '📄',
    description: 'Present your research papers and innovative ideas to a panel of industry experts and academia professionals.',
    rules: [
      'Teams of 1-3 members',
      'Paper must be original and unpublished',
      'Presentation time: 10 minutes + Q&A',
      'Topics: AI, ML, Cybersecurity, IoT, Cloud Computing',
      'Submit abstract 2 weeks before the event',
    ],
    sound: 'paper',
  },
  {
    title: 'Gaming',
    icon: '🎮',
    description: 'Battle it out in popular competitive games. Show off your gaming prowess and claim the champion title.',
    rules: [
      'Games: Valorant, CS2, FIFA, Rocket League',
      'Team and solo events available',
      'Tournament format: Double elimination',
      'Players must bring their own peripherals',
      'Fair play policy strictly enforced',
    ],
    sound: 'gaming',
  },
  {
    title: 'Ctrl + Quiz',
    icon: '🧠',
    description: 'The ultimate tech quiz testing your knowledge across programming, hardware, software, and tech history.',
    rules: [
      'Teams of 2-3 members',
      'Multiple rounds: Written, Buzzer, Rapid Fire',
      'Topics span all areas of technology',
      'Tie-breaker rounds if needed',
      'No electronic devices allowed during quiz',
    ],
    sound: 'quiz',
  },
  {
    title: 'Code Hunt: Word Edition',
    icon: '🔍',
    description: 'A unique treasure hunt combining coding challenges with word puzzles. Decode, solve, and hunt your way to victory.',
    rules: [
      'Teams of 2-4 members',
      'Clues combine code snippets and word puzzles',
      'Physical and digital challenges included',
      'Time limit: 3 hours',
      'First team to complete all challenges wins',
    ],
    sound: 'hunt',
  },
  {
    title: 'Think & Link',
    icon: '🔗',
    description: 'A networking and problem-solving event where you connect ideas, people, and solutions in creative ways.',
    rules: [
      'Individual participation',
      'Creative thinking challenges',
      'Multiple mini-events and puzzles',
      'Collaboration encouraged',
      'Points based on innovation and speed',
    ],
    sound: 'link',
  },
  {
    title: 'Fun Games',
    icon: '🎯',
    description: 'Take a break from intense competitions with fun tech-themed games and activities for everyone.',
    rules: [
      'Open to all participants',
      'Casual and fun atmosphere',
      'Mini games and challenges',
      'Prizes for winners',
      'Great for networking and relaxation',
    ],
    sound: 'fun',
  },
];

const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.event-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
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

  const handleEventClick = (event: Event) => {
    // Play sound effect
    const soundMap: Record<string, string> = {
      gaming: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
      glitch: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
      tech: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    };
    
    const soundUrl = soundMap[event.sound || ''];
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.volume = 0.3;
      audio.play().catch(() => {/* Audio play blocked by browser */});
    }
    
    setSelectedEvent(event);
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-20 md:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="neon-text-magenta">Events</span>
        </h2>
        
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {events.map((event, index) => (
            <EventCard
              key={event.title}
              title={event.title}
              icon={event.icon}
              index={index}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
      </div>
      
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

export default EventsSection;
