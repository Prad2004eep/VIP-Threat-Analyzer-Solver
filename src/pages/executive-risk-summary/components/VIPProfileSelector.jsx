import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VIPProfileSelector = () => {
  const [selectedProfile, setSelectedProfile] = useState('exec-alpha');
  const [dateRange, setDateRange] = useState('weekly');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const vipProfiles = [
    {
      id: 'exec-alpha',
      name: 'Executive Alpha',
      title: 'Chief Executive Officer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      riskLevel: 'medium',
      lastUpdate: '2025-09-03T09:15:00Z',
      totalThreats: 17,
      criticalThreats: 2
    },
    {
      id: 'exec-beta',
      name: 'Executive Beta',
      title: 'Chief Technology Officer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'monitoring',
      riskLevel: 'low',
      lastUpdate: '2025-09-03T08:45:00Z',
      totalThreats: 8,
      criticalThreats: 0
    },
    {
      id: 'exec-gamma',
      name: 'Executive Gamma',
      title: 'Chief Financial Officer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'secure',
      riskLevel: 'high',
      lastUpdate: '2025-09-03T07:30:00Z',
      totalThreats: 23,
      criticalThreats: 4
    }
  ];

  const dateRanges = [
    { value: 'daily', label: 'Daily View', description: 'Last 24 hours' },
    { value: 'weekly', label: 'Weekly View', description: 'Last 7 days' },
    { value: 'monthly', label: 'Monthly View', description: 'Last 30 days' },
    { value: 'quarterly', label: 'Quarterly View', description: 'Last 90 days' }
  ];

  const currentProfile = vipProfiles?.find(p => p?.id === selectedProfile);

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-error';
      case 'monitoring': return 'bg-warning';
      case 'secure': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  const formatLastUpdate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCurrentDateRangeLabel = () => {
    const range = dateRanges?.find(r => r?.value === dateRange);
    const today = new Date();
    
    switch (dateRange) {
      case 'daily':
        return today?.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      case 'weekly':
        const weekStart = new Date(today);
        weekStart?.setDate(today?.getDate() - 6);
        return `${weekStart?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${today?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      case 'monthly':
        return today?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'quarterly':
        const quarter = Math.floor(today?.getMonth() / 3) + 1;
        return `Q${quarter} ${today?.getFullYear()}`;
      default:
        return range?.description || '';
    }
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="flex items-center justify-between p-6">
        {/* VIP Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card hover:bg-surface transition-colors"
            >
              <div className="relative">
                <img
                  src={currentProfile?.avatar}
                  alt={currentProfile?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(currentProfile?.status)}`}></div>
              </div>
              
              <div className="text-left">
                <div className="text-lg font-semibold text-foreground">
                  {currentProfile?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentProfile?.title}
                </div>
              </div>
              
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-tactical-xl z-50 animate-fadeIn">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Select VIP Profile</h3>
                </div>
                
                <div className="p-2 space-y-1">
                  {vipProfiles?.map((profile) => (
                    <button
                      key={profile?.id}
                      onClick={() => {
                        setSelectedProfile(profile?.id);
                        setIsProfileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        profile?.id === selectedProfile 
                          ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={profile?.avatar}
                          alt={profile?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${getStatusColor(profile?.status)}`}></div>
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-foreground">
                          {profile?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {profile?.title}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(profile?.riskLevel)}`}>
                          {profile?.riskLevel?.toUpperCase()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {profile?.totalThreats} threats
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Stats */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground font-mono">
                {currentProfile?.totalThreats}
              </div>
              <div className="text-xs text-muted-foreground">
                Total Threats
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-error font-mono">
                {currentProfile?.criticalThreats}
              </div>
              <div className="text-xs text-muted-foreground">
                Critical
              </div>
            </div>
            
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(currentProfile?.riskLevel)}`}>
                {currentProfile?.riskLevel?.toUpperCase()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Risk Level
              </div>
            </div>
          </div>
        </div>

        {/* Date Range & Controls */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {getCurrentDateRangeLabel()}
            </div>
            <div className="text-xs text-muted-foreground">
              Updated {formatLastUpdate(currentProfile?.lastUpdate)}
            </div>
          </div>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e?.target?.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dateRanges?.map((range) => (
              <option key={range?.value} value={range?.value}>
                {range?.label}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>
      </div>
      {/* Quick Status Bar */}
      <div className="px-6 py-3 bg-surface/50 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Monitoring Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-primary" />
              <span className="text-muted-foreground">Protection Enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Next scan in 15 minutes</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="xs" iconName="Bell">
              Alerts (3)
            </Button>
            <Button variant="ghost" size="xs" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPProfileSelector;