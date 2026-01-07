import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NetworkGraph from './components/NetworkGraph';
import CampaignTimeline from './components/CampaignTimeline';
import CorrelationMatrix from './components/CorrelationMatrix';
import FilterPanel from './components/FilterPanel';
import NodeDetailsPanel from './components/NodeDetailsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CampaignAnalysisDashboard = () => {
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [filters, setFilters] = useState({
    platforms: [],
    threatLevel: 'all',
    contentTypes: [],
    dateRange: { start: '', end: '' },
    similarityThreshold: 0.5,
    searchQuery: '',
    regexMode: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock network data generation
  useEffect(() => {
    const generateMockNetworkData = () => {
      const nodes = [
        // Threat Actors
        { id: 'ta1', name: 'MaliciousActor_X', type: 'threat_actor', influence: 85, threatLevel: 'critical', cluster: 1 },
        { id: 'ta2', name: 'PropagandaBot_Y', type: 'threat_actor', influence: 72, threatLevel: 'high', cluster: 1 },
        { id: 'ta3', name: 'FakeNews_Z', type: 'threat_actor', influence: 64, threatLevel: 'medium', cluster: 2 },
        
        // Campaigns
        { id: 'c1', name: 'Operation Defame', type: 'campaign', influence: 95, threatLevel: 'critical', cluster: 1 },
        { id: 'c2', name: 'Reputation Attack', type: 'campaign', influence: 78, threatLevel: 'high', cluster: 2 },
        { id: 'c3', name: 'Misinformation Wave', type: 'campaign', influence: 56, threatLevel: 'medium', cluster: 3 },
        
        // Content
        { id: 'co1', name: 'Viral Fake Video', type: 'content', influence: 88, threatLevel: 'critical', cluster: 1 },
        { id: 'co2', name: 'Manipulated Image', type: 'content', influence: 67, threatLevel: 'high', cluster: 1 },
        { id: 'co3', name: 'False Statement', type: 'content', influence: 45, threatLevel: 'medium', cluster: 2 },
        
        // Platforms
        { id: 'p1', name: 'Twitter', type: 'platform', influence: 92, threatLevel: 'high', cluster: 1 },
        { id: 'p2', name: 'Facebook', type: 'platform', influence: 87, threatLevel: 'high', cluster: 2 },
        { id: 'p3', name: 'Telegram', type: 'platform', influence: 73, threatLevel: 'medium', cluster: 3 },
        { id: 'p4', name: 'Instagram', type: 'platform', influence: 69, threatLevel: 'medium', cluster: 2 }
      ];

      const links = [
        // Campaign to Actor connections
        { source: 'c1', target: 'ta1', strength: 0.95 },
        { source: 'c1', target: 'ta2', strength: 0.87 },
        { source: 'c2', target: 'ta3', strength: 0.78 },
        
        // Campaign to Content connections
        { source: 'c1', target: 'co1', strength: 0.92 },
        { source: 'c1', target: 'co2', strength: 0.84 },
        { source: 'c2', target: 'co3', strength: 0.71 },
        
        // Platform connections
        { source: 'p1', target: 'co1', strength: 0.89 },
        { source: 'p1', target: 'ta1', strength: 0.76 },
        { source: 'p2', target: 'co2', strength: 0.82 },
        { source: 'p3', target: 'ta2', strength: 0.68 },
        { source: 'p4', target: 'co3', strength: 0.59 },
        
        // Cross-platform coordination
        { source: 'ta1', target: 'ta2', strength: 0.73 },
        { source: 'c1', target: 'c2', strength: 0.65 },
        { source: 'co1', target: 'co2', strength: 0.81 }
      ];

      return { nodes, links };
    };

    setIsLoading(true);
    setTimeout(() => {
      setNetworkData(generateMockNetworkData());
      setIsLoading(false);
      setLastRefresh(new Date());
    }, 1000);
  }, [filters]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // Simulate minor data updates
      setNetworkData(prev => ({
        ...prev,
        nodes: prev?.nodes?.map(node => ({
          ...node,
          influence: Math.max(10, node?.influence + (Math.random() - 0.5) * 5)
        }))
      }));
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    if (node?.type === 'campaign') {
      setSelectedCampaign(node);
    }
  };

  const handleEventSelect = (event) => {
    console.log('Event selected:', event);
  };

  const handleCellSelect = (cell) => {
    console.log('Correlation cell selected:', cell);
  };

  const handleExport = (type) => {
    console.log(`Exporting ${type}...`);
    // Mock export functionality
    const exportData = {
      network: () => console.log('Exporting network diagram...'),
      report: () => console.log('Generating campaign report...'),
      data: () => console.log('Exporting raw data...')
    };
    
    exportData?.[type]?.();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Campaign Analysis Dashboard - Aura Shield</title>
        <meta name="description" content="Advanced analytics interface for investigating coordinated misinformation campaigns and threat actor networks" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Analysis Dashboard</h1>
                <p className="text-muted-foreground">
                  Advanced analytics for investigating coordinated misinformation campaigns and threat networks
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground font-mono">
                  Last updated: {lastRefresh?.toLocaleTimeString()}
                </div>
                <Button
                  variant={autoRefresh ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  iconName="RefreshCw"
                  iconSize={14}
                >
                  Auto Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  loading={isLoading}
                  iconName="Refresh"
                  iconSize={14}
                >
                  Refresh
                </Button>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Filter Panel */}
              <div className="col-span-12 lg:col-span-3">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  onExport={handleExport}
                />
              </div>

              {/* Network Visualization */}
              <div className="col-span-12 lg:col-span-6">
                <div className="space-y-6">
                  <NetworkGraph
                    data={networkData}
                    selectedNode={selectedNode}
                    onNodeSelect={handleNodeSelect}
                    filters={filters}
                  />
                  
                  {/* Correlation Matrix */}
                  <CorrelationMatrix
                    data={networkData}
                    onCellSelect={handleCellSelect}
                  />
                </div>
              </div>

              {/* Right Panel */}
              <div className="col-span-12 lg:col-span-3">
                <div className="space-y-6">
                  {/* Campaign Timeline */}
                  <CampaignTimeline
                    selectedCampaign={selectedCampaign}
                    onEventSelect={handleEventSelect}
                  />
                  
                  {/* Node Details Panel */}
                  <NodeDetailsPanel
                    selectedNode={selectedNode}
                    onClose={() => setSelectedNode(null)}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout Adjustments */}
            <div className="lg:hidden mt-8">
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Smartphone" size={16} />
                  <span>
                    For optimal network analysis experience, please use a desktop or tablet device
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Network" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Active Campaigns</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {networkData?.nodes?.filter(n => n?.type === 'campaign')?.length}
                </div>
              </div>
              
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="UserX" size={16} className="text-error" />
                  <span className="text-sm font-medium text-foreground">Threat Actors</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {networkData?.nodes?.filter(n => n?.type === 'threat_actor')?.length}
                </div>
              </div>
              
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">Critical Threats</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {networkData?.nodes?.filter(n => n?.threatLevel === 'critical')?.length}
                </div>
              </div>
              
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Link" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Connections</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {networkData?.links?.length}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CampaignAnalysisDashboard;