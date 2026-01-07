import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CorrelationMatrix = ({ data, onCellSelect }) => {
  const [matrixData, setMatrixData] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('content_similarity');
  const [showLabels, setShowLabels] = useState(true);

  // Mock correlation matrix data
  useEffect(() => {
    const platforms = ['Twitter', 'Facebook', 'Instagram', 'Telegram', 'Reddit', 'YouTube'];
    const matrix = [];

    platforms?.forEach((platform1, i) => {
      const row = [];
      platforms?.forEach((platform2, j) => {
        if (i === j) {
          row?.push({
            platform1,
            platform2,
            similarity: 1.0,
            contentMatches: Math.floor(Math.random() * 100) + 50,
            timeCorrelation: 0.95,
            actorOverlap: Math.floor(Math.random() * 20) + 10,
            narrativeAlignment: Math.random() * 0.3 + 0.7
          });
        } else {
          const similarity = Math.random() * 0.8 + 0.1;
          row?.push({
            platform1,
            platform2,
            similarity,
            contentMatches: Math.floor(similarity * 80) + 5,
            timeCorrelation: similarity * 0.9 + 0.1,
            actorOverlap: Math.floor(similarity * 15) + 2,
            narrativeAlignment: similarity * 0.8 + 0.2
          });
        }
      });
      matrix?.push(row);
    });

    setMatrixData(matrix);
  }, [data]);

  const getColorIntensity = (value) => {
    const intensity = Math.floor(value * 255);
    return `rgb(${255 - intensity}, ${255 - intensity * 0.5}, 255)`;
  };

  const getMetricValue = (cell, metric) => {
    switch (metric) {
      case 'content_similarity': return cell?.similarity;
      case 'time_correlation': return cell?.timeCorrelation;
      case 'actor_overlap': return cell?.actorOverlap / 20; // Normalize to 0-1
      case 'narrative_alignment': return cell?.narrativeAlignment;
      default: return cell?.similarity;
    }
  };

  const formatMetricValue = (cell, metric) => {
    switch (metric) {
      case 'content_similarity': return `${(cell?.similarity * 100)?.toFixed(1)}%`;
      case 'time_correlation': return `${(cell?.timeCorrelation * 100)?.toFixed(1)}%`;
      case 'actor_overlap': return `${cell?.actorOverlap} actors`;
      case 'narrative_alignment': return `${(cell?.narrativeAlignment * 100)?.toFixed(1)}%`;
      default: return `${(cell?.similarity * 100)?.toFixed(1)}%`;
    }
  };

  const getMetricLabel = (metric) => {
    switch (metric) {
      case 'content_similarity': return 'Content Similarity';
      case 'time_correlation': return 'Time Correlation';
      case 'actor_overlap': return 'Actor Overlap';
      case 'narrative_alignment': return 'Narrative Alignment';
      default: return 'Content Similarity';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Correlation Matrix</h3>
          <p className="text-sm text-muted-foreground">
            Cross-platform content similarity and campaign coordination analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="bg-input border border-border rounded-md px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="content_similarity">Content Similarity</option>
            <option value="time_correlation">Time Correlation</option>
            <option value="actor_overlap">Actor Overlap</option>
            <option value="narrative_alignment">Narrative Alignment</option>
          </select>
          
          <Button
            variant={showLabels ? "default" : "outline"}
            size="sm"
            onClick={() => setShowLabels(!showLabels)}
            iconName="Tag"
            iconSize={14}
          >
            Labels
          </Button>
        </div>
      </div>
      {/* Matrix */}
      <div className="relative overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-24"></th>
                {matrixData?.[0]?.map((_, colIndex) => (
                  <th key={colIndex} className="p-2 text-center">
                    <div className="text-xs text-muted-foreground font-medium transform -rotate-45 origin-center">
                      {matrixData?.[0]?.[colIndex]?.platform2}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixData?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="p-2 text-right">
                    <div className="text-xs text-muted-foreground font-medium">
                      {row?.[0]?.platform1}
                    </div>
                  </td>
                  {row?.map((cell, colIndex) => {
                    const value = getMetricValue(cell, selectedMetric);
                    const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                    
                    return (
                      <td key={colIndex} className="p-1">
                        <div
                          className="relative w-12 h-12 rounded cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10"
                          style={{
                            backgroundColor: getColorIntensity(value),
                            border: isHovered ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                          }}
                          onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => onCellSelect(cell)}
                        >
                          {showLabels && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-mono text-background">
                                {(value * 100)?.toFixed(0)}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Hover Details */}
      {hoveredCell && (
        <div className="mt-4 p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">
              {matrixData?.[hoveredCell?.row]?.[hoveredCell?.col]?.platform1} ↔ {matrixData?.[hoveredCell?.row]?.[hoveredCell?.col]?.platform2}
            </h4>
            <span className="text-xs text-muted-foreground font-mono">
              {getMetricLabel(selectedMetric)}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {formatMetricValue(matrixData?.[hoveredCell?.row]?.[hoveredCell?.col], 'content_similarity')}
              </div>
              <div className="text-xs text-muted-foreground">Content Match</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-accent">
                {formatMetricValue(matrixData?.[hoveredCell?.row]?.[hoveredCell?.col], 'time_correlation')}
              </div>
              <div className="text-xs text-muted-foreground">Time Sync</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-success">
                {formatMetricValue(matrixData?.[hoveredCell?.row]?.[hoveredCell?.col], 'actor_overlap')}
              </div>
              <div className="text-xs text-muted-foreground">Shared Actors</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-warning">
                {formatMetricValue(matrixData?.[hoveredCell?.row]?.[hoveredCell?.col], 'narrative_alignment')}
              </div>
              <div className="text-xs text-muted-foreground">Narrative Align</div>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>
                <Icon name="FileText" size={12} className="inline mr-1" />
                {matrixData?.[hoveredCell?.row]?.[hoveredCell?.col]?.contentMatches} matching posts
              </span>
              <span>
                <Icon name="Clock" size={12} className="inline mr-1" />
                Coordinated timing detected
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-foreground">
            {getMetricLabel(selectedMetric)} Scale
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Low</span>
            <div className="flex space-x-1">
              {[0.1, 0.3, 0.5, 0.7, 0.9]?.map((value, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: getColorIntensity(value) }}
                ></div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;