import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChainOfCustodyPanel = ({ evidence }) => {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    action: '',
    details: '',
    user: 'Current User'
  });

  const mockCustodyLog = [
    {
      id: 1,
      action: 'Evidence Collected',
      user: 'Agent Smith',
      timestamp: '2025-01-15T14:30:00Z',
      details: 'Initial evidence collection from Twitter/X platform using automated screenshot tool',
      ipAddress: '192.168.1.100',
      location: 'Security Operations Center',
      signature: 'sha256:abc123def456...',
      verified: true
    },
    {
      id: 2,
      action: 'Hash Generated',
      user: 'System',
      timestamp: '2025-01-15T14:31:00Z',
      details: 'SHA-256 hash generated for integrity verification and tamper detection',
      ipAddress: '192.168.1.101',
      location: 'Evidence Processing Server',
      signature: 'sha256:def456ghi789...',
      verified: true
    },
    {
      id: 3,
      action: 'Metadata Extracted',
      user: 'System',
      timestamp: '2025-01-15T14:32:00Z',
      details: 'EXIF data and technical metadata extracted and stored securely',
      ipAddress: '192.168.1.101',
      location: 'Evidence Processing Server',
      signature: 'sha256:ghi789jkl012...',
      verified: true
    },
    {
      id: 4,
      action: 'Verification Started',
      user: 'Agent Martinez',
      timestamp: '2025-01-15T14:35:00Z',
      details: 'Authenticity verification process initiated using AI-powered analysis tools',
      ipAddress: '192.168.1.102',
      location: 'Analysis Workstation',
      signature: 'sha256:jkl012mno345...',
      verified: true
    },
    {
      id: 5,
      action: 'Legal Review',
      user: 'Legal Team',
      timestamp: '2025-01-15T15:00:00Z',
      details: 'Legal admissibility assessment completed - evidence deemed admissible',
      ipAddress: '192.168.1.103',
      location: 'Legal Department',
      signature: 'sha256:mno345pqr678...',
      verified: true
    },
    {
      id: 6,
      action: 'Access Granted',
      user: 'Agent Johnson',
      timestamp: '2025-01-15T16:15:00Z',
      details: 'Evidence accessed for case analysis and report generation',
      ipAddress: '192.168.1.104',
      location: 'Investigation Unit',
      signature: 'sha256:pqr678stu901...',
      verified: true
    }
  ];

  const handleAddEntry = () => {
    if (!newEntry?.action || !newEntry?.details) return;
    
    // In a real implementation, this would add the entry to the custody log
    console.log('Adding custody entry:', newEntry);
    setNewEntry({ action: '', details: '', user: 'Current User' });
    setShowAddEntry(false);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getActionIcon = (action) => {
    switch (action?.toLowerCase()) {
      case 'evidence collected':
        return 'Camera';
      case 'hash generated':
        return 'Hash';
      case 'metadata extracted':
        return 'FileText';
      case 'verification started':
        return 'Shield';
      case 'legal review':
        return 'Scale';
      case 'access granted':
        return 'Eye';
      case 'exported':
        return 'Download';
      case 'modified':
        return 'Edit';
      default:
        return 'Activity';
    }
  };

  const exportCustodyLog = (format) => {
    // In a real implementation, this would generate and download the custody log
    console.log(`Exporting custody log in ${format} format`);
  };

  return (
    <div className="h-full bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">Chain of Custody</h3>
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <Button variant="ghost" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48 z-10">
                <div className="p-2">
                  <button
                    onClick={() => exportCustodyLog('pdf')}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                  >
                    Export as PDF
                  </button>
                  <button
                    onClick={() => exportCustodyLog('csv')}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => exportCustodyLog('json')}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                  >
                    Export as JSON
                  </button>
                </div>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowAddEntry(!showAddEntry)}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Entry
            </Button>
          </div>
        </div>
        
        {evidence && (
          <p className="text-sm text-muted-foreground">
            Evidence ID: <span className="font-mono">{evidence?.id}</span> • 
            {mockCustodyLog?.length} custody events
          </p>
        )}
      </div>
      {/* Add Entry Form */}
      {showAddEntry && (
        <div className="p-4 border-b border-border bg-muted/30">
          <h4 className="text-sm font-semibold text-foreground mb-3">Add Custody Entry</h4>
          <div className="space-y-3">
            <Input
              label="Action"
              type="text"
              value={newEntry?.action}
              onChange={(e) => setNewEntry({ ...newEntry, action: e?.target?.value })}
              placeholder="e.g., Evidence Reviewed, Access Granted"
            />
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Details</label>
              <textarea
                value={newEntry?.details}
                onChange={(e) => setNewEntry({ ...newEntry, details: e?.target?.value })}
                className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
                placeholder="Describe the action taken with this evidence..."
              />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddEntry(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAddEntry}
                disabled={!newEntry?.action || !newEntry?.details}
              >
                Add Entry
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 overflow-y-auto" style={{ height: showAddEntry ? 'calc(100% - 280px)' : 'calc(100% - 120px)' }}>
        <div className="space-y-4">
          {mockCustodyLog?.map((entry, index) => (
            <div key={entry?.id} className="relative">
              <div className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon
                      name={getActionIcon(entry?.action)}
                      size={16}
                      className="text-primary-foreground"
                    />
                  </div>
                  {index < mockCustodyLog?.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2"></div>
                  )}
                </div>

                <div className="flex-1 bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      {entry?.action}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {entry?.verified && (
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        #{entry?.id?.toString()?.padStart(3, '0')}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-3">
                    {entry?.details}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">User:</span> {entry?.user}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {entry?.location}
                    </div>
                    <div>
                      <span className="font-medium">IP Address:</span> {entry?.ipAddress}
                    </div>
                    <div>
                      <span className="font-medium">Timestamp:</span> {formatTimestamp(entry?.timestamp)}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Hash" size={12} className="text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">
                          {entry?.signature?.substring(0, 24)}...
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Icon name="Copy" size={12} className="mr-1" />
                        Copy Hash
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrity Verification */}
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-success" />
            <h4 className="text-sm font-semibold text-success">Chain Integrity Verified</h4>
          </div>
          <p className="text-xs text-success/80">
            All custody events have been cryptographically verified and the chain of custody is intact.
            No unauthorized access or modifications detected.
          </p>
          <div className="mt-2 text-xs text-success/60">
            Last verification: {formatTimestamp(new Date()?.toISOString())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainOfCustodyPanel;