import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Shield, Lock, Zap, Globe, Server,
  Cpu, Database, Code, Users, Coins, Key, Network, Layers,
  Terminal, TrendingUp, ChevronDown, Wallet, CheckCircle2, Clock,
  Eye, Smartphone, Settings, PenTool, Play, Check, AlertTriangle, Activity
} from 'lucide-react';
import { Header } from './Header';

/* ═══════════════════════════════════════════════════════════════
   DECORATIVE DESIGN SYSTEMS
   ═══════════════════════════════════════════════════════════════ */

const PageDecorativeSVG = ({ themeColor }: { themeColor: string }) => {
  const color1 = themeColor === 'violet' ? '#8B5CF6' :
                 themeColor === 'fuchsia' ? '#D946EF' :
                 themeColor === 'orange' ? '#F59E0B' :
                 themeColor === 'teal' ? '#14B8A6' :
                 themeColor === 'cyan' ? '#00E5FF' :
                 themeColor === 'rose' ? '#F43F5E' :
                 themeColor === 'purple' ? '#A855F7' :
                 themeColor === 'yellow' ? '#EAB308' : '#6366F1';
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25 mix-blend-overlay" viewBox="0 0 1440 3000" preserveAspectRatio="xMidYMid slice">
      {/* Vertical dotted guide rails */}
      <line x1="15%" y1="0" x2="15%" y2="100%" stroke={color1} strokeWidth="1" strokeDasharray="4,8" strokeOpacity="0.12" />
      <line x1="85%" y1="0" x2="85%" y2="100%" stroke={color1} strokeWidth="1" strokeDasharray="4,8" strokeOpacity="0.1" />
      
      {/* Dynamic curves and circles */}
      <path d="M -100 300 C 300 400 400 100 800 600" fill="none" stroke={color1} strokeWidth="1.5" strokeOpacity="0.15" />
      <circle cx="85%" cy="300" r="180" fill="none" stroke={color1} strokeWidth="1.2" strokeOpacity="0.1" />
      <circle cx="15%" cy="1200" r="220" fill="none" stroke={color1} strokeWidth="1" strokeOpacity="0.08" />
      <circle cx="75%" cy="2200" r="300" fill="none" stroke={color1} strokeWidth="1.5" strokeOpacity="0.06" strokeDasharray="6,6" />
    </svg>
  );
};

const SectionLabel = ({ text, colorClass }: { text: string; colorClass: string }) => (
  <div className={`inline-flex items-center gap-2 ${colorClass} font-semibold uppercase tracking-widest text-[10px] sm:text-xs mb-6`}>
    <div className={`w-2 h-2 rounded-full current-bg animate-pulse`} style={{ backgroundColor: 'currentColor' }} />
    <span className="font-mono">{text}</span>
  </div>
);

const GlassCard = ({ children, className = '', hover = true, theme = 'purple' }: { children: React.ReactNode; className?: string; hover?: boolean; theme?: string }) => {
  const glowClass = theme === 'violet' ? 'glow-hover-purple' :
                    theme === 'fuchsia' ? 'glow-hover-purple' :
                    theme === 'orange' ? 'glow-hover-cyan' :
                    theme === 'teal' ? 'glow-hover-cyan' :
                    theme === 'cyan' ? 'glow-hover-cyan' :
                    theme === 'rose' ? 'glow-hover-purple' :
                    theme === 'purple' ? 'glow-hover-purple' :
                    theme === 'yellow' ? 'glow-hover-cyan' : 'glow-hover-purple';
  
  return (
    <div className={`glass-panel-dark rounded-3xl p-6 sm:p-8 transition-all duration-500 ${hover ? `hover:-translate-y-1.5 hover:shadow-glow ${glowClass}` : ''} ${className}`}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CONFIGURABLE DATA & CONTENT FOR 9 BLOCKCHAIN SERVICES
   ═══════════════════════════════════════════════════════════════ */

interface ServiceDetailConfig {
  id: string;
  title: string;
  subtitle: string;
  highlightWord: string;
  themeColor: string; // violet | fuchsia | orange | teal | cyan | rose | purple | yellow | indigo
  icon: any;
  conceptTitle: string;
  conceptDesc: string;
  providedTitle: string;
  providedDesc: string;
  
  // Custom stats
  stats: { label: string; value: string; sub: string }[];
  
  // Features Grid
  features: { title: string; desc: string; icon: any }[];
  
  // Success Case Study
  caseStudy: {
    client: string;
    challenge: string;
    solution: string;
    result: string;
  };
}

const SERVICES_DATA: Record<string, ServiceDetailConfig> = {
  'crypto-wallet-development': {
    id: 'crypto-wallet-development',
    title: 'Crypto Wallet Development',
    subtitle: 'Secure Multi-Currency Non-Custodial Custody Solutions',
    highlightWord: 'Custody',
    themeColor: 'violet',
    icon: Wallet,
    conceptTitle: 'What is Crypto Wallet Development?',
    conceptDesc: 'It is the engineering of secure interfaces that store private cryptographic keys, communicate with multi-chain nodes, and sign transaction payloads. Rather than holding actual tokens, a wallet holds the credentials to access tokens ledgered on the blockchain. Modern wallet architecture uses Multi-Party Computation (MPC), BIP-39 seed phrase protocols, and hardware key clearance to eliminate single points of failure.',
    providedTitle: 'How Strata Quest Delivers Secure Custody',
    providedDesc: 'We build institutional and retail-grade wallet infrastructures utilizing hardware security modules (HSM) and cold storage vault layouts. We have implemented biometrically secured mobile wallets with custom transaction fee auto-sweeps, multi-sig consensus pipelines, and full support for MetaMask, WalletConnect, and Solana RPC networks.',
    stats: [
      { label: 'Asset Protection', value: '$120M+', sub: 'Total transaction volume secured.' },
      { label: 'Blockchains', value: '60+', sub: 'Supported EVM & Rust networks.' },
      { label: 'Security Grade', value: 'FIPS 3', sub: 'Institutional standard modules.' }
    ],
    features: [
      { title: 'MPC Cryptography', desc: 'Secure key shares distributed across nodes, avoiding complete key exposure.', icon: Lock },
      { title: 'Biometric Integration', desc: 'Face ID and fingerprint authentication with secure hardware enclaves.', icon: Smartphone },
      { title: 'Gas-Optimization Sweeper', desc: 'Automated queue matching to dispatch sign-offs during low fee rates.', icon: Zap },
      { title: 'Multi-Chain Node RPC', desc: 'Seamlessly query balances across Bitcoin, EVM, and Solana networks.', icon: Network }
    ],
    caseStudy: {
      client: 'Apex Capital Vaults',
      challenge: 'The client needed an institutional digital asset wallet that supported high-volume trading triggers without storing full private keys on a single vulnerable cloud server.',
      solution: 'We engineered a multi-party computation (MPC) wallet with a 3-of-4 key share signature model, utilizing secure AWS Nitro Enclaves for real-time compliance checking.',
      result: 'Successfully launched supporting $15M daily throughput with zero security breaches and 40% faster transaction clearance.'
    }
  },
  'nft-marketplace-development': {
    id: 'nft-marketplace-development',
    title: 'NFT Marketplace Development',
    subtitle: 'High-Throughput Digital Collectibles & Tokenization Portals',
    highlightWord: 'Minting',
    themeColor: 'fuchsia',
    icon: PenTool,
    conceptTitle: 'Understanding NFT Marketplace Engines',
    conceptDesc: 'NFT marketplace development involves building public smart contracts, decentralized file registries (like IPFS or Arweave), and high-speed metadata querying indexers. A successful platform manages listing, minting, auction logic, secondary sales royalties, and fractionalized ownership rules, all while maintaining absolute clarity of asset provenance.',
    providedTitle: 'How Strata Quest Engineers Digital Markets',
    providedDesc: 'We deliver bespoke NFT portals equipped with lazy-minting (gas-free generation until purchased), real-time auctions, and customizable creator royalties coded directly into ERC-721A or Metaplex contracts. We couple these ledger rules with fast GraphQL indexing layers to load asset metadata in under 50ms.',
    stats: [
      { label: 'Minted NFTs', value: '1.2M+', sub: 'Collectibles registered on-chain.' },
      { label: 'Secondary Volume', value: '$45M+', sub: 'Sales volume processed.' },
      { label: 'Query Latency', value: '45ms', sub: 'GraphQL indexing speed.' }
    ],
    features: [
      { title: 'Lazy Minting Rails', desc: 'Off-load gas costs onto buyers by minting only upon successful purchases.', icon: Zap },
      { title: 'Decentralized Storage', desc: 'Immutable metadata pinning on IPFS & Filecoin networks.', icon: Database },
      { title: 'Royalty Enforcer Core', desc: 'On-chain royalty registries honoring creator splits across marketplaces.', icon: Coins },
      { title: 'Bespoke Auction Engines', desc: 'Timed English, Dutch, and buyout auction scripts executed on-chain.', icon: TrendingUp }
    ],
    caseStudy: {
      client: 'ArtHouse Global',
      challenge: 'Legacy marketplaces charged prohibitive gas fees for large digital art releases, discouraging community participation.',
      solution: 'Strata Quest implemented a lazy-minting system on Arbitrum coupled with a cross-chain payment bridge, allowing buyers to checkout using credit cards.',
      result: 'Reduced initial project launch costs from $80,000 to near-zero, generating $2.4M in primary market sales in 48 hours.'
    }
  },
  'defi-development': {
    id: 'defi-development',
    title: 'DeFi Development',
    subtitle: 'Decentralized Finance Pools, AMMs & Yield Engines',
    highlightWord: 'Yield',
    themeColor: 'orange',
    icon: TrendingUp,
    conceptTitle: 'What is Decentralized Finance (DeFi)?',
    conceptDesc: 'DeFi refers to financial applications built on open ledger protocols, allowing users to trade, borrow, lend, and stake digital assets without traditional intermediaries. These platforms rely on Automated Market Makers (AMMs), liquidity pool locks, and algorithmic interest rate parameters calculated dynamically on-chain.',
    providedTitle: 'How Strata Quest Architects DeFi Ecosystems',
    providedDesc: 'We design and deploy yield staking networks, liquidity provider pools, and lending interfaces. Our engineers write audited mathematical liquidity formulas (e.g. constant product formulas) in Solidity and Rust, ensuring pools remain secure against flash-loan manipulations and oracle exploits.',
    stats: [
      { label: 'Total Value Locked', value: '$85M+', sub: 'Secured inside smart protocols.' },
      { label: 'Swap Latency', value: '1.2s', sub: 'Average transaction settlement.' },
      { label: 'Yield Audits', value: '100%', sub: 'Smart contracts double-verified.' }
    ],
    features: [
      { title: 'AMM Liquidity Pools', desc: 'Constant-product formula pools with customized slippage tolerances.', icon: Coins },
      { title: 'Yield Staking Engines', desc: 'Custom reward distribution contracts with dynamic lockup periods.', icon: Layers },
      { title: 'Flash Loan Mitigation', desc: 'Secured state validation checkpoints preventing arbitrage manipulation.', icon: Shield },
      { title: 'Oracle Bridges', desc: 'Chainlink decentralized feed queries for tamper-proof spot pricing.', icon: Network }
    ],
    caseStudy: {
      client: 'Helix Staking Protocol',
      challenge: 'A staking project required a secure pool that protected depositor yield allocations against fluctuating gas rates and sandwich attacks.',
      solution: 'We engineered custom auto-compounding vault contracts with slippage guards, using decentralized Chainlink price feeds to balance yields.',
      result: 'Attracted $30M+ in Total Value Locked (TVL) within 30 days of launch, with zero slippage exploits.'
    }
  },
  'smart-contract-development': {
    id: 'smart-contract-development',
    title: 'Smart Contract Development',
    subtitle: 'Audited Solidity, Rust, and Move Self-Executing Logic',
    highlightWord: 'Security',
    themeColor: 'teal',
    icon: Code,
    conceptTitle: 'The Core of Blockchain: Smart Contracts',
    conceptDesc: 'Smart contracts are self-executing programs stored on a blockchain that automatically run when predetermined conditions are met. Because they are immutable and visible to the public, the code must be exceptionally secure, gas-optimized, and resilient to malicious exploit patterns.',
    providedTitle: 'How Strata Quest engineers audited code',
    providedDesc: 'We write clean, modular Solidity and Rust programs. Our process integrates formal verification, fuzz testing, and static analysis tools like Slither and Mythril. We have built token contracts, decentralized multi-sig escrow systems, and automated supply chain routing ledgers.',
    stats: [
      { label: 'Contracts Deployed', value: '450+', sub: 'Mainnet programs live.' },
      { label: 'Audit Vulnerabilities', value: '0', sub: 'Critical exploits detected post-audit.' },
      { label: 'Gas Optimization', value: '35%', sub: 'Average reduction in execution fees.' }
    ],
    features: [
      { title: 'Formal Verification', desc: 'Mathematical testing of code parameters to prove security compliance.', icon: Lock },
      { title: 'Gas Optimization Core', desc: 'Assembly-level optimizations to reduce transaction costs.', icon: Zap },
      { title: 'Upgradable Architectures', desc: 'Proxy patterns (UUPS) allowing bugs to be patched safely.', icon: Layers },
      { title: 'Multi-Sig Governance', desc: 'Escrows requiring multiple cryptographic signatures to release funds.', icon: Users }
    ],
    caseStudy: {
      client: 'Velo Logistics',
      challenge: 'The client needed an automated smart escrow contract that released shipping payments to overseas suppliers only when tracking APIs updated.',
      solution: 'We programmed a custom decentralized oracle bridge contract linked to ocean cargo telemetry feeds with multi-sig release options.',
      result: 'Automated 100% of global logistics payments, removing broker delays and reducing overhead costs by 12%.'
    }
  },
  'web3-development': {
    id: 'web3-development',
    title: 'Web3 Development',
    subtitle: 'Frontend Client Integrations & Decentralized App (DApp) Cores',
    highlightWord: 'Integration',
    themeColor: 'cyan',
    icon: Globe,
    conceptTitle: 'What is Web3 Development?',
    conceptDesc: 'Web3 development bridges the gap between raw blockchain nodes and beautiful, user-friendly frontend dashboards. It involves configuring RPC network provider queries, managing wallet browser injections (e.g. MetaMask, Phantom), and tracking ledger updates in real-time.',
    providedTitle: 'How Strata Quest Builds Decentralized Interfaces',
    providedDesc: 'We build reactive, responsive Web3 frontends using React, TypeScript, Tailwind, and Wagmi hooks. Our interfaces display real-time transaction updates, query balance ledgers, and manage complex wallet connectivity workflows seamlessly across multiple network states.',
    stats: [
      { label: 'Active Users', value: '500K+', sub: 'On interfaces deployed by us.' },
      { label: 'RPC Latency', value: '18ms', sub: 'Average network node response.' },
      { label: 'Framework Load', value: '98%', sub: 'Google Lighthouse performance.' }
    ],
    features: [
      { title: 'Wallet Connector Hub', desc: 'Support for MetaMask, Phantom, Coinbase, and WalletConnect in one screen.', icon: Wallet },
      { title: 'Real-Time WebSockets', desc: 'Live event listeners updating balance states without page reloads.', icon: Activity },
      { title: 'Multi-Chain Support', desc: 'Dynamic RPC configuration allowing networks to change smoothly.', icon: Network },
      { title: 'Secure Session Keys', desc: 'Temporary cryptographic authorization to prevent repeated sign requests.', icon: Lock }
    ],
    caseStudy: {
      client: 'Metasphere Portals',
      challenge: 'A gaming portal needed to connect with multiple wallet applications across Solana and Polygon, but suffered from slow loading speeds and connectivity dropouts.',
      solution: 'We engineered a custom caching query layer using React Query and Wagmi, reducing RPC payloads and stabilizing connections.',
      result: 'Increased user conversion by 34% and reduced load times on transaction requests by 2 seconds.'
    }
  },
  'token-development': {
    id: 'token-development',
    title: 'Token Development',
    subtitle: 'Custom Tokenomics Design, Vesting Schedules, & Ledger Core',
    highlightWord: 'Tokenomics',
    themeColor: 'rose',
    icon: Layers,
    conceptTitle: 'Designing Custom Token Ledgers',
    conceptDesc: 'Token development involves coding custom digital assets (ERC-20, SPL, or ERC-1155) that match a project\'s business model. It includes creating supply locks, burn mechanics, minting caps, and vesting rules to control the flow and inflation rates of tokens.',
    providedTitle: 'How Strata Quest Codes Custom Tokens',
    providedDesc: 'We construct secure, audited tokens featuring vesting smart contracts (linear and cliff unlocks) for team members, seed investors, and public participants. We specialize in ERC-20 utility tokens, deflationary currencies, and custom governance tokens.',
    stats: [
      { label: 'Tokens Launched', value: '80+', sub: 'Custom asset ledgers deployed.' },
      { label: 'Vesting Safe', value: '100%', sub: 'Zero vesting security incidents.' },
      { label: 'Total Value Distributed', value: '$65M+', sub: 'Allocations locked in vesting.' }
    ],
    features: [
      { title: 'Vesting Smart Lockups', desc: 'Custom cliff and linear unlocking contracts executed on-chain.', icon: Clock },
      { title: 'Deflationary Burns', desc: 'On-chain fee logic that burns a percentage of tokens on transfer.', icon: Zap },
      { title: 'Governance Integration', desc: 'Voting weight rules configured directly into ERC-20 votes contracts.', icon: Users },
      { title: 'Whitelisting & Compliance', desc: 'Built-in hooks for SEC compliance to restrict transfers to vetted wallets.', icon: Shield }
    ],
    caseStudy: {
      client: 'EcoShare Carbon',
      challenge: 'An eco-initiative required a utility token that distributed rewards to carbon offsetters while locking team tokens for 24 months to prevent dumping.',
      solution: 'We programmed a custom token with a 6-month cliff followed by 18-month linear vesting, managed by locked smart contract vaults.',
      result: 'Distributed $8M in public tokens securely while ensuring community trust through visible, audited lockup ledgers.'
    }
  },
  'ico-development': {
    id: 'ico-development',
    title: 'ICO & Launchpad Development',
    subtitle: 'Secure Decentralized Capital Raising & Ledger Led Launchpads',
    highlightWord: 'Launchpad',
    themeColor: 'purple',
    icon: Database,
    conceptTitle: 'What is ICO & Launchpad Development?',
    conceptDesc: 'It is the creation of decentralized crowdfunding applications where investors receive project utility tokens in exchange for major crypto contributions. A launchpad manages whitelist records, round allocations, KYC/AML approvals, and refund claims on-chain.',
    providedTitle: 'How Strata Quest Drives Capital Launchpads',
    providedDesc: 'We build launchpads with multi-round mechanics (Seed, Private, Public). Our portals prevent gas wars through whitelist allocations, verify user credentials via KYC API bridges, and automatically distribute tokens through secure audit-ready claim engines.',
    stats: [
      { label: 'Funds Raised', value: '$35M+', sub: 'Total funding across launches.' },
      { label: 'Active Investors', value: '120K+', sub: 'Whitelisted wallets onboarded.' },
      { label: 'Sybil Protection', value: '100%', sub: 'Bot prevention coverage.' }
    ],
    features: [
      { title: 'Multi-Round Allocations', desc: 'Define separate price pools and limits for seed, private, and public sales.', icon: Layers },
      { title: 'Claim Engines', desc: 'Gas-efficient contracts that allow buyers to claim tokens based on vesting rules.', icon: Code },
      { title: 'KYC API Integrations', desc: 'Decentralized whitelist updates linked to institutional identity verifiers.', icon: Shield },
      { title: 'Dynamic Price Pools', desc: 'Smart algorithms that adjust token prices relative to contribution volumes.', icon: Coins }
    ],
    caseStudy: {
      client: 'SolRide Mobility',
      challenge: 'A micro-mobility platform needed a launchpad for their token pre-sale that could survive high-concurrency bot spam attacks.',
      solution: 'Strata Quest built a launchpad with Sybil defense filters, requiring a small stake in governance tokens to access the sale.',
      result: 'Raised $4.2M in 45 minutes, processing 8,000 concurrent transactions with zero downtime or bot manipulation.'
    }
  },
  'mlm-software-development': {
    id: 'mlm-software-development',
    title: 'MLM Software Development',
    subtitle: 'Decentralized Referral Tracking & Multi-Tier Reward Ledgers',
    highlightWord: 'Referral',
    themeColor: 'yellow',
    icon: Users,
    conceptTitle: 'Decentralized MLM Reward Networks',
    conceptDesc: 'Blockchain-based MLM (Multi-Level Marketing) development replaces vulnerable centralized databases with transparent smart contracts. Referral networks, sponsor relationships, and commission payouts are coded directly onto the ledger, ensuring absolute payout reliability.',
    providedTitle: 'How Strata Quest Automates Referral Systems',
    providedDesc: 'We build decentralized referral engines that distribute commissions instantly. By coding matrix structures (Binary, Matrix, Unilevel) into Solidity contracts, we eliminate delayed payouts and administrative errors, making reward distributions fully automated.',
    stats: [
      { label: 'Referral Nodes', value: '45K+', sub: 'Active tree members registered.' },
      { label: 'Commission Payouts', value: '$12M+', sub: 'Processed and paid instantly.' },
      { label: 'Reward Execution', value: '0ms', sub: 'Admin payout delays.' }
    ],
    features: [
      { title: 'Smart Referral Matrix', desc: 'Binary and unilevel referral paths coded directly into smart contracts.', icon: Layers },
      { title: 'Instant Commission Payouts', desc: 'Automatic on-chain transfers directly to uplines upon sale confirmation.', icon: Zap },
      { title: 'Immutable Tree Logs', desc: 'Permanent registry of sponsor relationships that cannot be modified.', icon: Database },
      { title: 'Dashboard Analytics', desc: 'Frontend dashboards displaying user statistics, team sizes, and earnings.', icon: Smartphone }
    ],
    caseStudy: {
      client: 'VeloRewards Club',
      challenge: 'A rewards network suffered from database disputes regarding sponsor assignments and manual, delayed payout calculations.',
      solution: 'We programmed their referral rules onto Polygon, automating payouts directly inside the purchasing transaction.',
      result: 'Reduced administrative payout overhead from 15 hours a week to zero, with 100% accurate, dispute-free rewards.'
    }
  },
  'blockchain-consulting': {
    id: 'blockchain-consulting',
    title: 'Blockchain Consulting & Auditing',
    subtitle: 'Enterprise Protocol Architecture & Tokenomics Vetting',
    highlightWord: 'Strategy',
    themeColor: 'indigo',
    icon: Settings,
    conceptTitle: 'What is Blockchain Consulting & Auditing?',
    conceptDesc: 'It is the strategic planning and technical auditing that takes place before code is written. Consulting helps businesses choose the optimal blockchain network (public EVM, Solana, or permissioned enterprise databases), design balanced tokenomics models, and audit existing logic for security gaps.',
    providedTitle: 'Strategic Blockchain Delivery by Strata Quest',
    providedDesc: 'We provide protocol selection advice, design tokenomics schemes, and conduct security audits. We help leadership teams understand the security, gas cost, and regulatory trade-offs of different architectures, translating complex technical specs into clear business roadmaps.',
    stats: [
      { label: 'Consulted Projects', value: '140+', sub: 'Enterprises successfully guided.' },
      { label: 'Security Reviews', value: '95+', sub: 'Codebases fully audited.' },
      { label: 'Token Models Built', value: '40+', sub: 'Custom tokenomics plans vetted.' }
    ],
    features: [
      { title: 'Protocol Feasibility', desc: 'Comprehensive analyses comparing EVM, Solana, Sui, and Hyperledger.', icon: Network },
      { title: 'Tokenomics Design', desc: 'Vetting supply curves, inflation caps, and staking utilities for stability.', icon: Coins },
      { title: 'Contract Audits', desc: 'Static code reviews, threat modeling, and formal security sign-offs.', icon: Shield },
      { title: 'Regulatory Guidance', desc: 'Aligning blockchain operations with local compliance standards.', icon: Lock }
    ],
    caseStudy: {
      client: 'InterLog Freight',
      challenge: 'A multinational supply chain company struggled to choose between public Ethereum and a private database for sharing shipping cargo logs.',
      solution: 'We designed a hybrid architecture using Polygon L2 with private zk-SNARK rollups, balancing public auditing with privacy.',
      result: 'Saved the client $450,000 in projected annual gas fees while maintaining FIPS-compliant data security.'
    }
  }
};

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE WIDGET COMPONENT ROUTER
   ═══════════════════════════════════════════════════════════════ */

const ServiceWidget: React.FC<{ serviceId: string; themeColor: string }> = ({ serviceId, themeColor }) => {
  const gradientBtn = themeColor === 'violet' ? 'from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white shadow-violet-500/25' :
                        themeColor === 'fuchsia' ? 'from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 text-white shadow-pink-500/25' :
                        themeColor === 'orange' ? 'from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-orange-500/25' :
                        themeColor === 'teal' ? 'from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-emerald-500/25' :
                        themeColor === 'cyan' ? 'from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-cyan-500/25' :
                        themeColor === 'rose' ? 'from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white shadow-rose-500/25' :
                        themeColor === 'purple' ? 'from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white shadow-purple-500/25' :
                        themeColor === 'yellow' ? 'from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 shadow-yellow-500/25' :
                        'from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white shadow-indigo-500/25';
  
  const accentText = themeColor === 'violet' ? 'text-[#c084fc]' :
                      themeColor === 'fuchsia' ? 'text-[#f472b6]' :
                      themeColor === 'orange' ? 'text-[#fbbf24]' :
                      themeColor === 'teal' ? 'text-[#2dd4bf]' :
                      themeColor === 'cyan' ? 'text-[#22d3ee]' :
                      themeColor === 'rose' ? 'text-[#fda4af]' :
                      themeColor === 'purple' ? 'text-[#c084fc]' :
                      themeColor === 'yellow' ? 'text-[#facc15]' : 'text-[#818cf8]';

  const accentBg = themeColor === 'violet' ? 'bg-violet-500/10 border-violet-500/30' :
                    themeColor === 'fuchsia' ? 'bg-fuchsia-500/10 border-fuchsia-500/30' :
                    themeColor === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                    themeColor === 'teal' ? 'bg-teal-500/10 border-teal-500/30' :
                    themeColor === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' :
                    themeColor === 'rose' ? 'bg-rose-500/10 border-rose-500/30' :
                    themeColor === 'purple' ? 'bg-purple-500/10 border-purple-500/30' :
                    themeColor === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-indigo-500/10 border-indigo-500/30';

  const dotColor = themeColor === 'violet' ? '#a855f7' :
                   themeColor === 'fuchsia' ? '#d946ef' :
                   themeColor === 'orange' ? '#f97316' :
                   themeColor === 'teal' ? '#14b8a6' :
                   themeColor === 'cyan' ? '#06b6d4' :
                   themeColor === 'rose' ? '#f43f5e' :
                   themeColor === 'purple' ? '#a855f7' :
                   themeColor === 'yellow' ? '#eab308' : '#6366F1';

  // 1. CRYPTO WALLET: Vault Security Simulator
  const [walletQuorum, setWalletQuorum] = useState(2); // 2 of 3
  const [walletSigs, setWalletSigs] = useState({ keyA: false, keyB: false, keyC: false });
  const [walletStatus, setWalletStatus] = useState<'idle' | 'broadcasting' | 'success' | 'fail'>('idle');
  const [txHash, setTxHash] = useState('');

  const handleWalletTx = () => {
    const activeCount = Object.values(walletSigs).filter(Boolean).length;
    if (activeCount >= walletQuorum) {
      setWalletStatus('broadcasting');
      setTimeout(() => {
        setWalletStatus('success');
        setTxHash('0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6));
      }, 1500);
    } else {
      setWalletStatus('fail');
    }
  };

  // 2. NFT MARKETPLACE: Gas & Mint Calculator
  const [nftNetwork, setNftNetwork] = useState<'eth' | 'sol' | 'poly'>('eth');
  const [nftCount, setNftCount] = useState(500);
  const getGasEstimate = () => {
    if (nftNetwork === 'eth') return (nftCount * 0.008).toFixed(3) + ' ETH ($24.80)';
    if (nftNetwork === 'poly') return (nftCount * 0.02).toFixed(2) + ' POL ($0.15)';
    return (nftCount * 0.00005).toFixed(5) + ' SOL ($0.01)';
  };

  // 3. DEFI: Yield APY Estimator
  const [defiDeposit, setDefiDeposit] = useState(10000);
  const [defiDuration, setDefiDuration] = useState(90); // days
  const getDefiYield = () => {
    const apy = defiDuration === 30 ? 0.08 : defiDuration === 90 ? 0.12 : 0.24;
    const rewards = defiDeposit * apy * (defiDuration / 365);
    return {
      rewards: rewards.toFixed(2),
      total: (defiDeposit + rewards).toFixed(2),
      apy: (apy * 100).toFixed(0)
    };
  };

  // 4. SMART CONTRACTS: Solidity Sandbox Scanner
  const [contractType, setContractType] = useState<'erc20' | 'staking' | 'auction'>('erc20');
  const [scanStep, setScanStep] = useState<number>(0); // 0: idle, 1: scanning, 2: complete
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const startAuditScan = () => {
    setScanStep(1);
    setScanLogs([]);
    const logs = [
      'Initializing static analysis (Slither)...',
      'Scanning Abstract Syntax Tree (AST)...',
      'Verifying overflow/underflow assertions (Solidity 0.8+ checked)...',
      'Checking for Reentrancy vulnerability vector...',
      'Validating access-control ownership parameters...',
      'Fuzzing input transaction structures (1000 iterations)...',
      'Audit log complete. Smart contract marked safe!'
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setScanLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setScanStep(2);
      }
    }, 500);
  };

  // 5. WEB3: RPC Node Health Board
  const [rpcStatus, setRpcStatus] = useState<'idle' | 'pinging' | 'ready'>('idle');
  const [latencies, setLatencies] = useState({ eth: 0, sol: 0, bsc: 0 });
  const [blockHeights, setBlockHeights] = useState({ eth: 19842104, sol: 25489104, bsc: 38401024 });

  const pingRPCNodes = () => {
    setRpcStatus('pinging');
    setTimeout(() => {
      setLatencies({
        eth: Math.floor(Math.random() * 60) + 70,
        sol: Math.floor(Math.random() * 15) + 10,
        bsc: Math.floor(Math.random() * 30) + 40
      });
      setBlockHeights({
        eth: blockHeights.eth + Math.floor(Math.random() * 2),
        sol: blockHeights.sol + Math.floor(Math.random() * 12),
        bsc: blockHeights.bsc + Math.floor(Math.random() * 4)
      });
      setRpcStatus('ready');
    }, 1200);
  };

  // 6. TOKEN: Vesting Schedule
  const [vestCliff, setVestCliff] = useState(6); // months
  const [vestDuration, setVestDuration] = useState(24); // months
  const [vestSelectedMonth, setVestSelectedMonth] = useState(12);

  const getVestedPercent = () => {
    if (vestSelectedMonth < vestCliff) return 0;
    const progress = (vestSelectedMonth - vestCliff) / (vestDuration - vestCliff);
    return Math.min(100, Math.max(0, Math.round(progress * 100)));
  };

  // 7. ICO: Fund Allocation Builder
  const [icoSeed, setIcoSeed] = useState(20);
  const [icoPrivate, setIcoPrivate] = useState(30);
  const [icoPublic, setIcoPublic] = useState(50); // total must be 100

  const handleIcoRatioChange = (type: 'seed' | 'private' | 'public', val: number) => {
    if (type === 'seed') {
      setIcoSeed(val);
      const remaining = 100 - val;
      setIcoPrivate(Math.round(remaining * 0.4));
      setIcoPublic(100 - val - Math.round(remaining * 0.4));
    } else if (type === 'private') {
      setIcoPrivate(val);
      const remaining = 100 - val;
      setIcoSeed(Math.round(remaining * 0.3));
      setIcoPublic(100 - val - Math.round(remaining * 0.3));
    } else {
      setIcoPublic(val);
      const remaining = 100 - val;
      setIcoSeed(Math.round(remaining * 0.3));
      setIcoPrivate(100 - val - Math.round(remaining * 0.3));
    }
  };

  // 8. MLM: Commission Rewards Tree
  const [mlmLevel, setMlmLevel] = useState(3);
  const [mlmSale, setMlmSale] = useState(1000);
  const getCommissionSplit = () => {
    const splits = [0.05, 0.03, 0.02, 0.01]; // L1, L2, L3, L4
    let totalDistributed = 0;
    const tree = [];
    for (let i = 0; i < mlmLevel; i++) {
      const reward = mlmSale * splits[i];
      totalDistributed += reward;
      tree.push({ level: i + 1, rate: splits[i] * 100, amount: reward.toFixed(2) });
    }
    return {
      tree,
      distributed: totalDistributed.toFixed(2),
      retained: (mlmSale - totalDistributed).toFixed(2)
    };
  };

  // 9. CONSULTING: Protocol Quiz
  const [quizTx, setQuizTx] = useState<'high' | 'normal'>('high');
  const [quizCost, setQuizCost] = useState<'low' | 'flexible'>('low');
  const [quizAccess, setQuizAccess] = useState<'public' | 'private'>('public');
  const [quizResult, setQuizResult] = useState<string>('');

  const analyzeProtocolFit = () => {
    if (quizAccess === 'private') {
      setQuizResult('Hyperledger Fabric — Best-in-class privacy, identity management, and permissioned channels for secure enterprise networks.');
    } else if (quizTx === 'high' && quizCost === 'low') {
      setQuizResult('Solana Network — Sub-second block times with ultra-low transaction costs ($0.00025 avg), perfect for highly active apps.');
    } else if (quizCost === 'flexible') {
      setQuizResult('Ethereum Mainnet / Arbitrum L2 — Maximum security backing, huge existing liquidity pools, and fully standardized EVM compatibility.');
    } else {
      setQuizResult('Polygon Proof-of-Stake — Excellent EVM compatibility, fast transactions, low fees, and very mature developer libraries.');
    }
  };


  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/5 relative overflow-hidden flex flex-col justify-between h-full`}>
      {/* Decorative neon dot */}
      <div className="absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full opacity-20 pointer-events-none" style={{ backgroundColor: dotColor }} />

      <div className="w-full flex flex-col text-left">
        <h3 className="text-sm font-mono tracking-widest text-neutral-400 uppercase mb-4">Interactive Concept Sandbox</h3>
        
        {/* WALLET WIDGET */}
        {serviceId === 'crypto-wallet-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Configure signature vault threshold settings and verify signature broadcast approval logs.</p>
            <div className="grid grid-cols-2 gap-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div>
                <label className="block text-[10px] uppercase text-neutral-500 mb-2 font-mono">Quorum Config</label>
                <select 
                  value={walletQuorum} 
                  onChange={(e) => setWalletQuorum(Number(e.target.value))}
                  className="bg-slate-900 text-white rounded border border-white/10 px-2 py-1 w-full focus:outline-none focus:border-violet-500"
                >
                  <option value={1}>1-of-3 (Low Security)</option>
                  <option value={2}>2-of-3 (Recommended)</option>
                  <option value={3}>3-of-3 (High Security)</option>
                </select>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-neutral-500 mb-2 font-mono">Quorum Key Approvals</span>
                <div className="flex gap-2.5">
                  {(['keyA', 'keyB', 'keyC'] as const).map((k, idx) => (
                    <button
                      key={k}
                      onClick={() => setWalletSigs(prev => ({ ...prev, [k]: !prev[k] }))}
                      className={`px-2 py-1 rounded font-mono text-[10px] border transition-colors flex-1 ${
                        walletSigs[k] 
                          ? 'bg-violet-500/20 border-violet-500 text-violet-400' 
                          : 'bg-slate-900 border-white/10 text-neutral-400'
                      }`}
                    >
                      Key {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleWalletTx} className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r ${gradientBtn} transition-all duration-300 flex items-center justify-center gap-2`}>
              <Play className="w-3.5 h-3.5" />
              <span>Broadcast Safe Transaction</span>
            </button>

            {walletStatus === 'broadcasting' && (
              <div className="text-center py-2 animate-pulse text-xs font-mono text-violet-400">Calculating signatures via secure MPC shares...</div>
            )}
            {walletStatus === 'success' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[11px] font-mono text-emerald-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold"><Check className="w-4 h-4" /> Transaction Authorized Successfully!</div>
                <div className="text-neutral-400">Broadcast Hash: <span className="text-white">{txHash}</span></div>
              </div>
            )}
            {walletStatus === 'fail' && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-[11px] font-mono text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Quorum not met. Need {walletQuorum} approvals, but only received {Object.values(walletSigs).filter(Boolean).length}.
              </div>
            )}
          </div>
        )}

        {/* NFT WIDGET */}
        {serviceId === 'nft-marketplace-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Estimate listing/minting fees across chains and view recommendations.</p>
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div>
                <label className="block text-[10px] uppercase text-neutral-500 mb-2 font-mono">Select Target Network</label>
                <div className="flex gap-2">
                  {[
                    { id: 'eth', label: 'Ethereum' },
                    { id: 'poly', label: 'Polygon' },
                    { id: 'sol', label: 'Solana' }
                  ].map(n => (
                    <button
                      key={n.id}
                      onClick={() => setNftNetwork(n.id as any)}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase rounded border transition-colors ${
                        nftNetwork === n.id 
                          ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-400' 
                          : 'bg-slate-900 border-white/10 text-neutral-400'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-2 font-mono">
                  <span>Batch Asset Count</span>
                  <span className="text-white font-bold">{nftCount.toLocaleString()} NFTs</span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={2500} 
                  value={nftCount} 
                  onChange={(e) => setNftCount(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                />
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-neutral-400">IPFS Metadata Pinning:</span>
                <span className="text-emerald-400 font-mono">Included (0 Gas)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Est. Contract Fee (Gas):</span>
                <span className="text-white font-mono font-bold">{getGasEstimate()}</span>
              </div>
            </div>
            
            <div className={`p-3.5 rounded-xl border text-[11px] ${accentBg} text-neutral-300 leading-relaxed font-normal`}>
              <strong className={accentText}>Recommendation:</strong> {
                nftNetwork === 'eth' ? 'Best for high-value limited collections. High gas costs are offset by maximum buyer visibility.' :
                nftNetwork === 'poly' ? 'Excellent balance of EVM contract safety and fractions-of-a-cent minting fees.' :
                'Perfect for high-volume Web3 gaming assets. Mint thousands of units instantly for pennies.'
              }
            </div>
          </div>
        )}

        {/* DEFI YIELD APY ESTIMATOR */}
        {serviceId === 'defi-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Calculate estimated compounding yields based on lockup deposit pools.</p>
            <div className="space-y-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div>
                <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-2 font-mono">
                  <span>Initial Staking Balance</span>
                  <span className="text-white font-bold">${defiDeposit.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min={1000} 
                  max={100000} 
                  step={1000}
                  value={defiDeposit} 
                  onChange={(e) => setDefiDeposit(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-neutral-500 mb-2 font-mono">Yield Lockup Pool Duration</label>
                <div className="flex gap-2">
                  {[
                    { days: 30, label: '30 Days (8% APY)' },
                    { days: 90, label: '90 Days (12% APY)' },
                    { days: 365, label: '365 Days (24% APY)' }
                  ].map(d => (
                    <button
                      key={d.days}
                      onClick={() => setDefiDuration(d.days)}
                      className={`flex-1 py-2 text-[9px] font-bold uppercase rounded border transition-colors ${
                        defiDuration === d.days 
                          ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                          : 'bg-slate-900 border-white/10 text-neutral-400'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[9px] uppercase text-neutral-500 font-mono block">Estimated Yield</span>
                  <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">+${getDefiYield().rewards}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[9px] uppercase text-neutral-500 font-mono block">Maturity Value</span>
                  <span className="text-sm font-bold font-mono text-white mt-1 block">${getDefiYield().total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMART CONTRACT AUDIT SIMULATOR */}
        {serviceId === 'smart-contract-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Run a simulated static security analysis scan on our contract template core.</p>
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div className="flex gap-2">
                {[
                  { id: 'erc20', label: 'ERC-20 Token' },
                  { id: 'staking', label: 'Staking Vault' },
                  { id: 'auction', label: 'NFT Auction' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => { if (scanStep !== 1) { setContractType(c.id as any); setScanStep(0); } }}
                    disabled={scanStep === 1}
                    className={`flex-1 py-1.5 text-[9px] font-bold uppercase rounded border transition-colors ${
                      contractType === c.id 
                        ? 'bg-teal-500/20 border-teal-500 text-teal-400' 
                        : 'bg-slate-900 border-white/10 text-neutral-400'
                    } disabled:opacity-50`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="bg-black/80 rounded-xl p-3.5 h-36 font-mono text-[9px] text-teal-400 overflow-y-auto space-y-1 border border-white/5 scrollbar-thin">
                {scanLogs.length === 0 && (
                  <span className="text-neutral-500 block italic py-8 text-center">Ready to verify compiler files. Click scan below.</span>
                )}
                {scanLogs.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="text-neutral-600 font-mono">[{index + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={startAuditScan}
              disabled={scanStep === 1}
              className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r ${gradientBtn} transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50`}
            >
              <span>{scanStep === 1 ? 'Running Vulnerability Check...' : 'Start Audit Vulnerability Scan'}</span>
            </button>
          </div>
        )}

        {/* WEB3 MULTI-CHAIN RPC WIDGET */}
        {serviceId === 'web3-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Ping Web3 RPC endpoints to check live latency response and node heights.</p>
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs font-mono">
              <div className="space-y-2.5">
                {[
                  { key: 'eth', label: 'Ethereum Mainnet', height: blockHeights.eth },
                  { key: 'sol', label: 'Solana RPC-1', height: blockHeights.sol },
                  { key: 'bsc', label: 'BNB Smart Chain', height: blockHeights.bsc }
                ].map(r => {
                  const lat = latencies[r.key as keyof typeof latencies];
                  return (
                    <div key={r.key} className="flex justify-between items-center p-2 bg-slate-900 rounded-lg border border-white/5">
                      <div>
                        <span className="text-[10px] font-bold text-white block">{r.label}</span>
                        <span className="text-[8px] text-neutral-500 font-mono block mt-0.5">Block Height: {r.height.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        {rpcStatus === 'pinging' ? (
                          <span className="text-[9px] text-cyan-400 animate-pulse font-mono">PINGING...</span>
                        ) : lat > 0 ? (
                          <span className={`text-[9px] font-bold font-mono ${lat < 30 ? 'text-emerald-400' : lat < 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                            ● {lat} ms
                          </span>
                        ) : (
                          <span className="text-[9px] text-neutral-500 font-mono">OFFLINE</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={pingRPCNodes}
              disabled={rpcStatus === 'pinging'}
              className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r ${gradientBtn} transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <Network className="w-4 h-4" />
              <span>Ping Web3 RPC Providers</span>
            </button>
          </div>
        )}

        {/* TOKEN: VESTING SCHEDULE */}
        {serviceId === 'token-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Map linear token release schedules based on custom cliff lockups.</p>
            <div className="space-y-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-1.5 font-mono">
                    <span>Cliff Lockup</span>
                    <span className="text-white font-bold">{vestCliff} Months</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={12} 
                    value={vestCliff} 
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setVestCliff(val);
                      if (val >= vestDuration) setVestDuration(val + 6);
                    }}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-1.5 font-mono">
                    <span>Total Vesting</span>
                    <span className="text-white font-bold">{vestDuration} Months</span>
                  </div>
                  <input 
                    type="range" 
                    min={vestCliff + 6} 
                    max={48} 
                    value={vestDuration} 
                    onChange={(e) => setVestDuration(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-2 font-mono">
                  <span>Timeline Simulation: Month {vestSelectedMonth}</span>
                  <span className="text-white font-bold">{getVestedPercent()}% Vested</span>
                </div>
                <input 
                  type="range" 
                  min={0} 
                  max={vestDuration} 
                  value={vestSelectedMonth} 
                  onChange={(e) => setVestSelectedMonth(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Tokens Released:</span>
                <span className="text-emerald-400 font-bold">
                  {getVestedPercent() === 0 ? 'Locked (In Cliff)' : `${getVestedPercent()}% (Unlocked)`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ICO FUND ALLOCATION BUILDER */}
        {serviceId === 'ico-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Configure funding allocation weights across investment rounds.</p>
            <div className="space-y-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-1 font-mono">
                    <span>Seed Round Share</span>
                    <span className="text-[#a855f7] font-bold">{icoSeed}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={5} 
                    max={40} 
                    value={icoSeed} 
                    onChange={(e) => handleIcoRatioChange('seed', Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-1 font-mono">
                    <span>Private Strategic Share</span>
                    <span className="text-[#c084fc] font-bold">{icoPrivate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={10} 
                    max={50} 
                    value={icoPrivate} 
                    onChange={(e) => handleIcoRatioChange('private', Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-1 font-mono">
                    <span>Public Retail Sale</span>
                    <span className="text-white font-bold">{icoPublic}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={20} 
                    max={70} 
                    value={icoPublic} 
                    onChange={(e) => handleIcoRatioChange('public', Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex gap-2">
                {[
                  { label: 'Seed', pct: icoSeed, color: 'bg-purple-600' },
                  { label: 'Private', pct: icoPrivate, color: 'bg-purple-400' },
                  { label: 'Public', pct: icoPublic, color: 'bg-white' }
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col text-center" style={{ width: `${bar.pct}%` }}>
                    <div className={`h-2.5 ${bar.color} rounded`} />
                    <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase">{bar.label} ({bar.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MLM Software: Commission splitting tree */}
        {serviceId === 'mlm-software-development' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Generate a multi-level referral commission distribution chart.</p>
            <div className="space-y-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-neutral-500 mb-1.5 font-mono">Referral Level Depth</label>
                  <select 
                    value={mlmLevel} 
                    onChange={(e) => setMlmLevel(Number(e.target.value))}
                    className="bg-slate-900 text-white rounded border border-white/10 px-2 py-1 w-full focus:outline-none focus:border-yellow-500"
                  >
                    <option value={1}>1 Level (Single Split)</option>
                    <option value={2}>2 Levels (Binary Branch)</option>
                    <option value={3}>3 Levels (Standard Matrix)</option>
                    <option value={4}>4 Levels (Full Enterprise)</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-neutral-500 mb-1.5 font-mono">
                    <span>Simulated Sale Value</span>
                    <span className="text-white font-bold">${mlmSale}</span>
                  </div>
                  <input 
                    type="range" 
                    min={100} 
                    max={5000} 
                    step={100}
                    value={mlmSale} 
                    onChange={(e) => setMlmSale(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="block text-[9px] uppercase text-neutral-500 font-mono">Instantly Distributed Commission Splits</span>
                <div className="grid grid-cols-4 gap-2">
                  {getCommissionSplit().tree.map(node => (
                    <div key={node.level} className="bg-slate-900 p-2 rounded-xl border border-yellow-500/10 text-center font-mono text-[9px]">
                      <span className="text-neutral-500 uppercase block">Level {node.level}</span>
                      <span className="text-yellow-400 font-bold block mt-0.5">{node.rate}%</span>
                      <span className="text-white block mt-0.5">${node.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>Distributed: <strong className="text-yellow-400">${getCommissionSplit().distributed}</strong></span>
                <span>Retained to Vault: <strong className="text-white">${getCommissionSplit().retained}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* CONSULTING FIT FINDER */}
        {serviceId === 'blockchain-consulting' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400">Configure parameters to suggest the ideal blockchain protocol for your project.</p>
            <div className="space-y-3.5 bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs text-left">
              <div>
                <span className="block text-[9px] uppercase text-neutral-500 mb-1.5 font-mono">Performance Priority</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setQuizTx('high')}
                    className={`flex-1 py-1 text-[9px] font-bold rounded border transition-colors ${
                      quizTx === 'high' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    High Speed (10K+ TPS)
                  </button>
                  <button 
                    onClick={() => setQuizTx('normal')}
                    className={`flex-1 py-1 text-[9px] font-bold rounded border transition-colors ${
                      quizTx === 'normal' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Standard EVM
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-[9px] uppercase text-neutral-500 mb-1.5 font-mono">Gas Fee Tolerance</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setQuizCost('low')}
                    className={`flex-1 py-1 text-[9px] font-bold rounded border transition-colors ${
                      quizCost === 'low' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Near-Zero Fees
                  </button>
                  <button 
                    onClick={() => setQuizCost('flexible')}
                    className={`flex-1 py-1 text-[9px] font-bold rounded border transition-colors ${
                      quizCost === 'flexible' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Security First
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-[9px] uppercase text-neutral-500 mb-1.5 font-mono">Network Access Governance</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setQuizAccess('public')}
                    className={`flex-1 py-1 text-[9px] font-bold rounded border transition-colors ${
                      quizAccess === 'public' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Public (DeFi / Web3)
                  </button>
                  <button 
                    onClick={() => setQuizAccess('private')}
                    className={`flex-1 py-1 text-[9px] font-bold rounded border transition-colors ${
                      quizAccess === 'private' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-white/10 text-neutral-400'
                    }`}
                  >
                    Private Permissioned
                  </button>
                </div>
              </div>
            </div>

            <button onClick={analyzeProtocolFit} className={`w-full py-3 bg-gradient-to-r ${gradientBtn} rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2`}>
              <Play className="w-3.5 h-3.5" />
              <span>Evaluate Ideal Network</span>
            </button>

            {quizResult && (
              <div className={`p-3.5 rounded-xl border text-[11px] font-normal leading-relaxed ${accentBg} text-neutral-300`}>
                <strong className={accentText}>Suggested Solution:</strong> {quizResult}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-500 text-[9px] font-mono tracking-widest uppercase">
        <span>STRATA QUEST SANDBOX</span>
        <span>CORE V3.0</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN BLOCKCHAIN SERVICE DETAIL PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

const BlockchainServiceDetailPage: React.FC = () => {
  const location = useLocation();
  
  // Extract configuration based on route pathname
  const path = location.pathname.replace(/^\//, ''); // e.g. "crypto-wallet-development"
  const config = SERVICES_DATA[path] || SERVICES_DATA['crypto-wallet-development'];
  const IconComponent = config.icon || Wallet;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const dotColor = config.themeColor === 'violet' ? '#8B5CF6' :
                   config.themeColor === 'fuchsia' ? '#D946EF' :
                   config.themeColor === 'orange' ? '#F59E0B' :
                   config.themeColor === 'teal' ? '#14B8A6' :
                   config.themeColor === 'cyan' ? '#00E5FF' :
                   config.themeColor === 'rose' ? '#F43F5E' :
                   config.themeColor === 'purple' ? '#A855F7' :
                   config.themeColor === 'yellow' ? '#EAB308' : '#6366F1';

  // Color mappings for custom UI badges & gradients
  const glowBgColor = config.themeColor === 'violet' ? 'bg-violet-500/5' :
                     config.themeColor === 'fuchsia' ? 'bg-fuchsia-500/5' :
                     config.themeColor === 'orange' ? 'bg-orange-500/5' :
                     config.themeColor === 'teal' ? 'bg-teal-500/5' :
                     config.themeColor === 'cyan' ? 'bg-cyan-500/5' :
                     config.themeColor === 'rose' ? 'bg-rose-500/5' :
                     config.themeColor === 'purple' ? 'bg-purple-500/5' :
                     config.themeColor === 'yellow' ? 'bg-yellow-500/5' : 'bg-indigo-500/5';

  const textAccentClass = config.themeColor === 'violet' ? 'text-[#a855f7]' :
                         config.themeColor === 'fuchsia' ? 'text-[#d946ef]' :
                         config.themeColor === 'orange' ? 'text-[#f97316]' :
                         config.themeColor === 'teal' ? 'text-[#14b8a6]' :
                         config.themeColor === 'cyan' ? 'text-[#06b6d4]' :
                         config.themeColor === 'rose' ? 'text-[#f43f5e]' :
                         config.themeColor === 'purple' ? 'text-[#a855f7]' :
                         config.themeColor === 'yellow' ? 'text-[#eab308]' : 'text-[#6366F1]';

  const glowBorderClass = config.themeColor === 'violet' ? 'border-[#8B5CF6]/20' :
                          config.themeColor === 'fuchsia' ? 'border-[#D946EF]/20' :
                          config.themeColor === 'orange' ? 'border-[#F59E0B]/20' :
                          config.themeColor === 'teal' ? 'border-[#14B8A6]/20' :
                          config.themeColor === 'cyan' ? 'border-[#00E5FF]/20' :
                          config.themeColor === 'rose' ? 'border-[#F43F5E]/20' :
                          config.themeColor === 'purple' ? 'border-[#A855F7]/20' :
                          config.themeColor === 'yellow' ? 'border-[#EAB308]/20' : 'border-[#6366F1]/20';

  const cardBorderAccentClass = config.themeColor === 'violet' ? 'hover:border-[#8B5CF6]/30' :
                                config.themeColor === 'fuchsia' ? 'hover:border-[#D946EF]/30' :
                                config.themeColor === 'orange' ? 'hover:border-[#F59E0B]/30' :
                                config.themeColor === 'teal' ? 'hover:border-[#14B8A6]/30' :
                                config.themeColor === 'cyan' ? 'hover:border-[#00E5FF]/30' :
                                config.themeColor === 'rose' ? 'hover:border-[#F43F5E]/30' :
                                config.themeColor === 'purple' ? 'hover:border-[#A855F7]/30' :
                                config.themeColor === 'yellow' ? 'hover:border-[#EAB308]/30' : 'hover:border-[#6366F1]/30';

  const gradientText = config.themeColor === 'violet' ? 'from-[#a855f7] to-[#818cf8]' :
                       config.themeColor === 'fuchsia' ? 'from-[#d946ef] to-[#ec4899]' :
                       config.themeColor === 'orange' ? 'from-[#f97316] to-[#facc15]' :
                       config.themeColor === 'teal' ? 'from-[#14b8a6] to-[#34d399]' :
                       config.themeColor === 'cyan' ? 'from-[#06b6d4] to-[#3b82f6]' :
                       config.themeColor === 'rose' ? 'from-[#f43f5e] to-[#fb7185]' :
                       config.themeColor === 'purple' ? 'from-[#c084fc] to-[#a855f7]' :
                       config.themeColor === 'yellow' ? 'from-[#facc15] to-[#f59e0b]' : 'from-[#6366F1] to-[#4f46e5]';

  const themeBtnColor = config.themeColor === 'violet' ? 'bg-[#8B5CF6] hover:bg-[#7c3aed] text-white shadow-[#8B5CF6]/20' :
                        config.themeColor === 'fuchsia' ? 'bg-[#D946EF] hover:bg-[#c084fc] text-white shadow-[#D946EF]/20' :
                        config.themeColor === 'orange' ? 'bg-[#F59E0B] hover:bg-[#d97706] text-white shadow-[#F59E0B]/20' :
                        config.themeColor === 'teal' ? 'bg-[#14B8A6] hover:bg-[#0d9488] text-white shadow-[#14B8A6]/20' :
                        config.themeColor === 'cyan' ? 'bg-[#00E5FF] hover:bg-[#06b6d4] text-slate-950 shadow-[#00E5FF]/20' :
                        config.themeColor === 'rose' ? 'bg-[#F43F5E] hover:bg-[#e11d48] text-white shadow-[#F43F5E]/20' :
                        config.themeColor === 'purple' ? 'bg-[#A855F7] hover:bg-[#9333ea] text-white shadow-[#A855F7]/20' :
                        config.themeColor === 'yellow' ? 'bg-[#EAB308] hover:bg-[#ca8a04] text-slate-950 shadow-[#EAB308]/20' :
                        'bg-[#6366F1] hover:bg-[#4f46e5] text-white shadow-[#6366F1]/20';

  return (
    <div className="min-h-screen text-slate-900 bg-slate-950 font-sans relative overflow-x-hidden">
      <Header isDarkHeaderOverride={true} />
      
      {/* Decorative Vector Guides */}
      <PageDecorativeSVG themeColor={config.themeColor} />
      
      {/* Dynamic Background Blurs */}
      <div className={`absolute top-[-5dvh] right-[-10dvw] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[140px] pointer-events-none ${glowBgColor}`} />
      <div className={`absolute bottom-[20dvh] left-[-10dvw] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-[140px] pointer-events-none ${glowBgColor}`} />

      {/* Back Button */}
      <div className="max-w-[1600px] mx-auto pt-28 px-6 sm:px-12 md:px-16 pointer-events-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 1: HERO HEADER
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-24 pb-16 text-center z-10">
        <main className="max-w-4xl flex flex-col items-center">
          
          <div className="mb-6 flex items-center gap-3 font-semibold text-xs sm:text-sm">
            <span className="font-bold" style={{ color: `var(--theme-accent, ${dotColor})` }}>→</span>
            <span className="text-neutral-400 font-mono tracking-widest uppercase">Strata Quest Ledger Core</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[0.95] font-medium text-white tracking-[-0.03em] break-words">
              {config.title.split(config.highlightWord)[0]}
              <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent relative font-serif italic font-semibold`}>
                "{config.highlightWord}"
              </span>
              {config.title.split(config.highlightWord)[1]}
            </h1>
          </div>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-normal">
            {config.subtitle}. Highly tailored blockchain engineering designed for stability, low network latency, and verified ledger security.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mb-14">
            <a 
              href="#quote-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group flex items-center justify-between rounded-full pl-6 pr-2 py-2 h-14 w-full sm:w-auto min-w-[200px] ${themeBtnColor} transition-all duration-300 shadow-lg active:scale-95 cursor-pointer`}
            >
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Consult Team</span>
              <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform text-current">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
            
            <a 
              href="#sandbox"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 h-14 flex items-center justify-center font-bold text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Try Interactive Sandbox
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
            {config.stats.map((stat, i) => (
              <div key={i} className="group relative py-4 px-6 bg-slate-900/30 border border-white/5 rounded-2xl">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className="h-[1px] w-4 bg-white/20 group-hover:w-8 transition-all duration-500" />
                  <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">{stat.label}</span>
                  <div className="h-[1px] w-4 bg-white/20 group-hover:w-8 transition-all duration-500" />
                </div>
                <h4 className="text-xl sm:text-2xl font-serif italic text-white mb-0.5">{stat.value}</h4>
                <p className="text-[10px] text-neutral-400">{stat.sub}</p>
              </div>
            ))}
          </div>

        </main>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 2: CONCEPT DETAIL & HOW WE PROVIDED SERVICES
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern-dark border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 mb-16">
            <SectionLabel text="Core Delivery Ecosystem" colorClass={textAccentClass} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-tight">
              A Closer Look At The Concept <br />
              <span className="not-italic font-sans font-semibold text-lg sm:text-2xl text-neutral-300">And How We Deploy Solutions.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Concept Info Card */}
            <GlassCard hover={false} className={`flex flex-col justify-between h-full border-l-2`} theme={config.themeColor}>
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: dotColor }} />
              <div>
                <h3 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4">{config.conceptTitle}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-normal">{config.conceptDesc}</p>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase">Industry Core</span>
                <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase">Audited Standard</span>
              </div>
            </GlassCard>

            {/* How We Provided Card */}
            <GlassCard hover={false} className="flex flex-col justify-between h-full" theme={config.themeColor}>
              <div>
                <h3 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4">{config.providedTitle}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-normal">{config.providedDesc}</p>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase">Deployment Ready</span>
                <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 uppercase">Premium SLA</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 3: INTERACTIVE CONCEPT SANDBOX
         ═══════════════════════════════════════════════════════════════ */}
      <section id="sandbox" className="py-20 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern relative border-t border-white/5 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            
            {/* Widget Description */}
            <div className="md:col-span-2 text-left space-y-6">
              <SectionLabel text="Interactive Sandbox" colorClass={textAccentClass} />
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight">
                Simulate Ledger <br className="hidden md:block"/> Parameters.
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                Test custom business variables on-the-fly. Choose targets, adjust rates, or trace cryptography nodes using our live sandbox terminal tool.
              </p>
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Configured using v3.0 core rules</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real-time client-side rendering</span>
                </div>
              </div>
            </div>

            {/* Sandbox Widget */}
            <div className="md:col-span-3 h-full">
              <ServiceWidget serviceId={config.id} themeColor={config.themeColor} />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 4: KEY FEATURES / CAPABILITIES
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern-dark relative border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 mb-16">
            <SectionLabel text="Platform Features" colorClass={textAccentClass} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-tight">
              Bespoke Capability Suites <br />
              <span className="not-italic font-sans font-semibold text-lg sm:text-2xl text-neutral-300">Of Our Ledger Integrations.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.features.map((feature, i) => {
              const FeatIcon = feature.icon;
              return (
                <div 
                  key={i} 
                  className={`glass-panel-dark rounded-3xl p-6 flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow ${cardBorderAccentClass} border border-white/5 cursor-pointer`}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-105 transition-transform" style={{ color: dotColor }}>
                      <FeatIcon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed font-normal">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 5: SUCCESS CASE STUDY
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 sm:px-12 md:px-16 lg:px-24 bg-grid-pattern relative border-t border-white/5 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel-dark rounded-[2rem] overflow-hidden border border-white/10 flex flex-col md:flex-row relative">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: dotColor }} />
            
            {/* Left side case info */}
            <div className="md:w-[40%] bg-white/5 p-8 sm:p-10 flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-2">Featured Project Delivery</span>
                <h3 className="text-2xl font-serif italic text-white mb-6">Client Case Study</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Client partner</span>
                    <span className="text-sm font-semibold text-white">{config.caseStudy.client}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Technology Layer</span>
                    <span className="text-sm font-semibold text-white" style={{ color: dotColor }}>Strata Quest v3.0 Core</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-[9px] font-mono text-neutral-500 tracking-wider">
                CONFIDENTIAL INTEGRATION RECORD
              </div>
            </div>

            {/* Right side challenge/solution */}
            <div className="md:w-[60%] p-8 sm:p-10 text-left space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#00E5FF] uppercase mb-2">The Challenge</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">{config.caseStudy.challenge}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#8B5CF6] uppercase mb-2">The Solution</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">{config.caseStudy.solution}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">The Result</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">{config.caseStudy.result}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 6: CALL TO ACTION (QUOTE ENGAGEMENT FORM)
         ═══════════════════════════════════════════════════════════════ */}
      <section id="quote-form" className="relative w-full py-20 bg-slate-900/40 border-t border-white/5 z-10">
        <div className="max-w-[700px] mx-auto text-center px-6">
          <SectionLabel text="Consultation Intake" colorClass={textAccentClass} />
          
          <h2 className="text-3xl sm:text-4xl font-serif italic text-white mb-6">
            Initiate Your Project Build<span className="text-[#00E5FF]">.</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-10 max-w-lg mx-auto font-normal">
            Ready to integrate custom ledger systems? Drop your details and our senior solution architect desk will connect with you within 24 hours.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Project intake received! Strata Quest team is scanning your files."); }} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                className="w-full h-12 bg-slate-950/60 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
              <input 
                type="email" 
                placeholder="Work Email" 
                required
                className="w-full h-12 bg-slate-950/60 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>
            <select 
              required
              defaultValue={config.id}
              className="w-full h-12 bg-slate-950/60 border border-white/10 rounded-xl px-4 text-xs text-neutral-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
            >
              <option value="crypto-wallet-development">Crypto Wallet Development</option>
              <option value="nft-marketplace-development">NFT Marketplace Development</option>
              <option value="defi-development">DeFi Development</option>
              <option value="smart-contract-development">Smart Contract Development</option>
              <option value="web3-development">Web3 Development</option>
              <option value="token-development">Token Development</option>
              <option value="ico-development">ICO Development</option>
              <option value="mlm-software-development">MLM Software Development</option>
              <option value="blockchain-consulting">Blockchain Consulting & Auditing</option>
            </select>
            <textarea 
              rows={4} 
              placeholder="Tell us briefly about your scale requirements..." 
              required
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
            />
            
            <button 
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r ${gradientText} text-white transition-all duration-300 hover:scale-[1.01] active:scale-100 hover:shadow-lg hover:shadow-violet-500/10 cursor-pointer`}
            >
              Deploy Consultation Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer Info Strip */}
      <footer className="w-full py-12 border-t border-white/5 text-center text-[10px] font-mono tracking-widest text-neutral-500 uppercase z-10 relative bg-slate-950">
        STRATA QUEST SYSTEM CORE © 2026. SECURING TRUST ONE BLOCK AT A TIME.
      </footer>
    </div>
  );
};

export default BlockchainServiceDetailPage;
