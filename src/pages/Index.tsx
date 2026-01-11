import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import CoordinatorsSection from '@/components/CoordinatorsSection';
import RegistrationSection from '@/components/RegistrationSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <EventsSection />
        <CoordinatorsSection />
        <RegistrationSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
