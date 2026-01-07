import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import VIPProfileSelector from './components/VIPProfileSelector';
import KPICard from './components/KPICard';
import ThreatTrendChart from './components/ThreatTrendChart';
import RiskMatrix from './components/RiskMatrix';
import ActionItemsSidebar from './components/ActionItemsSidebar';
import ExecutiveSummaryTable from './components/ExecutiveSummaryTable';

const ExecutiveRiskSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const kpiData = [
    {
      title: 'Overall Risk Score',
      value: '31',
      change: '+8%',
      trend: 'up',
      icon: 'Shield',
      severity: 'medium'
    },
    {
      title: 'Active Threats',
      value: '17',
      change: '+3',
      trend: 'up',
      icon: 'AlertTriangle',
      severity: 'high'
    },
    {
      title: 'Reputation Impact',
      value: '79',
      change: '-5%',
      trend: 'down',
      icon: 'TrendingUp',
      severity: 'low'
    },
    {
      title: 'Trend Direction',
      value: 'Improving',
      change: 'Stable',
      trend: 'stable',
      icon: 'Activity',
      severity: 'low'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground">Loading executive risk summary...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Executive Risk Summary - Aura Shield</title>
        <meta name="description" content="High-level strategic dashboard for C-suite executives with comprehensive threat overviews and risk assessments" />
      </Helmet>
      <Header />
      <div className="pt-16">
        {/* VIP Profile Header */}
        <VIPProfileSelector />

        {/* Main Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* KPI Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                trend={kpi?.trend}
                icon={kpi?.icon}
                severity={kpi?.severity}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-8 space-y-6">
              <ThreatTrendChart />
              <RiskMatrix />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
              <ActionItemsSidebar />
            </div>
          </div>

          {/* Executive Summary Table */}
          <ExecutiveSummaryTable />

          {/* Footer Information */}
          <div className="bg-surface/50 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Executive Dashboard Summary</h3>
                <p className="text-sm text-muted-foreground">
                  This dashboard provides a comprehensive overview of current threat landscape and risk assessment for VIP protection. 
                  Data is updated in real-time from multiple intelligence sources and platforms.
                </p>
              </div>
              
              <div className="text-right space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last Updated: {lastRefresh?.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className="text-xs text-muted-foreground">
                  Next refresh in 5 minutes
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary font-mono">24/7</div>
                  <div className="text-xs text-muted-foreground">Continuous Monitoring</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-success font-mono">15+</div>
                  <div className="text-xs text-muted-foreground">Platforms Tracked</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-accent font-mono">&lt;30s</div>
                  <div className="text-xs text-muted-foreground">Alert Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveRiskSummary;