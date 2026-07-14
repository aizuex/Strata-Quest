import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Cpu, Coins, TrendingUp, Server } from 'lucide-react';
import { Header } from './Header';
import ThreeScene from './ThreeScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TryForFreeBrackets = () => (
    <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 160 60" preserveAspectRatio="none">
            <path d="M 40 10 C 20 10 20 50 40 50" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M 120 10 C 140 10 140 50 120 50" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
    </div>
);

const DecorativeBackground = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 mix-blend-overlay" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" />
      <path 
        d="M 850 -50 A 500 500 0 0 1 1350 450" 
        fill="none" 
        stroke="#00E5FF" 
        strokeWidth="1.5" 
        strokeOpacity="0.4"
      />
      <circle cx="75%" cy="45%" r="280" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="45%" cy="85%" r="100" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.2" />
  </svg>
);

const SpecLabel = ({ label, value, sub, align = 'left' }: { label: string, value: string, sub: string, align?: 'left' | 'right' }) => (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} group relative z-10`}>
        <div className={`absolute -inset-4 bg-slate-900/40 backdrop-blur-md rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10 shadow-sm`}></div>
        <div className={`absolute -inset-4 bg-slate-950/20 backdrop-blur-[2px] rounded-2xl -z-20 border border-white/5`}></div>

        <div className={`flex items-center gap-2 mb-2 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="h-[1px] w-8 bg-[#00E5FF]/40 group-hover:w-16 transition-all duration-500"></div>
            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase">{label}</span>
        </div>
        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-white mb-1">{value}</h4>
        <p className="text-[10px] sm:text-xs font-medium text-neutral-400 max-w-[160px]">{sub}</p>
    </div>
);

const ServiceCard = ({ title, icon: Icon, desc, tags, onClick }: { title: string, icon: any, desc: string, tags: string[], onClick?: () => void }) => (
  <div onClick={onClick} className="glass-panel-dark hover:glass-panel-light pointer-events-auto rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:shadow-glow glow-hover-purple cursor-pointer">
    <div>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight text-white group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-neutral-400 group-hover:text-secondary text-sm leading-relaxed mb-6 font-normal transition-colors duration-300">{desc}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 group-hover:bg-black/5 group-hover:border-black/10 group-hover:text-secondary transition-colors duration-300">{tag}</span>
      ))}
    </div>
  </div>
);

const HEADLINES = [
  { first: "Scale your", highlight: "ideas", last: "faster" },
  { first: "We Transform", highlight: "Business", last: "Ideas" },
  { first: "We Deliver", highlight: "On-Demand", last: "Solutions" },
  { first: "We Engineer", highlight: "Blockchain", last: "Systems" },
  { first: "We Deploy", highlight: "AI Core", last: "Ecosystems" },
  { first: "We Architect", highlight: "Crypto", last: "Gateways" }
];

const Hero: React.FC = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headlineFade, setHeadlineFade] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineFade(false);
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
        setHeadlineFade(true);
      }, 500);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Handle incoming scroll targets from dynamic subpages
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const target = (location.state as any).scrollTo;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1px)", () => {
         gsap.to(".app-bg-wrapper", {
             backgroundColor: "#0e091b",
             scrollTrigger: {
                 trigger: "#details-section",
                 start: "top 60%",
                 end: "top 10%",
                 scrub: 1,
             }
         });
         
         gsap.to(".app-bg-wrapper", {
             backgroundColor: "#041115",
             scrollTrigger: {
                 trigger: "#breakdown-section",
                 start: "top 60%",
                 end: "top 10%",
                 scrub: 1,
             }
         });

         gsap.to(".app-bg-wrapper", {
             backgroundColor: "#080410", 
             scrollTrigger: {
                 trigger: "#footer-section",
                 start: "top 60%",
                 end: "top 10%",
                 scrub: 1,
             }
         });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="app-bg-wrapper w-full relative min-h-screen text-slate-900 overflow-x-hidden bg-[#F3F6FB]">
      
      {/* Dynamic particles floating behind */}
      <ThreeScene />

      {/* Wrapping layer for layout */}
      <div className="w-full relative">
        <DecorativeBackground />

        {/* Global sticky header */}
        <Header />

        {/* --- MAIN CONTENT CONTAINER --- */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col pt-16">

            {/* --- SECTION 1: HERO --- */}
            <div id="hero-section" className="relative flex flex-col min-h-[100dvh] w-full pointer-events-none px-6 sm:px-12 md:px-16 lg:px-24 pb-10">
                <main className="flex-1 flex flex-col justify-center max-w-4xl pointer-events-auto mt-24 md:mt-0">
                  <div className="mb-6 md:mb-8 flex items-center gap-3 text-primary font-semibold text-xs md:text-base">
                    <span className="font-bold text-[#8B5CF6]">→</span>
                    <span>Powering the Future of Blockchain & IT Solutions</span>
                  </div>
                  <div className="hero-headline-container w-full">
                    <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.1] md:leading-[0.95] font-medium text-primary tracking-[-0.03em] break-words transition-all duration-500 transform ${
                      headlineFade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}>
                      {HEADLINES[headlineIndex].first} <br className="hidden md:block" />
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                          <span className="relative font-serif italic font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.0rem] text-[#8B5CF6]">
                              "{HEADLINES[headlineIndex].highlight}"
                          </span>
                          <span>{HEADLINES[headlineIndex].last}<span className="text-[#00C2FF]">.</span></span>
                      </div>
                    </h1>
                  </div>
                  <p className="text-secondary text-sm md:text-lg leading-relaxed mb-10 md:mb-16 max-w-[280px] sm:max-w-md font-normal">
                    Think of our platform as your company's core intelligence, seamlessly managing database transactions, cloud scaling, and cybersecurity. A unified, fully automated portal.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 w-full sm:w-auto">
                    <button 
                      onClick={() => scrollToSection('details-section')}
                      className="group relative flex items-center justify-between bg-black text-white rounded-full pl-6 md:pl-8 pr-2 py-2 h-14 md:h-16 w-full sm:w-auto min-w-[220px] hover:bg-neutral-800 transition-all duration-300 cursor-pointer shadow-xl active:scale-95"
                    >
                      <span className="text-sm md:text-base font-medium">Explore Services</span>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
                      </div>
                    </button>
                    <button 
                      onClick={() => scrollToSection('footer-section')}
                      className="group relative flex items-center justify-center px-8 md:px-10 h-14 md:h-16 text-primary hover:text-black transition-colors cursor-pointer w-full sm:w-auto font-bold"
                    >
                       <TryForFreeBrackets />
                       <span className="text-sm font-medium z-10 relative group-hover:scale-105 transition-transform">Get in Touch</span>
                    </button>
                  </div>
                </main>
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-20 text-secondary/50 text-xs md:text-sm font-medium tracking-wide hidden md:block">
                    Strata Quest Core
                </div>
            </div>

            {/* --- SECTION 2: DETAILS & SERVICES --- */}
            <div id="details-section" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-start pt-28 md:pt-40 pointer-events-none px-6 sm:px-12 md:px-16 bg-grid-pattern bg-no-repeat">
                <div className="flex flex-col items-center text-center space-y-8 pointer-events-auto p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto z-20">
                    <div className="inline-flex items-center gap-2 text-[#00C2FF] font-semibold uppercase tracking-widest text-xs">
                        <div className="w-2 h-2 rounded-full bg-[#00C2FF]"></div>
                        <span>Core Domains</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif italic text-white leading-tight">
                        We Build the Future. <br/> 
                        <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-5xl text-neutral-200">One Block at a Time.</span>
                    </h2>
                    <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto">
                        From automated crypto investment engines to hyper-scalable enterprise networks, our solutions are engineered for stability, speed, and precision.
                    </p>
                </div>

                {/* Grid of Custom Services */}
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pointer-events-auto px-4 z-20">
                     <ServiceCard 
                         title="Blockchain Systems" 
                         icon={Cpu} 
                         desc="DeFi protocols, smart contract architecture, tokenomics design, and custom DApp platforms." 
                         tags={["Solidity", "Rust", "Web3", "Ethereum"]}
                         onClick={() => scrollToSection('footer-section')}
                     />
                     <ServiceCard 
                         title="Crypto Integration" 
                         icon={Coins} 
                         desc="Secure digital asset custody solutions, high-performance trading platforms, and crypto payment rails." 
                         tags={["Liquidity", "MPC Wallets", "API Gateways"]}
                         onClick={() => scrollToSection('footer-section')}
                     />
                     <ServiceCard 
                         title="Investment Portfolios" 
                         icon={TrendingUp} 
                         desc="Automated wealth engines, AI-driven yield strategies, staking infrastructure, and tracking dashboards." 
                         tags={["Yield Staking", "Risk Engine", "AI Portfolio"]}
                         onClick={() => scrollToSection('footer-section')}
                     />
                     <ServiceCard 
                         title="Enterprise IT" 
                         icon={Server} 
                         desc="High-scale cloud infrastructure, zero-trust cybersecurity frameworks, and dedicated development teams." 
                         tags={["AWS/GCP", "Kubernetes", "DevOps"]}
                         onClick={() => scrollToSection('footer-section')}
                     />
                </div>

                {/* Spacer for 3D animation visibility */}
                <div className="flex-1 w-full min-h-[40vh] md:min-h-[50vh]"></div>
            </div>

            {/* --- SECTION 3: SYSTEM ARCHITECTURE (HUD Style) --- */}
            <div id="breakdown-section" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pointer-events-none overflow-hidden py-10 px-6 sm:px-12 md:px-16 bg-grid-pattern-dark">
                 <div className="absolute top-10 md:top-24 left-0 w-full text-center z-10 pointer-events-auto px-6">
                    <div className="inline-block relative">
                          <div className="absolute inset-0 bg-[#8B5CF6]/10 blur-xl rounded-full"></div>
                          <h3 className="relative text-2xl md:text-5xl font-serif italic text-white mb-2 md:mb-4">Enterprise Ecosystem</h3>
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-slate-900/40 backdrop-blur-md">
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/70">Network Core v3.0</span>
                    </div>
                 </div>

                 <div className="max-w-[1400px] w-full h-full relative flex flex-col md:flex-row items-center justify-between z-10 mt-20 md:mt-0 mx-auto">
                    
                    {/* Mobile: Top Grid Layout */}
                    <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-8 w-full mb-8 pointer-events-auto">
                         <SpecLabel label="Tps" value="100k+" sub="Cross-chain throughput." align="left" />
                         <SpecLabel label="Security" value="Zk-SNARK" sub="Zero-knowledge privacy." align="right" />
                    </div>

                    {/* Desktop: Left Column */}
                    <div className="hidden md:flex flex-col gap-24 pointer-events-auto">
                        <SpecLabel label="Tps" value="100k+" sub="High performance cross-chain transaction throughput." align="left" />
                        <SpecLabel label="Security" value="Zk-SNARK" sub="Cutting-edge zero-knowledge proof cryptography." align="left" />
                    </div>

                    {/* Center area reserved for 3D Explosion */}
                    <div className="w-full h-[40vh] md:h-auto md:flex-1"></div>

                     {/* Mobile: Bottom Grid Layout */}
                    <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-8 w-full mt-8 pointer-events-auto">
                         <SpecLabel label="Staking" value="32.5%" sub="Audited validator yield." align="left" />
                         <SpecLabel label="Multi-Chain" value="EVM & Rust" sub="Cross-chain smart contracts." align="right" />
                    </div>

                    {/* Desktop: Right Column */}
                    <div className="hidden md:flex flex-col gap-24 text-right pointer-events-auto">
                        <SpecLabel label="Staking" value="32.5% APY" sub="Maximum security audited validator yield rewards." align="right" />
                        <SpecLabel label="Multi-Chain" value="EVM & Rust" sub="Universal smart contracts compatibility layer." align="right" />
                    </div>
                 </div>
            </div>

            {/* --- SECTION 4: FOOTER (MAGNETIC PORTAL) --- */}
            <div id="footer-section" className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center py-20 pointer-events-none overflow-hidden px-6 sm:px-12 md:px-16">
                
                <div className="relative z-20 flex flex-col items-center justify-center w-full pointer-events-none text-center">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-[#00C2FF] mb-8 pointer-events-auto">Get In Touch</span>
                    
                    <div className="flex flex-col items-center mb-24 md:mb-32 pointer-events-auto relative z-10">
                        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif italic text-white leading-none tracking-tight">
                            Start Your
                        </h2>
                        <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-sans font-extrabold text-[#8B5CF6] leading-none tracking-tight -mt-2 md:-mt-4 relative block">
                            Quest.
                        </span>
                    </div>

                    <div className="relative group cursor-pointer w-full max-w-xs sm:max-w-sm mx-auto pointer-events-auto z-20">
                       <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105 group-hover:shadow-glow glow-hover-purple">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]/50 group-hover:bg-[#8B5CF6] transition-colors"></div>
                            <button className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-white" onClick={() => scrollToSection('footer-section')}>
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#00C2FF] mb-1">Begin Consulting</span>
                                    <span className="text-xl sm:text-2xl font-semibold tracking-tight">Contact Team</span>
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-lg">
                                    <ArrowUpRight size={20} strokeWidth={1.5} />
                                </div>
                            </button>
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent group-hover:via-[#8B5CF6]/70 transition-all"></div>
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                       </div>
                       
                       <div className="absolute -bottom-8 left-0 w-full flex justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span>Ready to build</span>
                            <span>Secure Channel</span>
                       </div>
                    </div>
                </div>

                <div className="absolute bottom-10 w-full px-6 md:px-10 flex justify-between items-end pointer-events-auto text-neutral-400">
                     <p className="text-[10px] md:text-xs font-mono w-full md:w-auto text-center md:text-right">
                        STRATA QUEST<br/>FUTURE READY
                     </p>
                </div>
            </div>
        
        </div>
      </div>
    </div>
  );
};

export default Hero;