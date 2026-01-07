import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveAlertStream = ({ alerts, onAlertClick }) => {
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  useEffect(() => {
    setVisibleAlerts(alerts?.slice(0, 10));
  }, [alerts]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-error bg-error/5 text-error';
      case 'high': return 'border-l-warning bg-warning/5 text-warning';
      case 'medium': return 'border-l-accent bg-accent/5 text-accent';
      case 'low': return 'border-l-success bg-success/5 text-success';
      default: return 'border-l-border bg-muted/5 text-muted-foreground';
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      twitter: 'Twitter',
      instagram: 'Instagram',
      facebook: 'Facebook',
      telegram: 'MessageCircle',
      discord: 'MessageSquare',
      reddit: 'MessageCircle',
      youtube: 'Play',
      tiktok: 'Video'
    };
    return icons?.[platform?.toLowerCase()] || 'Globe';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return new Date(timestamp)?.toLocaleTimeString();
  };

  const getAlertIcon = (type) => {
    const icons = {
      impersonation: 'UserX',
      misinformation: 'AlertTriangle',
      threat: 'Shield',
      deepfake: 'Camera',
      leak: 'Lock',
      harassment: 'MessageSquareX'
    };
    return icons?.[type] || 'Bell';
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-primary" />
          Live Alert Stream
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground font-mono">LIVE</span>
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {visibleAlerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Shield" size={48} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No active alerts</p>
            <p className="text-xs text-muted-foreground">System monitoring normally</p>
          </div>
        ) : (
          visibleAlerts?.map((alert) => (
            <div
              key={alert?.id}
              onClick={() => onAlertClick(alert)}
              className={`p-3 rounded-full border-l-4 cursor-pointer hover:shadow-tactical transition-all duration-200 ${getSeverityColor(alert?.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={16} 
                    className="mt-0.5 flex-shrink-0" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {alert?.type?.replace('_', ' ')}
                      </span>
                      <Icon name={getPlatformIcon(alert?.platform)} size={12} />
                    </div>
                    
                    <p className="text-sm text-foreground font-medium line-clamp-2">
                      {alert?.message}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                      <span>{alert?.target}</span>
                      <span>•</span>
                      <span>{formatTimestamp(alert?.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-1 ml-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity?.toUpperCase()}
                  </div>
                  {alert?.confidence && (
                    <span className="text-xs text-muted-foreground">
                      {alert?.confidence}%
                    </span>
                  )}
                </div>
              </div>
              
              {alert?.preview && (
                <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground line-clamp-2">
                  {alert?.preview}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {alerts?.length > 10 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => setVisibleAlerts(alerts)}
            className="w-full text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Show all {alerts?.length} alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveAlertStream;