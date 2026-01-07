import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControlPanel = ({ 
  selectedVIP, 
  onVIPChange, 
  selectedPlatforms, 
  onPlatformChange, 
  threatSeverity, 
  onSeverityChange, 
  timeRange, 
  onTimeRangeChange,
  autoRefresh,
  onAutoRefreshToggle,
  connectionStatus,
  onExport
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const vipOptions = [
    { value: 'executive-alpha', label: 'Executive Alpha' },
    { value: 'executive-beta', label: 'Executive Beta' },
    { value: 'executive-gamma', label: 'Executive Gamma' },
    { value: 'celebrity-delta', label: 'Celebrity Delta' },
    { value: 'politician-epsilon', label: 'Politician Epsilon' }
  ];

  const platformOptions = [
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'discord', label: 'Discord' },
    { value: 'reddit', label: 'Reddit' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical Only' },
    { value: 'high', label: 'High & Above' },
    { value: 'medium', label: 'Medium & Above' },
    { value: 'low', label: 'Low & Above' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getConnectionStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'connecting': return 'text-warning';
      case 'disconnected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionIcon = (status) => {
    switch (status) {
      case 'connected': return 'Wifi';
      case 'connecting': return 'Loader';
      case 'disconnected': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Command Center Controls
        </h2>
        
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className={`flex items-center space-x-2 ${getConnectionStatusColor(connectionStatus)}`}>
            <Icon 
              name={getConnectionIcon(connectionStatus)} 
              size={16} 
              className={connectionStatus === 'connecting' ? 'animate-spin' : ''} 
            />
            <span className="text-sm font-medium capitalize">{connectionStatus}</span>
          </div>
          
          {/* Auto Refresh Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={onAutoRefreshToggle}
            >
              <Icon name="RefreshCw" size={14} className={`mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
          </div>
          
          {/* Expand/Collapse */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Main Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="VIP Profile"
          options={vipOptions}
          value={selectedVIP}
          onChange={onVIPChange}
          className="w-full"
        />
        
        <Select
          label="Platforms"
          options={platformOptions}
          value={selectedPlatforms}
          onChange={onPlatformChange}
          multiple
          searchable
          className="w-full"
        />
        
        <Select
          label="Threat Severity"
          options={severityOptions}
          value={threatSeverity}
          onChange={onSeverityChange}
          className="w-full"
        />
        
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={timeRange}
          onChange={onTimeRangeChange}
          className="w-full"
        />
      </div>
      {/* Expanded Controls */}
      {isExpanded && (
        <div className="border-t border-border pt-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Threat Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Impersonation', 'Misinformation', 'Harassment', 'Deepfake', 'Data Leak', 'Phishing']?.map((type) => (
                  <label key={type} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <span className="text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Geographic Regions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']?.map((region) => (
                  <label key={region} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <span className="text-foreground">{region}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Alert Settings
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <span className="text-foreground">Real-time notifications</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <span className="text-foreground">Email alerts</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">SMS notifications</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Save" size={14} className="mr-1" />
                Save Configuration
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Upload" size={14} className="mr-1" />
                Load Preset
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" onClick={() => onExport('pdf')}>
                <Icon name="FileText" size={14} className="mr-1" />
                Export PDF
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onExport('csv')}>
                <Icon name="Download" size={14} className="mr-1" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalControlPanel;