import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Shield, Lock, Zap, Globe, Server,
  Cpu, Database, Code, Users, Coins, Key, Network, Layers,
  Terminal, TrendingUp, ChevronDown, Wallet, CheckCircle2, Clock,
  BarChart3, Eye, Smartphone, Settings, PenTool
} from 'lucide-react';
import { Header } from './Header';

/* ═══════════════════════════════════════════════════════════════
   SHARED DECORATIVE COMPONENTS — matching Hero.tsx visual DNA
   ═══════════════════════════════════════════════════════════════ */

const PageDecorativeSVG = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 mix-blend-overlay" viewBox="0 0 1440 5000" preserveAspectRatio="xMidYMid slice">
    {/* Vertical guide lines */}
    <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="5,8" strokeOpacity="0.15" />
    <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#00E5FF" strokeWidth="1" strokeDasharray="5,8" strokeOpacity="0.1" />
    {/* Arc decorations */}
    <path d="M 1100 200 A 400 400 0 0 1 1500 600" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.15" />
    <path d="M -60 800 A 500 500 0 0 0 440 1300" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.1" />
    <circle cx="80%" cy="400" r="250" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.08" />
    <circle cx="20%" cy="1800" r="200" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.08" />
    <circle cx="70%" cy="3200" r="300" fill="none" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.06" />
  </svg>
);

const SectionLabel = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-2 text-[#00E5FF] font-semibold uppercase tracking-widest text-xs mb-6">
    <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
    <span className="font-mono">{text}</span>
  </div>
);

const SpecStat = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="group relative z-10 flex flex-col items-center text-center">
    <div className="absolute -inset-4 bg-slate-900/40 backdrop-blur-md rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/10 shadow-sm" />
    <div className="flex items-center gap-2 mb-2">
      <div className="h-[1px] w-6 bg-[#00E5FF]/40 group-hover:w-10 transition-all duration-500" />
      <span className="text-[9px] font-mono tracking-widest text-[#00E5FF] uppercase">{label}</span>
      <div className="h-[1px] w-6 bg-[#00E5FF]/40 group-hover:w-10 transition-all duration-500" />
    </div>
    <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white mb-1">{value}</h4>
    <p className="text-[10px] sm:text-xs font-medium text-neutral-400 max-w-[160px]">{sub}</p>
  </div>
);

const GlassCard = ({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean; key?: any }) => (
  <div className={`glass-panel-dark rounded-3xl p-6 sm:p-8 transition-all duration-500 ${hover ? 'hover:-translate-y-2 hover:shadow-glow glow-hover-purple' : ''} ${className}`}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO BANNER
   ═══════════════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section className="relative min-h-[90dvh] flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-32 pb-16 pointer-events-none text-center">
    <main className="max-w-4xl pointer-events-auto flex flex-col items-center">
      {/* Tagline */}
      <div className="mb-6 md:mb-8 flex items-center gap-3 font-semibold text-xs md:text-base">
        <span className="font-bold text-[#00E5FF]">→</span>
        <span className="text-neutral-300">Enterprise Blockchain Solutions</span>
      </div>

      {/* Big serif headline */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.1] md:leading-[0.95] font-medium text-white tracking-[-0.03em]">
          Crypto Exchange <br className="hidden md:block" />
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-2">
            <span className="relative font-serif italic font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6.0rem] text-[#00E5FF]">
              "Development"
            </span>
          </div>
        </h1>
      </div>

      <p className="text-neutral-400 text-sm md:text-lg leading-relaxed mb-10 md:mb-16 max-w-lg font-normal">
        We build secure, scalable cryptocurrency exchange platforms — CEX, DEX, and P2P
        exchanges engineered for high-frequency trading, deep liquidity, and global compliance.
      </p>

      {/* CTA buttons matching Hero style */}
      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full sm:w-auto mb-10">
        <button className="group relative flex items-center justify-between bg-black text-white rounded-full pl-6 md:pl-8 pr-2 py-2 h-14 md:h-16 w-full sm:w-auto min-w-[220px] hover:bg-neutral-800 transition-all duration-300 cursor-pointer shadow-xl active:scale-95">
          <span className="text-sm md:text-base font-medium">Get Started</span>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00E5FF] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </div>
        </button>
        <button className="group relative flex items-center justify-center px-8 md:px-10 h-14 md:h-16 text-neutral-300 hover:text-white transition-colors cursor-pointer w-full sm:w-auto font-bold">
          <span className="text-sm font-medium z-10 relative group-hover:scale-105 transition-transform">Book a Demo</span>
        </button>
      </div>

      {/* Bottom badge strip */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[
          { icon: Shield, label: 'Bank-Grade Security' },
          { icon: Zap, label: '100K+ TPS' },
          { icon: Network, label: 'Multi-Chain' },
          { icon: Lock, label: 'Compliance Ready' }
        ].map((b, i) => {
          const BIcon = b.icon;
          return (
            <span key={i} className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-2">
              <BIcon className="w-3 h-3 text-[#00E5FF]" />
              {b.label}
            </span>
          );
        })}
      </div>
    </main>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — STATS HUD (matching Enterprise Ecosystem section)
   ═══════════════════════════════════════════════════════════════ */
const StatsHUDSection = () => (
  <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center bg-grid-pattern-dark pointer-events-none overflow-hidden">
    <div className="text-center mb-16 pointer-events-auto px-6">
      <div className="inline-block relative">
        <div className="absolute inset-0 bg-[#00E5FF]/10 blur-xl rounded-full" />
        <h3 className="relative text-2xl md:text-5xl font-serif italic text-white mb-2 md:mb-4">Exchange Core</h3>
      </div>
      <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-slate-900/40 backdrop-blur-md">
        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/70">Trading Engine v3.0</span>
      </div>
    </div>

    <div className="max-w-[1200px] w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pointer-events-auto px-6 sm:px-12">
      <SpecStat label="Throughput" value="100K+" sub="Orders matched per second." />
      <SpecStat label="Uptime" value="99.99%" sub="Enterprise SLA guaranteed." />
      <SpecStat label="Chains" value="50+" sub="Multi-chain network support." />
      <SpecStat label="Security" value="HSM" sub="Hardware security modules." />
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — WHAT IS CRYPTO EXCHANGE DEVELOPMENT
   ═══════════════════════════════════════════════════════════════ */
const WhatIsSection = () => (
  <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <SectionLabel text="Understanding the Basics" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
          What Is Cryptocurrency <br />
          <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">Exchange Development?</span>
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          The process of building a secure, scalable digital asset trading platform — 
          with order matching engines, liquidity pools, wallet management, KYC/AML compliance,
          and multi-layer security infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Trading App vs Exchange */}
        <GlassCard hover={false} className="p-6 sm:p-8">
          <h3 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">Trading App</h3>
          <ul className="space-y-4">
            {['Basic buy/sell interface', 'Relies on 3rd party exchange', 'Limited order types', 'No liquidity ownership'].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 flex-shrink-0" />
                <span className="text-sm text-neutral-500">{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 border-[#00E5FF]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00E5FF]/50" />
          <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase mb-6">Exchange Platform</h3>
          <ul className="space-y-4">
            {['Full trading engine with order book', 'Own liquidity pools & market making', 'Advanced order types & derivatives', 'Revenue from trading fees'].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Who needs it — glass cards with gradient icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { title: 'Startups', desc: 'Launching new trading platforms', icon: Zap },
          { title: 'Enterprises', desc: 'Expanding into crypto markets', icon: TrendingUp },
          { title: 'Institutions', desc: 'Banks & financial services', icon: Shield }
        ].map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <GlassCard key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                <ItemIcon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 tracking-tight">{item.title}</h4>
              <p className="text-sm text-neutral-400 font-normal">{item.desc}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — OUR SERVICES (glass card grid like homepage)
   ═══════════════════════════════════════════════════════════════ */
const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const services = [
    { num: '01', title: 'Exchange Consulting', icon: Coins, desc: 'Navigate the complex cryptocurrency landscape with expert guidance. Regulatory compliance, market entry strategy, and revenue model optimization.', tags: ['Strategy', 'Compliance', 'Market Entry'] },
    { num: '02', title: 'Custom Exchange Development', icon: Cpu, desc: 'End-to-end development of custom cryptocurrency exchange platforms with high-performance matching engines and institutional-grade security.', tags: ['Matching Engine', 'Multi-Chain', 'Custom UI'] },
    { num: '03', title: 'White Label Exchange', icon: Layers, desc: 'Launch your branded crypto exchange fast with our battle-tested white-label solution. Fully customizable UI/UX, ready to deploy in weeks.', tags: ['Quick Launch', 'Branded', 'Pre-Built'] },
    { num: '04', title: 'Crypto Wallet Development', icon: Wallet, desc: 'Secure multi-currency wallets with HSM key management supporting hot, warm, and cold storage architectures for maximum asset protection.', tags: ['HSM', 'Multi-Chain', 'Biometric'] },
    { num: '05', title: 'Payment Gateway', icon: Globe, desc: 'Accept crypto payments seamlessly with support for 50+ cryptocurrencies, instant fiat settlement options, and merchant dashboards.', tags: ['50+ Crypto', 'Fiat Rails', 'Dashboard'] }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <SectionLabel text="Our Services" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Premium Exchange <br />
            <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">Development Services.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const SIcon = s.icon;
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`glass-panel-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  active === i ? 'hover:shadow-glow glow-hover-purple -translate-y-1 border-[#00E5FF]/20' : 'hover:-translate-y-2 hover:shadow-glow glow-hover-purple'
                }`}
              >
                {active === i && <div className="absolute top-0 left-0 w-1 h-full bg-[#00E5FF]/60" />}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <SIcon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="text-2xl font-mono font-bold text-white/10 group-hover:text-[#00E5FF]/30 transition-colors">{s.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight text-white group-hover:text-white transition-colors duration-300">{s.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-normal transition-colors duration-300">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — EXCHANGE TYPES (tabs with glass panel content)
   ═══════════════════════════════════════════════════════════════ */
const ExchangeTypesSection = () => {
  const [tab, setTab] = useState(0);
  const types = [
    { id: 'CEX', label: 'Centralized', tagline: 'Like Binance & Coinbase', desc: 'High-performance centralized platforms with institutional-grade order matching, deep liquidity pools, and real-time market data.', tags: ['Order Book', 'Fiat Gateway', 'High Liquidity', 'Fast Execution'], benefit: 'Fastest execution with deep liquidity', bestFor: 'Retail traders seeking fiat on/off ramps' },
    { id: 'DEX', label: 'Decentralized', tagline: 'Like Uniswap & PancakeSwap', desc: 'Non-custodial exchanges built on AMM protocols. Users trade directly from their wallets without intermediaries.', tags: ['AMM Protocol', 'Non-Custodial', 'Liquidity Pools', 'Yield Farming'], benefit: 'True decentralization with no custody risk', bestFor: 'DeFi-native users prioritizing self-custody' },
    { id: 'Hybrid', label: 'Hybrid', tagline: 'Best of CEX + DEX', desc: 'Combines CEX speed with DEX security. Off-chain order matching with on-chain settlement for optimal performance.', tags: ['Off-chain Matching', 'On-chain Settlement', 'Self-Custody', 'High Speed'], benefit: 'CEX speed with DEX-level security', bestFor: 'Platforms targeting both retail and institutional' },
    { id: 'P2P', label: 'Peer-to-Peer', tagline: 'Like Paxful & LocalBitcoins', desc: 'Direct buyer-seller connections with escrow-based transactions, multiple payment methods, and dispute resolution.', tags: ['Escrow System', 'Local Payments', 'No Intermediary', 'Global Reach'], benefit: 'Direct trading with local payment support', bestFor: 'Markets with limited banking access' },
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <SectionLabel text="Exchange Solutions" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Types of Exchanges <br />
            <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">We Develop.</span>
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {types.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={`px-6 py-3 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                tab === i
                  ? 'bg-white/10 border border-[#00E5FF]/30 text-[#00E5FF] shadow-glow'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/8'
              }`}
            >
              {t.id}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="glass-panel-dark rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00E5FF]/50 to-transparent" />

          <div className="flex items-baseline gap-4 mb-2">
            <h3 className="text-2xl sm:text-3xl font-serif italic text-white">{types[tab].label}</h3>
            <span className="text-xs text-neutral-500 font-mono italic">{types[tab].tagline}</span>
          </div>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">{types[tab].desc}</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-white/3 border border-white/5">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#00E5FF] uppercase">Key Benefit</span>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">{types[tab].benefit}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/3 border border-white/5">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#00E5FF] uppercase">Best For</span>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">{types[tab].bestFor}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {types[tab].tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — CORE FEATURES (ServiceCard-style grid)
   ═══════════════════════════════════════════════════════════════ */
const FeaturesSection = () => {
  const features = [
    { title: 'Trading Engine', metric: '100K+ TPS', icon: Cpu, desc: 'Institutional-grade matching engine with sub-millisecond latency for limit, market, stop, and conditional orders.', tags: ['Price Discovery', 'Order Book', 'Real-time', 'Advanced Orders'] },
    { title: 'Multi-Currency Wallets', metric: '200+ Coins', icon: Wallet, desc: 'Secure hot, warm, and cold wallet architecture supporting 200+ cryptocurrencies with HSM key management.', tags: ['Hot/Cold', 'HSM', 'Multi-Chain', 'Auto-Sweep'] },
    { title: 'Liquidity Integration', metric: 'Deep Pools', icon: TrendingUp, desc: 'Connect to top-tier liquidity providers for tight spreads with smart order routing across venues.', tags: ['LP Aggregation', 'Smart Routing', 'Market Making'] },
    { title: 'KYC/AML Compliance', metric: 'Global Ready', icon: Shield, desc: 'AI-powered identity verification with global regulatory compliance for transaction monitoring.', tags: ['ID Verify', 'Sanctions', 'AML Monitor', 'FATF'] },
    { title: 'Admin Dashboard', metric: 'Full Control', icon: Settings, desc: 'Comprehensive admin panel with real-time analytics, user management, and compliance reporting.', tags: ['Analytics', 'User Mgmt', 'Audit Logs', 'Reports'] },
    { title: 'High-Performance APIs', metric: 'REST + WS', icon: Terminal, desc: 'Developer-friendly REST and WebSocket APIs for algorithmic trading and third-party integrations.', tags: ['REST API', 'WebSocket', 'Bot Support', 'SDK'] },
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <SectionLabel text="Platform Capabilities" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Core Features <br />
            <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">Of Our Exchange Platforms.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <div key={i} className="glass-panel-dark hover:glass-panel-light rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:shadow-glow glow-hover-purple cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <FIcon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-slate-900/40 backdrop-blur-md text-[10px] font-mono tracking-wider text-[#00E5FF] group-hover:bg-black/5 group-hover:border-black/10 group-hover:text-secondary transition-colors duration-300">{f.metric}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight text-white group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                  <p className="text-neutral-400 group-hover:text-secondary text-sm leading-relaxed mb-6 font-normal transition-colors duration-300">{f.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 group-hover:bg-black/5 group-hover:border-black/10 group-hover:text-secondary transition-colors duration-300">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — SECURITY & COMPLIANCE
   ═══════════════════════════════════════════════════════════════ */
const SecuritySection = () => (
  <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <SectionLabel text="Trust & Protection" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
          Security & Compliance <br />
          <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">Multi-Layered Protection.</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Cold & Hot Wallets', badge: '95% Cold', icon: Wallet, desc: 'Multi-tier wallet architecture with HSM key management. Hot wallets for operations, cold storage for security.' },
          { title: 'DDoS Protection', badge: 'Always-On', icon: Shield, desc: 'Enterprise-grade DDoS mitigation with AI-powered threat detection running 24/7.' },
          { title: 'Penetration Testing', badge: 'Quarterly', icon: Eye, desc: 'OWASP Top 10 security assessments by certified ethical hackers with continuous scanning.' },
          { title: 'Smart Contract Audits', badge: 'Third-Party', icon: Code, desc: 'Independent smart contract audits with formal verification before deployment.' }
        ].map((card, i) => {
          const CIcon = card.icon;
          return (
            <GlassCard key={i}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white mb-5">
                <CIcon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#00E5FF] inline-block mb-4">{card.badge}</span>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{card.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">{card.desc}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Compliance strip */}
      <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/30 to-transparent" />
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-5">Regulatory Readiness</span>
        <div className="flex flex-wrap gap-3">
          {['KYC/AML', 'GDPR', 'SOC 2', 'PCI-DSS', 'FATF', 'MiCA'].map((b, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-neutral-300 tracking-wider">{b}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — TECH STACK
   ═══════════════════════════════════════════════════════════════ */
const TechStackSection = () => {
  const cats = [
    { title: 'Backend', sub: 'Server & APIs', icon: Server, techs: ['Node.js', 'Go', 'Python', 'Rust', 'gRPC', 'GraphQL'] },
    { title: 'Frontend', sub: 'Web & Mobile UI', icon: Smartphone, techs: ['React', 'Next.js', 'TypeScript', 'TradingView', 'React Native', 'Tailwind'] },
    { title: 'Blockchain', sub: 'Networks & Contracts', icon: Network, techs: ['Ethereum', 'Solana', 'BNB Chain', 'Polygon', 'Bitcoin', 'Avalanche'] },
    { title: 'Databases', sub: 'Storage & Caching', icon: Database, techs: ['PostgreSQL', 'MongoDB', 'Redis', 'TimescaleDB', 'Elasticsearch', 'ClickHouse'] },
    { title: 'Cloud & DevOps', sub: 'Infrastructure', icon: Globe, techs: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus'] },
    { title: 'Security Tools', sub: 'Contracts & Audit', icon: Lock, techs: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Web3.js', 'Ethers.js', 'Foundry'] }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern-dark">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <SectionLabel text="Our Technology" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Technology Stack <br />
            <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">Enterprise-Grade.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat, i) => {
            const CIcon = cat.icon;
            return (
              <GlassCard key={i} className="group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <CIcon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                    <p className="text-[10px] text-neutral-500">{cat.sub}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((t, j) => (
                    <span key={j} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">{t}</span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — DEVELOPMENT PROCESS
   ═══════════════════════════════════════════════════════════════ */
const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Requirement Analysis', desc: 'Exchange type selection, feature specification, compliance roadmap, and security architecture planning.', icon: BarChart3 },
    { num: '02', title: 'UI/UX Design', desc: 'Trading dashboard wireframes, real-time charts, mobile-first responsive design, and user flow optimization.', icon: PenTool },
    { num: '03', title: 'Core Development', desc: 'High-performance matching engine, multi-chain wallet system, REST & WebSocket APIs, liquidity integration.', icon: Code },
    { num: '04', title: 'Security & Testing', desc: 'Penetration testing, smart contract audits, multi-sig implementation, load & stress testing.', icon: Shield },
    { num: '05', title: 'Deployment & Support', desc: 'Cloud infrastructure setup, 24/7 monitoring, performance optimization, continuous updates & scaling.', icon: Zap }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <SectionLabel text="Development Process" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Our Proven Process <br />
            <span className="not-italic font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-200">From Concept to Launch.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => {
            const SIcon = step.icon;
            return (
              <div key={i} className="glass-panel-dark hover:glass-panel-light rounded-3xl p-6 sm:p-8 group transition-all duration-500 hover:-translate-y-1 hover:shadow-glow glow-hover-purple cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-[#00E5FF]/20 transition-all" />
                <div className="flex items-start gap-6">
                  <div className="hidden sm:flex flex-col items-center">
                    <span className="text-3xl font-mono font-bold bg-gradient-to-b from-[#00E5FF] to-[#00E5FF]/20 bg-clip-text text-transparent">{step.num}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#00E5FF] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <SIcon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-sm text-neutral-400 group-hover:text-secondary leading-relaxed font-normal transition-colors">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 — PRICING
   ═══════════════════════════════════════════════════════════════ */
const PricingSection = () => {
  const tiers = [
    { name: 'Starter', time: '2-4 Weeks', popular: false, features: ['White-label platform', 'Custom branding', '10 blockchains', 'Basic spot trading', 'Standard security', 'Email support', 'Mobile responsive'] },
    { name: 'Professional', time: '1-2 Months', popular: true, features: ['Custom trading engine', 'Full UI/UX design', '30+ blockchains', 'Spot + margin trading', 'Enhanced security', 'Priority support', 'iOS & Android apps', 'Advanced analytics'] },
    { name: 'Enterprise', time: '3-5 Months', popular: false, features: ['Enterprise matching engine', 'Complete customization', '50+ blockchains', 'Full trading suite', 'Military-grade security', '24/7 dedicated support', 'Premium apps', 'Derivatives & options'] }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern-dark">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <SectionLabel text="Exchange Solutions" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Choose Your Plan<span className="text-[#00E5FF]">.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div key={i} className={`glass-panel-dark rounded-3xl p-7 sm:p-8 flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-glow ${t.popular ? 'glow-hover-purple border-[#00E5FF]/20' : 'glow-hover-purple'}`}>
              {t.popular && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#00E5FF]" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#00E5FF] text-[10px] font-bold text-white tracking-wide uppercase">Most Popular</div>
                </>
              )}

              <div className="mb-6 mt-2">
                <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">{t.name}</h3>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="text-xs font-mono text-[#00E5FF]">{t.time}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] flex-shrink-0" />
                    <span className="text-xs text-neutral-300">{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`group relative flex items-center justify-between rounded-full pl-6 pr-2 py-2 h-12 w-full transition-all duration-300 cursor-pointer active:scale-95 ${
                t.popular ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
                <span className="text-sm font-medium">Get Custom Quote</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform ${
                  t.popular ? 'bg-[#00E5FF] text-black' : 'bg-white/10 text-white'
                }`}>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 11 — FAQ ACCORDION
   ═══════════════════════════════════════════════════════════════ */
const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: 'How much does crypto exchange development cost?', a: 'Costs vary by complexity. White-label solutions are the most affordable. Custom exchanges with advanced features cost more. Enterprise-grade platforms with full derivatives support are the most comprehensive. Contact us for a tailored quote.' },
    { q: 'How long does it take to build?', a: 'White-label: 2-4 weeks. Custom exchanges: 1-2 months. Enterprise-grade: 3-5 months. Timeline depends on exchange type, features, compliance, and integrations.' },
    { q: 'What exchange types can you build?', a: 'We build CEX, DEX, P2P, hybrid, margin/derivatives platforms, and white-label solutions. Each optimized for its specific use case.' },
    { q: 'Is the platform scalable?', a: 'Yes. Cloud-native architecture supports horizontal scaling, auto-scaling, load balancing, and multi-region deployment for growing user bases.' },
    { q: 'What security measures are implemented?', a: 'Multi-layer security: cold/hot wallets, multi-sig, DDoS protection, penetration testing, smart contract audits, 2FA, encryption, and continuous monitoring.' },
    { q: 'Do you help with regulatory compliance?', a: 'Yes. Built-in KYC/AML, GDPR, transaction monitoring, and suspicious activity reporting across multiple jurisdictions.' }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern">
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          <SectionLabel text="Got Questions?" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">
            Frequently Asked<span className="text-[#00E5FF]">.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`glass-panel-dark rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'border-[#00E5FF]/20' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-[#00E5FF]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#00E5FF] transition-colors">{faq.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-[#00E5FF]' : ''}`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-14 text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION 12 — FINAL CTA (matching Hero footer magnetic portal)
   ═══════════════════════════════════════════════════════════════ */
const CTASection = () => (
  <section className="relative w-full min-h-[70dvh] flex flex-col items-center justify-center py-20 pointer-events-none overflow-hidden px-6 sm:px-12 md:px-16 bg-grid-pattern-dark">
    <div className="relative z-20 flex flex-col items-center justify-center w-full pointer-events-none text-center">
      <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-[#00E5FF] mb-8 pointer-events-auto">Ready to Build?</span>

      <div className="flex flex-col items-center mb-16 md:mb-20 pointer-events-auto relative z-10">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-white leading-none tracking-tight">
          Start Your
        </h2>
        <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold text-[#00E5FF] leading-none tracking-tight -mt-2 md:-mt-4 relative block">
          Exchange.
        </span>
      </div>

      {/* Magnetic portal CTA card */}
      <div className="relative group cursor-pointer w-full max-w-xs sm:max-w-sm mx-auto pointer-events-auto z-20">
        <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105 group-hover:shadow-glow glow-hover-purple">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00E5FF]/50 group-hover:bg-[#00E5FF] transition-colors" />
          <button className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-white">
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#00E5FF] mb-1">Schedule Consultation</span>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">Contact Team</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-lg">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </div>
          </button>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent group-hover:via-[#00E5FF]/70 transition-all" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        <div className="absolute -bottom-8 left-0 w-full flex justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span>Ready to build</span>
          <span>Secure Channel</span>
        </div>
      </div>
    </div>

    <div className="absolute bottom-10 w-full px-6 md:px-10 flex justify-between items-end pointer-events-auto text-neutral-400">
      <p className="text-[10px] md:text-xs font-mono w-full md:w-auto text-center md:text-right">
        STRATA QUEST<br />EXCHANGE CORE
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const CryptoExchangePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden">
      <Header isDarkHeaderOverride={true} />
      <PageDecorativeSVG />

      {/* Floating blur gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-[#8B5CF6]/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#00E5FF]/3 blur-[150px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-28 left-6 sm:left-12 md:left-16 lg:left-24 z-20">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group pointer-events-auto">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <StatsHUDSection />
        <WhatIsSection />
        <ServicesSection />
        <ExchangeTypesSection />
        <FeaturesSection />
        <SecuritySection />
        <TechStackSection />
        <ProcessSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
};

export default CryptoExchangePage;
