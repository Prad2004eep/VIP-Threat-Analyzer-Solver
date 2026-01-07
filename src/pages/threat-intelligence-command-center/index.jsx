import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ThreatMetricsCard from './components/ThreatMetricsCard';
import ThreatFeedCard from './components/ThreatFeedCard';
import LiveAlertStream from './components/LiveAlertStream';
import ThreatHeatmap from './components/ThreatHeatmap';
import GlobalControlPanel from './components/GlobalControlPanel';
import Icon from '../../components/AppIcon';

const ThreatIntelligenceCommandCenter = () => {
  const navigate = useNavigate();
  
  // State management
  const [selectedVIP, setSelectedVIP] = useState('executive-alpha');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'instagram', 'facebook']);
  const [threatSeverity, setThreatSeverity] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for KPI metrics
  const kpiMetrics = [
    {
      title: 'Active Threats',
      value: 47,
      change: 12,
      changeType: 'increase',
      icon: 'Shield',
      severity: 'high',
      sparklineData: [23, 31, 28, 35, 42, 38, 47]
    },
    {
      title: 'New Mentions',
      value: 1284,
      change: 8,
      changeType: 'increase',
      icon: 'MessageSquare',
      severity: 'medium',
      sparklineData: [980, 1120, 1050, 1180, 1220, 1150, 1284]
    },
    {
      title: 'Misinformation Campaigns',
      value: 12,
      change: 3,
      changeType: 'decrease',
      icon: 'AlertTriangle',
      severity: 'critical',
      sparklineData: [18, 15, 17, 14, 16, 13, 12]
    },
    {
      title: 'Fake Profiles',
      value: 89,
      change: 15,
      changeType: 'increase',
      icon: 'UserX',
      severity: 'high',
      sparklineData: [65, 72, 68, 75, 82, 78, 89]
    }
  ];

  // Mock threat feed data
  const [threatFeed] = useState([
    {
      id: 'threat-001',
      title: 'Coordinated Impersonation Campaign Detected',
      description: 'Multiple fake accounts using Executive Alpha\'s profile picture and similar usernames detected across Twitter and Instagram.',
      platform: 'twitter',
      severity: 'critical',
      type: 'impersonation',
      target: 'Executive Alpha',
      timestamp: new Date(Date.now() - 300000),
      source: 'https://twitter.com/fake_exec_alpha_2024',
      confidence: 94,
      views: 15420,
      shares: 234,
      engagement: 1890,
      evidence: [
        { thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop' },
        { thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop' }
      ],
      fullContent: `URGENT: Fake account @fake_exec_alpha_2024 is impersonating Executive Alpha with verified-looking profile.\n\nAccount created: 2 hours ago\nFollowers gained: 1,200+ in 2 hours\nSuspicious activity: Requesting personal information from followers\n\nImmediate action required to prevent further damage.`
    },
    {
      id: 'threat-002',
      title: 'Deepfake Video Circulating on TikTok',
      description: 'AI-generated video of Executive Alpha making controversial statements gaining viral traction.',
      platform: 'tiktok',
      severity: 'high',
      type: 'deepfake',
      target: 'Executive Alpha',
      timestamp: new Date(Date.now() - 900000),
      source: 'https://tiktok.com/@suspicious_account_xyz',
      confidence: 87,
      views: 45600,
      shares: 892,
      engagement: 3420,
      evidence: [
        { thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop' }
      ],
      fullContent: `Deepfake detection analysis:\n\nVideo duration: 45 seconds\nDeepfake confidence: 87%\nFacial inconsistencies detected: 12\nAudio-visual sync issues: Present\n\nVideo shows Executive Alpha allegedly making statements about company layoffs. Content appears fabricated based on technical analysis.`
    },
    {
      id: 'threat-003',
      title: 'Misinformation Campaign About Company Finances',
      description: 'Coordinated spread of false information about Executive Alpha\'s company financial status across multiple platforms.',
      platform: 'reddit',
      severity: 'medium',
      type: 'misinformation',
      target: 'Executive Alpha',
      timestamp: new Date(Date.now() - 1800000),
      source: 'https://reddit.com/r/business_rumors/posts/12345',
      confidence: 76,
      views: 8900,
      shares: 156,
      engagement: 445,
      evidence: [
        { thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop' },
        { thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop' },
        { thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop' }
      ],
      fullContent: `Misinformation campaign analysis:\n\nFalse claims being spread:\n- Company bankruptcy filing (FALSE)\n- Executive Alpha resignation (FALSE)\n- Mass layoffs planned (UNVERIFIED)\n\nCoordination indicators:\n- Similar posting times across platforms\n- Identical phrasing in multiple posts\n- Bot-like account behavior patterns\n\nRecommendation: Monitor closely and prepare counter-narrative.`
    }
  ]);

  // Mock live alerts data
  const [liveAlerts] = useState([
    {
      id: 'alert-001',
      type: 'impersonation',
      severity: 'critical',
      platform: 'instagram',
      target: 'Executive Alpha',
      message: 'New fake Instagram account created with 95% profile similarity',
      timestamp: new Date(Date.now() - 120000),
      confidence: 95,
      preview: 'Account @exec_alpha_official_2024 created with stolen profile photos'
    },
    {
      id: 'alert-002',
      type: 'threat',
      severity: 'high',
      platform: 'twitter',
      target: 'Executive Alpha',
      message: 'Direct threat detected in Twitter mentions',
      timestamp: new Date(Date.now() - 300000),
      confidence: 89,
      preview: 'User @anonymous_threat posted threatening message with location references'
    },
    {
      id: 'alert-003',
      type: 'misinformation',
      severity: 'medium',
      platform: 'facebook',
      target: 'Executive Alpha',
      message: 'False news article shared 500+ times in last hour',
      timestamp: new Date(Date.now() - 450000),
      confidence: 78,
      preview: 'Article claiming Executive Alpha involved in financial scandal'
    },
    {
      id: 'alert-004',
      type: 'deepfake',
      severity: 'high',
      platform: 'youtube',
      target: 'Executive Alpha',
      message: 'Potential deepfake video uploaded and gaining views',
      timestamp: new Date(Date.now() - 600000),
      confidence: 82,
      preview: 'Video shows Executive Alpha making statements about competitors'
    },
    {
      id: 'alert-005',
      type: 'leak',
      severity: 'critical',
      platform: 'telegram',
      target: 'Executive Alpha',
      message: 'Personal information leaked in private Telegram channel',
      timestamp: new Date(Date.now() - 750000),
      confidence: 91,
      preview: 'Phone number and personal email address shared in group with 2,000+ members'
    }
  ]);

  // Mock geographic threat data
  const [threatGeoData] = useState([
    { id: 1, region: 'na', severity: 'high', type: 'impersonation', lat: 40.7128, lng: -74.0060 },
    { id: 2, region: 'eu', severity: 'critical', type: 'misinformation', lat: 51.5074, lng: -0.1278 },
    { id: 3, region: 'as', severity: 'medium', type: 'deepfake', lat: 35.6762, lng: 139.6503 },
    { id: 4, region: 'na', severity: 'low', type: 'harassment', lat: 34.0522, lng: -118.2437 },
    { id: 5, region: 'eu', severity: 'high', type: 'threat', lat: 48.8566, lng: 2.3522 },
    { id: 6, region: 'as', severity: 'critical', type: 'leak', lat: 1.3521, lng: 103.8198 },
    { id: 7, region: 'oc', severity: 'medium', type: 'impersonation', lat: -33.8688, lng: 151.2093 },
    { id: 8, region: 'sa', severity: 'low', type: 'misinformation', lat: -23.5505, lng: -46.6333 },
    { id: 9, region: 'af', severity: 'high', type: 'harassment', lat: -26.2041, lng: 28.0473 },
    { id: 10, region: 'na', severity: 'medium', type: 'deepfake', lat: 43.6532, lng: -79.3832 }
  ]);

  // Auto-refresh simulation
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // Simulate connection status changes
        const statuses = ['connected', 'connecting', 'disconnected'];
        const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
        setConnectionStatus(randomStatus);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Event handlers
  const handleThreatEscalate = (threatId) => {
    console.log('Escalating threat:', threatId);
    // In real app, this would trigger escalation workflow
  };

  const handleThreatArchive = (threatId) => {
    console.log('Archiving threat:', threatId);
    // In real app, this would archive the threat
  };

  const handleThreatInvestigate = (threatId) => {
    console.log('Investigating threat:', threatId);
    navigate('/campaign-analysis-dashboard', { state: { threatId } });
  };

  const handleAlertClick = (alert) => {
    console.log('Alert clicked:', alert);
    // In real app, this would show alert details or navigate to investigation
  };

  const handleLocationClick = (region) => {
    console.log('Region clicked:', region);
    // In real app, this would filter threats by region
  };

  const handleExport = (format) => {
    console.log('Exporting data in format:', format);
    // In real app, this would trigger export functionality
  };

  return (
    <>
      <Helmet>
        <title>Threat Intelligence Command Center - Aura Shield</title>
        <meta name="description" content="Real-time threat monitoring and response center for comprehensive security intelligence" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Global Control Panel */}
          <GlobalControlPanel
            selectedVIP={selectedVIP}
            onVIPChange={setSelectedVIP}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
            threatSeverity={threatSeverity}
            onSeverityChange={setThreatSeverity}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            autoRefresh={autoRefresh}
            onAutoRefreshToggle={() => setAutoRefresh(!autoRefresh)}
            connectionStatus={connectionStatus}
            onExport={handleExport}
          />

          {/* KPI Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiMetrics?.map((metric, index) => (
              <ThreatMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                severity={metric?.severity}
                sparklineData={metric?.sparklineData}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Threat Feed - Main Area */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center">
                    <Icon name="Activity" size={20} className="mr-2 text-primary" />
                    Real-time Threat Feed
                  </h3>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span>Last updated: {lastUpdate?.toLocaleTimeString()}</span>
                    </div>
                    
                    <select className="bg-surface border border-border rounded-md px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="newest">Newest First</option>
                      <option value="severity">By Severity</option>
                      <option value="platform">By Platform</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {threatFeed?.map((threat) => (
                    <ThreatFeedCard
                      key={threat?.id}
                      threat={threat}
                      onEscalate={handleThreatEscalate}
                      onArchive={handleThreatArchive}
                      onInvestigate={handleThreatInvestigate}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Live Alert Stream - Sidebar */}
            <div className="lg:col-span-1">
              <LiveAlertStream
                alerts={liveAlerts}
                onAlertClick={handleAlertClick}
              />
            </div>
          </div>

          {/* Geographic Threat Heatmap */}
          <ThreatHeatmap
            threatData={threatGeoData}
            onLocationClick={handleLocationClick}
          />

          {/* Quick Actions Footer */}
          <div className="mt-8 p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h4 className="font-medium text-foreground">Quick Actions</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/campaign-analysis-dashboard')}
                    className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Icon name="TrendingUp" size={16} />
                    <span>Campaign Analysis</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/evidence-collection-interface')}
                    className="flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-sm"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Collect Evidence</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/executive-risk-summary')}
                    className="flex items-center space-x-2 px-3 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors text-sm"
                  >
                    <Icon name="BarChart3" size={16} />
                    <span>Executive Summary</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>System Status: Operational</span>
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default ThreatIntelligenceCommandCenter;