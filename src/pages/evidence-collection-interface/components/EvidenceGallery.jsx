import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EvidenceGallery = ({ evidenceItems, selectedEvidence, onEvidenceSelect, onLightboxOpen }) => {
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [sortBy, setSortBy] = useState('timestamp'); // timestamp, type, verification
  const [filterType, setFilterType] = useState('all'); // all, screenshot, video, document, social_post

  const mockEvidenceItems = [
    {
      id: 'evidence-1',
      name: 'Fake Profile Screenshot',
      type: 'screenshot',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      timestamp: '2025-01-15T14:30:00Z',
      platform: 'Twitter/X',
      verified: true,
      hash: 'sha256:a1b2c3d4e5f6...',
      fileSize: '2.4 MB',
      resolution: '1920x1080',
      authenticity: 95,
      legalStatus: 'admissible',
      tags: ['impersonation', 'fake-profile', 'twitter'],
      collector: 'Agent Smith',
      description: 'Screenshot of fake Twitter profile impersonating Executive Alpha'
    },
    {
      id: 'evidence-2',
      name: 'Impersonation Tweet',
      type: 'social_post',
      thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=300&h=200&fit=crop',
      timestamp: '2025-01-15T14:45:00Z',
      platform: 'Twitter/X',
      verified: true,
      hash: 'sha256:b2c3d4e5f6g7...',
      fileSize: '1.8 MB',
      resolution: '1200x800',
      authenticity: 98,
      legalStatus: 'admissible',
      tags: ['misinformation', 'impersonation', 'tweet'],
      collector: 'Agent Johnson',
      description: 'Tweet containing false information posted by impersonator account'
    },
    {
      id: 'evidence-3',
      name: 'Story Screenshot',
      type: 'screenshot',
      thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=300&h=200&fit=crop',
      timestamp: '2025-01-15T16:20:00Z',
      platform: 'Instagram',
      verified: false,
      hash: 'sha256:c3d4e5f6g7h8...',
      fileSize: '3.1 MB',
      resolution: '1080x1920',
      authenticity: 72,
      legalStatus: 'pending',
      tags: ['instagram', 'story', 'unverified'],
      collector: 'Agent Davis',
      description: 'Instagram story screenshot requiring additional verification'
    },
    {
      id: 'evidence-4',
      name: 'Coordinated Messages',
      type: 'document',
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop',
      timestamp: '2025-01-14T09:15:00Z',
      platform: 'Telegram',
      verified: true,
      hash: 'sha256:d4e5f6g7h8i9...',
      fileSize: '856 KB',
      resolution: 'N/A',
      authenticity: 89,
      legalStatus: 'admissible',
      tags: ['telegram', 'coordination', 'messages'],
      collector: 'Agent Wilson',
      description: 'Exported Telegram messages showing coordinated misinformation campaign'
    },
    {
      id: 'evidence-5',
      name: 'Deepfake Video',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
      timestamp: '2025-01-12T11:30:00Z',
      platform: 'YouTube',
      verified: true,
      hash: 'sha256:e5f6g7h8i9j0...',
      fileSize: '45.2 MB',
      resolution: '1920x1080',
      authenticity: 15,
      legalStatus: 'admissible',
      tags: ['deepfake', 'video', 'youtube'],
      collector: 'Agent Brown',
      description: 'Deepfake video of Executive Beta detected and archived'
    },
    {
      id: 'evidence-6',
      name: 'Forum Discussion',
      type: 'screenshot',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      timestamp: '2025-01-13T20:45:00Z',
      platform: '4chan',
      verified: true,
      hash: 'sha256:f6g7h8i9j0k1...',
      fileSize: '4.7 MB',
      resolution: '1440x900',
      authenticity: 91,
      legalStatus: 'admissible',
      tags: ['forum', '4chan', 'discussion'],
      collector: 'Agent Taylor',
      description: 'Screenshot of forum discussion planning coordinated attack'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'screenshot':
        return 'Image';
      case 'video':
        return 'Video';
      case 'document':
        return 'FileText';
      case 'social_post':
        return 'MessageSquare';
      default:
        return 'File';
    }
  };

  const getVerificationBadge = (verified, authenticity) => {
    if (verified && authenticity >= 90) {
      return { color: 'text-success', bg: 'bg-success/10', text: 'Verified' };
    } else if (verified && authenticity >= 70) {
      return { color: 'text-warning', bg: 'bg-warning/10', text: 'Partial' };
    } else if (verified) {
      return { color: 'text-error', bg: 'bg-error/10', text: 'Suspicious' };
    } else {
      return { color: 'text-muted-foreground', bg: 'bg-muted/10', text: 'Pending' };
    }
  };

  const getLegalStatusBadge = (status) => {
    switch (status) {
      case 'admissible':
        return { color: 'text-success', bg: 'bg-success/10', text: 'Admissible' };
      case 'pending':
        return { color: 'text-warning', bg: 'bg-warning/10', text: 'Pending' };
      case 'inadmissible':
        return { color: 'text-error', bg: 'bg-error/10', text: 'Inadmissible' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', text: 'Unknown' };
    }
  };

  // Combine mock evidence with uploaded evidence
  const allEvidenceItems = [...mockEvidenceItems, ...evidenceItems];

  const filteredItems = allEvidenceItems?.filter(item => {
    if (filterType === 'all') return true;
    return item?.type === filterType;
  });

  const sortedItems = [...filteredItems]?.sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'type':
        return a?.type?.localeCompare(b?.type);
      case 'verification':
        return b?.authenticity - a?.authenticity;
      default:
        return 0;
    }
  });

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedItems?.map((item) => {
        const verificationBadge = getVerificationBadge(item?.verified, item?.authenticity);
        const legalBadge = getLegalStatusBadge(item?.legalStatus);
        const isSelected = selectedEvidence?.id === item?.id;

        return (
          <div
            key={item?.id}
            className={`bg-card border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
            }`}
            onClick={() => onEvidenceSelect(item)}
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={item?.thumbnail || item?.previewUrl || item?.url}
                alt={item?.name || item?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Icon
                  name={getTypeIcon(item?.type)}
                  size={16}
                  className="text-white bg-black/50 rounded p-1"
                />
              </div>
              <div className="absolute top-2 right-2">
                <span className={`text-xs px-2 py-1 rounded ${verificationBadge?.bg} ${verificationBadge?.color}`}>
                  {item?.authenticity || (item?.verification?.authenticityScore ? item.verification.authenticityScore : 'N/A')}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e?.stopPropagation();
                  onLightboxOpen(item);
                }}
              >
                <Icon name="Maximize2" size={16} />
              </Button>
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm text-foreground truncate mb-1">
                {item?.name || item?.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                {item?.platform} • {formatTimestamp(item?.timestamp || item?.timestamps?.uploadDate)}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${verificationBadge?.bg} ${verificationBadge?.color}`}>
                  {verificationBadge?.text}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${legalBadge?.bg} ${legalBadge?.color}`}>
                  {legalBadge?.text}
                </span>
              </div>

              {/* Show upload indicator for uploaded evidence */}
              {item?.isUploaded && (
                <div className="mt-2 flex items-center space-x-1 text-xs text-success">
                  <Icon name="Upload" size={12} />
                  <span>Uploaded Evidence</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2">
      {sortedItems?.map((item) => {
        const verificationBadge = getVerificationBadge(item?.verified, item?.authenticity);
        const legalBadge = getLegalStatusBadge(item?.legalStatus);
        const isSelected = selectedEvidence?.id === item?.id;

        return (
          <div
            key={item?.id}
            className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
            }`}
            onClick={() => onEvidenceSelect(item)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={item?.thumbnail || item?.previewUrl || item?.url}
                  alt={item?.name || item?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1">
                  <Icon
                    name={getTypeIcon(item?.type)}
                    size={12}
                    className="text-white bg-black/50 rounded p-0.5"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {item?.name || item?.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {item?.description}
                </p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                  <span>{item?.platform}</span>
                  <span>{formatTimestamp(item?.timestamp || item?.timestamps?.uploadDate)}</span>
                  <span>{item?.fileSize}</span>
                  {item?.isUploaded && (
                    <span className="text-success flex items-center space-x-1">
                      <Icon name="Upload" size={10} />
                      <span>Uploaded</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${verificationBadge?.bg} ${verificationBadge?.color}`}>
                  {item?.authenticity || (item?.verification?.authenticityScore ? item.verification.authenticityScore : 'N/A')}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${legalBadge?.bg} ${legalBadge?.color}`}>
                  {legalBadge?.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onLightboxOpen(item);
                  }}
                >
                  <Icon name="Maximize2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="h-full bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Evidence Gallery</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="screenshot">Screenshots</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
            <option value="social_post">Social Posts</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="timestamp">Sort by Date</option>
            <option value="type">Sort by Type</option>
            <option value="verification">Sort by Authenticity</option>
          </select>
          
          <span className="text-sm text-muted-foreground">
            {sortedItems?.length} items
          </span>
        </div>
      </div>
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </div>
    </div>
  );
};

export default EvidenceGallery;