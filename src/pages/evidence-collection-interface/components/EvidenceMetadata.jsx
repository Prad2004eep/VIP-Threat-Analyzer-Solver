import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EvidenceMetadata = ({ evidence, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTags, setEditedTags] = useState(evidence?.tags?.join(', ') || '');
  const [editedDescription, setEditedDescription] = useState(evidence?.description || '');

  if (!evidence) {
    return (
      <div className="h-full bg-card border border-border rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select evidence to view metadata</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const updatedEvidence = {
      ...evidence,
      tags: editedTags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
      description: editedDescription
    };
    onUpdate(updatedEvidence);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTags(evidence?.tags?.join(', ') || '');
    setEditedDescription(evidence?.description || '');
    setIsEditing(false);
  };

  const getVerificationColor = (authenticity) => {
    if (authenticity >= 90) return 'text-success';
    if (authenticity >= 70) return 'text-warning';
    return 'text-error';
  };

  const getLegalStatusColor = (status) => {
    switch (status) {
      case 'admissible':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'inadmissible':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  // Use chain of custody from evidence if available, otherwise use default
  const chainOfCustody = evidence?.chainOfCustody || [
    {
      id: 1,
      action: 'Evidence Collected',
      user: evidence?.collector,
      timestamp: evidence?.timestamp,
      details: 'Initial evidence collection from platform'
    },
    {
      id: 2,
      action: 'Hash Generated',
      user: 'System',
      timestamp: new Date(new Date(evidence.timestamp).getTime() + 60000)?.toISOString(),
      details: 'SHA-256 hash generated for integrity verification'
    },
    {
      id: 3,
      action: 'Verification Started',
      user: 'Agent Martinez',
      timestamp: new Date(new Date(evidence.timestamp).getTime() + 300000)?.toISOString(),
      details: 'Authenticity verification process initiated'
    },
    {
      id: 4,
      action: 'Legal Review',
      user: 'Legal Team',
      timestamp: new Date(new Date(evidence.timestamp).getTime() + 1800000)?.toISOString(),
      details: 'Legal admissibility assessment completed'
    }
  ];

  return (
    <div className="h-full bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Evidence Metadata</h3>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Icon name="Edit2" size={16} className="mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Evidence ID</label>
                <p className="text-sm text-foreground font-mono">{evidence?.id}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Type</label>
                <p className="text-sm text-foreground capitalize">{evidence?.type}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Platform</label>
                <p className="text-sm text-foreground">{evidence?.platform}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">File Size</label>
                <p className="text-sm text-foreground">{evidence?.fileSize}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Resolution</label>
                <p className="text-sm text-foreground">{evidence?.resolution}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Collector</label>
                <p className="text-sm text-foreground">{evidence?.collector}</p>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Verification Status</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Authenticity Score</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (evidence?.authenticity || parseInt(evidence?.verification?.authenticityScore)) >= 90 ? 'bg-success' :
                        (evidence?.authenticity || parseInt(evidence?.verification?.authenticityScore)) >= 70 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${evidence?.authenticity || parseInt(evidence?.verification?.authenticityScore) || 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold ${getVerificationColor(evidence?.authenticity || parseInt(evidence?.verification?.authenticityScore))}`}>
                    {evidence?.verification?.authenticityScore || `${evidence?.authenticity}%` || 'N/A'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Legal Status</label>
                <p className={`text-sm font-semibold capitalize ${getLegalStatusColor(evidence?.legalStatus || evidence?.verification?.legalStatus)}`}>
                  {evidence?.legalStatus || evidence?.verification?.legalStatus || 'pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Hash & Integrity */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Hash & Integrity</h4>
            <div>
              <label className="text-xs text-muted-foreground">SHA-256 Hash</label>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-foreground font-mono bg-muted px-2 py-1 rounded flex-1 truncate">
                  {evidence?.hash?.sha256 || evidence?.hash || 'Generating...'}
                </p>
                <Button variant="ghost" size="sm">
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Timestamps</h4>
            <div>
              <label className="text-xs text-muted-foreground">Collection Time</label>
              <p className="text-sm text-foreground">
                {evidence?.timestamps?.collectionTime || formatTimestamp(evidence?.timestamp)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Description</h4>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e?.target?.value)}
                className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
                placeholder="Enter evidence description..."
              />
            ) : (
              <p className="text-sm text-foreground">{evidence?.description}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Tags</h4>
            {isEditing ? (
              <Input
                type="text"
                value={editedTags}
                onChange={(e) => setEditedTags(e?.target?.value)}
                placeholder="Enter tags separated by commas..."
                className="w-full"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {evidence?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Chain of Custody */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Chain of Custody</h4>
            <div className="space-y-3">
              {chainOfCustody?.map((entry, index) => (
                <div key={entry?.id || index} className="flex items-start space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    {index < chainOfCustody?.length - 1 && (
                      <div className="w-0.5 h-8 bg-border mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{entry?.action}</p>
                      <span className="text-xs text-muted-foreground">
                        {entry?.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{entry?.user}</p>
                    <p className="text-xs text-muted-foreground mt-1">{entry?.details || entry?.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceMetadata;