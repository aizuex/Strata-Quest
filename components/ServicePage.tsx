import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, Coins, TrendingUp, Server, Brain, Bot, Database, Search, 
  Layers, Lock, Shield, Activity, Code, Workflow, Users, Smartphone, 
  PenTool, Terminal, Settings, Globe, LineChart, Compass, BookOpen, 
  Heart, Network, ArrowLeft, ArrowRight, Wallet, Key, Zap,
  Apple, Laptop, Layout, Gamepad2
} from 'lucide-react';
import { Header } from './Header';

interface SubService {
  title: string;
  desc: string;
  icon: any;
}

interface SpecItem {
  title: string;
  desc: string;
  icon: any;
}

interface PageConfig {
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  glowColor: string;
  ctaColor: string;
  specColor: string;
  specTitleColor: string;
  subServices: SubService[];
  specs: SpecItem[];
  ctaText: string;
}

const PAGE_DATA: Record<string, PageConfig> = {
  'ai-development': {
    title: 'Artificial Intelligence',
    subtitle: 'Generative AI & Enterprise ML Solutions',
    icon: Brain,
    iconColor: 'text-[#8B5CF6] bg-[#8B5CF6]/10',
    glowColor: 'bg-[#8B5CF6]/5',
    ctaColor: 'from-[#8B5CF6] to-[#a78bfa] shadow-violet-500/15 hover:shadow-violet-500/25',
    specColor: 'bg-[#8B5CF6]/10 text-[#8B5CF6] group-hover/spec:bg-[#8B5CF6]',
    specTitleColor: 'group-hover/spec:text-[#a78bfa]',
    subServices: [
      { title: 'Generative AI Models', desc: 'Custom fine-tuned LLMs & GPT integrations.', icon: Bot },
      { title: 'AI Advisory & Audit', desc: 'Strategic AI adoption plans for enterprises.', icon: Compass },
      { title: 'Machine Learning Core', desc: 'Predictive analytics and smart models.', icon: Cpu },
      { title: 'Natural Language Processing', desc: 'Sentiment analysis and voice core systems.', icon: Globe },
      { title: 'Computer Vision Core', desc: 'Object tracking, classification, and OCR.', icon: EyeIcon }, // Fallback to custom SVG or another icon
      { title: 'Autonomous Agents', desc: 'Self-executing task agents and automations.', icon: Workflow },
      { title: 'Neural Vector Search', desc: 'Vector databases & semantic query overlays.', icon: Search },
      { title: 'Deep Neural Nets', desc: 'Tailor-made multi-layer network training.', icon: Network }
    ],
    specs: [
      { title: 'LLM Architectures', desc: 'Custom fine-tuning using LLaMA, GPT & Claude.', icon: Layers },
      { title: 'Distributed GPU Training', desc: 'Scale computing on AWS & GCP clusters.', icon: Server },
      { title: 'High Precision Models', desc: 'Fully validated systems with up to 99.8% precision.', icon: Zap },
      { title: 'Zero Trust Data Core', desc: 'Clean sanitization ensuring regulatory compliance.', icon: Shield }
    ],
    ctaText: 'Launch AI Workspace'
  },
  'blockchain-development': {
    title: 'Blockchain Development',
    subtitle: 'Web3 & Crypto Solutions',
    icon: Wallet,
    iconColor: 'text-orange-500 bg-orange-500/10',
    glowColor: 'bg-orange-500/5',
    ctaColor: 'from-orange-500 to-amber-500 shadow-orange-500/15 hover:shadow-orange-500/25',
    specColor: 'bg-orange-500/10 text-orange-500 group-hover/spec:bg-orange-500',
    specTitleColor: 'group-hover/spec:text-orange-400',
    subServices: [
      { title: 'Crypto Exchange Development', desc: 'High performance trading platforms.', icon: Coins },
      { title: 'Crypto Wallet Development', desc: 'Secure multi-currency custody apps.', icon: Key },
      { title: 'NFT Marketplace Development', desc: 'Responsive minting and auctions.', icon: PenTool },
      { title: 'DeFi Development', desc: 'AMMs, staking pools, and yield systems.', icon: TrendingUp },
      { title: 'Smart Contract Development', desc: 'Audited Solidity & Rust contract systems.', icon: Code },
      { title: 'Web3 Development', desc: 'Frontend apps integrated with wallet RPCs.', icon: Globe },
      { title: 'Token Development', desc: 'Custom tokenomics and vesting schedule core.', icon: Layers },
      { title: 'ICO Development', desc: 'Launchpad and funding ledger systems.', icon: Database },
      { title: 'MLM Software Development', desc: 'Decentralized referral rewards networks.', icon: Users },
      { title: 'Blockchain Consulting', desc: 'Technical audits and protocol selection.', icon: Settings }
    ],
    specs: [
      { title: 'Web3 Ready', desc: 'Seamless MetaMask, Coinbase & Phantom support.', icon: Globe },
      { title: 'Multi-Chain', desc: 'Bitcoin, Ethereum, Solana, Sui compatibility.', icon: Network },
      { title: 'Bank-Grade Security', desc: 'Multi-sig consensus and cold storage vaults.', icon: Lock },
      { title: 'High Performance', desc: 'Sub-second latency scaling up to 100K+ TPS.', icon: Zap }
    ],
    ctaText: 'Build Your Exchange'
  },
  'crypto-exchange-development': {
    title: 'Crypto Exchange Development',
    subtitle: 'High-Performance Digital Asset Trading Systems',
    icon: Coins,
    iconColor: 'text-[#00E5FF] bg-[#00E5FF]/10',
    glowColor: 'bg-[#00E5FF]/10',
    ctaColor: 'from-cyan-500 to-blue-500 shadow-cyan-500/15 hover:shadow-cyan-500/25',
    specColor: 'bg-[#00E5FF]/10 text-[#00E5FF] group-hover/spec:bg-[#00E5FF]',
    specTitleColor: 'group-hover/spec:text-[#00E5FF]',
    subServices: [
      { title: 'Spot Matching Engine', desc: 'Sub-millisecond latency order matching for limit, market, and stop orders.', icon: Cpu },
      { title: 'Liquidity Pools Aggregation', desc: 'Bridges to global automated market makers & order book pools.', icon: Network },
      { title: 'Derivatives & Leverage', desc: 'Margin accounts, perpetual swaps, and futures contracts infrastructure.', icon: TrendingUp },
      { title: 'High-Scale API Gateways', desc: 'Secure high-frequency WebSocket and REST interfaces for traders.', icon: Terminal },
      { title: 'HSM Multi-Sig Wallets', desc: 'Hardware-backed digital asset storage with multi-signature key clearance.', icon: Lock },
      { title: 'Administrative Backoffice', desc: 'Ledger audits, risk rules validation, and automated compliance logging.', icon: Database },
      { title: 'Fiat Clearing Gateways', desc: 'ACH, wire, and card payments rails integration with top custody banks.', icon: Coins },
      { title: 'Institutional Trading UI', desc: 'Professional custom chart dashboards, order books, and depth charts.', icon: Key }
    ],
    specs: [
      { title: '1M+ Matching TPS', desc: 'Ultra-low latency scalable match execution core.', icon: Zap },
      { title: 'Web3 Wallet Ready', desc: 'Direct browser wallet authentication via MetaMask & Phantom.', icon: Globe },
      { title: 'FIPS 140-2 Security', desc: 'Bank-grade cold vault cryptography clearance.', icon: Shield },
      { title: 'Zero Trust Infrastructure', desc: 'Fully sandboxed microservices with SOC2 compliance.', icon: Lock }
    ],
    ctaText: 'Build Your Exchange'
  },
  'crypto-integration': {
    title: 'Crypto Integration',
    subtitle: 'Institutional Asset & Payment Solutions',
    icon: Coins,
    iconColor: 'text-[#00E5FF] bg-[#00E5FF]/10',
    glowColor: 'bg-[#00E5FF]/5',
    ctaColor: 'from-cyan-500 to-blue-500 shadow-cyan-500/15 hover:shadow-cyan-500/25',
    specColor: 'bg-[#00E5FF]/10 text-[#00E5FF] group-hover/spec:bg-[#00E5FF]',
    specTitleColor: 'group-hover/spec:text-[#00E5FF]',
    subServices: [
      { title: 'Institutional Custody', desc: 'Secure multi-signature & MPC vaults.', icon: Lock },
      { title: 'Fiat Gateways', desc: 'Integrated credit card, wire, and ACH rails.', icon: Globe },
      { title: 'Validator Nodes', desc: 'High-availability staking validator pools.', icon: Server },
      { title: 'Trading Terminals', desc: 'Spot, margin, and algorithmic interfaces.', icon: Terminal },
      { title: 'Asset Tokenization', desc: 'Real-world asset (RWA) digital registries.', icon: Layers },
      { title: 'Liquidity Pools', desc: 'Smart order routing across top-tier DEXs.', icon: TrendingUp },
      { title: 'Compliance APIs', desc: 'Built-in KYC/AML transaction monitoring.', icon: Shield },
      { title: 'Arbitrage Engines', desc: 'Cross-venue automated spread capture.', icon: Cpu }
    ],
    specs: [
      { title: 'Hardware Security', desc: 'FIPS 140-2 Level 3 cryptographic modules.', icon: Shield },
      { title: 'Global Coverage', desc: 'Local currency conversions in 80+ countries.', icon: Globe },
      { title: 'SOC2 Compliant', desc: 'Complete security audits and policy coverage.', icon: Lock },
      { title: 'Connected Liquidity', desc: 'Direct routes to leading global market makers.', icon: Coins }
    ],
    ctaText: 'Setup Custody Vault'
  },
  'ondemand-developer-teams': {
    title: 'On-Demand Teams',
    subtitle: 'Elite Technical Talent on Tap',
    icon: Users,
    iconColor: 'text-[#D946EF] bg-[#D946EF]/10',
    glowColor: 'bg-[#D946EF]/5',
    ctaColor: 'from-[#D946EF] to-fuchsia-500 shadow-fuchsia-500/15 hover:shadow-fuchsia-500/25',
    specColor: 'bg-[#D946EF]/10 text-[#D946EF] group-hover/spec:bg-[#D946EF]',
    specTitleColor: 'group-hover/spec:text-fuchsia-400',
    subServices: [
      { title: 'Smart Contract Devs', desc: 'Senior Solidity, Rust & Vyper engineers.', icon: Code },
      { title: 'AI/ML Researchers', desc: 'Data scientists specializing in LLMs.', icon: Brain },
      { title: 'Full Stack Web3 Devs', desc: 'Frontend devs skilled in React & Wagmi.', icon: Smartphone },
      { title: 'Solutions Architects', desc: 'Cloud infrastructure & database specialists.', icon: Server },
      { title: 'UI/UX Designers', desc: 'Interactive visual layouts and mockups.', icon: PenTool },
      { title: 'Security Auditors', desc: 'Contract auditing & penetration testing.', icon: Shield },
      { title: 'DevOps Engineers', desc: 'Kubernetes & automated CI/CD pipelines.', icon: Settings },
      { title: 'Technical PMs', desc: 'Agile managers for blockchain lifecycles.', icon: Workflow }
    ],
    specs: [
      { title: 'Instant Scaling', desc: 'Deploy dedicated resources in under 72 hours.', icon: Zap },
      { title: 'Vetted Talent Only', desc: 'Multi-stage coding and design screening.', icon: Users },
      { title: 'Timezone Matching', desc: 'Overlapping work hours for coordination.', icon: Globe },
      { title: 'IP Ownership Transfer', desc: 'Complete copyright transfer on day one.', icon: Lock }
    ],
    ctaText: 'Hire Elite Developers'
  },
  'industry-use-cases': {
    title: 'Industry Solutions',
    subtitle: 'Enterprise Domain Ledger Solutions',
    icon: Layers,
    iconColor: 'text-[#10B981] bg-[#10B981]/10',
    glowColor: 'bg-[#10B981]/5',
    ctaColor: 'from-[#10B981] to-emerald-500 shadow-emerald-500/15 hover:shadow-emerald-500/25',
    specColor: 'bg-[#10B981]/10 text-[#10B981] group-hover/spec:bg-[#10B981]',
    specTitleColor: 'group-hover/spec:text-emerald-400',
    subServices: [
      { title: 'Fintech & Banking', desc: 'Payment rails and core banking APIs.', icon: Coins },
      { title: 'Supply Chain Ledger', desc: 'Immutable provenance logs and audit history.', icon: Workflow },
      { title: 'Healthcare Records', desc: 'Cryptographically secured medical ledgers.', icon: Heart },
      { title: 'Real Estate Registry', desc: 'Fractional property ownership contracts.', icon: Layers },
      { title: 'DePIN Protocols', desc: 'Decentralized physical infrastructure cores.', icon: Server },
      { title: 'Decentralized ID', desc: 'W3C-compliant self-sovereign identities.', icon: Key },
      { title: 'Gaming Ecosystems', desc: 'Play-to-earn tokens and secondary markets.', icon: Smartphone },
      { title: 'DAO Frameworks', desc: 'Automated treasury and voting contracts.', icon: Users }
    ],
    specs: [
      { title: 'Regulatory Standard', desc: 'Built to satisfy SOC2, HIPAA, and GDPR.', icon: Shield },
      { title: 'Legacy APIs', desc: 'Bridges to SAP, Oracle, and Salesforce DBs.', icon: Database },
      { title: 'Gas Efficiency', desc: 'Up to 80% database reconciliation savings.', icon: Zap },
      { title: 'Audit Readiness', desc: 'Instant cryptographic transaction verification.', icon: Key }
    ],
    ctaText: 'Consult Industry Experts'
  },
  'about-strata-quest': {
    title: 'About Strata Quest',
    subtitle: 'Architects of the Decentralized Future',
    icon: Network,
    iconColor: 'text-[#6366F1] bg-[#6366F1]/10',
    glowColor: 'bg-[#6366F1]/5',
    ctaColor: 'from-[#6366F1] to-indigo-500 shadow-indigo-500/15 hover:shadow-indigo-500/25',
    specColor: 'bg-[#6366F1]/10 text-[#6366F1] group-hover/spec:bg-[#6366F1]',
    specTitleColor: 'group-hover/spec:text-indigo-400',
    subServices: [
      { title: 'Our Core Mission', desc: 'Build secure, performant ledger infrastructures.', icon: Shield },
      { title: 'Technical Leadership', desc: 'Systems designers, cryptographers, and PhDs.', icon: Users },
      { title: 'Foundational Values', desc: 'Absolute transparency, performance, auditability.', icon: Key },
      { title: 'Engineering Stack', desc: 'Pioneering Rust, React, and Python frameworks.', icon: Terminal },
      { title: 'Strategic Advisory', desc: 'Vetting tokenomics schemes and listings.', icon: TrendingUp },
      { title: 'Audited Integrity', desc: 'Partnering with global top-tier auditing houses.', icon: Lock },
      { title: 'ZK Cryptography', desc: 'Developing zero-knowledge proof frameworks.', icon: Cpu },
      { title: 'Developer Support', desc: 'Active contributions to open-source protocols.', icon: Code }
    ],
    specs: [
      { title: 'Established 2021', desc: 'Proven track record of high-performance code.', icon: BookOpen },
      { title: 'Global Footprint', desc: 'Distributed desks in USA, Europe, and Asia.', icon: Globe },
      { title: 'Asset Security', desc: 'Over $100M+ secured under custom code bases.', icon: Shield },
      { title: 'Continuous Audits', desc: 'Subjected to double-blind testing procedures.', icon: Lock }
    ],
    ctaText: 'Connect with Our Founders'
  },
  'custom-app-development': {
    title: 'Custom App Development',
    subtitle: 'Bespoke Mobile, iOS, Android & Web Applications',
    icon: Smartphone,
    iconColor: 'text-blue-500 bg-blue-500/10',
    glowColor: 'bg-blue-500/5',
    ctaColor: 'from-blue-500 to-indigo-500 shadow-blue-500/15 hover:shadow-blue-500/25',
    specColor: 'bg-blue-500/10 text-blue-500 group-hover/spec:bg-blue-500',
    specTitleColor: 'group-hover/spec:text-blue-400',
    subServices: [
      { title: 'Mobile App Development', desc: 'High-performance cross-platform applications.', icon: Smartphone },
      { title: 'iOS App Development', desc: 'Native Swift apps optimized for Apple ecosystems.', icon: Apple },
      { title: 'Android App Development', desc: 'Native Kotlin applications for global scale.', icon: Smartphone },
      { title: 'Web App Development', desc: 'Responsive and progressive single-page applications.', icon: Globe },
      { title: 'Hybrid App Frameworks', desc: 'Single-codebase delivery using React Native or Flutter.', icon: Layers },
      { title: 'Backend Core API', desc: 'Scalable REST/GraphQL servers with secure access.', icon: Database }
    ],
    specs: [
      { title: 'Offline Support', desc: 'Local syncing and caching using SQLite.', icon: Database },
      { title: 'Push Notifications', desc: 'Real-time engagement via FCM and APNs.', icon: Zap },
      { title: 'Biometric Auth', desc: 'Secure login via FaceID & TouchID.', icon: Lock },
      { title: 'Cloud Infrastructure', desc: 'Auto-scaling deployments on AWS & GCP.', icon: Server }
    ],
    ctaText: 'Request App Architecture'
  },
  'software-development': {
    title: 'Software Development',
    subtitle: 'Enterprise Software, SaaS Applications & APIs',
    icon: Code,
    iconColor: 'text-violet-500 bg-violet-500/10',
    glowColor: 'bg-violet-500/5',
    ctaColor: 'from-violet-500 to-purple-500 shadow-violet-500/15 hover:shadow-violet-500/25',
    specColor: 'bg-violet-500/10 text-violet-500 group-hover/spec:bg-violet-500',
    specTitleColor: 'group-hover/spec:text-violet-400',
    subServices: [
      { title: 'Enterprise Software', desc: 'Custom ERP, CRM, and internal portal systems.', icon: Layers },
      { title: 'SaaS Platform Core', desc: 'Multi-tenant cloud services with subscription plans.', icon: Settings },
      { title: 'API Design & Integration', desc: 'Secure RESTful and GraphQL API bridges.', icon: Code },
      { title: 'Cloud Migration', desc: 'Moving legacy monoliths to microservices architectures.', icon: Server },
      { title: 'Database Engineering', desc: 'High-availability SQL and NoSQL configurations.', icon: Database },
      { title: 'System Optimization', desc: 'Identifying and solving code-level performance lags.', icon: Zap }
    ],
    specs: [
      { title: 'Microservices Core', desc: 'Decoupled, containerized apps using Docker & K8s.', icon: Network },
      { title: 'CI/CD Automations', desc: 'Continuous builds and deployments via GitHub Actions.', icon: Workflow },
      { title: 'Zero Downtime', desc: 'Blue-green and rolling deployments for updates.', icon: Shield },
      { title: 'Secure Auditing', desc: 'Complete data logs and permission controls.', icon: Lock }
    ],
    ctaText: 'Consult Software Architects'
  },
  'game-development': {
    title: 'Game Development',
    subtitle: 'Unity, Unreal Engine & Web3 Gaming Ecosystems',
    icon: Gamepad2,
    iconColor: 'text-amber-500 bg-amber-500/10',
    glowColor: 'bg-amber-500/5',
    ctaColor: 'from-amber-500 to-orange-500 shadow-amber-500/15 hover:shadow-amber-500/25',
    specColor: 'bg-amber-500/10 text-amber-500 group-hover/spec:bg-amber-500',
    specTitleColor: 'group-hover/spec:text-amber-400',
    subServices: [
      { title: 'Unity Game Development', desc: 'High-performance interactive games for desktop & console.', icon: Cpu },
      { title: 'Unreal Engine Design', desc: 'Photorealistic graphics and rich physics simulation.', icon: Laptop },
      { title: 'Mobile Game Development', desc: 'Addictive casual and mid-core mobile games.', icon: Smartphone },
      { title: 'Web3 & P2E Integration', desc: 'Decentralized reward contracts and asset minting.', icon: Coins },
      { title: 'Asset Pipeline Tooling', desc: 'Custom export scripts and graphic tools.', icon: PenTool },
      { title: 'Multiplayer Server Core', desc: 'Real-time lobbies, matchmaking, and state syncing.', icon: Network }
    ],
    specs: [
      { title: 'Cross-Platform Play', desc: 'Single-lobby support for iOS, Android, and PC.', icon: Globe },
      { title: 'Low-Latency Netcode', desc: 'Optimized UDP/WebSockets socket state networks.', icon: Zap },
      { title: 'Secure Asset Wallets', desc: 'In-game item protection using non-custodial wallets.', icon: Lock },
      { title: 'Rich Analytics', desc: 'Real-time telemetry and player behavior reports.', icon: Database }
    ],
    ctaText: 'Start Game Blueprint'
  },
  'web-development': {
    title: 'Web Development',
    subtitle: 'Interactive Frontends, Custom Portals & E-Commerce',
    icon: Globe,
    iconColor: 'text-emerald-500 bg-emerald-500/10',
    glowColor: 'bg-emerald-500/5',
    ctaColor: 'from-emerald-500 to-teal-500 shadow-emerald-500/15 hover:shadow-emerald-500/25',
    specColor: 'bg-emerald-500/10 text-emerald-500 group-hover/spec:bg-emerald-500',
    specTitleColor: 'group-hover/spec:text-emerald-400',
    subServices: [
      { title: 'Frontend Web Apps', desc: 'Ultra-responsive React, Next.js & Vue systems.', icon: Layout },
      { title: 'Backend Architectures', desc: 'Fast server layers in Node.js, Go, or Python.', icon: Terminal },
      { title: 'E-Commerce Platforms', desc: 'Custom payment checkouts, catalogs, and logs.', icon: Wallet },
      { title: 'CMS Portal Solutions', desc: 'Headless CMS setups for dynamic updates.', icon: Database },
      { title: 'Web Performance', desc: 'Optimizing web pages for instant loading speeds.', icon: Zap },
      { title: 'SEO & Accessibility', desc: 'W3C and WCAG compliance for maximum outreach.', icon: Globe }
    ],
    specs: [
      { title: 'Next-Gen Performance', desc: '99+ score on Google Lighthouse checks.', icon: Zap },
      { title: 'Global CDN Delivery', desc: 'Distributed edge servers for faster page load.', icon: Network },
      { title: 'Payment Gateways', desc: 'Integrated Stripe, PayPal, and Apple Pay checkouts.', icon: Wallet },
      { title: 'Secure SSL Audits', desc: 'Zero trust setups protecting user data logs.', icon: Shield }
    ],
    ctaText: 'Deploy Web Platform'
  }
};

// Fallback icon definition for computer vision
function EyeIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface ServicePageProps {
  type?: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ type }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const pageKey = type || categoryId || 'blockchain-development';
  const config = PAGE_DATA[pageKey] || PAGE_DATA['blockchain-development'];

  const IconComponent = config.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageKey]);

  return (
    <div className="min-h-screen text-slate-900 bg-slate-950 font-sans relative overflow-x-hidden">
      <Header isDarkHeaderOverride={true} />

      {/* Decorative Blur Gradients behind */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />

      {/* Animated subtle grid pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M40 0v80M0 40h80'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} 
      />

      {/* Back button */}
      <div className="max-w-[1600px] mx-auto pt-28 px-6 sm:px-12 md:px-16 pointer-events-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Core Appinop-style Showcase Card Area */}
      <div className="w-full px-6 sm:px-12 md:px-16 pb-24">
        <main className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl flex flex-col md:flex-row pointer-events-auto">
          
          {/* Left Column (Services Grid) */}
          <div className="md:w-3/5 bg-white/95 text-slate-900 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8 sm:mb-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${config.iconColor} shadow-md`}>
                  <IconComponent className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                    {config.title}
                  </h1>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              {/* Dynamic 2-Column Services List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-10">
                {config.subServices.map((sub, i) => {
                  const SubIcon = sub.icon;
                  return (
                    <div key={i} className="flex gap-3.5 group/item">
                      <div className="mt-0.5 w-9 h-9 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-700 group-hover/item:bg-slate-900 group-hover/item:text-white transition-all duration-300">
                        <SubIcon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800 group-hover/item:text-slate-900 transition-colors">
                          {sub.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-normal font-normal max-w-[220px]">
                          {sub.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px] font-mono tracking-widest uppercase">
              <span>Strata Quest Systems</span>
              <span>v3.0.4 Premium Core</span>
            </div>
          </div>

          {/* Right Column (High Impact Specs + CTA Button) */}
          <div className="md:w-2/5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12 md:p-14 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 relative overflow-hidden">
            {/* Dynamic Glowing circle decoration inside right column */}
            <div className={`absolute top-[-50px] right-[-50px] w-64 h-64 ${config.glowColor || 'bg-orange-500/5'} blur-[80px] rounded-full pointer-events-none`} />

            <div>
              <h2 className="text-lg font-mono font-bold tracking-widest text-[#00E5FF] uppercase mb-8">
                Capabilities
              </h2>

              {/* Vertical Stack of High Impact Specs */}
              <div className="flex flex-col gap-8">
                {config.specs.map((spec, i) => {
                  const SpecIcon = spec.icon;
                  return (
                    <div key={i} className="flex gap-4 items-start group/spec">
                      <div className={`w-10 h-10 rounded-xl ${config.specColor || 'bg-orange-500/10 text-orange-500 group-hover/spec:bg-orange-500'} flex-shrink-0 flex items-center justify-center group-hover/spec:scale-105 group-hover/spec:text-white transition-all duration-300`}>
                        <SpecIcon className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold text-white ${config.specTitleColor || 'group-hover/spec:text-[#00E5FF]'} transition-colors`}>
                          {spec.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 leading-normal font-normal">
                          {spec.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Brand Gradient CTA Button */}
            <div className="mt-14">
              <button className={`w-full py-4.5 bg-gradient-to-r ${config.ctaColor || 'from-orange-500 to-amber-500 shadow-orange-500/15 hover:shadow-orange-500/25'} text-white rounded-2xl flex items-center justify-center font-bold text-sm tracking-wide gap-2.5 hover:-translate-y-0.5 active:translate-y-0 hover:opacity-90 transition-all duration-300`}>
                <span>{config.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ServicePage;
