import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import { LogOut, User, Menu, X } from 'lucide-react';
import Icon from '../AppIcon';
import Logo from './Logo';


const Header = ({ className = '', ...props }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [threatLevel, setThreatLevel] = useState('low');
  const [selectedVIP, setSelectedVIP] = useState('Executive Alpha');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [alertCount, setAlertCount] = useState(3);

  const navigationItems = [
    {
      label: 'Command Center',
      path: '/threat-intelligence-command-center',
      icon: 'Shield',
      tooltip: 'Real-time threat monitoring and response'
    },
    {
      label: 'Campaign Analysis',
      path: '/campaign-analysis-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Advanced threat investigation and analysis'
    },
    {
      label: 'Evidence Collection',
      path: '/evidence-collection-interface',
      icon: 'FileText',
      tooltip: 'Forensic documentation and chain-of-custody'
    },
    {
      label: 'Executive Summary',
      path: '/executive-risk-summary',
      icon: 'BarChart3',
      tooltip: 'Strategic risk overview for leadership'
    }
  ];

  const vipProfiles = [
    { id: 'exec-alpha', name: 'Executive Alpha', status: 'active' },
    { id: 'exec-beta', name: 'Executive Beta', status: 'monitoring' },
    { id: 'exec-gamma', name: 'Executive Gamma', status: 'secure' }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const levels = ['low', 'medium', 'high', 'critical'];
      
      setConnectionStatus(statuses?.[Math.floor(Math.random() * statuses?.length)]);
      setThreatLevel(levels?.[Math.floor(Math.random() * levels?.length)]);
      setAlertCount(Math.floor(Math.random() * 10) + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-accent';
      case 'high': return 'bg-warning';
      case 'critical': return 'bg-error';
      default: return 'bg-success';
    }
  };

  const getConnectionColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-success';
      case 'connecting': return 'bg-warning animate-pulse';
      case 'disconnected': return 'bg-error';
      default: return 'bg-success';
    }
  };

  const getVIPInitials = (name) => {
    return name?.split(' ')?.map(word => word?.[0])?.join('');
  };

  return (
    <header className={`bg-background border-b border-border ${className}`} {...props}>
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="sm" showText={true} />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/evidence-collection-interface"
              className={`text-text-secondary hover:text-primary px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/evidence-collection-interface' ? 'text-primary' : ''
              }`}
            >
              Evidence Collection
            </Link>
            <Link
              to="/threat-intelligence-command-center"
              className={`text-text-secondary hover:text-primary px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/threat-intelligence-command-center' ? 'text-primary' : ''
              }`}
            >
              Threat Intelligence
            </Link>
            <Link
              to="/campaign-analysis-dashboard"
              className={`text-text-secondary hover:text-primary px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/campaign-analysis-dashboard' ? 'text-primary' : ''
              }`}
            >
              Campaign Analysis
            </Link>
            <Link
              to="/executive-risk-summary"
              className={`text-text-secondary hover:text-primary px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === '/executive-risk-summary' ? 'text-primary' : ''
              }`}
            >
              Risk Summary
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>

            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <User className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/auth/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border animate-fadeIn">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full text-left nav-item ${location?.pathname === item?.path ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={18} className="mr-3" />
                <div>
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs text-muted-foreground">{item?.tooltip}</div>
                </div>
              </button>
            ))}
            
            {/* Mobile User Section */}
            {user && (
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary">
                  <User className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            )}

            {/* Mobile Status Section */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`threat-indicator ${threatLevel}`}></div>
                  <span className="text-muted-foreground">Threat: {threatLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`connection-status ${connectionStatus}`}></div>
                  <span className="text-muted-foreground">{connectionStatus}</span>
                </div>
              </div>

              <div className="mt-2">
                <select
                  value={selectedVIP}
                  onChange={(e) => setSelectedVIP(e?.target?.value)}
                  className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {vipProfiles?.map((profile) => (
                    <option key={profile?.id} value={profile?.name}>
                      {profile?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;