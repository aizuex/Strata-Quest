import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import ServicePage from './components/ServicePage';
import CryptoExchangePage from './components/CryptoExchangePage';
import BlockchainServiceDetailPage from './components/BlockchainServiceDetailPage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', background: '#fff5f5', color: '#c53030', fontFamily: 'monospace', minHeight: '100vh', overflow: 'auto' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>🚨 React Runtime Error</h2>
          <div style={{ background: '#fff', border: '1px solid #fed7d7', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <strong style={{ display: 'block', marginBottom: '5px' }}>Error Message:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: '14px' }}>{this.state.error?.message}</pre>
          </div>
          <div style={{ background: '#fff', border: '1px solid #fed7d7', padding: '15px', borderRadius: '8px' }}>
            <strong style={{ display: 'block', marginBottom: '5px' }}>Stack Trace:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: '12px', lineHeight: '1.5' }}>{this.state.error?.stack}</pre>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

function App() {
  console.log(">>> DIAGNOSTIC: App function rendering");
  return (
    <ErrorBoundary>
      <Router>
        <div className="antialiased">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/ai-development" element={<ServicePage type="ai-development" />} />
            <Route path="/blockchain-development" element={<ServicePage type="blockchain-development" />} />
            <Route path="/crypto-exchange-development" element={<CryptoExchangePage />} />
            <Route path="/crypto-integration" element={<ServicePage type="crypto-integration" />} />
            <Route path="/custom-app-development" element={<ServicePage type="custom-app-development" />} />
            <Route path="/software-development" element={<ServicePage type="software-development" />} />
            <Route path="/game-development" element={<ServicePage type="game-development" />} />
            <Route path="/web-development" element={<ServicePage type="web-development" />} />
            <Route path="/ondemand-developer-teams" element={<ServicePage type="ondemand-developer-teams" />} />
            <Route path="/industry-use-cases" element={<ServicePage type="industry-use-cases" />} />
            <Route path="/about-strata-quest" element={<ServicePage type="about-strata-quest" />} />
            
            {/* New Blockchain Subpages */}
            <Route path="/crypto-wallet-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/nft-marketplace-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/defi-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/smart-contract-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/web3-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/token-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/ico-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/mlm-software-development" element={<BlockchainServiceDetailPage />} />
            <Route path="/blockchain-consulting" element={<BlockchainServiceDetailPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;