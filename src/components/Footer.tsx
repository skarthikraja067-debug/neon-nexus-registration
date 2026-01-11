import { Instagram, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';
const Footer = () => {
  const socialLinks = [{
    icon: Instagram,
    href: '#',
    label: 'Instagram'
  }, {
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: Youtube,
    href: '#',
    label: 'YouTube'
  }, {
    icon: Mail,
    href: 'mailto:technova@college.edu',
    label: 'Email'
  }];
  return <footer className="relative py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Logo and tagline */}
        <div className="text-center mb-8">
          <h3 className="font-display text-3xl font-bold mb-2">
            <span className="neon-text-cyan">TECH</span>
            <span className="neon-text-magenta">NOVA</span>
            <span className="neon-text-lime"> 2026</span>
          </h3>
          <p className="text-muted-foreground">
            Where Innovation Meets Imagination
          </p>
        </div>
        
        {/* Social links */}
        
        
        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a href="#events" className="text-muted-foreground hover:text-primary transition-colors">
            Events
          </a>
          <a href="#coordinators" className="text-muted-foreground hover:text-primary transition-colors">
            Team
          </a>
          <a href="#registration" className="text-muted-foreground hover:text-primary transition-colors">
            Register
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2026 TECHNOVA. All rights reserved.</p>
          <p className="mt-1 text-xs">
            Designed with 💜 for the future of technology
          </p>
        </div>
        
        {/* Decorative line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </div>
    </footer>;
};
export default Footer;