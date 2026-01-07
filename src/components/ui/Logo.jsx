import React from 'react';
import { Shield } from 'lucide-react';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Dark circular background */}
        <div className="absolute inset-0 bg-slate-800/90 rounded-full"></div>
        {/* Green circular background with gradient */}
        <div className="relative bg-gradient-to-br from-primary/30 to-primary/10 rounded-full p-3 backdrop-blur-sm border border-primary/20">
          <Shield
            className={`${sizeClasses[size]} text-primary fill-primary/20`}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-foreground tracking-tight`}>
            Aura Shield
          </span>
          <span className="text-xs text-text-secondary font-medium tracking-wide">
            THREAT MONITOR
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
