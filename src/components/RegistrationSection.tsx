import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  college: z.string().min(2, 'College name is required').max(200),
  department: z.string().min(2, 'Department is required').max(100),
  year: z.string().min(1, 'Year is required'),
  roll: z.string().min(1, 'Roll number is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  event: z.string().min(1, 'Please select an event'),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const events = [
  'Build-A-Thon',
  'Bug Smash',
  'Paper Presentation',
  'Gaming',
  'Ctrl + Quiz',
  'Code Hunt: Word Edition',
  'Think & Link',
  'Fun Games',
];

const RegistrationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

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

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: RegistrationForm) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbz5DeFPCeH8nODa6VI9Sq0-VUlD-V4HiTRe-IxBQOOLpAPgx6BmeSAK-PD3HYax7v9f/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      // Since no-cors mode doesn't give us response data, we assume success
      setStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 bg-input border border-border rounded-lg
    text-foreground placeholder:text-muted-foreground
    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
    transition-all duration-300
  `;

  const labelClasses = 'block text-sm font-medium text-foreground mb-2';

  return (
    <section
      ref={sectionRef}
      id="registration"
      className="relative py-20 md:py-32 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="neon-text-cyan">Register Now</span>
        </h2>
        
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card p-6 md:p-8 space-y-6 neon-border-cyan"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={inputClasses}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          
          {/* College */}
          <div>
            <label htmlFor="college" className={labelClasses}>
              College Name
            </label>
            <input
              id="college"
              type="text"
              placeholder="Enter your college name"
              className={inputClasses}
              {...register('college')}
            />
            {errors.college && (
              <p className="mt-1 text-sm text-destructive">{errors.college.message}</p>
            )}
          </div>
          
          {/* Department and Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="department" className={labelClasses}>
                Department
              </label>
              <input
                id="department"
                type="text"
                placeholder="e.g., Computer Science"
                className={inputClasses}
                {...register('department')}
              />
              {errors.department && (
                <p className="mt-1 text-sm text-destructive">{errors.department.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="year" className={labelClasses}>
                Year
              </label>
              <select id="year" className={inputClasses} {...register('year')}>
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              {errors.year && (
                <p className="mt-1 text-sm text-destructive">{errors.year.message}</p>
              )}
            </div>
          </div>
          
          {/* Roll Number */}
          <div>
            <label htmlFor="roll" className={labelClasses}>
              Roll Number
            </label>
            <input
              id="roll"
              type="text"
              placeholder="Enter your roll number"
              className={inputClasses}
              {...register('roll')}
            />
            {errors.roll && (
              <p className="mt-1 text-sm text-destructive">{errors.roll.message}</p>
            )}
          </div>
          
          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className={inputClasses}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="10-digit number"
                className={inputClasses}
                {...register('phone')}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>
          
          {/* Event Selection */}
          <div>
            <label htmlFor="event" className={labelClasses}>
              Select Event
            </label>
            <select id="event" className={inputClasses} {...register('event')}>
              <option value="">Choose an event</option>
              {events.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
            {errors.event && (
              <p className="mt-1 text-sm text-destructive">{errors.event.message}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 font-display text-lg font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>
          
          {/* Status Messages */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-accent/20 border border-accent rounded-lg text-accent">
              <CheckCircle className="w-5 h-5" />
              <span>Registration successful! We'll see you at TECHNOVA 2026.</span>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex items-center gap-2 p-4 bg-destructive/20 border border-destructive rounded-lg text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegistrationSection;
