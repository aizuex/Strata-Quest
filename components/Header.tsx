import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowUpRight, Menu, X, ChevronDown, ChevronRight,
  Wallet, Coins, Key, PenTool, TrendingUp, Code, Globe, 
  Layers, Database, Users, Settings, Shield, Zap, Network, Lock, Server,
  Smartphone, Gamepad2, Apple, Monitor, Brain, Bot, Sparkles, Layout, Terminal, Laptop, Cpu,
  Landmark, GraduationCap, ShoppingCart, Truck, Plane, Car, Leaf, Trophy, Calendar, Dumbbell, Film, Utensils, Gavel, Home, Newspaper, Tv, MessageSquare,
  Heart, Clock
} from 'lucide-react';
import logoAsset from '../Copy of Purple White Modern Technology Company Z-Fold Brochure (1056 x 1056 px) (Facebook Cover) (1).png';

const Logo: React.FC<{ isDarkHeader?: boolean }> = ({ isDarkHeader = false }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = logoAsset;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        if (r > 240 && g > 240 && b > 240) {
          data[i+3] = 0; 
        }
      }
      ctx.putImageData(imgData, 0, 0);

      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const alpha = data[((y * canvas.width) + x) * 4 + 3];
          if (alpha > 0) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX >= minX && maxY >= minY) {
        const cropCanvas = document.createElement('canvas');
        const pad = 6;
        const w = (maxX - minX) + pad * 2;
        const h = (maxY - minY) + pad * 2;
        cropCanvas.width = w;
        cropCanvas.height = h;
        const cropCtx = cropCanvas.getContext('2d');
        if (cropCtx) {
          cropCtx.drawImage(canvas, minX, minY, maxX - minX, maxY - minY, pad, pad, maxX - minX, maxY - minY);
          setLogoUrl(cropCanvas.toDataURL());
        }
      } else {
        setLogoUrl(canvas.toDataURL());
      }
    };
  }, []);

  if (!logoUrl) return <div className="h-8 w-32 bg-transparent animate-pulse" />;
  
  return (
    <div className="flex items-center gap-3 font-semibold text-primary z-50 pointer-events-auto select-none cursor-pointer">
      <img 
        src={logoUrl} 
        alt="Strata Quest" 
        className="h-7 sm:h-9 md:h-11 w-auto object-contain transition-all duration-300"
        style={{
          filter: isDarkHeader 
            ? 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.45))' 
            : 'none'
        }}
      />
    </div>
  );
};

interface SubMenuItem {
  title: string;
  desc: string;
  href: string;
  icon?: any;
}

interface MenuItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Hello AI',
    href: '/ai-development',
    submenu: [
      { title: 'Generative AI', desc: 'Custom LLMs, chatbots, and AI integrations.', href: '/ai-development' },
      { title: 'AI Consulting', desc: 'Strategic AI adoption plans for enterprises.', href: '/ai-development' },
      { title: 'Machine Learning', desc: 'Predictive analytics and smart models.', href: '/ai-development' },
    ]
  },
  {
    name: 'Blockchain',
    href: '/blockchain-development',
    submenu: [
      { title: 'Crypto Exchange Development', desc: 'High performance trading platforms.', href: '/crypto-exchange-development', icon: Coins },
      { title: 'Crypto Wallet Development', desc: 'Secure multi-currency custody apps.', href: '/crypto-wallet-development', icon: Key },
      { title: 'NFT Marketplace Development', desc: 'Responsive minting and auctions.', href: '/nft-marketplace-development', icon: PenTool },
      { title: 'DeFi Development', desc: 'AMMs, staking pools, and yield systems.', href: '/defi-development', icon: TrendingUp },
      { title: 'Smart Contract Development', desc: 'Audited Solidity & Rust contract systems.', href: '/smart-contract-development', icon: Code },
      { title: 'Web3 Development', desc: 'Frontend apps integrated with wallet RPCs.', href: '/web3-development', icon: Globe },
      { title: 'Token Development', desc: 'Custom tokenomics and vesting schedule core.', href: '/token-development', icon: Layers },
      { title: 'ICO Development', desc: 'Launchpad and funding ledger systems.', href: '/ico-development', icon: Database },
      { title: 'MLM Software Development', desc: 'Decentralized referral rewards networks.', href: '/mlm-software-development', icon: Users },
      { title: 'Blockchain Consulting', desc: 'Technical audits and protocol selection.', href: '/blockchain-consulting', icon: Settings }
    ]
  },
  {
    name: 'Services',
    href: '/custom-app-development',
    submenu: [
      { title: 'Custom App Development', desc: 'Bespoke mobile, iOS, Android, and web applications.', href: '/custom-app-development', icon: Smartphone },
      { title: 'Software Development', desc: 'Enterprise SaaS, microservices, and API integrations.', href: '/software-development', icon: Code },
      { title: 'Game Development', desc: 'Unity, Unreal Engine, and Web3 game ecosystem core.', href: '/game-development', icon: Gamepad2 },
      { title: 'Web Development', desc: 'Interactive frontends, portals, and custom checkouts.', href: '/web-development', icon: Globe },
      { title: 'AI-Powered Development', desc: 'Generative AI models, integration, and ML systems.', href: '/ai-development', icon: Brain }
    ]
  },
  {
    name: 'On-Demand',
    href: '/ondemand-developer-teams',
    submenu: [
      { title: 'Dedicated Teams', desc: 'Scale up immediately with senior developers.', href: '/ondemand-developer-teams' },
      { title: 'UI/UX Designers', desc: 'Premium Figma interactive mockups and assets.', href: '/ondemand-developer-teams' },
      { title: 'Solution Architects', desc: 'Senior system architects on tap.', href: '/ondemand-developer-teams' },
    ]
  },
  {
    name: 'Industry',
    href: '/industry-use-cases',
    submenu: [
      { title: 'Fintech Solutions', desc: 'Banking APIs, payment processing, and ledger setups.', href: '/industry-use-cases', icon: Landmark },
      { title: 'SaaS Platforms', desc: 'Multi-tenant applications and scalable databases.', href: '/industry-use-cases', icon: Layers },
      { title: 'eCommerce Systems', desc: 'Shopping carts, global catalogs, and payments.', href: '/industry-use-cases', icon: ShoppingCart },
      { title: 'Education Portals', desc: 'Virtual class platforms, grading, and files.', href: '/industry-use-cases', icon: GraduationCap },
      { title: 'IT & Consulting', desc: 'IT support, audits, and custom software systems.', href: '/industry-use-cases', icon: Cpu }
    ]
  },
  {
    name: 'Company',
    href: '/about-strata-quest',
    submenu: [
      { title: 'About Strata Quest', desc: 'Our mission, team, and company history.', href: '/about-strata-quest' },
      { title: 'Get in Touch', desc: 'Ready to scale? Connect with our solution desk.', href: '#footer-section' }
    ]
  }
];

interface ServiceTabConfig {
  title: string;
  href: string;
  items: { title: string; desc: string; icon: any }[];
}

const SERVICES_TABS_DATA: Record<'custom' | 'software' | 'game' | 'web', ServiceTabConfig> = {
  custom: {
    title: 'Custom App Development',
    href: '/custom-app-development',
    items: [
      { title: 'Mobile App Development', desc: 'Development', icon: Smartphone },
      { title: 'iOS App Development', desc: 'Development', icon: Apple },
      { title: 'Android App Development', desc: 'Development', icon: Monitor },
      { title: 'Web App Development', desc: 'Development', icon: Globe }
    ]
  },
  software: {
    title: 'Software Development',
    href: '/software-development',
    items: [
      { title: 'Enterprise Software', desc: 'Development', icon: Layers },
      { title: 'SaaS Applications', desc: 'Development', icon: Settings },
      { title: 'API & Integrations', desc: 'Development', icon: Code },
      { title: 'Cloud Migrations', desc: 'Development', icon: Server }
    ]
  },
  game: {
    title: 'Game Development',
    href: '/game-development',
    items: [
      { title: 'Unity Game Dev', desc: 'Development', icon: Cpu },
      { title: 'Unreal Engine Dev', desc: 'Development', icon: Laptop },
      { title: 'Mobile Game Dev', desc: 'Development', icon: Smartphone },
      { title: 'Web3 & P2E Games', desc: 'Development', icon: Coins }
    ]
  },
  web: {
    title: 'Web Development',
    href: '/web-development',
    items: [
      { title: 'Frontend Web Apps', desc: 'Development', icon: Layout },
      { title: 'Backend Systems', desc: 'Development', icon: Terminal },
      { title: 'E-Commerce Platforms', desc: 'Development', icon: Wallet },
      { title: 'CMS Solutions', desc: 'Development', icon: Database }
    ]
  }
};

const INDUSTRIES_DATA = [
  { title: 'Healthcare', icon: Heart, colorClass: 'text-rose-500 bg-rose-500/10' },
  { title: 'FinTech', icon: Landmark, colorClass: 'text-emerald-500 bg-emerald-500/10' },
  { title: 'eCommerce', icon: ShoppingCart, colorClass: 'text-amber-500 bg-amber-500/10' },
  { title: 'Education', icon: GraduationCap, colorClass: 'text-blue-500 bg-blue-500/10' },
  { title: 'Logistics', icon: Truck, colorClass: 'text-orange-500 bg-orange-500/10' },
  { title: 'Travel & Hospitality', icon: Plane, colorClass: 'text-cyan-500 bg-cyan-500/10' },
  { title: 'Automotive', icon: Car, colorClass: 'text-slate-500 bg-slate-500/10' },
  { title: 'Agriculture', icon: Leaf, colorClass: 'text-green-500 bg-green-500/10' },
  { title: 'Gaming', icon: Gamepad2, colorClass: 'text-indigo-500 bg-indigo-500/10' },
  { title: 'Sports', icon: Trophy, colorClass: 'text-yellow-500 bg-yellow-500/10' },
  { title: 'On-Demand', icon: Clock, colorClass: 'text-purple-500 bg-purple-500/10' },
  { title: 'Events', icon: Calendar, colorClass: 'text-violet-500 bg-violet-500/10' },
  { title: 'Social Networking', icon: Users, colorClass: 'text-sky-500 bg-sky-500/10' },
  { title: 'Fitness & Wellness', icon: Dumbbell, colorClass: 'text-red-500 bg-red-500/10' },
  { title: 'Entertainment', icon: Film, colorClass: 'text-fuchsia-500 bg-fuchsia-500/10' },
  { title: 'Restaurant & Food', icon: Utensils, colorClass: 'text-amber-600 bg-amber-600/10' },
  { title: 'SaaS', icon: Layers, colorClass: 'text-indigo-600 bg-indigo-600/10' },
  { title: 'Politics & Governance', icon: Gavel, colorClass: 'text-neutral-500 bg-neutral-500/10' },
  { title: 'Real Estate', icon: Home, colorClass: 'text-emerald-600 bg-emerald-600/10' },
  { title: 'Electric Vehicle', icon: Zap, colorClass: 'text-yellow-400 bg-yellow-400/10' },
  { title: 'News & Media', icon: Newspaper, colorClass: 'text-blue-600 bg-blue-600/10' },
  { title: 'Aviation', icon: Globe, colorClass: 'text-cyan-600 bg-cyan-600/10' },
  { title: 'OTT', icon: Tv, colorClass: 'text-red-600 bg-red-600/10' },
  { title: 'IT Services', icon: Cpu, colorClass: 'text-violet-600 bg-violet-600/10' }
];

const MobileAccordion: React.FC<{ item: MenuItem, onNavigate: (href: string) => void, closeMenu: () => void }> = ({ item, onNavigate, closeMenu }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 pb-4 pointer-events-auto">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-sm font-semibold text-white uppercase tracking-wider py-2"
      >
        <span>{item.name}</span>
        <ChevronDown className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && item.submenu && (
        <div className="mt-3 pl-4 flex flex-col gap-4">
          {item.submenu.map((sub, i) => (
            <a 
              key={i} 
              href={sub.href}
              onClick={(e) => {
                 e.preventDefault();
                 closeMenu();
                 onNavigate(sub.href);
              }}
              className="flex flex-col text-left group"
            >
              <span className="text-sm font-medium text-white/90">{sub.title}</span>
              <span className="text-xs text-neutral-400 mt-0.5">{sub.desc}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header: React.FC<{ isDarkHeaderOverride?: boolean }> = ({ isDarkHeaderOverride }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServicesTab, setActiveServicesTab] = useState<'custom' | 'software' | 'game' | 'web'>('custom');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      const target = href.replace('#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: target } });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const isHomepage = location.pathname === '/';
  
  // Decide active header colors
  const isDarkHeader = isDarkHeaderOverride !== undefined 
    ? isDarkHeaderOverride 
    : (isHomepage ? scrolled && (window.scrollY > 500) : true);

  const cardClass = isDarkHeader 
    ? 'bg-slate-950/95 border-white/10 text-white' 
    : 'bg-white/95 border-black/10 text-slate-900';
  const subLinkClass = isDarkHeader 
    ? 'hover:bg-violet-500/10 text-neutral-200 hover:text-[#a78bfa]' 
    : 'hover:bg-violet-50 text-slate-800 hover:text-[#8B5CF6]';
  const subDescClass = isDarkHeader 
    ? 'text-neutral-400 group-hover/sub:text-neutral-300' 
    : 'text-slate-500 group-hover/sub:text-slate-600';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || !isHomepage
          ? isDarkHeader 
            ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg' 
            : 'py-3 bg-white/60 backdrop-blur-xl border-b border-black/5 shadow-md' 
          : 'py-6 md:py-8 bg-transparent'
      }`}>
        <nav className="max-w-[1600px] mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-6 md:gap-12">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 hover:opacity-70 transition-opacity lg:hidden"
            >
              <Menu className={`w-8 h-8 ${isDarkHeader ? 'text-white' : 'text-primary'}`} />
            </button>
            <div onClick={() => handleNav('#hero-section')}>
              <Logo isDarkHeader={isDarkHeader} />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {MENU_ITEMS.map((item) => (
              <div key={item.name} className="relative group py-2">
                <button 
                  onClick={() => handleNav(item.href)}
                  className={`flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                    isDarkHeader ? 'text-white/70 hover:text-white' : 'text-secondary/70 hover:text-primary'
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 transform group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {item.name === 'Blockchain' ? (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[920px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className={`rounded-[2rem] overflow-hidden shadow-2xl border ${isDarkHeader ? 'border-white/10 bg-slate-950/95 text-white' : 'border-black/10 bg-white/95 text-slate-900'} backdrop-blur-2xl flex flex-row`}>
                      {/* Left Column (Services Grid) */}
                      <div className="w-[58%] p-8 flex flex-col justify-between text-left">
                        <div>
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shadow-soft">
                              <Wallet className="w-6 h-6 stroke-[1.8]" />
                            </div>
                            <div>
                              <h3 className={`text-lg font-bold tracking-tight leading-tight ${isDarkHeader ? 'text-white' : 'text-slate-900'}`}>Blockchain Development</h3>
                              <p className={`text-xs font-medium mt-0.5 ${isDarkHeader ? 'text-neutral-400' : 'text-slate-500'}`}>Web3 & Crypto Solutions</p>
                            </div>
                          </div>

                          {/* 2-Column Grid of 10 Sub-services */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {item.submenu?.map((sub, idx) => {
                              const SubIcon = sub.icon || Coins;
                              return (
                                <a 
                                  key={idx} 
                                  href={sub.href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNav(sub.href);
                                  }}
                                  className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 group/item cursor-pointer text-left ${
                                    isDarkHeader ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex-shrink-0 flex items-center justify-center group-hover/item:bg-[#8B5CF6] group-hover/item:text-white transition-all duration-300">
                                    <SubIcon className="w-4 h-4 stroke-[2]" />
                                  </div>
                                  <span className={`text-xs font-semibold transition-colors duration-300 ${
                                    isDarkHeader ? 'text-neutral-300 group-hover/item:text-white' : 'text-slate-700 group-hover/item:text-slate-950'
                                  }`}>
                                    {sub.title}
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className={`mt-8 pt-4 border-t ${isDarkHeader ? 'border-white/10 text-neutral-500' : 'border-slate-100 text-slate-400'} flex items-center justify-between text-[9px] font-mono tracking-widest uppercase`}>
                          <span>Strata Quest Systems</span>
                          <span>Premium Web3 Core</span>
                        </div>
                      </div>

                      {/* Right Column (Capabilities & CTA) */}
                      <div className="w-[42%] bg-gradient-to-br from-slate-950 to-purple-950/20 p-8 flex flex-col justify-between border-l border-white/10 relative overflow-hidden text-white text-left">
                        {/* Decorative glow */}
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#8B5CF6]/10 blur-3xl rounded-full pointer-events-none" />

                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-[#00E5FF] uppercase mb-6">Capabilities</h4>

                          {/* Stack of 4 High Impact Specs */}
                          <div className="flex flex-col gap-4">
                            {[
                              { title: 'Web3 Ready', desc: 'Future of Finance', icon: Wallet },
                              { title: 'Multi-Chain', desc: 'Bitcoin, Ethereum, Solana', icon: Network },
                              { title: 'Bank-Grade Security', desc: 'Multi-sig & cold storage', icon: Lock },
                              { title: 'High Performance', desc: '100K+ TPS capacity', icon: Zap }
                            ].map((spec, i) => {
                              const SpecIcon = spec.icon;
                              return (
                                <div key={i} className="flex gap-3.5 items-center p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all shadow-soft">
                                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0 flex items-center justify-center">
                                    <SpecIcon className="w-4.5 h-4.5 stroke-[1.8]" />
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-semibold text-white">{spec.title}</h5>
                                    <p className="text-[10px] text-neutral-400 mt-0.5 leading-normal font-normal">{spec.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Signature Purple-to-Cyan Gradient CTA Button */}
                        <div className="mt-8">
                          <button 
                            onClick={() => handleNav('/crypto-exchange-development')}
                            className="w-full py-3 bg-gradient-to-r from-[#8B5CF6] to-[#00E5FF] hover:from-[#9d72f9] hover:to-[#26eaff] text-white rounded-xl flex items-center justify-center font-bold text-xs tracking-wide gap-2 shadow-lg shadow-violet-500/25 hover:scale-[1.02] transition-all cursor-pointer font-sans"
                          >
                            <span>Build Your Exchange</span>
                            <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : item.name === 'Services' ? (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[920px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className={`rounded-[2rem] overflow-hidden shadow-2xl border ${isDarkHeader ? 'border-white/10 bg-slate-950/95 text-white' : 'border-black/10 bg-white/95 text-slate-900'} backdrop-blur-2xl flex flex-row`}>
                      {/* Left Column (Service Categories) */}
                      <div className="w-[32%] p-7 flex flex-col justify-between text-left">
                        <div>
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                              <Code className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <div>
                              <h3 className={`text-sm font-bold tracking-tight leading-tight ${isDarkHeader ? 'text-white' : 'text-slate-900'}`}>Development Services</h3>
                              <p className={`text-[10px] font-medium mt-0.5 ${isDarkHeader ? 'text-neutral-400' : 'text-slate-500'}`}>Full-Stack Solutions</p>
                            </div>
                          </div>

                          {/* List of tabs */}
                          <div className="flex flex-col gap-2">
                            {(['custom', 'software', 'game', 'web'] as const).map((tabKey) => {
                              const isActive = activeServicesTab === tabKey;
                              const tabConfig = SERVICES_TABS_DATA[tabKey];
                              const TabIcon = tabKey === 'custom' ? Smartphone :
                                              tabKey === 'software' ? Code :
                                              tabKey === 'game' ? Gamepad2 : Globe;

                              return (
                                <div
                                  key={tabKey}
                                  onMouseEnter={() => setActiveServicesTab(tabKey)}
                                  onClick={() => handleNav(tabConfig.href)}
                                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                                    isActive
                                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                                      : isDarkHeader
                                        ? 'hover:bg-white/5 text-neutral-300 hover:text-white'
                                        : 'hover:bg-slate-100 text-slate-700 hover:text-slate-950'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                                      isActive
                                        ? 'bg-white/20 text-white'
                                        : isDarkHeader
                                          ? 'bg-white/5 text-neutral-400'
                                          : 'bg-slate-100 text-slate-500'
                                    }`}>
                                      <TabIcon className="w-4 h-4 stroke-[1.8]" />
                                    </div>
                                    <span className="text-xs font-bold font-sans tracking-wide">
                                      {tabKey === 'custom' ? 'Custom App Development' :
                                       tabKey === 'software' ? 'Software Development' :
                                       tabKey === 'game' ? 'Game Development' : 'Web Development'}
                                    </span>
                                  </div>
                                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                                    isActive ? 'translate-x-0.5 text-white' : 'text-neutral-500 opacity-60'
                                  }`} />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className={`mt-6 pt-4 border-t ${isDarkHeader ? 'border-white/10 text-neutral-500' : 'border-slate-100 text-slate-400'} flex items-center justify-between text-[9px] font-mono tracking-widest uppercase`}>
                          <span>Strata Quest Systems</span>
                          <span>Core Services</span>
                        </div>
                      </div>

                      {/* Middle Column (Sub-Services Grid) */}
                      <div className={`w-[38%] p-7 text-left flex flex-col justify-between border-x ${isDarkHeader ? 'border-white/10' : 'border-slate-100'}`}>
                        <div>
                          {/* Header */}
                          <div className="mb-6">
                            <h3 className={`text-sm font-bold tracking-tight ${isDarkHeader ? 'text-white' : 'text-slate-900'}`}>
                              {SERVICES_TABS_DATA[activeServicesTab].title}
                            </h3>
                          </div>

                          {/* 2-Column Grid */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {SERVICES_TABS_DATA[activeServicesTab].items.map((sub, idx) => {
                              const SubIcon = sub.icon;
                              const themeColorClass = activeServicesTab === 'custom' ? 'text-blue-500 bg-blue-500/10 hover:bg-blue-500 hover:text-white' :
                                                      activeServicesTab === 'software' ? 'text-violet-500 bg-violet-500/10 hover:bg-violet-500 hover:text-white' :
                                                      activeServicesTab === 'game' ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500 hover:text-white' :
                                                      'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white';
                              return (
                                <a
                                  key={idx}
                                  href={SERVICES_TABS_DATA[activeServicesTab].href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNav(SERVICES_TABS_DATA[activeServicesTab].href);
                                  }}
                                  className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 group/item cursor-pointer text-left ${
                                    isDarkHeader ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 ${themeColorClass}`}>
                                    <SubIcon className="w-4 h-4 stroke-[1.8]" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className={`text-[11px] font-bold font-sans tracking-wide leading-tight transition-colors ${
                                      isDarkHeader ? 'text-neutral-200 group-hover/item:text-white' : 'text-slate-800 group-hover/item:text-slate-950'
                                    }`}>
                                      {sub.title}
                                    </span>
                                    <span className={`text-[9px] mt-0.5 font-medium ${isDarkHeader ? 'text-neutral-400' : 'text-slate-500'}`}>
                                      {sub.desc}
                                    </span>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>

                        <div className={`mt-6 pt-4 border-t ${isDarkHeader ? 'border-white/10 text-neutral-500' : 'border-slate-100 text-slate-400'} flex items-center justify-between text-[9px] font-mono tracking-widest uppercase`}>
                          <span>Premium Tech Stack</span>
                          <span>v3.0</span>
                        </div>
                      </div>

                      {/* Right Column (AI-Powered Card & CTA) */}
                      <div className="w-[30%] bg-gradient-to-br from-[#12102e] to-[#0a091c] p-7 flex flex-col justify-between relative overflow-hidden text-white text-left">
                        {/* Decorative glow */}
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                              <Brain className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold tracking-tight text-white leading-tight">AI-Powered</h3>
                              <p className="text-[10px] font-medium text-neutral-400 mt-0.5">Development</p>
                            </div>
                          </div>

                          {/* Stack of AI items */}
                          <div className="flex flex-col gap-3">
                            {[
                              { title: 'AI Integration', desc: 'GPT, LLM & ML models', icon: Sparkles },
                              { title: 'Smart Automation', desc: 'AI chatbots & workflows', icon: Bot },
                              { title: 'Predictive Analytics', desc: 'Data-driven insights', icon: Cpu }
                            ].map((spec, i) => {
                              const SpecIcon = spec.icon;
                              return (
                                <div key={i} className="flex gap-3 items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300">
                                  <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-400 flex-shrink-0 flex items-center justify-center">
                                    <SpecIcon className="w-4 h-4 stroke-[1.8]" />
                                  </div>
                                  <div>
                                    <h5 className="text-[11px] font-bold font-sans text-white tracking-wide">{spec.title}</h5>
                                    <p className="text-[9px] text-neutral-400 mt-0.5 leading-normal font-medium">{spec.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Signature Purple-to-Cyan Gradient CTA Button */}
                        <div className="mt-6">
                          <button
                            onClick={() => handleNav('/ai-development')}
                            className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-xs tracking-wide gap-2 shadow-lg shadow-violet-500/25 hover:scale-[1.02] transition-all cursor-pointer font-sans"
                          >
                            <span className="flex items-center gap-1.5">
                              Explore AI Services <Sparkles className="w-3.5 h-3.5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : item.name === 'Industry' ? (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[920px] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className={`rounded-[2rem] overflow-hidden shadow-2xl border ${isDarkHeader ? 'border-white/10 bg-slate-950/95 text-white' : 'border-black/10 bg-white/95 text-slate-900'} backdrop-blur-2xl flex flex-row`}>
                      {/* Left/Main Column (Industry Solutions Grid) */}
                      <div className="w-[72%] p-8 flex flex-col justify-between text-left">
                        <div>
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                              <Globe className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <div>
                              <h3 className={`text-sm font-bold tracking-tight leading-tight ${isDarkHeader ? 'text-white' : 'text-slate-900'}`}>Industry Solutions</h3>
                              <p className={`text-[10px] font-medium mt-0.5 ${isDarkHeader ? 'text-neutral-400' : 'text-slate-500'}`}>23+ Industries We Serve</p>
                            </div>
                          </div>

                          {/* Grid of 24 Industries */}
                          <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                            {INDUSTRIES_DATA.map((ind, idx) => {
                              const IndIcon = ind.icon;
                              return (
                                <a
                                  key={idx}
                                  href="/industry-use-cases"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNav('/industry-use-cases');
                                  }}
                                  className={`flex items-center gap-2.5 p-1.5 rounded-xl transition-all duration-300 group/item cursor-pointer text-left ${
                                    isDarkHeader ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 ${ind.colorClass}`}>
                                    <IndIcon className="w-4 h-4 stroke-[1.8]" />
                                  </div>
                                  <span className={`text-[11px] font-bold font-sans tracking-wide leading-tight transition-colors duration-300 ${
                                    isDarkHeader ? 'text-neutral-300 group-hover/item:text-white' : 'text-slate-700 group-hover/item:text-slate-950'
                                  }`}>
                                    {ind.title}
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </div>

                        <div className={`mt-6 pt-4 border-t ${isDarkHeader ? 'border-white/10 text-neutral-500' : 'border-slate-100 text-slate-400'} flex items-center justify-between text-[9px] font-mono tracking-widest uppercase`}>
                          <span>Global Enterprise Coverage</span>
                          <span>Strata Quest Core</span>
                        </div>
                      </div>

                      {/* Right Column (AI-Driven Card & CTA) */}
                      <div className="w-[28%] bg-gradient-to-br from-[#0e1026] to-[#060714] p-7 flex flex-col justify-between relative overflow-hidden text-white border-l border-white/10 text-left">
                        {/* Decorative glow */}
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-pink-600/10 blur-3xl rounded-full pointer-events-none" />

                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                              <Brain className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold tracking-tight text-white leading-tight">AI-Driven</h3>
                              <p className="text-[10px] font-medium text-neutral-400 mt-0.5">Solutions</p>
                            </div>
                          </div>

                          {/* Stack of AI items */}
                          <div className="flex flex-col gap-3">
                            {[
                              { title: 'Smart Automation', desc: 'Workflows & agents', icon: Sparkles },
                              { title: 'ML Analytics', desc: 'Predictive modeling', icon: Cpu },
                              { title: 'AI Chatbots', desc: 'Conversational engines', icon: MessageSquare }
                            ].map((spec, i) => {
                              const SpecIcon = spec.icon;
                              return (
                                <div key={i} className="flex gap-3 items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300">
                                  <div className="w-8 h-8 rounded-lg bg-pink-500/15 text-pink-400 flex-shrink-0 flex items-center justify-center">
                                    <SpecIcon className="w-4 h-4 stroke-[1.8]" />
                                  </div>
                                  <div>
                                    <h5 className="text-[11px] font-bold font-sans text-white tracking-wide">{spec.title}</h5>
                                    <p className="text-[9px] text-neutral-400 mt-0.5 leading-normal font-medium">{spec.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Global Presence Section */}
                          <div className="mt-5">
                            <h4 className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-2 font-bold">Global Presence</h4>
                            <div className="flex gap-2">
                              {['USA', 'UK', 'India'].map((country) => (
                                <span key={country} className="flex-1 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-center text-neutral-300">
                                  {country}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Pink/Purple Gradient CTA Button */}
                        <div className="mt-6">
                          <button
                            onClick={() => handleNav('/ai-development')}
                            className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white rounded-xl flex items-center justify-center font-bold text-xs tracking-wide gap-2 shadow-lg shadow-pink-500/25 hover:scale-[1.02] transition-all cursor-pointer font-sans"
                          >
                            <span className="flex items-center gap-1.5">
                              AI Solutions <Sparkles className="w-3.5 h-3.5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className={`rounded-2xl p-4 shadow-soft border ${cardClass} backdrop-blur-xl`}>
                      <div className="grid grid-cols-1 gap-2">
                        {item.submenu?.map((sub, idx) => (
                          <a 
                            key={idx} 
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNav(sub.href);
                            }}
                            className={`flex flex-col p-2.5 rounded-xl transition-all duration-200 group/sub ${subLinkClass}`}
                          >
                            <span className="text-xs font-semibold flex items-center justify-between transition-colors">
                              {sub.title}
                              <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 transition-all ${isDarkHeader ? 'text-[#a78bfa]' : 'text-[#8B5CF6]'}`} />
                            </span>
                            <span className={`text-[10px] mt-1 font-normal leading-normal transition-colors ${subDescClass}`}>{sub.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <button 
              onClick={() => handleNav('#footer-section')}
              className={`hidden sm:flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkHeader 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-black text-white hover:bg-neutral-800 shadow-md'
              }`}
            >
              Get Quote
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex flex-col p-6 overflow-y-auto pointer-events-auto animate-in fade-in slide-in-from-left duration-300">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div onClick={() => { setMobileMenuOpen(false); handleNav('#hero-section'); }}>
              <Logo isDarkHeader={true} />
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white hover:opacity-75 transition-opacity"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex-1 py-8 flex flex-col gap-6">
            {MENU_ITEMS.map((item) => (
              <MobileAccordion 
                key={item.name} 
                item={item} 
                onNavigate={(href) => {
                  setMobileMenuOpen(false);
                  handleNav(href);
                }} 
                closeMenu={() => setMobileMenuOpen(false)} 
              />
            ))}
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                handleNav('#footer-section');
              }}
              className="w-full h-14 bg-white text-black font-semibold rounded-2xl flex items-center justify-center hover:bg-neutral-200 transition-colors"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};
