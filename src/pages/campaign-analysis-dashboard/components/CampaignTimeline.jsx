import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignTimeline = ({ selectedCampaign, onEventSelect }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Mock timeline data
  useEffect(() => {
    const mockTimelineData = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 3600000 * 2),
        type: 'campaign_start',
        title: 'Campaign Initiated',
        description: 'Coordinated misinformation campaign detected across multiple platforms',
        severity: 'high',
        platform: 'Twitter',
        evidenceCount: 12,
        actors: ['@malicious_actor_1', '@fake_news_bot']
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 3600000 * 1.5),
        type: 'content_spike',
        title: 'Content Volume Spike',
        description: 'Unusual increase in similar content posting detected',
        severity: 'medium',
        platform: 'Facebook',
        evidenceCount: 8,
        actors: ['FakeNewsPage', 'PropagandaGroup']
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 3600000 * 1),
        type: 'impersonation',
        title: 'Impersonation Account Created',
        description: 'New fake profile mimicking VIP detected',
        severity: 'critical',
        platform: 'Instagram',
        evidenceCount: 15,
        actors: ['@fake_executive_alpha']
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 3600000 * 0.5),
        type: 'escalation',
        title: 'Threat Escalation',
        description: 'Campaign expanded to include direct threats',
        severity: 'critical',
        platform: 'Telegram',
        evidenceCount: 6,
        actors: ['ThreatGroup_X', 'Anonymous_Channel']
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 3600000 * 0.2),
        type: 'mitigation',
        title: 'Countermeasures Deployed',
        description: 'Platform takedown requests submitted',
        severity: 'low',
        platform: 'Multiple',
        evidenceCount: 3,
        actors: ['Security_Team']
      }
    ];

    setTimelineData(mockTimelineData);
  }, [selectedCampaign]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'campaign_start': return 'Play';
      case 'content_spike': return 'TrendingUp';
      case 'impersonation': return 'UserX';
      case 'escalation': return 'AlertTriangle';
      case 'mitigation': return 'Shield';
      default: return 'Circle';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Twitter': return 'text-blue-400';
      case 'Facebook': return 'text-blue-600';
      case 'Instagram': return 'text-pink-500';
      case 'Telegram': return 'text-cyan-400';
      case 'Multiple': return 'text-purple-400';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Campaign Timeline</h3>
          <p className="text-sm text-muted-foreground">
            {selectedCampaign ? `Campaign: ${selectedCampaign?.name}` : 'Select a campaign node to view timeline'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          
          <Button
            variant={isAutoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            iconName="RefreshCw"
            iconSize={14}
          >
            Auto
          </Button>
        </div>
      </div>
      {/* Timeline */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {timelineData?.map((event, index) => (
          <div
            key={event?.id}
            className="relative flex items-start space-x-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => onEventSelect(event)}
          >
            {/* Timeline Line */}
            {index < timelineData?.length - 1 && (
              <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>
            )}
            
            {/* Event Icon */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getSeverityColor(event?.severity)} flex-shrink-0`}>
              <Icon name={getEventIcon(event?.type)} size={16} color="white" />
            </div>
            
            {/* Event Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground">{event?.title}</h4>
                <span className="text-xs text-muted-foreground font-mono">
                  {formatTimeAgo(event?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Monitor" size={12} className={getPlatformColor(event?.platform)} />
                    <span className="text-xs text-muted-foreground">{event?.platform}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="FileText" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{event?.evidenceCount} evidence</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {event?.actors?.length} actor{event?.actors?.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              {/* Actors */}
              <div className="mt-2 flex flex-wrap gap-1">
                {event?.actors?.slice(0, 3)?.map((actor, actorIndex) => (
                  <span
                    key={actorIndex}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground font-mono"
                  >
                    {actor}
                  </span>
                ))}
                {event?.actors?.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                    +{event?.actors?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Timeline Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{timelineData?.length}</div>
            <div className="text-xs text-muted-foreground">Events</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-error">
              {timelineData?.filter(e => e?.severity === 'critical')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">
              {timelineData?.reduce((sum, e) => sum + e?.evidenceCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Evidence</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {new Set(timelineData.flatMap(e => e.actors))?.size}
            </div>
            <div className="text-xs text-muted-foreground">Actors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTimeline;