import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvidenceTimeline = ({ onEvidenceSelect }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d'); // 24h, 7d, 30d, all
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const timelineData = [
    {
      id: 'timeline-1',
      date: '2025-01-15',
      events: [
        {
          id: 'evidence-1',
          time: '14:30',
          type: 'screenshot',
          platform: 'Twitter/X',
          title: 'Fake Profile Screenshot',
          description: 'Screenshot of fake Twitter profile impersonating Executive Alpha',
          verified: true,
          authenticity: 95,
          collector: 'Agent Smith',
          tags: ['impersonation', 'fake-profile']
        },
        {
          id: 'evidence-2',
          time: '14:45',
          type: 'social_post',
          platform: 'Twitter/X',
          title: 'Impersonation Tweet',
          description: 'Tweet containing false information posted by impersonator account',
          verified: true,
          authenticity: 98,
          collector: 'Agent Johnson',
          tags: ['misinformation', 'tweet']
        },
        {
          id: 'evidence-3',
          time: '16:20',
          type: 'screenshot',
          platform: 'Instagram',
          title: 'Story Screenshot',
          description: 'Instagram story screenshot requiring additional verification',
          verified: false,
          authenticity: 72,
          collector: 'Agent Davis',
          tags: ['instagram', 'story']
        }
      ]
    },
    {
      id: 'timeline-2',
      date: '2025-01-14',
      events: [
        {
          id: 'evidence-4',
          time: '09:15',
          type: 'document',
          platform: 'Telegram',
          title: 'Coordinated Messages',
          description: 'Exported Telegram messages showing coordinated misinformation campaign',
          verified: true,
          authenticity: 89,
          collector: 'Agent Wilson',
          tags: ['telegram', 'coordination']
        },
        {
          id: 'evidence-7',
          time: '15:30',
          type: 'screenshot',
          platform: 'Facebook',
          title: 'Fake Event Page',
          description: 'Screenshot of fake Facebook event created to spread misinformation',
          verified: true,
          authenticity: 87,
          collector: 'Agent Brown',
          tags: ['facebook', 'fake-event']
        }
      ]
    },
    {
      id: 'timeline-3',
      date: '2025-01-13',
      events: [
        {
          id: 'evidence-6',
          time: '20:45',
          type: 'screenshot',
          platform: '4chan',
          title: 'Forum Discussion',
          description: 'Screenshot of forum discussion planning coordinated attack',
          verified: true,
          authenticity: 91,
          collector: 'Agent Taylor',
          tags: ['forum', 'planning']
        }
      ]
    },
    {
      id: 'timeline-4',
      date: '2025-01-12',
      events: [
        {
          id: 'evidence-5',
          time: '11:30',
          type: 'video',
          platform: 'YouTube',
          title: 'Deepfake Video',
          description: 'Deepfake video of Executive Beta detected and archived',
          verified: true,
          authenticity: 15,
          collector: 'Agent Brown',
          tags: ['deepfake', 'video']
        },
        {
          id: 'evidence-8',
          time: '18:15',
          type: 'document',
          platform: 'Reddit',
          title: 'Coordinated Posts',
          description: 'Evidence of coordinated Reddit posts spreading false information',
          verified: true,
          authenticity: 83,
          collector: 'Agent Martinez',
          tags: ['reddit', 'coordination']
        }
      ]
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

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'twitter/x':
        return 'bg-blue-500/10 text-blue-500';
      case 'instagram':
        return 'bg-pink-500/10 text-pink-500';
      case 'facebook':
        return 'bg-blue-600/10 text-blue-600';
      case 'youtube':
        return 'bg-red-500/10 text-red-500';
      case 'telegram':
        return 'bg-sky-500/10 text-sky-500';
      case '4chan':
        return 'bg-green-500/10 text-green-500';
      case 'reddit':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getVerificationColor = (verified, authenticity) => {
    if (verified && authenticity >= 90) return 'text-success';
    if (verified && authenticity >= 70) return 'text-warning';
    if (verified) return 'text-error';
    return 'text-muted-foreground';
  };

  const filterEvents = (events) => {
    return events?.filter(event => {
      if (selectedPlatform !== 'all' && event?.platform !== selectedPlatform) return false;
      if (selectedType !== 'all' && event?.type !== selectedType) return false;
      return true;
    });
  };

  const filteredTimelineData = timelineData?.map(day => ({
    ...day,
    events: filterEvents(day?.events)
  }))?.filter(day => day?.events?.length > 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="h-full bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Evidence Timeline</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedTimeRange === '24h' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeRange('24h')}
            >
              24h
            </Button>
            <Button
              variant={selectedTimeRange === '7d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeRange('7d')}
            >
              7d
            </Button>
            <Button
              variant={selectedTimeRange === '30d' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeRange('30d')}
            >
              30d
            </Button>
            <Button
              variant={selectedTimeRange === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeRange('all')}
            >
              All
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Platforms</option>
            <option value="Twitter/X">Twitter/X</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="YouTube">YouTube</option>
            <option value="Telegram">Telegram</option>
            <option value="4chan">4chan</option>
            <option value="Reddit">Reddit</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e?.target?.value)}
            className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="screenshot">Screenshots</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
            <option value="social_post">Social Posts</option>
          </select>
        </div>
      </div>
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
        <div className="space-y-6">
          {filteredTimelineData?.map((day) => (
            <div key={day?.id}>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                <h4 className="text-sm font-semibold text-foreground">
                  {formatDate(day?.date)}
                </h4>
                <div className="flex-1 h-px bg-border ml-4"></div>
                <span className="text-xs text-muted-foreground ml-4">
                  {day?.events?.length} events
                </span>
              </div>

              <div className="ml-6 space-y-3">
                {day?.events?.map((event, index) => (
                  <div
                    key={event?.id}
                    className="relative cursor-pointer group"
                    onClick={() => onEvidenceSelect(event)}
                  >
                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Icon
                            name={getTypeIcon(event?.type)}
                            size={16}
                            className="text-muted-foreground"
                          />
                        </div>
                        {index < day?.events?.length - 1 && (
                          <div className="w-0.5 h-8 bg-border mt-2"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground font-mono">
                              {event?.time}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getPlatformColor(event?.platform)}`}>
                              {event?.platform}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-semibold ${getVerificationColor(event?.verified, event?.authenticity)}`}>
                              {event?.authenticity}%
                            </span>
                            <Icon
                              name={event?.verified ? 'CheckCircle' : 'AlertCircle'}
                              size={12}
                              className={getVerificationColor(event?.verified, event?.authenticity)}
                            />
                          </div>
                        </div>

                        <h5 className="text-sm font-medium text-foreground mb-1">
                          {event?.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {event?.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {event?.tags?.slice(0, 2)?.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {event?.tags?.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{event?.tags?.length - 2} more
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {event?.collector}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvidenceTimeline;