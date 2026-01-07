import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFiltersChange, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [regexMode, setRegexMode] = useState(false);

  const platforms = [
    { id: 'twitter', name: 'Twitter', color: 'text-blue-400' },
    { id: 'facebook', name: 'Facebook', color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', color: 'text-pink-500' },
    { id: 'telegram', name: 'Telegram', color: 'text-cyan-400' },
    { id: 'reddit', name: 'Reddit', color: 'text-orange-500' },
    { id: 'youtube', name: 'YouTube', color: 'text-red-500' }
  ];

  const threatLevels = [
    { id: 'all', name: 'All Levels', color: 'text-muted-foreground' },
    { id: 'low', name: 'Low', color: 'text-success' },
    { id: 'medium', name: 'Medium', color: 'text-accent' },
    { id: 'high', name: 'High', color: 'text-warning' },
    { id: 'critical', name: 'Critical', color: 'text-error' }
  ];

  const contentTypes = [
    { id: 'text', name: 'Text Posts', icon: 'FileText' },
    { id: 'image', name: 'Images', icon: 'Image' },
    { id: 'video', name: 'Videos', icon: 'Video' },
    { id: 'link', name: 'Links', icon: 'Link' }
  ];

  const handlePlatformToggle = (platformId) => {
    const currentPlatforms = filters?.platforms || [];
    const newPlatforms = currentPlatforms?.includes(platformId)
      ? currentPlatforms?.filter(p => p !== platformId)
      : [...currentPlatforms, platformId];
    
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleContentTypeToggle = (typeId) => {
    const currentTypes = filters?.contentTypes || [];
    const newTypes = currentTypes?.includes(typeId)
      ? currentTypes?.filter(t => t !== typeId)
      : [...currentTypes, typeId];
    
    onFiltersChange({ ...filters, contentTypes: newTypes });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters?.dateRange,
        [field]: value
      }
    });
  };

  const handleSimilarityThresholdChange = (value) => {
    onFiltersChange({
      ...filters,
      similarityThreshold: parseFloat(value)
    });
  };

  const handleSearchSubmit = () => {
    onFiltersChange({
      ...filters,
      searchQuery,
      regexMode
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    onFiltersChange({
      platforms: [],
      threatLevel: 'all',
      contentTypes: [],
      dateRange: { start: '', end: '' },
      similarityThreshold: 0.5,
      searchQuery: '',
      regexMode: false
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.platforms?.length > 0) count++;
    if (filters?.threatLevel && filters?.threatLevel !== 'all') count++;
    if (filters?.contentTypes?.length > 0) count++;
    if (filters?.dateRange?.start || filters?.dateRange?.end) count++;
    if (filters?.searchQuery) count++;
    return count;
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Advanced Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            iconName="X"
            iconSize={14}
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-0 overflow-hidden'}`}>
        <div className="p-4 space-y-6">
          {/* Search Query */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search Query
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={regexMode ? "Enter regex pattern..." : "Search campaigns, actors, content..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleSearchSubmit()}
                />
              </div>
              <Button
                variant={regexMode ? "default" : "outline"}
                size="sm"
                onClick={() => setRegexMode(!regexMode)}
                iconName="Code"
                iconSize={14}
              >
                Regex
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSearchSubmit}
                iconName="Search"
                iconSize={14}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="datetime-local"
                label="Start Date"
                value={filters?.dateRange?.start || ''}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
              <Input
                type="datetime-local"
                label="End Date"
                value={filters?.dateRange?.end || ''}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Platforms
            </label>
            <div className="grid grid-cols-2 gap-2">
              {platforms?.map((platform) => (
                <button
                  key={platform?.id}
                  onClick={() => handlePlatformToggle(platform?.id)}
                  className={`flex items-center space-x-2 p-2 rounded-md border transition-colors ${
                    filters?.platforms?.includes(platform?.id)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon name="Monitor" size={14} className={platform?.color} />
                  <span className="text-sm">{platform?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Threat Level */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Threat Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {threatLevels?.map((level) => (
                <button
                  key={level?.id}
                  onClick={() => onFiltersChange({ ...filters, threatLevel: level?.id })}
                  className={`flex items-center space-x-2 p-2 rounded-md border transition-colors ${
                    filters?.threatLevel === level?.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${level?.id === 'all' ? 'bg-muted-foreground' : 
                    level?.id === 'low' ? 'bg-success' :
                    level?.id === 'medium' ? 'bg-accent' :
                    level?.id === 'high' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span className="text-sm">{level?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content Types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {contentTypes?.map((type) => (
                <button
                  key={type?.id}
                  onClick={() => handleContentTypeToggle(type?.id)}
                  className={`flex items-center space-x-2 p-2 rounded-md border transition-colors ${
                    filters?.contentTypes?.includes(type?.id)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon name={type?.icon} size={14} />
                  <span className="text-sm">{type?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Similarity Threshold */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content Similarity Threshold: {((filters?.similarityThreshold || 0.5) * 100)?.toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={filters?.similarityThreshold || 0.5}
              onChange={(e) => handleSimilarityThresholdChange(e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Export filtered results
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport('network')}
                iconName="Share"
                iconSize={14}
              >
                Network
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport('report')}
                iconName="FileText"
                iconSize={14}
              >
                Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport('data')}
                iconName="Database"
                iconSize={14}
              >
                Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;