import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionItemsSidebar = () => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [showThreatDetails, setShowThreatDetails] = useState(false);
  const actionItems = [
    {
      id: 1,
      title: 'Review Deepfake Detection Results',
      priority: 'critical',
      dueDate: '2025-09-03',
      assignee: 'Security Team',
      description: 'Analyze flagged deepfake content and coordinate response strategy',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Update VIP Social Media Protocols',
      priority: 'high',
      dueDate: '2025-09-05',
      assignee: 'Digital Team',
      description: 'Revise posting guidelines based on recent threat patterns',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Coordinate with Legal on Evidence',
      priority: 'high',
      dueDate: '2025-09-04',
      assignee: 'Legal Counsel',
      description: 'Prepare documentation for potential legal action',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Schedule Executive Security Briefing',
      priority: 'medium',
      dueDate: '2025-09-06',
      assignee: 'Executive Assistant',
      description: 'Arrange weekly threat assessment presentation',
      status: 'scheduled'
    }
  ];

  const escalatedThreats = [
    {
      id: 1,
      title: 'Coordinated Misinformation Campaign',
      severity: 'critical',
      platform: 'Multiple Platforms',
      timeDetected: '2 hours ago',
      description: 'Large-scale coordinated attack across Twitter, Facebook, and Instagram targeting reputation',
      details: {
        affectedPlatforms: ['Twitter', 'Facebook', 'Instagram'],
        accountsInvolved: 47,
        postsDetected: 156,
        estimatedReach: '2.3M users',
        threatLevel: 'Critical',
        actionRequired: 'Immediate response needed',
        evidence: [
          'Coordinated posting patterns detected',
          'Similar hashtags across platforms',
          'Automated behavior indicators',
          'Cross-platform content sharing'
        ],
        recommendedActions: [
          'Contact platform security teams',
          'Prepare public statement',
          'Monitor trending topics',
          'Activate crisis communication plan'
        ],
        timeline: [
          { time: '2 hours ago', event: 'Initial detection by monitoring system' },
          { time: '1.5 hours ago', event: 'Pattern analysis confirmed coordination' },
          { time: '1 hour ago', event: 'Escalated to executive team' },
          { time: '30 minutes ago', event: 'Platform notifications sent' }
        ]
      }
    },
    {
      id: 2,
      title: 'Impersonation Account Network',
      severity: 'high',
      platform: 'Instagram',
      timeDetected: '6 hours ago',
      description: 'Network of 12 fake accounts mimicking VIP profile with verified-like badges',
      details: {
        affectedPlatforms: ['Instagram'],
        accountsInvolved: 12,
        postsDetected: 34,
        estimatedReach: '850K users',
        threatLevel: 'High',
        actionRequired: 'Report and monitor',
        evidence: [
          'Fake verification badges detected',
          'Profile photos stolen from official accounts',
          'Similar bio patterns across accounts',
          'Coordinated following behavior'
        ],
        recommendedActions: [
          'Report accounts to Instagram',
          'Document evidence for legal action',
          'Alert followers about impersonation',
          'Increase monitoring frequency'
        ],
        timeline: [
          { time: '6 hours ago', event: 'First fake account detected' },
          { time: '5 hours ago', event: 'Network pattern identified' },
          { time: '4 hours ago', event: 'Evidence collection initiated' },
          { time: '3 hours ago', event: 'Reports submitted to platform' }
        ]
      }
    },
    {
      id: 3,
      title: 'Suspicious Physical Location Mentions',
      severity: 'high',
      platform: 'Twitter',
      timeDetected: '1 day ago',
      description: 'Multiple posts referencing VIP location with concerning language patterns',
      details: {
        affectedPlatforms: ['Twitter'],
        accountsInvolved: 8,
        postsDetected: 23,
        estimatedReach: '450K users',
        threatLevel: 'High',
        actionRequired: 'Security assessment needed',
        evidence: [
          'Specific location coordinates mentioned',
          'Threatening language patterns',
          'Photos of nearby areas',
          'Time-sensitive references'
        ],
        recommendedActions: [
          'Notify security personnel',
          'Review physical security measures',
          'Contact law enforcement if needed',
          'Monitor for escalation'
        ],
        timeline: [
          { time: '1 day ago', event: 'Location mentions detected' },
          { time: '20 hours ago', event: 'Threat assessment initiated' },
          { time: '18 hours ago', event: 'Security team notified' },
          { time: '12 hours ago', event: 'Enhanced monitoring activated' }
        ]
      }
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Monthly Security Review',
      date: '2025-09-10',
      type: 'meeting',
      participants: 'Executive Team, Security Lead'
    },
    {
      id: 2,
      title: 'Platform Policy Update',
      date: '2025-09-15',
      type: 'policy',
      participants: 'All Stakeholders'
    },
    {
      id: 3,
      title: 'Threat Intelligence Report',
      date: '2025-09-20',
      type: 'report',
      participants: 'Board of Directors'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error border-error/20 bg-error/5';
      case 'high': return 'text-warning border-warning/20 bg-warning/5';
      case 'medium': return 'text-accent border-accent/20 bg-accent/5';
      case 'low': return 'text-success border-success/20 bg-success/5';
      default: return 'text-muted-foreground border-border bg-card';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'pending': return 'AlertCircle';
      case 'scheduled': return 'Calendar';
      default: return 'Circle';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date?.getTime() - today?.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `${diffDays} days`;
  };

  return (
    <div className="space-y-6">
      {/* Priority Action Items */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-lg">Priority Actions</h3>
            <Button variant="ghost" size="sm" iconName="Plus">
              Add Task
            </Button>
          </div>
        </div>
        
        <div className="card-content space-y-3">
          {actionItems?.map((item) => (
            <div key={item?.id} className={`p-4 rounded-lg border-2 ${getPriorityColor(item?.priority)} transition-all duration-200 hover:shadow-tactical`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                  {item?.title}
                </h4>
                <Icon 
                  name={getStatusIcon(item?.status)} 
                  size={16} 
                  className={getPriorityColor(item?.priority)?.split(' ')?.[0]} 
                />
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {item?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{item?.assignee}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} className="text-muted-foreground" />
                  <span className={`font-medium ${formatDate(item?.dueDate)?.includes('overdue') ? 'text-error' : 'text-foreground'}`}>
                    {formatDate(item?.dueDate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Escalated Threats */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title text-lg">Escalated Threats</h3>
          <p className="card-description">Requiring executive attention</p>
        </div>
        
        <div className="card-content space-y-3">
          {escalatedThreats?.map((threat) => (
            <div key={threat?.id} className={`p-4 rounded-full border-2 ${getPriorityColor(threat?.severity)} transition-all duration-200 hover:shadow-tactical cursor-pointer`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getSeverityIcon(threat?.severity)} 
                    size={16} 
                    className={getPriorityColor(threat?.severity)?.split(' ')?.[0]} 
                  />
                  <h4 className="text-sm font-semibold text-foreground">
                    {threat?.title}
                  </h4>
                </div>
                <span className="text-xs text-muted-foreground">
                  {threat?.timeDetected}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {threat?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{threat?.platform}</span>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ExternalLink"
                  onClick={() => {
                    setSelectedThreat(threat);
                    setShowThreatDetails(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Risk Events */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title text-lg">Upcoming Events</h3>
          <p className="card-description">Scheduled risk activities</p>
        </div>
        
        <div className="card-content space-y-3">
          {upcomingEvents?.map((event) => (
            <div key={event?.id} className="p-4 rounded-lg border border-border bg-surface/50 transition-all duration-200 hover:shadow-tactical">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-foreground">
                  {event?.title}
                </h4>
                <Icon 
                  name={event?.type === 'meeting' ? 'Users' : event?.type === 'policy' ? 'FileText' : 'BarChart3'} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={12} className="text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {new Date(event.date)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground line-clamp-1">
                    {event?.participants}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Details Modal */}
      {showThreatDetails && selectedThreat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <Icon
                  name="AlertTriangle"
                  size={24}
                  className={getPriorityColor(selectedThreat.severity)?.split(' ')?.[0]}
                />
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {selectedThreat.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Detected {selectedThreat.timeDetected} • {selectedThreat.platform}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowThreatDetails(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Threat Overview</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground">Threat Level</label>
                          <p className={`text-sm font-semibold ${getPriorityColor(selectedThreat.severity)?.split(' ')?.[0]}`}>
                            {selectedThreat.details.threatLevel}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Accounts Involved</label>
                          <p className="text-sm font-semibold text-foreground">
                            {selectedThreat.details.accountsInvolved}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Posts Detected</label>
                          <p className="text-sm font-semibold text-foreground">
                            {selectedThreat.details.postsDetected}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Estimated Reach</label>
                          <p className="text-sm font-semibold text-foreground">
                            {selectedThreat.details.estimatedReach}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Description</label>
                        <p className="text-sm text-foreground mt-1">
                          {selectedThreat.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Evidence */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Evidence</h3>
                    <div className="space-y-2">
                      {selectedThreat.details.evidence.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="Check" size={16} className="text-success" />
                          <span className="text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Recommended Actions</h3>
                    <div className="space-y-2">
                      {selectedThreat.details.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                          <span className="text-foreground">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Timeline</h3>
                    <div className="space-y-3">
                      {selectedThreat.details.timeline.map((event, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            {index < selectedThreat.details.timeline.length - 1 && (
                              <div className="w-0.5 h-8 bg-border mt-1"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{event.event}</p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Affected Platforms */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Affected Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedThreat.details.affectedPlatforms.map((platform, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Required */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Action Required</h3>
                    <div className={`p-4 rounded-lg border ${getPriorityColor(selectedThreat.severity)?.split(' ').slice(1).join(' ')}`}>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className={getPriorityColor(selectedThreat.severity)?.split(' ')?.[0]} />
                        <span className={`text-sm font-semibold ${getPriorityColor(selectedThreat.severity)?.split(' ')?.[0]}`}>
                          {selectedThreat.details.actionRequired}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
                <Button variant="outline" onClick={() => setShowThreatDetails(false)}>
                  Close
                </Button>
                <Button variant="default">
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Open in Threat Intelligence
                </Button>
                <Button variant="default" className="bg-primary">
                  <Icon name="Shield" size={16} className="mr-2" />
                  Take Action
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionItemsSidebar;