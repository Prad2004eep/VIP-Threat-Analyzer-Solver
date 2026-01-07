import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const ThreatTrendChart = () => {
  const trendData = [
    { date: '2025-08-20', riskScore: 25, threats: 12, reputation: 85 },
    { date: '2025-08-21', riskScore: 28, threats: 15, reputation: 82 },
    { date: '2025-08-22', riskScore: 32, threats: 18, reputation: 78 },
    { date: '2025-08-23', riskScore: 29, threats: 14, reputation: 80 },
    { date: '2025-08-24', riskScore: 35, threats: 22, reputation: 75 },
    { date: '2025-08-25', riskScore: 42, threats: 28, reputation: 68 },
    { date: '2025-08-26', riskScore: 38, threats: 24, reputation: 72 },
    { date: '2025-08-27', riskScore: 45, threats: 31, reputation: 65 },
    { date: '2025-08-28', riskScore: 52, threats: 38, reputation: 58 },
    { date: '2025-08-29', riskScore: 48, threats: 34, reputation: 62 },
    { date: '2025-08-30', riskScore: 41, threats: 26, reputation: 69 },
    { date: '2025-08-31', riskScore: 37, threats: 21, reputation: 73 },
    { date: '2025-09-01', riskScore: 33, threats: 18, reputation: 77 },
    { date: '2025-09-02', riskScore: 29, threats: 15, reputation: 81 },
    { date: '2025-09-03', riskScore: 31, threats: 17, reputation: 79 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-tactical-lg">
          <p className="text-sm font-medium text-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="text-foreground font-medium">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="card-title text-lg">Threat Trend Analysis</h3>
            <p className="card-description">14-day risk assessment overview</p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Risk Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Active Threats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Reputation Score</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-content">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Risk threshold lines */}
              <ReferenceLine y={50} stroke="var(--color-error)" strokeDasharray="5 5" />
              <ReferenceLine y={30} stroke="var(--color-warning)" strokeDasharray="5 5" />
              
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="var(--color-error)" 
                strokeWidth={3}
                name="Risk Score"
                dot={{ fill: 'var(--color-error)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-error)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="threats" 
                stroke="var(--color-warning)" 
                strokeWidth={2}
                name="Active Threats"
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="reputation" 
                stroke="var(--color-success)" 
                strokeWidth={2}
                name="Reputation Score"
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-error/5 rounded-lg border border-error/20">
            <div className="text-xs text-muted-foreground mb-1">Critical Threshold</div>
            <div className="text-sm font-medium text-error">≥ 50</div>
          </div>
          <div className="p-3 bg-warning/5 rounded-lg border border-warning/20">
            <div className="text-xs text-muted-foreground mb-1">Warning Threshold</div>
            <div className="text-sm font-medium text-warning">30-49</div>
          </div>
          <div className="p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="text-xs text-muted-foreground mb-1">Acceptable Range</div>
            <div className="text-sm font-medium text-success">&lt; 30</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatTrendChart;