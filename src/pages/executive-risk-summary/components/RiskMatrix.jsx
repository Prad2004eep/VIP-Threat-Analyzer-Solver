import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RiskMatrix = () => {
  const riskData = [
    { id: 1, name: 'Social Media Impersonation', severity: 8, likelihood: 7, impact: 'High', category: 'Identity' },
    { id: 2, name: 'Deepfake Video Campaign', severity: 9, likelihood: 4, impact: 'Critical', category: 'Misinformation' },
    { id: 3, name: 'Coordinated Harassment', severity: 6, likelihood: 8, impact: 'Medium', category: 'Harassment' },
    { id: 4, name: 'Data Leak Exposure', severity: 7, likelihood: 3, impact: 'High', category: 'Privacy' },
    { id: 5, name: 'Reputation Attack Campaign', severity: 8, likelihood: 6, impact: 'High', category: 'Reputation' },
    { id: 6, name: 'Physical Threat Indicators', severity: 9, likelihood: 2, impact: 'Critical', category: 'Physical' },
    { id: 7, name: 'Financial Fraud Attempts', severity: 5, likelihood: 5, impact: 'Medium', category: 'Financial' },
    { id: 8, name: 'Platform Account Compromise', severity: 7, likelihood: 4, impact: 'High', category: 'Security' }
  ];

  const getQuadrantColor = (severity, likelihood) => {
    if (severity >= 7 && likelihood >= 6) return 'var(--color-error)'; // High-High
    if (severity >= 7 && likelihood < 6) return 'var(--color-warning)'; // High-Low
    if (severity < 7 && likelihood >= 6) return 'var(--color-accent)'; // Low-High
    return 'var(--color-success)'; // Low-Low
  };

  const getQuadrantLabel = (severity, likelihood) => {
    if (severity >= 7 && likelihood >= 6) return 'Critical Risk';
    if (severity >= 7 && likelihood < 6) return 'Monitor Closely';
    if (severity < 7 && likelihood >= 6) return 'Preventive Action';
    return 'Acceptable Risk';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-4 shadow-tactical-lg max-w-xs">
          <h4 className="font-semibold text-foreground mb-2">{data?.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Severity:</span>
              <span className="text-foreground font-medium">{data?.severity}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Likelihood:</span>
              <span className="text-foreground font-medium">{data?.likelihood}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Impact:</span>
              <span className="text-foreground font-medium">{data?.impact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="text-foreground font-medium">{data?.category}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <span className="text-xs font-medium" style={{ color: getQuadrantColor(data?.severity, data?.likelihood) }}>
                {getQuadrantLabel(data?.severity, data?.likelihood)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title text-lg">Risk Assessment Matrix</h3>
        <p className="card-description">Threat severity vs likelihood analysis</p>
      </div>
      <div className="card-content">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                dataKey="likelihood" 
                name="Likelihood"
                domain={[0, 10]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Likelihood', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: 'var(--color-muted-foreground)' } }}
              />
              <YAxis 
                type="number" 
                dataKey="severity" 
                name="Severity"
                domain={[0, 10]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Severity', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'var(--color-muted-foreground)' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Quadrant background areas */}
              <defs>
                <pattern id="criticalZone" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="var(--color-error)" opacity="0.1"/>
                </pattern>
                <pattern id="warningZone" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="var(--color-warning)" opacity="0.1"/>
                </pattern>
              </defs>
              
              <Scatter name="Threats" data={riskData} fill="var(--color-primary)">
                {riskData?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getQuadrantColor(entry?.severity, entry?.likelihood)}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Risk Quadrants</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-error"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">Critical Risk</div>
                  <div className="text-xs text-muted-foreground">High severity, high likelihood</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-warning"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">Monitor Closely</div>
                  <div className="text-xs text-muted-foreground">High severity, low likelihood</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">Preventive Action</div>
                  <div className="text-xs text-muted-foreground">Low severity, high likelihood</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-success"></div>
                <div>
                  <div className="text-sm font-medium text-foreground">Acceptable Risk</div>
                  <div className="text-xs text-muted-foreground">Low severity, low likelihood</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Risk Distribution</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Critical Risk:</span>
                <span className="text-sm font-medium text-error">2 threats</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monitor Closely:</span>
                <span className="text-sm font-medium text-warning">3 threats</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Preventive Action:</span>
                <span className="text-sm font-medium text-accent">2 threats</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Acceptable Risk:</span>
                <span className="text-sm font-medium text-success">1 threat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMatrix;