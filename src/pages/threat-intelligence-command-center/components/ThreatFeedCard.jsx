import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ThreatFeedCard = ({ threat, onEscalate, onArchive, onInvestigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
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
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp)?.toLocaleDateString();
  };

  return (
    <div className="card p-4 hover:shadow-tactical-lg transition-all duration-200 border-l-4 border-l-primary/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat?.severity)}`}>
            {threat?.severity?.toUpperCase()}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name={getPlatformIcon(threat?.platform)} size={16} />
            <span className="capitalize">{threat?.platform}</span>
            <span>•</span>
            <span>{formatTimestamp(threat?.timestamp)}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      <div className="mb-3">
        <h4 className="font-semibold text-foreground mb-1">
          {threat?.title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {threat?.description}
        </p>
      </div>
      {threat?.evidence && threat?.evidence?.length > 0 && (
        <div className="flex space-x-2 mb-3 overflow-x-auto">
          {threat?.evidence?.slice(0, 3)?.map((evidence, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={evidence?.thumbnail}
                alt={`Evidence ${index + 1}`}
                className="w-16 h-16 rounded-md object-cover border border-border"
              />
            </div>
          ))}
          {threat?.evidence?.length > 3 && (
            <div className="flex-shrink-0 w-16 h-16 rounded-md border border-border bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                +{threat?.evidence?.length - 3}
              </span>
            </div>
          )}
        </div>
      )}
      {isExpanded && (
        <div className="border-t border-border pt-3 mt-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-muted-foreground">Source:</span>
              <p className="font-mono text-xs text-foreground break-all">
                {threat?.source}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Confidence:</span>
              <p className="text-foreground">{threat?.confidence}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Threat Type:</span>
              <p className="text-foreground capitalize">{threat?.type}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Target:</span>
              <p className="text-foreground">{threat?.target}</p>
            </div>
          </div>
          
          {threat?.fullContent && (
            <div className="mb-4">
              <span className="text-muted-foreground text-sm">Full Content:</span>
              <div className="mt-1 p-3 bg-muted rounded-md">
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {threat?.fullContent}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Eye" size={14} />
            <span>{threat?.views}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Share" size={14} />
            <span>{threat?.shares}</span>
          </div>
          {threat?.engagement && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Heart" size={14} />
              <span>{threat?.engagement}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onArchive(threat?.id)}
          >
            <Icon name="Archive" size={14} className="mr-1" />
            Archive
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onInvestigate(threat?.id)}
          >
            <Icon name="Search" size={14} className="mr-1" />
            Investigate
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onEscalate(threat?.id)}
          >
            <Icon name="AlertTriangle" size={14} className="mr-1" />
            Escalate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreatFeedCard;