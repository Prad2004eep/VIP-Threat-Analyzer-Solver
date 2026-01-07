import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExecutiveSummaryTable = () => {
  const [sortField, setSortField] = useState('businessImpact');
  const [sortDirection, setSortDirection] = useState('desc');

  const threatSummary = [
    {
      id: 1,
      threatType: 'Deepfake Video Campaign',
      businessImpact: 95,
      severity: 'critical',
      platform: 'YouTube, TikTok',
      detectedDate: '2025-09-01',
      status: 'active',
      affectedAudience: '2.3M views',
      recommendedAction: 'Immediate legal takedown + crisis communication',
      assignedTeam: 'Legal & PR',
      estimatedResolution: '24-48 hours'
    },
    {
      id: 2,
      threatType: 'Coordinated Harassment Campaign',
      businessImpact: 78,
      severity: 'high',
      platform: 'Twitter, Reddit',
      detectedDate: '2025-08-30',
      status: 'monitoring',
      affectedAudience: '850K impressions',
      recommendedAction: 'Platform reporting + sentiment monitoring',
      assignedTeam: 'Digital Security',
      estimatedResolution: '3-5 days'
    },
    {
      id: 3,
      threatType: 'Impersonation Account Network',
      businessImpact: 72,
      severity: 'high',
      platform: 'Instagram, Facebook',
      detectedDate: '2025-08-29',
      status: 'contained',
      affectedAudience: '450K followers',
      recommendedAction: 'Account verification + user education',
      assignedTeam: 'Social Media',
      estimatedResolution: '1-2 weeks'
    },
    {
      id: 4,
      threatType: 'Misinformation Article Spread',
      businessImpact: 65,
      severity: 'medium',
      platform: 'News Sites, Blogs',
      detectedDate: '2025-08-28',
      status: 'responding',
      affectedAudience: '320K readers',
      recommendedAction: 'Fact-checking response + SEO optimization',
      assignedTeam: 'PR & Content',
      estimatedResolution: '1 week'
    },
    {
      id: 5,
      threatType: 'Data Leak Exposure Risk',
      businessImpact: 58,
      severity: 'medium',
      platform: 'Dark Web Forums',
      detectedDate: '2025-08-27',
      status: 'investigating',
      affectedAudience: 'Limited exposure',
      recommendedAction: 'Security audit + breach assessment',
      assignedTeam: 'Cybersecurity',
      estimatedResolution: '2-3 weeks'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error bg-error/10';
      case 'monitoring': return 'text-warning bg-warning/10';
      case 'contained': return 'text-success bg-success/10';
      case 'responding': return 'text-accent bg-accent/10';
      case 'investigating': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getImpactColor = (impact) => {
    if (impact >= 80) return 'text-error';
    if (impact >= 60) return 'text-warning';
    if (impact >= 40) return 'text-accent';
    return 'text-success';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedThreats = [...threatSummary]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="card-title text-lg">Executive Threat Summary</h3>
            <p className="card-description">Top 5 threats requiring leadership attention</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export PDF
            </Button>
            <Button variant="outline" size="sm" iconName="Presentation">
              PowerPoint
            </Button>
            <Button variant="outline" size="sm" iconName="Mail">
              Email Report
            </Button>
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">
                  <button
                    onClick={() => handleSort('threatType')}
                    className="flex items-center space-x-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Threat Type</span>
                    <Icon 
                      name={sortField === 'threatType' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </button>
                </th>
                <th className="text-left py-3 px-4">
                  <button
                    onClick={() => handleSort('businessImpact')}
                    className="flex items-center space-x-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Business Impact</span>
                    <Icon 
                      name={sortField === 'businessImpact' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </button>
                </th>
                <th className="text-left py-3 px-4">
                  <button
                    onClick={() => handleSort('severity')}
                    className="flex items-center space-x-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Severity</span>
                    <Icon 
                      name={sortField === 'severity' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={14} 
                    />
                  </button>
                </th>
                <th className="text-left py-3 px-4">
                  <span className="text-sm font-semibold text-muted-foreground">Platform</span>
                </th>
                <th className="text-left py-3 px-4">
                  <span className="text-sm font-semibold text-muted-foreground">Status</span>
                </th>
                <th className="text-left py-3 px-4">
                  <span className="text-sm font-semibold text-muted-foreground">Recommended Action</span>
                </th>
                <th className="text-left py-3 px-4">
                  <span className="text-sm font-semibold text-muted-foreground">Timeline</span>
                </th>
                <th className="text-right py-3 px-4">
                  <span className="text-sm font-semibold text-muted-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedThreats?.map((threat, index) => (
                <tr key={threat?.id} className={`border-b border-border hover:bg-surface/50 transition-colors ${index === 0 ? 'bg-error/5' : ''}`}>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {threat?.threatType}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Detected {formatDate(threat?.detectedDate)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {threat?.affectedAudience}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`text-lg font-bold font-mono ${getImpactColor(threat?.businessImpact)}`}>
                        {threat?.businessImpact}
                      </div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className={`h-full rounded-full ${getImpactColor(threat?.businessImpact)?.replace('text-', 'bg-')}`}
                        style={{ width: `${threat?.businessImpact}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat?.severity)}`}>
                      {threat?.severity?.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-foreground">
                      {threat?.platform}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(threat?.status)}`}>
                      {threat?.status?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <div className="text-sm text-foreground mb-1">
                      {threat?.recommendedAction}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assigned: {threat?.assignedTeam}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-foreground">
                      {threat?.estimatedResolution}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="xs" iconName="Eye">
                        View
                      </Button>
                      <Button variant="ghost" size="xs" iconName="ExternalLink">
                        Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing top 5 threats by business impact • Last updated: {new Date()?.toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummaryTable;