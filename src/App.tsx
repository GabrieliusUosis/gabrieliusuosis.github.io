import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Cloud,
  Cpu,
  Send,
  Loader2,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  FileText,
  Terminal,
  ShieldCheck,
  Zap,
  Network,
  ChevronRight
} from 'lucide-react';

// ============================================================================
// PROJECT & PROFILE DATA
// ============================================================================

export interface ProjectDetail {
  id: string;
  title: string;
  category: 'systems' | 'compilers' | 'fullstack' | 'hackathon';
  badge: string;
  tagline: string;
  period: string;
  accent: 'sage' | 'terracotta' | 'sky' | 'amber';
  githubUrl: string;
  liveUrl?: string;
  techTags: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  architecture: string[];
  challenges: string[];
}

export const projectsData: ProjectDetail[] = [
  {
    id: 'ash-lang',
    title: 'ash-lang: DSL for Formal Models of Computation',
    category: 'compilers',
    badge: 'Final Year Project @ Loughborough',
    tagline:
      'A custom Domain-Specific Language for defining, validating, and simulating DFAs, NFAs, and Regular Expressions without boilerplate.',
    period: 'Sep 2026 - Present',
    accent: 'terracotta',
    githubUrl: 'https://github.com/GabrieliusUosis/ash-lang',
    techTags: ['Python', 'ANTLR4', 'Compiler Design', 'Semantic Analysis', 'Automata Theory', 'Pytest'],
    metrics: [
      { label: 'Frontend', value: 'ANTLR4 Grammar' },
      { label: 'Transition Lookup', value: 'O(1) Hash Table' },
      { label: 'Models Supported', value: 'DFA, NFA, Regex' },
      { label: 'Validation', value: 'Static Determinism' }
    ],
    overview:
      'Visual automata simulators are great for learning but lack scripting and version control, while general-purpose Python libraries require verbose nested dictionaries. ash-lang bridges that gap by making DFAs, NFAs, and Regular Expressions first-class syntax that can be statically checked, simulated, and exported to Graphviz DOT.',
    architecture: [
      'ANTLR4 Lexer & Parser (AutomataLexer.g4 / AutomataParser.g4): Tokenizes and parses .ash source files using a custom StrictErrorListener that reports exact line and column numbers on syntax errors.',
      'Semantic Analysis Pass (SemanticAnalyser.py): Walks the parse tree before runtime to catch duplicate states or symbols, undeclared start/accept states, invalid transitions, and DFA determinism violations.',
      'DFA Simulation Runtime (dfa.py): Compiles transitions into an O(1) lookup dictionary {(source, symbol): target} and supports step-by-step execution traces on input strings.',
      'Transformation & Export Pipeline: Designed around standard automata algorithms (Thompson’s Construction, Subset Construction, Hopcroft’s minimization) and DOT graph generation.'
    ],
    challenges: [
      'Built static semantic checks that verify DFA determinism (ensuring no state has duplicate outgoing transitions for the same symbol) before any simulation runs.',
      'Designed a clean, readable block grammar for state machines while keeping error messages clear and specific to the offending line.'
    ]
  },
  {
    id: 'pulse-lan',
    title: 'PulseLAN: Peer-to-Peer LAN Video Streaming & File Drop',
    category: 'systems',
    badge: 'Local Networking / WebRTC',
    tagline:
      'Browser-to-browser file transfer and real-time video streaming over local Wi-Fi using WebRTC DataChannels and a Service Worker.',
    period: 'Nov 2026',
    accent: 'sky',
    githubUrl: 'https://github.com/GabrieliusUosis/pulseLAN',
    techTags: ['JavaScript', 'WebRTC DataChannels', 'Node.js', 'Service Workers', 'HTTP 206', 'WebSockets'],
    metrics: [
      { label: 'Dependencies', value: '0 (Standard Lib)' },
      { label: 'Chunk Size', value: '64 KB Slices' },
      { label: 'File Size', value: '4GB+ Supported' },
      { label: 'Video Seeking', value: 'HTTP 206 Ranges' }
    ],
    overview:
      'A local-network file sharing and video streaming tool that transfers files directly between browsers over LAN without uploading anything to the cloud. Drop a large video file into one browser and another device on the same network can immediately stream and scrub through it.',
    architecture: [
      'Zero-Dependency Node.js Signaling Server: Uses built-in Node modules (http, crypto, os, fs) to handle RFC 6455 WebSocket handshakes and relay WebRTC SDP offers and ICE candidates. No file data touches the server.',
      'Service Worker HTTP 206 Streamer: Intercepts <video> requests to /p2p-stream/..., reads the HTTP Range: bytes=start-end header, and fetches the needed byte slices from the peer over WebRTC.',
      '64KB Slicing & Backpressure: Reads multi-gigabyte files on demand with File.slice() and pauses sending when channel.bufferedAmount exceeds 4MB, resuming on bufferedamountlow.'
    ],
    challenges: [
      'Prevented browser memory crashes on multi-gigabyte transfers by streaming 64KB slices on demand and respecting WebRTC buffer backpressure.',
      'Connected HTML5 video timeline scrubbing to asynchronous WebRTC data channels by translating HTTP 206 partial content requests inside a Service Worker.'
    ]
  },
  {
    id: 'project-management-dashboard',
    title: 'Full-Stack Project Management Dashboard',
    category: 'fullstack',
    badge: 'Academic Project @ Loughborough',
    tagline:
      'A full-stack project and task management web application built with React, Node.js, and PostgreSQL, hosted on Google Cloud.',
    period: 'Sep 2025 - Mar 2026',
    accent: 'sage',
    githubUrl: 'https://github.com/GabrieliusUosis',
    techTags: ['React', 'Node.js', 'PostgreSQL', 'Google Cloud Platform (GCP)', 'Linux VM', 'REST APIs'],
    metrics: [
      { label: 'REST Endpoints', value: '20+ Routes' },
      { label: 'Avg Query Time', value: '<100ms' },
      { label: 'Simulated Load', value: '500+ Users' },
      { label: 'Uptime on GCP', value: '99.99%' }
    ],
    overview:
      'A full-stack web application designed for managing team projects, tasks, and workflows. Built with a React frontend, a Node.js REST API, and a PostgreSQL database deployed on a Google Cloud Linux VM.',
    architecture: [
      'PostgreSQL Database on GCP: Configured and managed a 50GB PostgreSQL instance running on a scalable Linux VM on Google Cloud Platform.',
      'RESTful Backend API: Implemented 20+ endpoints in Node.js connecting the React interface with the database, keeping average query response times under 100ms.',
      'Concurrent Workload Testing: Structured queries and connection pooling to support a simulated workload of 500+ concurrent users.'
    ],
    challenges: [
      'Kept API response times under 100ms across 20+ endpoints by indexing foreign keys and optimizing SQL joins.',
      'Configured Linux VM process management and database backups on GCP to maintain reliable uptime.'
    ]
  },
  {
    id: 'edi-voice-tool',
    title: 'Real-Time Voice-Changing EDI Tool',
    category: 'hackathon',
    badge: 'Loughborough Hackathon — 2nd Place (of 15)',
    tagline:
      'Real-time voice modulation tool built to reduce unconscious bias during technical interviews using the ElevenLabs API.',
    period: 'Sep 2025 - Oct 2025',
    accent: 'amber',
    githubUrl: 'https://github.com/GabrieliusUosis/Included-Without-Limitations',
    techTags: ['Python', 'ElevenLabs API', 'Real-Time Audio', 'WebSockets'],
    metrics: [
      { label: 'Result', value: '2nd Place / 15 Teams' },
      { label: 'Audio Latency', value: '<200ms' },
      { label: 'Team Size', value: '4 Students' },
      { label: 'Integration', value: 'ElevenLabs API' }
    ],
    overview:
      'Built in a team of 4 at the Loughborough Hackathon, where we placed 2nd out of 15 teams. The tool transforms a candidate’s voice in real time during remote interviews so interviewers evaluate answers without demographic bias.',
    architecture: [
      'Audio Capture & Streaming: Captures live microphone input in small audio frames and streams them for processing.',
      'ElevenLabs Speech Transformation: Integrates the ElevenLabs API to convert speech in real time while keeping latency under 200ms.',
      'Interview Interface: Clean call interface allowing candidates and interviewers to speak naturally with minimal delay.'
    ],
    challenges: [
      'Tuned chunk sizes and streaming buffers to keep end-to-end voice transformation latency under 200ms so conversation felt natural.',
      'Coordinated API integration and audio playback across a team of 4 within a tight hackathon deadline.'
    ]
  },
  {
    id: 'meta-math-solver',
    title: 'Algorithmic Math Solver',
    category: 'hackathon',
    badge: 'Meta Hackathon UK — 3rd Place (of 20+)',
    tagline:
      'Python algorithms written to solve 15 complex mathematical and algorithmic problems under strict competition time limits.',
    period: 'Nov 2025 - Dec 2025',
    accent: 'terracotta',
    githubUrl: 'https://github.com/GabrieliusUosis',
    techTags: ['Python', 'Algorithms', 'Dynamic Programming', 'Combinatorics', 'Optimization'],
    metrics: [
      { label: 'Result', value: '3rd Place / 20+ Teams' },
      { label: 'Problems Solved', value: '15 Problems' },
      { label: 'Language', value: 'Python' },
      { label: 'Format', value: 'Timed Competition' }
    ],
    overview:
      'Competed at the Meta Hackathon in the UK against a cohort of 20+ teams, finishing in 3rd place by writing fast Python solutions to 15 difficult mathematical and algorithmic problems.',
    architecture: [
      'Algorithmic Problem Solving: Used dynamic programming, graph search, and number theory reductions to avoid brute-force timeouts.',
      'Runtime Optimization: Profiled bottlenecks and used efficient data structures in Python to stay within strict execution time limits.'
    ],
    challenges: [
      'Reduced exponential search spaces on large inputs so all 15 solutions finished within the judge time limits.',
      'Worked quickly under competition pressure to translate mathematical problem statements into working, tested Python code.'
    ]
  },
  {
    id: 'adapt-mobile',
    title: 'Adapt — Student Revision Mobile App',
    category: 'fullstack',
    badge: 'Software Internship',
    tagline:
      'Built core UI modules and interactive quiz features in JavaScript and React Native for a revision app with 10,000+ active users.',
    period: 'Feb 2020 - May 2020',
    accent: 'sage',
    githubUrl: 'https://github.com/GabrieliusUosis',
    techTags: ['JavaScript', 'React Native', 'Mobile UI', 'Git'],
    metrics: [
      { label: 'Active Users', value: '10,000+ Students' },
      { label: 'Stack', value: 'React Native & JS' },
      { label: 'Role', value: 'Software Intern' },
      { label: 'Location', value: 'London, UK' }
    ],
    overview:
      'Worked as a Software Intern at Adapt in London, building core UI screens and interactive quiz features for a mobile revision application used by over 10,000 GCSE and A-Level students.',
    architecture: [
      'React Native UI Modules: Built reusable cross-platform screens and components in JavaScript and React Native.',
      'Interactive Quiz Flows: Implemented quiz state handling, score summaries, and interactive revision cards.'
    ],
    challenges: [
      'Made sure UI transitions and quiz interactions stayed smooth across different iOS and Android screen sizes.',
      'Collaborated with the development team using Git to ship features to 10,000+ active student users.'
    ]
  }
];

export const skillsCategories = [
  {
    id: 'languages',
    name: 'Languages',
    description: 'Languages I use for coursework, side projects, and scripting',
    icon: Code2,
    skills: ['Python', 'Java', 'Kotlin', 'JavaScript', 'SQL', 'PHP', 'HTML / CSS']
  },
  {
    id: 'web-frameworks',
    name: 'Frameworks & Web',
    description: 'Frontend, backend, and real-time browser APIs',
    icon: Network,
    skills: ['React', 'React Native', 'Node.js', 'REST APIs', 'WebRTC', 'WebSockets', 'Service Workers']
  },
  {
    id: 'cloud-tools',
    name: 'Cloud, Databases & Tools',
    description: 'Database hosting, Linux environments, and version control',
    icon: Cloud,
    skills: ['PostgreSQL', 'Google Cloud Platform (GCP)', 'Linux', 'Git & GitHub', 'ANTLR4', 'Pytest']
  },
  {
    id: 'cs-topics',
    name: 'Computer Science Modules',
    description: 'Key areas covered at Loughborough University',
    icon: Cpu,
    skills: [
      'Software Engineering',
      'Algorithms Analysis',
      'Formal Methods',
      'Theory of Computation',
      'Distributed Systems',
      'Databases',
      'Cloud Computing',
      'Robotics'
    ]
  }
];

export const timelineEvents = [
  {
    id: 'loughborough',
    role: 'BSc (Hons) Computer Science',
    organization: 'Loughborough University',
    location: 'Loughborough, UK',
    period: 'Sep 2024 — Jun 2027',
    badge: 'Undergraduate Degree',
    summary:
      'Studying Computer Science. Relevant modules include Software Engineering, Algorithms Analysis, Cloud Computing, Formal Methods, Theory of Computation, Databases, Distributed Systems, and Robotics.',
    tags: ['Software Engineering', 'Algorithms Analysis', 'Formal Methods', 'Distributed Systems']
  },
  {
    id: 'meta-hackathon',
    role: 'Algorithmic Math Solver (3rd Place)',
    organization: 'Meta Hackathon',
    location: 'UK',
    period: 'Nov 2025 — Dec 2025',
    badge: '3rd Place / 20+ Teams',
    summary:
      'Wrote Python algorithms to solve 15 complex mathematical problems under strict time constraints, finishing 3rd against a cohort of 20+ teams.',
    tags: ['Python', 'Algorithms', 'Problem Solving']
  },
  {
    id: 'loughborough-hackathon',
    role: 'Voice-Changing EDI Tool (2nd Place)',
    organization: 'Loughborough Hackathon',
    location: 'Loughborough, UK',
    period: 'Sep 2025 — Oct 2025',
    badge: '2nd Place / 15 Teams',
    summary:
      'Designed a system in a team of 4 that lets users change their voice in real time to prevent bias during interviews. Integrated the ElevenLabs API with sub-200ms latency.',
    tags: ['ElevenLabs API', 'Python', 'Real-Time Audio']
  },
  {
    id: 'gordons',
    role: 'Waiter',
    organization: "Gordon's Wine Bar",
    location: 'London, UK',
    period: 'Sep 2022 — Present',
    badge: 'Part-Time Work',
    summary:
      'Manage high-volume service of 350+ covers per shift and process 400+ daily transactions across peak periods at London’s oldest wine bar.',
    tags: ['Teamwork', 'Fast-Paced Environment', 'Customer Service']
  },
  {
    id: 'adapt',
    role: 'Software Intern',
    organization: 'Adapt (App Development)',
    location: 'London, UK',
    period: 'Feb 2020 — May 2020',
    badge: '10,000+ Active Users',
    summary:
      'Programmed core UI modules and interactive quiz features for a student revision mobile application using JavaScript and React Native, supporting over 10,000 active users.',
    tags: ['JavaScript', 'React Native', 'Mobile UI']
  },
  {
    id: 'moj',
    role: 'Work Experience',
    organization: 'Ministry of Justice',
    location: 'London, UK',
    period: 'Sep 2019 — Feb 2020',
    badge: 'Public Sector',
    summary:
      'Evaluated internal HR frameworks affecting 500+ department staff and delivered policy recommendations resulting in a 15% increase in accessibility compliance. Ran 3 cross-department workshops for 200+ participants.',
    tags: ['Accessibility', 'Workshops', 'Policy Review']
  }
];

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeNav, setActiveNav] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailProject, setActiveDetailProject] = useState<ProjectDetail | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Interactive Card Selection on Hero
  const [heroCardTab, setHeroCardTab] = useState<'education' | 'stack' | 'background'>('education');

  // Code & Architecture preview tab
  const [activeSandboxTab, setActiveSandboxTab] = useState<'ashlang' | 'pulselan'>('ashlang');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Sync dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Scrollspy observer
  useEffect(() => {
    const sections = ['about', 'projects', 'architecture', 'skills', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('gabrieliusuosis@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(targetId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.email.trim()) errors.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Please enter a valid email';
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errors.message = 'Please write a short message';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 700);
  };

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div
      className={`min-h-screen selection:bg-[#2d5a43] selection:text-white ${
        isDarkMode ? 'dark bg-[#0c0e12] text-[#f4f4f5]' : 'bg-[#faf8f5] text-[#18181b]'
      }`}
    >
      {/* Clean background with subtle architectural grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-80" />
        <div className="absolute top-0 left-0 right-0 h-[480px] bg-dot-matrix opacity-40" />
      </div>

      {/* ===================================================================
          1. NAVIGATION BAR
      =================================================================== */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center">
        <nav
          aria-label="Primary Navigation"
          className="w-full max-w-5xl rounded-full bg-white/85 dark:bg-[#14171d]/90 backdrop-blur-md border border-stone-200/90 dark:border-[#262a34] shadow-[0_4px_24px_rgba(0,0,0,0.05)] px-4 py-2 flex items-center justify-between transition-all"
        >
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, 'top')}
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-stone-100 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-stone-300 dark:border-stone-700 shrink-0 bg-stone-200">
              <img
                src="./avatar.jpg"
                alt="Gabrielius Uosis"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = 'https://avatars.githubusercontent.com/u/209792310?v=4';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-tight group-hover:text-[#2d5a43] dark:group-hover:text-[#7fd8ab] transition-colors">
                Gabrielius Uosis
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                BSc CS @ Loughborough
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'architecture', label: 'Code & Demos' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => {
              const isActive = activeNav === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-stone-900 dark:text-white font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-stone-100 dark:bg-white/10 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Quick Actions: Dark Mode, Actual CV PDF Link, Contact */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            <a
              href="./gabrielius_uosis_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-white/10 border border-stone-200/80 dark:border-white/10 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#2d5a43] dark:text-[#7fd8ab]" />
              <span>CV</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 shadow-sm transition-all"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation"
              className="lg:hidden p-2 rounded-full bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-200"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="lg:hidden absolute top-16 left-4 right-4 rounded-3xl bg-white/95 dark:bg-[#14171d]/95 backdrop-blur-xl border border-stone-200 dark:border-[#262a34] shadow-2xl p-5 flex flex-col gap-2"
            >
              {[
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: 'architecture', label: 'Code & Demos' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="px-4 py-2.5 rounded-2xl text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex gap-2">
                <a
                  href="./gabrielius_uosis_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 rounded-2xl text-xs font-semibold bg-stone-100 dark:bg-white/10 text-center"
                >
                  Open CV (PDF)
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="flex-1 py-2.5 rounded-2xl text-xs font-semibold bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-center"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===================================================================
          2. HERO SECTION
      =================================================================== */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-24 space-y-28 sm:space-y-36">
        <section id="about" className="scroll-mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Intro */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#e7f0eb] dark:bg-[#152e22] border border-[#cfe2d8] dark:border-[#2d5a43] text-[#2d5a43] dark:text-[#7fd8ab] text-xs font-medium">
                <span>Looking for Graduate Jobs & Internships</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12]">
                  Computer Science student building compilers, local-network tools, and full-stack apps.
                </h1>
                <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  Hi, I’m <strong className="font-semibold text-stone-900 dark:text-white">Gabrielius Uosis</strong>. I study Computer Science at <strong className="font-semibold text-stone-900 dark:text-white">Loughborough University</strong>. I enjoy working close to how software actually runs—from designing a domain-specific language for finite automata to streaming video directly over LAN with WebRTC.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs sm:text-sm font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 shadow-sm transition-all"
                >
                  <span>View Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="./gabrielius_uosis_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] text-xs sm:text-sm font-semibold hover:border-stone-400 dark:hover:border-stone-500 shadow-2xs transition-all"
                >
                  <FileText className="w-4 h-4 text-[#2d5a43] dark:text-[#7fd8ab]" />
                  <span>Open CV (PDF)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f0eee9] dark:bg-white/5 border border-stone-200/80 dark:border-white/10 text-xs sm:text-sm font-semibold hover:bg-stone-200/80 dark:hover:bg-white/10 transition-colors"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Quick Highlights */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#14171d] border border-stone-200/70 dark:border-[#262a34] shadow-2xs">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#2d5a43] dark:text-[#7fd8ab]">BSc CS</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Loughborough Uni</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#14171d] border border-stone-200/70 dark:border-[#262a34] shadow-2xs">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#9e472d] dark:text-[#e07f63]">2x</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">Hackathon Podiums</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#14171d] border border-stone-200/70 dark:border-[#262a34] shadow-2xs">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#345e77] dark:text-[#78b3d6]">10,000+</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">App Users (Adapt)</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#14171d] border border-stone-200/70 dark:border-[#262a34] shadow-2xs">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#7c5826] dark:text-[#d4aa6d]">0 Dep</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">WebRTC LAN Streamer</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] p-6 shadow-xl space-y-5 relative overflow-hidden">
                {/* Portrait & Name */}
                <div className="flex items-center gap-4 pb-4 border-b border-stone-100 dark:border-[#262a34]">
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-stone-700 shadow-md bg-stone-100 dark:bg-stone-800">
                      <img
                        src="./avatar.jpg"
                        alt="Gabrielius Uosis"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = 'https://avatars.githubusercontent.com/u/209792310?v=4';
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-extrabold text-lg sm:text-xl tracking-tight">
                      Gabrielius Uosis
                    </h2>
                    <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>London & Loughborough, UK</span>
                    </div>
                    <div className="text-[11px] text-stone-600 dark:text-stone-300">
                      BSc Computer Science Student
                    </div>
                  </div>
                </div>

                {/* Switcher Tabs */}
                <div className="flex rounded-xl bg-stone-100 dark:bg-white/5 p-1 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('education')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                      heroCardTab === 'education'
                        ? 'bg-white dark:bg-[#1e232d] text-stone-900 dark:text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    Education
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('stack')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                      heroCardTab === 'stack'
                        ? 'bg-white dark:bg-[#1e232d] text-stone-900 dark:text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    Tech Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('background')}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                      heroCardTab === 'background'
                        ? 'bg-white dark:bg-[#1e232d] text-stone-900 dark:text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    Background
                  </button>
                </div>

                {/* Tabbed Content */}
                <div className="min-h-[140px] text-xs">
                  {heroCardTab === 'education' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 text-stone-900 dark:text-white">
                          <GraduationCap className="w-4 h-4 text-[#2d5a43] dark:text-[#7fd8ab]" />
                          <span>Loughborough University</span>
                        </span>
                        <span className="text-[11px] font-mono text-stone-500">2024 — 2027</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                        Modules: Software Engineering, Algorithms Analysis, Formal Methods, Theory of Computation, Distributed Systems, Databases, Cloud Computing, Robotics.
                      </p>
                      <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono text-stone-500 dark:text-stone-400">
                        <span className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-white/10">A-Levels: Maths (A)</span>
                        <span className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-white/10">CS (B)</span>
                        <span className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-white/10">Politics (B)</span>
                      </div>
                    </motion.div>
                  )}

                  {heroCardTab === 'stack' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 text-stone-900 dark:text-white">
                          <Code2 className="w-4 h-4 text-[#9e472d] dark:text-[#e07f63]" />
                          <span>Languages & Tools</span>
                        </span>
                        <span className="text-[11px] font-mono text-stone-500">Core Stack</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                        Python, Java, Kotlin, JavaScript, SQL, PHP, React, Node.js, PostgreSQL, Google Cloud Platform (GCP), Linux, and Git.
                      </p>
                      <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#e7f0eb] text-[#2d5a43] dark:bg-[#152e22] dark:text-[#7fd8ab]">ANTLR4 & DSLs</span>
                        <span className="px-2 py-0.5 rounded bg-[#eaf1f5] text-[#345e77] dark:bg-[#12222f] dark:text-[#78b3d6]">WebRTC P2P</span>
                        <span className="px-2 py-0.5 rounded bg-[#f9ebe6] text-[#9e472d] dark:bg-[#2e1913] dark:text-[#e07f63]">Full-Stack</span>
                      </div>
                    </motion.div>
                  )}

                  {heroCardTab === 'background' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/60 dark:border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 text-stone-900 dark:text-white">
                          <Briefcase className="w-4 h-4 text-[#345e77] dark:text-[#78b3d6]" />
                          <span>Work & Interests</span>
                        </span>
                        <span className="text-[11px] font-mono text-stone-500">London, UK</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                        Waiter at Gordon's Wine Bar (350+ covers per shift) and former Software Intern at Adapt. Outside of work and uni, I enjoy weightlifting, indoor cycling, and chess.
                      </p>
                      <div className="pt-1 flex flex-wrap gap-1 text-[10px] font-mono text-stone-500 dark:text-stone-400">
                        <span className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-white/10">Chess (1500 ELO)</span>
                        <span className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-white/10">Weightlifting</span>
                        <span className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-white/10">English & Lithuanian</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Social Links Row */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <a
                    href="https://github.com/GabrieliusUosis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-stone-400" />
                  </a>

                  <a
                    href="https://linkedin.com/in/gabrielius-uo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-stone-400" />
                  </a>

                  <a
                    href="./gabrielius_uosis_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#2d5a43] dark:text-[#7fd8ab] hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>CV (PDF)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===================================================================
            3. PROJECTS SECTION
        =================================================================== */}
        <section id="projects" className="scroll-mt-36 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 text-xs font-mono text-stone-600 dark:text-stone-400">
                Selected Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Projects
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-stone-100 dark:bg-white/5 border border-stone-200/70 dark:border-white/10">
              {[
                { id: 'all', label: 'All' },
                { id: 'compilers', label: 'Compilers & DSL' },
                { id: 'systems', label: 'Networking' },
                { id: 'fullstack', label: 'Full-Stack & Mobile' },
                { id: 'hackathon', label: 'Hackathons' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-white dark:bg-[#1e232d] text-stone-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {filteredProjects.map((project) => {
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] p-7 sm:p-8 shadow-xs hover:shadow-md hover:border-stone-400 dark:hover:border-stone-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e7f0eb] dark:bg-[#152e22] text-[#2d5a43] dark:text-[#7fd8ab] border border-[#cfe2d8] dark:border-[#2d5a43]/60">
                        {project.badge}
                      </span>
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        {project.period}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Key Details */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200/50 dark:border-white/5"
                        >
                          <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-mono">
                            {m.label}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold font-mono text-stone-900 dark:text-white mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-100 dark:border-[#262a34] space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techTags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveDetailProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                      >
                        <span>Project Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-stone-100 dark:bg-white/5 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3 text-stone-400" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            4. CODE & ARCHITECTURE PREVIEW (ash-lang & PulseLAN)
        =================================================================== */}
        <section id="architecture" className="scroll-mt-36 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf1f5] dark:bg-[#12222f] text-[#345e77] dark:text-[#78b3d6] text-xs font-mono font-medium border border-[#d3e2ec] dark:border-[#345e77]/40">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Code & System Walkthrough
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md">
              A closer look at the syntax and execution pipeline in <code className="font-mono">ash-lang</code> and the local streaming architecture in <code className="font-mono">PulseLAN</code>.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-stone-100 dark:border-[#262a34] bg-stone-50/50 dark:bg-white/[0.02] flex-wrap">
              <button
                type="button"
                onClick={() => setActiveSandboxTab('ashlang')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSandboxTab === 'ashlang'
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>ash-lang: Syntax & DFA Simulation</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSandboxTab('pulselan')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSandboxTab === 'pulselan'
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>PulseLAN: WebRTC & HTTP 206 Streaming</span>
              </button>
            </div>

            {/* Content Panels */}
            <div className="p-6 sm:p-8">
              {activeSandboxTab === 'ashlang' && (
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        ash-lang: Declarative Automata Syntax & Runtime Trace
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                        Parsed with ANTLR4 (<code className="font-mono">AutomataLexer.g4</code> & <code className="font-mono">AutomataParser.g4</code>), validated by <code className="font-mono">SemanticAnalyser.py</code>, and simulated in Python.
                      </p>
                    </div>
                    <a
                      href="https://github.com/GabrieliusUosis/ash-lang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
                    >
                      <span>github.com/GabrieliusUosis/ash-lang</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#0f1218] text-stone-200 p-5 font-mono text-xs overflow-x-auto shadow-inner space-y-2 border border-stone-800">
                      <div className="text-stone-400 text-[11px] uppercase tracking-wider pb-1 border-b border-stone-800">
                        demo.ash — Declaring DFAs & Regex
                      </div>
                      <pre className="text-amber-300 leading-relaxed">
{`// DFA: Accepts binary numbers divisible by 3
dfa DivisibleByThree {
    states: r0, r1, r2
    alphabet: "0", "1"
    start: r0
    accept: r0
    transitions: {
        r0 -> r0: "0"
        r0 -> r1: "1"
        r1 -> r2: "0"
        r1 -> r0: "1"
        r2 -> r1: "0"
        r2 -> r2: "1"
    }
}

// Regex: Strings containing an odd number of 1s
regex HasOddOnes = ("0"* "1" "0"* "1" "0"*)* "0"* "1" "0"*`}
                      </pre>
                    </div>

                    <div className="rounded-2xl bg-[#0f1218] text-stone-200 p-5 font-mono text-xs overflow-x-auto shadow-inner space-y-2 border border-stone-800">
                      <div className="text-stone-400 text-[11px] uppercase tracking-wider pb-1 border-b border-stone-800">
                        $ python main.py demo.ash DivisibleByThree 110 101
                      </div>
                      <pre className="text-emerald-400 leading-relaxed">
{`Semantic analysis complete. Valid machines loaded:
 - [DFA] EndsWithZero
 - [DFA] EvenZeros
 - [DFA] ContainsAB
 - [DFA] DivisibleByThree
 - [REGEX] HasOddOnes

Simulating DFA 'DivisibleByThree':
  Input "110": ACCEPT
  Trace: r0 --(1)--> r1 -> r1 --(1)--> r0 -> r0 --(0)--> r0

  Input "101": REJECT
  Trace: r0 --(1)--> r1 -> r1 --(0)--> r2 -> r2 --(1)--> r2`}
                      </pre>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                      <strong>Static Semantic Checks:</strong> Before any simulation runs, <code className="font-mono">SemanticAnalyser.py</code> walks the ANTLR parse tree to verify that every transition references declared states and valid alphabet symbols, and catches DFA determinism violations if a state defines duplicate transitions on the same symbol.
                    </p>
                  </div>
                </div>
              )}

              {activeSandboxTab === 'pulselan' && (
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        PulseLAN: Direct WebRTC DataChannels & Service Worker Streaming
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                        Streams multi-gigabyte video files directly between browsers on the same LAN with zero npm dependencies.
                      </p>
                    </div>
                    <a
                      href="https://github.com/GabrieliusUosis/pulseLAN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
                    >
                      <span>github.com/GabrieliusUosis/pulseLAN</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="rounded-2xl bg-[#0f1218] text-stone-200 p-5 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed border border-stone-800">
                    <pre className="text-emerald-400">
{`┌────────────────────────────────────────────────────────────────────────┐
│                        Local Area Network (LAN)                        │
└────────────────────────────────────────────────────────────────────────┘
            │                                                │
            ▼                                                ▼
   ┌─────────────────┐                              ┌─────────────────┐
   │ Browser Peer A  │                              │ Browser Peer B  │
   │ (Seeder)        │                              │ (Viewer / DL)   │
   │                 │                              │                 │
   │ • File.slice()  │                              │ • Service Worker│
   │ • DataChannel   │◄════════════════════════════►│ • <video> (206) │
   │   Chunk Stream  │       WebRTC DataChannel     │ • Direct Save   │
   └────────┬────────┘         (Direct Mesh)        └────────┬────────┘
            │                                                │
            │              WebSocket Signaling               │
            └──────────────────────►┌──────────────┐◄────────┘
                                    │ Node.js      │
                                    │ Signaling    │
                                    └──────────────┘
                                     (Metadata only)`}
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 space-y-1.5">
                      <div className="text-xs font-bold font-mono text-[#2d5a43] dark:text-[#7fd8ab]">
                        1. Metadata Broadcast
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                        When a file is dropped into Peer A’s browser, only its name, size, and MIME type are sent over the WebSocket signaling server. The file bytes stay on disk.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 space-y-1.5">
                      <div className="text-xs font-bold font-mono text-[#345e77] dark:text-[#78b3d6]">
                        2. Seeking & Byte Ranges
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                        The Service Worker intercepts <code className="font-mono text-[11px]">Range: bytes=start-end</code> requests from the HTML5 video player and asks Peer A for that exact slice over WebRTC in 64KB frames.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5 space-y-1.5">
                      <div className="text-xs font-bold font-mono text-[#9e472d] dark:text-[#e07f63]">
                        3. Backpressure Control
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                        To keep memory usage low, the sender checks <code className="font-mono text-[11px]">channel.bufferedAmount</code>. If it passes 4MB, slicing pauses until <code className="font-mono text-[11px]">bufferedamountlow</code> fires.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. SKILLS SECTION
        =================================================================== */}
        <section id="skills" className="scroll-mt-36 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f9ebe6] dark:bg-[#2e1913] text-[#9e472d] dark:text-[#e07f63] text-xs font-mono font-medium border border-[#f1d4ca] dark:border-[#9e472d]/40">
                Technical Toolkit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Skills & Coursework
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsCategories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] p-7 shadow-2xs hover:border-stone-400 dark:hover:border-stone-500 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        {cat.name}
                      </h3>
                      <div className="p-2.5 rounded-2xl bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono bg-stone-50 dark:bg-white/5 border border-stone-200/70 dark:border-white/10 text-stone-800 dark:text-stone-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            6. EXPERIENCE, EDUCATION & HACKATHONS
        =================================================================== */}
        <section id="experience" className="scroll-mt-36 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5efe2] dark:bg-[#2e2316] text-[#7c5826] dark:text-[#d4aa6d] text-xs font-mono font-medium border border-[#e8dcc2] dark:border-[#7c5826]/40">
                Timeline
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Education, Experience & Hackathons
              </h2>
            </div>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:top-4 before:bottom-4 before:left-2 sm:before:left-3 before:w-0.5 before:bg-stone-200 dark:before:bg-[#262a34]">
            {timelineEvents.map((event) => (
              <div
                key={event.id}
                className="relative rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] p-6 sm:p-7 shadow-2xs hover:border-stone-400 dark:hover:border-stone-500 transition-all space-y-4"
              >
                <div className="absolute -left-[1.85rem] sm:-left-[2.35rem] top-7 w-3.5 h-3.5 rounded-full bg-stone-900 dark:bg-white ring-4 ring-[#faf8f5] dark:ring-[#0c0e12]" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e7f0eb] dark:bg-[#152e22] text-[#2d5a43] dark:text-[#7fd8ab] border border-[#cfe2d8] dark:border-[#2d5a43]/60">
                      {event.badge}
                    </span>
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      {event.period}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold">
                    {event.role}{' '}
                    <span className="font-normal text-stone-500 dark:text-stone-400">
                      — {event.organization}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {event.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100 dark:border-[#262a34]">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            7. CONTACT SECTION
        =================================================================== */}
        <section id="contact" className="scroll-mt-36">
          <div className="rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] p-7 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Direct info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#e7f0eb] dark:bg-[#152e22] text-[#2d5a43] dark:text-[#7fd8ab] text-xs font-mono font-medium">
                    Contact
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Get in touch
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    If you’re hiring for graduate roles or internships, or want to chat about any of my projects, feel free to reach out.
                  </p>
                </div>

                {/* Email card */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400">
                    <span>Email</span>
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold text-stone-900 dark:text-white break-all">
                    gabrieliusuosis@gmail.com
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                  </button>
                </div>

                {/* Social & Phone */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                    <Phone className="w-4 h-4 text-stone-400" />
                    <span>07821 782257</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                    <Github className="w-4 h-4 text-stone-400" />
                    <a href="https://github.com/GabrieliusUosis" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      github.com/GabrieliusUosis
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                    <Linkedin className="w-4 h-4 text-[#0077b5]" />
                    <a href="https://linkedin.com/in/gabrielius-uo" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      linkedin.com/in/gabrielius-uo
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                    <FileText className="w-4 h-4 text-[#2d5a43] dark:text-[#7fd8ab]" />
                    <a href="./gabrielius_uosis_cv.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Download CV (PDF)
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-stone-200/80 dark:border-white/10 p-6 sm:p-8 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Send a Message</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Leave a message below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Thanks for reaching out! I'll reply soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 transition-all"
                    />
                    {formErrors.name && <p className="text-[#9e472d] mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 transition-all"
                    />
                    {formErrors.email && <p className="text-[#9e472d] mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                      }}
                      placeholder="Hi Gabrielius..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 transition-all"
                    />
                    {formErrors.message && <p className="text-[#9e472d] mt-1">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          8. FOOTER
      =================================================================== */}
      <footer className="border-t border-stone-200/80 dark:border-[#262a34] py-10 px-4 sm:px-6 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-white">Gabrielius Uosis</span>
            <span>—</span>
            <span>London & Loughborough, UK</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <a href="./gabrielius_uosis_cv.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
              CV (PDF)
            </a>
            <a href="https://github.com/GabrieliusUosis" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href="https://linkedin.com/in/gabrielius-uo" target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
            <a href="#top" onClick={(e) => scrollToSection(e, 'top')} className="hover:underline">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ===================================================================
          MODAL: PROJECT DETAILS
      =================================================================== */}
      <AnimatePresence>
        {activeDetailProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#14171d] border border-stone-200 dark:border-[#262a34] shadow-2xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100 dark:border-[#262a34]">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e7f0eb] dark:bg-[#152e22] text-[#2d5a43] dark:text-[#7fd8ab]">
                    {activeDetailProject.badge}
                  </span>
                  <h3 className="text-2xl font-bold mt-2">
                    {activeDetailProject.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-1">
                    {activeDetailProject.period}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDetailProject(null)}
                  className="p-2 rounded-full bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Overview
                </h4>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {activeDetailProject.overview}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {activeDetailProject.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5"
                  >
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                      {m.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-mono mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* How It's Built */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  How It's Built
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {activeDetailProject.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-white shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Challenges */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Key Challenges
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {activeDetailProject.challenges.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#2d5a43] dark:text-[#7fd8ab] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="pt-2 border-t border-stone-100 dark:border-[#262a34] flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {activeDetailProject.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={activeDetailProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
