import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ThreatHeatmap = ({ threatData, onLocationClick }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('severity'); // severity, volume, type

  const regions = [
    { id: 'na', name: 'North America', x: 20, y: 30, threats: threatData?.filter(t => t?.region === 'na') },
    { id: 'sa', name: 'South America', x: 30, y: 60, threats: threatData?.filter(t => t?.region === 'sa') },
    { id: 'eu', name: 'Europe', x: 50, y: 25, threats: threatData?.filter(t => t?.region === 'eu') },
    { id: 'af', name: 'Africa', x: 52, y: 50, threats: threatData?.filter(t => t?.region === 'af') },
    { id: 'as', name: 'Asia', x: 70, y: 35, threats: threatData?.filter(t => t?.region === 'as') },
    { id: 'oc', name: 'Oceania', x: 80, y: 65, threats: threatData?.filter(t => t?.region === 'oc') }
  ];

  const getRegionIntensity = (threats) => {
    if (threats?.length === 0) return 0;
    
    switch (viewMode) {
      case 'severity':
        const avgSeverity = threats?.reduce((sum, t) => {
          const severityMap = { low: 1, medium: 2, high: 3, critical: 4 };
          return sum + (severityMap?.[t?.severity] || 1);
        }, 0) / threats?.length;
        return avgSeverity / 4;
      
      case 'volume':
        return Math.min(threats?.length / 50, 1);
      
      case 'type':
        const uniqueTypes = new Set(threats.map(t => t.type))?.size;
        return Math.min(uniqueTypes / 5, 1);
      
      default:
        return 0;
    }
  };

  const getIntensityColor = (intensity) => {
    if (intensity === 0) return 'fill-muted stroke-border';
    if (intensity < 0.25) return 'fill-success/30 stroke-success';
    if (intensity < 0.5) return 'fill-accent/40 stroke-accent';
    if (intensity < 0.75) return 'fill-warning/50 stroke-warning';
    return 'fill-error/60 stroke-error';
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    onLocationClick && onLocationClick(region);
  };

  const getThreatSummary = (threats) => {
    const severityCounts = threats?.reduce((acc, threat) => {
      acc[threat.severity] = (acc?.[threat?.severity] || 0) + 1;
      return acc;
    }, {});

    const typeCounts = threats?.reduce((acc, threat) => {
      acc[threat.type] = (acc?.[threat?.type] || 0) + 1;
      return acc;
    }, {});

    return { severityCounts, typeCounts };
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Map" size={20} className="mr-2 text-primary" />
          Global Threat Distribution
        </h3>
        
        <div className="flex items-center space-x-2">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e?.target?.value)}
            className="bg-surface border border-border rounded-full px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="severity">By Severity</option>
            <option value="volume">By Volume</option>
            <option value="type">By Diversity</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-surface rounded-full p-4 h-80">
            <svg viewBox="0 0 100 80" className="w-full h-full">
              {/* Simplified world map regions */}
              {regions?.map((region) => {
                const intensity = getRegionIntensity(region?.threats);
                return (
                  <g key={region?.id}>
                    <circle
                      cx={region?.x}
                      cy={region?.y}
                      r={Math.max(3, intensity * 8 + 2)}
                      className={`${getIntensityColor(intensity)} cursor-pointer transition-all duration-200 hover:opacity-80`}
                      onClick={() => handleRegionClick(region)}
                    />
                    <text
                      x={region?.x}
                      y={region?.y + 12}
                      textAnchor="middle"
                      className="text-xs fill-foreground font-medium"
                    >
                      {region?.threats?.length}
                    </text>
                  </g>
                );
              })}
            </svg>
            
            {/* Legend */}
            <div className="absolute bottom-2 left-2 bg-background/90 rounded-md p-2 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-success/30"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-accent/40"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-error/60"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Region Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">
            {selectedRegion ? selectedRegion?.name : 'Select a region'}
          </h4>
          
          {selectedRegion ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-surface rounded-full">
                  <div className="text-2xl font-bold text-foreground">
                    {selectedRegion?.threats?.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Threats</div>
                </div>
                <div className="text-center p-3 bg-surface rounded-full">
                  <div className="text-2xl font-bold text-foreground">
                    {new Set(selectedRegion.threats.map(t => t.type))?.size}
                  </div>
                  <div className="text-xs text-muted-foreground">Threat Types</div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Severity Breakdown</h5>
                <div className="space-y-2">
                  {Object.entries(getThreatSummary(selectedRegion?.threats)?.severityCounts)?.map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          severity === 'critical' ? 'bg-error' :
                          severity === 'high' ? 'bg-warning' :
                          severity === 'medium' ? 'bg-accent' : 'bg-success'
                        }`}></div>
                        <span className="capitalize text-foreground">{severity}</span>
                      </div>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Top Threat Types</h5>
                <div className="space-y-2">
                  {Object.entries(getThreatSummary(selectedRegion?.threats)?.typeCounts)?.sort(([,a], [,b]) => b - a)?.slice(0, 3)?.map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-foreground">{type?.replace('_', ' ')}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Click on a region to view detailed threat analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatHeatmap;