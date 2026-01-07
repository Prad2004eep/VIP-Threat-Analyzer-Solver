import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NodeDetailsPanel = ({ selectedNode, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedNode) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Node</h3>
          <p className="text-sm text-muted-foreground">
            Click on any node in the network graph to view detailed information
          </p>
        </div>
      </div>
    );
  }

  const getNodeTypeIcon = (type) => {
    switch (type) {
      case 'threat_actor': return 'UserX';
      case 'campaign': return 'Target';
      case 'content': return 'FileText';
      case 'platform': return 'Monitor';
      default: return 'Circle';
    }
  };

  const getNodeTypeColor = (type) => {
    switch (type) {
      case 'threat_actor': return 'text-error';
      case 'campaign': return 'text-accent';
      case 'content': return 'text-primary';
      case 'platform': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getThreatLevelBadge = (level) => {
    const colors = {
      low: 'bg-success text-success-foreground',
      medium: 'bg-accent text-accent-foreground',
      high: 'bg-warning text-warning-foreground',
      critical: 'bg-error text-error-foreground'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colors?.[level] || colors?.low}`}>
        {level?.toUpperCase() || 'UNKNOWN'}
      </span>
    );
  };

  const mockNodeDetails = {
    ...selectedNode,
    description: selectedNode?.type === 'threat_actor' 
      ? `Coordinated threat actor identified through behavioral analysis and content pattern matching. Active across multiple platforms with sophisticated evasion techniques.`
      : selectedNode?.type === 'campaign'
      ? `Multi-platform misinformation campaign targeting VIP reputation through coordinated narrative manipulation and amplification networks.`
      : selectedNode?.type === 'content'
      ? `Malicious content piece identified as part of coordinated campaign. Contains misleading information designed to damage VIP reputation.`
      : `Platform hosting coordinated malicious content and threat actor activities. Monitoring for policy violations and takedown opportunities.`,
    
    metadata: {
      firstSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      totalPosts: Math.floor(Math.random() * 500) + 50,
      followers: Math.floor(Math.random() * 10000) + 1000,
      engagement: Math.random() * 0.1 + 0.01,
      verified: Math.random() > 0.8,
      location: ['United States', 'Russia', 'China', 'Unknown', 'Brazil', 'India']?.[Math.floor(Math.random() * 6)]
    },
    
    connections: [
      { id: 'conn1', name: 'Related Actor A', type: 'threat_actor', strength: 0.85 },
      { id: 'conn2', name: 'Campaign Beta', type: 'campaign', strength: 0.72 },
      { id: 'conn3', name: 'Viral Content X', type: 'content', strength: 0.91 }
    ],
    
    evidence: [
      {
        id: 'ev1',
        type: 'screenshot',
        title: 'Coordinated Posting Pattern',
        timestamp: new Date(Date.now() - 3600000),
        platform: 'Twitter',
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop'
      },
      {
        id: 'ev2',
        type: 'data',
        title: 'Network Analysis Results',
        timestamp: new Date(Date.now() - 7200000),
        platform: 'Multiple',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
      }
    ],
    
    timeline: [
      {
        timestamp: new Date(Date.now() - 86400000),
        event: 'Account Creation',
        description: 'Suspicious account created with minimal profile information'
      },
      {
        timestamp: new Date(Date.now() - 43200000),
        event: 'First Malicious Post',
        description: 'Initial misinformation content posted targeting VIP'
      },
      {
        timestamp: new Date(Date.now() - 21600000),
        event: 'Amplification Network Activated',
        description: 'Coordinated sharing across multiple bot accounts detected'
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'connections', label: 'Connections', icon: 'Network' },
    { id: 'evidence', label: 'Evidence', icon: 'FileText' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-background ${getNodeTypeColor(selectedNode?.type)}`}>
            <Icon name={getNodeTypeIcon(selectedNode?.type)} size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{selectedNode?.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {selectedNode?.type?.replace('_', ' ')} • ID: {selectedNode?.id}
            </p>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex items-center space-x-1 p-4 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Threat Level */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Threat Level</span>
              {getThreatLevelBadge(selectedNode?.threatLevel)}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mockNodeDetails?.description}
              </p>
            </div>

            {/* Metrics */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Key Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-3">
                  <div className="text-lg font-semibold text-foreground">
                    {selectedNode?.influence?.toFixed(1) || '0.0'}
                  </div>
                  <div className="text-xs text-muted-foreground">Influence Score</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="text-lg font-semibold text-foreground">
                    {mockNodeDetails?.metadata?.totalPosts?.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Posts</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="text-lg font-semibold text-foreground">
                    {mockNodeDetails?.metadata?.followers?.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="bg-background rounded-lg p-3">
                  <div className="text-lg font-semibold text-foreground">
                    {(mockNodeDetails?.metadata?.engagement * 100)?.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Metadata</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">First Seen</span>
                  <span className="text-sm text-foreground font-mono">
                    {mockNodeDetails?.metadata?.firstSeen?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <span className="text-sm text-foreground font-mono">
                    {mockNodeDetails?.metadata?.lastActive?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm text-foreground">
                    {mockNodeDetails?.metadata?.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Verified</span>
                  <span className="text-sm text-foreground">
                    {mockNodeDetails?.metadata?.verified ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Connected Nodes</h4>
            {mockNodeDetails?.connections?.map((connection) => (
              <div key={connection?.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-surface ${getNodeTypeColor(connection?.type)}`}>
                    <Icon name={getNodeTypeIcon(connection?.type)} size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{connection?.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {connection?.type?.replace('_', ' ')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {(connection?.strength * 100)?.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Strength</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Evidence Collection</h4>
            {mockNodeDetails?.evidence?.map((evidence) => (
              <div key={evidence?.id} className="bg-background rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Image
                    src={evidence?.url}
                    alt={evidence?.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-foreground mb-1">{evidence?.title}</h5>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                      <Icon name="Monitor" size={12} />
                      <span>{evidence?.platform}</span>
                      <Icon name="Clock" size={12} />
                      <span>{evidence?.timestamp?.toLocaleString()}</span>
                    </div>
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={12}>
                      View Evidence
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Activity Timeline</h4>
            <div className="space-y-4">
              {mockNodeDetails?.timeline?.map((event, index) => (
                <div key={index} className="relative flex items-start space-x-3">
                  {index < mockNodeDetails?.timeline?.length - 1 && (
                    <div className="absolute left-2 top-6 w-px h-12 bg-border"></div>
                  )}
                  <div className="flex items-center justify-center w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-medium text-foreground">{event?.event}</h5>
                      <span className="text-xs text-muted-foreground font-mono">
                        {event?.timestamp?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button variant="default" size="sm" iconName="Flag" iconSize={14}>
            Flag as Threat
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconSize={14}>
            Export Data
          </Button>
          <Button variant="outline" size="sm" iconName="Share" iconSize={14}>
            Share Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsPanel;