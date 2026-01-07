import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, trend, icon, severity = 'low' }) => {
  const getSeverityColor = (level) => {
    switch (level) {
      case 'critical': return 'text-error border-error/20 bg-error/5';
      case 'high': return 'text-warning border-warning/20 bg-warning/5';
      case 'medium': return 'text-accent border-accent/20 bg-accent/5';
      case 'low': return 'text-success border-success/20 bg-success/5';
      default: return 'text-muted-foreground border-border bg-card';
    }
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (direction) => {
    switch (direction) {
      case 'up': return severity === 'low' ? 'text-success' : 'text-error';
      case 'down': return severity === 'low' ? 'text-error' : 'text-success';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`card border-2 ${getSeverityColor(severity)} transition-all duration-200 hover:shadow-tactical-lg`}>
      <div className="card-content p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${getSeverityColor(severity)?.replace('text-', 'bg-')?.replace('/5', '/10')}`}>
              <Icon name={icon} size={24} className={getSeverityColor(severity)?.split(' ')?.[0]} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground font-mono">
            {value}
          </div>
          
          {change && (
            <div className="flex items-center space-x-2">
              <Icon 
                name={getTrendIcon(trend)} 
                size={16} 
                className={getTrendColor(trend)} 
              />
              <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
                {change}
              </span>
              <span className="text-xs text-muted-foreground">
                vs last period
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;