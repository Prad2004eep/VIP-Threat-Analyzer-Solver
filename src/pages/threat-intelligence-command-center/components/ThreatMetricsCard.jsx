import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatMetricsCard = ({ title, value, change, changeType, icon, severity, sparklineData }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error border-error/20 bg-error/5';
      case 'high': return 'text-warning border-warning/20 bg-warning/5';
      case 'medium': return 'text-accent border-accent/20 bg-accent/5';
      case 'low': return 'text-success border-success/20 bg-success/5';
      default: return 'text-foreground border-border bg-card';
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase': return 'text-error';
      case 'decrease': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const generateSparkline = (data) => {
    if (!data || data?.length === 0) return '';
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })?.join(' ');
  };

  return (
    <div className={`card p-6 border-l-4 ${getSeverityColor(severity)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground">
              {value?.toLocaleString()}
            </span>
            {change !== undefined && (
              <div className={`flex items-center text-sm ${getChangeColor(changeType)}`}>
                <Icon 
                  name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
                  size={14} 
                  className="mr-1" 
                />
                {Math.abs(change)}%
              </div>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            Last 24 hours
          </p>
        </div>
        
        {sparklineData && sparklineData?.length > 0 && (
          <div className="ml-4">
            <svg width="80" height="40" className="text-primary">
              <polyline
                points={generateSparkline(sparklineData)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-70"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatMetricsCard;