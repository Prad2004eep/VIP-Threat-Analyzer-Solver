import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EvidenceLightbox = ({ evidence, isOpen, onClose, onNext, onPrevious }) => {
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [measurements, setMeasurements] = useState([]);
  const [isDrawingMeasurement, setIsDrawingMeasurement] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious?.();
          break;
        case 'ArrowRight':
          onNext?.();
          break;
        case '+': case'=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleResetZoom();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!isOpen || !evidence) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e?.clientX - panPosition?.x,
        y: e?.clientY - panPosition?.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanPosition({
        x: e?.clientX - dragStart?.x,
        y: e?.clientY - dragStart?.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAnnotationClick = (e) => {
    if (!isAnnotating) return;
    
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    
    const newAnnotation = {
      id: Date.now(),
      x,
      y,
      text: `Annotation ${annotations?.length + 1}`,
      timestamp: new Date()?.toISOString()
    };
    
    setAnnotations([...annotations, newAnnotation]);
  };

  const removeAnnotation = (id) => {
    setAnnotations(annotations?.filter(ann => ann?.id !== id));
  };

  const exportEvidence = (format) => {
    // In a real implementation, this would generate and download the evidence package
    console.log(`Exporting evidence ${evidence?.id} in ${format} format`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'screenshot':
        return 'Image';
      case 'video':
        return 'Video';
      case 'document':
        return 'FileText';
      case 'social_post':
        return 'MessageSquare';
      default:
        return 'File';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Icon
              name={getTypeIcon(evidence?.type)}
              size={20}
              className="text-white"
            />
            <div>
              <h3 className="text-white font-semibold">{evidence?.name}</h3>
              <p className="text-white/70 text-sm">
                {evidence?.platform} • {formatTimestamp(evidence?.timestamp)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Navigation */}
            {onPrevious && (
              <Button variant="ghost" size="icon" onClick={onPrevious} className="text-white hover:bg-white/10">
                <Icon name="ChevronLeft" size={20} />
              </Button>
            )}
            {onNext && (
              <Button variant="ghost" size="icon" onClick={onNext} className="text-white hover:bg-white/10">
                <Icon name="ChevronRight" size={20} />
              </Button>
            )}
            
            {/* Tools */}
            <Button
              variant={isAnnotating ? "default" : "ghost"}
              size="icon"
              onClick={() => setIsAnnotating(!isAnnotating)}
              className="text-white hover:bg-white/10"
            >
              <Icon name="MessageSquare" size={20} />
            </Button>
            
            <Button
              variant={comparisonMode ? "default" : "ghost"}
              size="icon"
              onClick={() => setComparisonMode(!comparisonMode)}
              className="text-white hover:bg-white/10"
            >
              <Icon name="Copy" size={20} />
            </Button>
            
            {/* Export Menu */}
            <div className="relative group">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Icon name="Download" size={20} />
              </Button>
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48">
                <div className="p-2">
                  <button
                    onClick={() => exportEvidence('pdf')}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                  >
                    Export as PDF Report
                  </button>
                  <button
                    onClick={() => exportEvidence('zip')}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                  >
                    Download ZIP Package
                  </button>
                  <button
                    onClick={() => exportEvidence('json')}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
                  >
                    Export Metadata JSON
                  </button>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-16">
        <div className="relative max-w-full max-h-full">
          <div
            className="relative overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleAnnotationClick}
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition?.x}px, ${panPosition?.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            {evidence?.type === 'video' ? (
              <video
                controls
                className="max-w-full max-h-full"
                style={{ maxHeight: '70vh' }}
              >
                <source src={evidence?.thumbnail} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={evidence?.thumbnail}
                alt={evidence?.name}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: '70vh' }}
              />
            )}
            
            {/* Annotations */}
            {annotations?.map((annotation) => (
              <div
                key={annotation?.id}
                className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white cursor-pointer group"
                style={{
                  left: `${annotation?.x}%`,
                  top: `${annotation?.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={(e) => {
                  e?.stopPropagation();
                  removeAnnotation(annotation?.id);
                }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {annotation?.text}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="text-white hover:bg-white/10"
              >
                <Icon name="ZoomOut" size={16} />
              </Button>
              <span className="text-white text-sm font-mono min-w-16 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="text-white hover:bg-white/10"
              >
                <Icon name="ZoomIn" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetZoom}
                className="text-white hover:bg-white/10"
              >
                Reset
              </Button>
            </div>
            
            {isAnnotating && (
              <div className="text-white/70 text-sm">
                Click on the image to add annotations • {annotations?.length} annotations
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={16} />
              <span className="font-mono">{evidence?.hash?.substring(0, 16)}...</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>{evidence?.authenticity}% authentic</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Scale" size={16} />
              <span>{evidence?.legalStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceLightbox;