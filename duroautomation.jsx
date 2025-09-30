import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, Zap, Wifi, Users, Compass, Code, Send, Calendar, Menu, X } from 'lucide-react';

// --- Custom Hook for Scroll Animation (Simulating Framer Motion) ---
// This hook detects when an element enters the viewport and triggers a 'visible' state.
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Optionally, stop observing after the first intersection
        observer.unobserve(entry.target);
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

// --- Animated Section Component ---
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${animationClasses} ${className}`}
    >
      {children}
    </div>
  );
};


// --- Main Application Component ---
const App = () => {
  const ACCENT_COLOR = '#0071E3'; // Apple Blue
  const TEXT_COLOR = '#F5F5F7'; // Near White
  const BG_COLOR = '#000000'; // Pure Black
  const CARD_BG = '#111111'; // Dark Card BG

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setSubmissionStatus(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      // Simulation of a successful API call
      console.log('Form Submitted:', formState);
      setSubmissionStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmissionStatus(null), 5000);
    } else {
      setSubmissionStatus('error');
    }
  };

  const navLinks = [
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Case Studies', href: '#case-studies' },
    { title: 'Contact', href: '#contact' },
  ];

  const services = [
    { icon: Bot, title: 'Industrial Automation', description: 'Transform operations with smart robotics, streamlined production lines, and predictive maintenance systems.' },
    { icon: Zap, title: 'AI Integration & Analytics', description: 'Leverage machine learning for quality control, demand forecasting, and data-driven operational decision-making.' },
    { icon: Wifi, title: 'IoT Connectivity', description: 'Implement a comprehensive network of sensors and edge devices for real-time monitoring and control of assets across your enterprise.' },
  ];

  const caseStudies = [
    { title: 'Precision Manufacturing Upgrade', description: 'Implemented a closed-loop system, reducing defects by 45%.', image: 'https://placehold.co/600x400/0071E3/F5F5F7?text=Manufac\n+uring', stat1: '45%', label1: 'Defect Reduction', stat2: '20%', label2: 'Efficiency Boost' },
    { title: 'Supply Chain Optimization', description: 'Deployed AI-driven logistics, cutting delivery times significantly.', image: 'https://placehold.co/600x400/0071E3/F5F5F7?text=Supply\n+Chain', stat1: '1.2M', label1: 'Annual Savings', stat2: '99.8%', label2: 'Uptime Achieved' },
    { title: 'Smart Energy Management', description: 'Connected facility systems, achieving measurable energy savings.', image: 'https://placehold.co/600x400/0071E3/F5F5F7?text=Energy\n+Grid', stat1: '30%', label1: 'Energy Reduction', stat2: '3ms', label2: 'Latency Rate' },
  ];

  const testimonials = [
    { quote: 'Duro Automation delivered a seamless PLC upgrade. Their precision and focus on uptime were unmatched.', name: 'Sarah Chen', title: 'CTO, GlobalTech Robotics' },
    { quote: 'The AI integration they designed instantly improved our forecasting accuracy and reduced material waste.', name: 'Mark Jansen', title: 'Director of Operations, AeroSpace Inc.' },
    { quote: 'True partners in innovation. Their IoT platform gave us complete visibility into our remote assets for the first time.', name: 'David Lee', title: 'CEO, InfraSolutions' },
  ];

  // Utility to create smooth shadows
  const softShadow = 'shadow-2xl shadow-black/50';

  return (
    <div style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR, fontFamily: 'Inter, "SF Pro Display", sans-serif' }} className="min-h-screen antialiased">
      
      {/* --- SEO Metadata (Simulated) --- */}
      {/* In a real environment, this would be in index.html or a dedicated library */}
      <meta name="description" content="Duro Automation: Leading cloud-native PLM and industrial automation solutions for modern hardware and manufacturing." />
      <meta name="keywords" content="automation, PLM, industrial, AI, IoT, manufacturing, robotics" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* --- Header & Navigation --- */}
      <header className={`sticky top-0 z-40 backdrop-blur-md bg-black/80 ${softShadow}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-2xl font-bold tracking-tight" style={{ color: TEXT_COLOR }}>
              DURO<span style={{ color: ACCENT_COLOR }}>.</span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a key={link.title} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-300" style={{ color: TEXT_COLOR }}>
                  {link.title}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR, boxShadow: `0 4px 15px ${ACCENT_COLOR}40` }}
              >
                Start Project
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} color={TEXT_COLOR} /> : <Menu size={24} color={TEXT_COLOR} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0'}`}
          style={{ backgroundColor: CARD_BG }}
        >
          <nav className="flex flex-col space-y-3 px-6">
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-2 border-b border-gray-800 last:border-b-0 hover:text-white transition-colors"
                style={{ color: TEXT_COLOR }}
              >
                {link.title}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-5 py-2 text-sm font-semibold text-center rounded-full transition-all duration-300"
              style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR }}
            >
              Start Project
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* --- 1. Hero Section --- */}
        <section 
          id="hero" 
          className="relative overflow-hidden pt-32 pb-48 md:pt-48 md:pb-64 text-center min-h-screen flex items-center"
        >
          {/* Animated Gradient Background Effect */}
          <div className="absolute inset-0 z-0 opacity-70">
            <div className="absolute w-full h-full bg-gradient-to-br from-black via-[#000000] to-gray-900 animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-radial-gradient-hero mix-blend-screen opacity-50"></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-6 z-10">
            <AnimatedSection>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight lg:leading-snug" style={{ color: TEXT_COLOR }}>
                The Future of <span style={{ color: ACCENT_COLOR }}>Automation</span> is <span className="underline decoration-wavy decoration-2" style={{ textDecorationColor: ACCENT_COLOR }}>Intelligent</span>.
              </h1>
            </AnimatedSection>
            
            <AnimatedSection className="delay-150">
              <p className="text-lg md:text-xl lg:text-2xl font-light opacity-80 mb-10 max-w-3xl mx-auto" style={{ color: TEXT_COLOR }}>
                Cloud-native Product Lifecycle Management (PLM) and AI-driven solutions built for the speed and complexity of modern hardware development.
              </p>
            </AnimatedSection>

            <AnimatedSection className="delay-300">
              <div className="flex justify-center space-x-4">
                <a 
                  href="#services" 
                  className="px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR, boxShadow: `0 6px 20px ${ACCENT_COLOR}60` }}
                >
                  Explore Solutions
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-white"
                  style={{ backgroundColor: 'transparent', color: TEXT_COLOR }}
                >
                  Book a Demo
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* --- 2. About Us Section (Mission) --- */}
        <section id="about" className="py-24 md:py-32 border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: TEXT_COLOR }}>
                Our Mission: Revolutionize Hardware Development.
              </h2>
              <p className="text-lg opacity-80 mb-4">
                We bridge the gap between engineering and manufacturing. Our cloud-native platform centralizes part data, manages change orders, and connects your entire tech stack—from CAD to ERP. We automate the administration so your engineers can focus on breakthrough innovation.
              </p>
              <p className="text-lg font-medium" style={{ color: ACCENT_COLOR }}>
                Focus on innovation, not administration.
              </p>
            </AnimatedSection>

            {/* Clean Visual Placeholder */}
            <AnimatedSection className="delay-150">
              <div className="relative p-8 rounded-3xl" style={{ backgroundColor: CARD_BG, boxShadow: `0 10px 40px ${ACCENT_COLOR}20` }}>
                <div className="flex justify-center space-x-6 text-gray-500">
                  <Code size={48} className="text-gray-500" />
                  <Users size={48} className="text-gray-500" />
                  <Compass size={48} className="text-gray-500" />
                </div>
                <div className="mt-8 text-center">
                  <p className="text-3xl font-extrabold" style={{ color: ACCENT_COLOR }}>Digital Thread</p>
                  <p className="text-base mt-2 opacity-70">Unified data integrity across the entire product lifecycle.</p>
                </div>
                <div className="absolute -bottom-4 -right-4 p-4 rounded-full" style={{ backgroundColor: ACCENT_COLOR }}>
                  <Zap size={24} color={TEXT_COLOR} />
                </div>
              </div>
            </AnimatedSection>
            
          </div>
        </section>

        {/* --- 3. Services Section --- */}
        <section id="services" className="py-24 md:py-32 border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: TEXT_COLOR }}>
                Our Core Capabilities
              </h2>
              <p className="text-xl mt-3 opacity-70">
                Building agile, resilient, and fully connected systems for a competitive advantage.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={index} className={`delay-${150 * (index + 1)}`}>
                  <div 
                    className="p-8 h-full rounded-2xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-800"
                    style={{ backgroundColor: CARD_BG, boxShadow: `0 8px 30px ${BG_COLOR}` }}
                  >
                    <service.icon size={36} style={{ color: ACCENT_COLOR }} className="mb-4" />
                    <h3 className="text-xl font-semibold mb-3" style={{ color: TEXT_COLOR }}>{service.title}</h3>
                    <p className="opacity-80 text-sm">{service.description}</p>
                    <a href="#contact" className="mt-4 inline-flex items-center text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                        Learn More &rarr;
                    </a>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. Case Studies Section (Simulated Carousel) --- */}
        <section id="case-studies" className="py-24 md:py-32 border-t border-gray-900 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: TEXT_COLOR }}>
                Proven Results
              </h2>
              <p className="text-xl mt-3 opacity-70">
                See the quantifiable impact of Duro's intelligent automation solutions.
              </p>
            </AnimatedSection>

            {/* Simulated Carousel (Scrollable on mobile) */}
            <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-4 lg:grid lg:grid-cols-3 lg:space-x-0">
              {caseStudies.map((study, index) => (
                <AnimatedSection key={index} className={`snap-center flex-shrink-0 w-11/12 sm:w-1/2 lg:w-full delay-${150 * (index + 1)}`}>
                  <div className="rounded-3xl p-6 h-full flex flex-col justify-between border border-gray-800 transition-shadow duration-500 hover:shadow-lg" style={{ backgroundColor: CARD_BG, boxShadow: softShadow }}>
                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]" 
                        onError={(e) => { e.target.onerror = null; e.target.src = study.image; }} // Placeholder fallback is the image itself
                      />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2" style={{ color: ACCENT_COLOR }}>{study.title}</h3>
                    <p className="opacity-80 mb-6">{study.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                      <div className="text-center">
                        <p className="text-4xl font-extrabold leading-none" style={{ color: TEXT_COLOR }}>{study.stat1}</p>
                        <p className="text-xs font-medium uppercase opacity-60 mt-1">{study.label1}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-extrabold leading-none" style={{ color: TEXT_COLOR }}>{study.stat2}</p>
                        <p className="text-xs font-medium uppercase opacity-60 mt-1">{study.label2}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <p className="text-center text-xs mt-8 opacity-50 lg:hidden">Swipe to view more case studies.</p>
          </div>
        </section>

        {/* --- 5. Testimonials Section --- */}
        <section className="py-24 md:py-32 border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: TEXT_COLOR }}>
                What Our Clients Say
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={index} className={`delay-${150 * (index + 1)}`}>
                  <div className="p-8 rounded-2xl h-full flex flex-col justify-between border border-gray-800" style={{ backgroundColor: CARD_BG, boxShadow: softShadow }}>
                    <p className="text-xl italic font-light leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold" style={{ color: ACCENT_COLOR }}>{testimonial.name}</p>
                      <p className="text-sm opacity-60">{testimonial.title}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. Contact & CTA Section --- */}
        <section id="contact" className="py-24 md:py-32 border-y border-gray-900" style={{ backgroundColor: CARD_BG }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: TEXT_COLOR }}>
                Ready to Automate Your Edge?
              </h2>
              <p className="text-xl mt-3 opacity-70">
                Get in touch or book a no-obligation demo to see our platform in action.
              </p>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <AnimatedSection>
                <div className="p-8 rounded-2xl border border-gray-800 h-full flex flex-col justify-center" style={{ backgroundColor: BG_COLOR, boxShadow: softShadow }}>
                  <h3 className="text-2xl font-semibold mb-6" style={{ color: ACCENT_COLOR }}>Send Us a Message</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formState.name}
                      onChange={handleFormChange}
                      className="w-full p-3 rounded-lg border bg-gray-900 text-gray-50 border-gray-800 focus:border-[#0091ff] focus:ring focus:ring-[#0071E3] focus:ring-opacity-50 transition-all"
                      required
                    />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formState.email}
                      onChange={handleFormChange}
                      className="w-full p-3 rounded-lg border bg-gray-900 text-gray-50 border-gray-800 focus:border-[#0091ff] focus:ring focus:ring-[#0071E3] focus:ring-opacity-50 transition-all"
                      required
                    />
                    <textarea 
                      name="message" 
                      placeholder="Your Message / Project Details" 
                      rows="4"
                      value={formState.message}
                      onChange={handleFormChange}
                      className="w-full p-3 rounded-lg border bg-gray-900 text-gray-50 border-gray-800 focus:border-[#0091ff] focus:ring focus:ring-[#0071E3] focus:ring-opacity-50 transition-all"
                      required
                    ></textarea>
                    
                    <button 
                      type="submit" 
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
                      style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR, boxShadow: `0 4px 15px ${ACCENT_COLOR}40` }}
                    >
                      <Send size={18} />
                      <span>Send Inquiry</span>
                    </button>
                    
                    {submissionStatus === 'success' && (
                      <p className="text-green-500 text-center font-medium">Thank you! We will be in touch shortly.</p>
                    )}
                    {submissionStatus === 'error' && (
                      <p className="text-red-500 text-center font-medium">Please fill out all fields before submitting.</p>
                    )}
                  </form>
                </div>
              </AnimatedSection>
              
              {/* Book a Demo (Calendly Simulation) */}
              <AnimatedSection className="delay-150">
                <div className="p-8 rounded-2xl border border-gray-800 h-full flex flex-col items-center justify-center text-center" style={{ backgroundColor: BG_COLOR, boxShadow: softShadow }}>
                  <Calendar size={48} style={{ color: ACCENT_COLOR }} className="mb-4" />
                  <h3 className="text-2xl font-semibold mb-3" style={{ color: ACCENT_COLOR }}>Book a Live Demo</h3>
                  <p className="opacity-80 mb-6 max-w-sm">
                    Schedule 30 minutes with our solutions architect to explore a custom workflow for your business.
                  </p>
                  <a 
                    href="https://calendly.com/duro-automation-demo" // Simulated Calendly link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: TEXT_COLOR, color: BG_COLOR, boxShadow: `0 6px 20px rgba(255, 255, 255, 0.2)` }}
                  >
                    <Calendar size={18} />
                    <span>Schedule Now</span>
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* --- 7. Footer --- */}
      <footer className="py-16 md:py-20 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Logo & Copyright */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="text-3xl font-bold tracking-tight mb-4 block" style={{ color: ACCENT_COLOR }}>
                DURO.
              </a>
              <p className="text-sm opacity-60">
                &copy; {new Date().getFullYear()} Duro Automation. <br /> All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: TEXT_COLOR }}>Solutions</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li><a href="#services" className="hover:text-white transition-colors">PLM Software</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">AI & Robotics</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">IoT Platform</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: TEXT_COLOR }}>Company</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: TEXT_COLOR }}>Contact</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li><p>San Francisco, CA 94107</p></li>
                <li><a href="mailto:info@duroautomation.com" className="hover:text-white transition-colors">info@duroautomation.com</a></li>
                <li><a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* --- Custom CSS for Apple Aesthetic & Animation --- */}
      <style>{`
        /* Custom Keyframe for subtle pulse effect on the gradient background */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s infinite ease-in-out;
        }

        /* Custom radial gradient for the hero section light spot */
        .bg-radial-gradient-hero {
          background-image: radial-gradient(circle at 50% 10%, ${ACCENT_COLOR} 0%, transparent 70%);
        }
        
        /* Apply smooth scrolling behavior */
        html {
            scroll-behavior: smooth;
        }

        /* Ensure smooth font rendering, similar to SF Pro Display */
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Scrollbar styling for a cleaner look on dark theme */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #333;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-track {
            background-color: #111;
        }
      `}</style>
    </div>
  );
};

export default App;
