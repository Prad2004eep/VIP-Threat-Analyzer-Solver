import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkGraph = ({ data, selectedNode, onNodeSelect, filters }) => {
  const svgRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [graphStats, setGraphStats] = useState({
    nodes: 0,
    edges: 0,
    clusters: 0
  });

  useEffect(() => {
    if (!data || !data?.nodes || !data?.links) return;

    setIsLoading(true);
    const svg = d3?.select(svgRef?.current);
    svg?.selectAll("*")?.remove();

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create main group for zoom/pan
    const g = svg?.append("g");

    // Setup zoom behavior
    const zoom = d3?.zoom()?.scaleExtent([0.1, 4])?.on("zoom", (event) => {
        g?.attr("transform", event?.transform);
        setZoomLevel(event?.transform?.k);
      });

    svg?.call(zoom);

    // Filter data based on filters
    let filteredNodes = data?.nodes;
    let filteredLinks = data?.links;

    if (filters?.threatLevel && filters?.threatLevel !== 'all') {
      filteredNodes = filteredNodes?.filter(node => node?.threatLevel === filters?.threatLevel);
      const nodeIds = new Set(filteredNodes.map(n => n.id));
      filteredLinks = filteredLinks?.filter(link => 
        nodeIds?.has(link?.source?.id || link?.source) && 
        nodeIds?.has(link?.target?.id || link?.target)
      );
    }

    // Create simulation
    const simulation = d3?.forceSimulation(filteredNodes)?.force("link", d3?.forceLink(filteredLinks)?.id(d => d?.id)?.distance(100))?.force("charge", d3?.forceManyBody()?.strength(-300))?.force("center", d3?.forceCenter(width / 2, height / 2))?.force("collision", d3?.forceCollide()?.radius(d => Math.sqrt(d?.influence) * 2 + 5));

    // Create links
    const link = g?.append("g")?.selectAll("line")?.data(filteredLinks)?.enter()?.append("line")?.attr("stroke", "#64748B")?.attr("stroke-opacity", 0.6)?.attr("stroke-width", d => Math.sqrt(d?.strength) * 2);

    // Create nodes
    const node = g?.append("g")?.selectAll("circle")?.data(filteredNodes)?.enter()?.append("circle")?.attr("r", d => Math.sqrt(d?.influence) * 3 + 5)?.attr("fill", d => {
        switch (d?.type) {
          case 'threat_actor': return '#DC2626';
          case 'campaign': return '#F59E0B';
          case 'content': return '#0EA5E9';
          case 'platform': return '#10B981';
          default: return '#64748B';
        }
      })?.attr("stroke", d => selectedNode?.id === d?.id ? '#F8FAFC' : 'none')?.attr("stroke-width", d => selectedNode?.id === d?.id ? 3 : 0)?.style("cursor", "pointer")?.call(d3?.drag()?.on("start", dragstarted)?.on("drag", dragged)?.on("end", dragended))?.on("click", (event, d) => {
        onNodeSelect(d);
      });

    // Add labels
    const labels = g?.append("g")?.selectAll("text")?.data(filteredNodes)?.enter()?.append("text")?.text(d => d?.name)?.attr("font-size", "12px")?.attr("fill", "#F8FAFC")?.attr("text-anchor", "middle")?.attr("dy", ".35em")?.style("pointer-events", "none");

    // Simulation tick
    simulation?.on("tick", () => {
      link?.attr("x1", d => d?.source?.x)?.attr("y1", d => d?.source?.y)?.attr("x2", d => d?.target?.x)?.attr("y2", d => d?.target?.y);

      node?.attr("cx", d => d?.x)?.attr("cy", d => d?.y);

      labels?.attr("x", d => d?.x)?.attr("y", d => d?.y);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event?.active) simulation?.alphaTarget(0.3)?.restart();
      d.fx = d?.x;
      d.fy = d?.y;
    }

    function dragged(event, d) {
      d.fx = event?.x;
      d.fy = event?.y;
    }

    function dragended(event, d) {
      if (!event?.active) simulation?.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Update stats
    setGraphStats({
      nodes: filteredNodes?.length,
      edges: filteredLinks?.length,
      clusters: new Set(filteredNodes.map(n => n.cluster))?.size
    });

    setIsLoading(false);

    return () => {
      simulation?.stop();
    };
  }, [data, selectedNode, filters]);

  const handleZoomIn = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.scaleBy, 1.5
    );
  };

  const handleZoomOut = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.scaleBy, 1 / 1.5
    );
  };

  const handleResetZoom = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomIdentity
    );
  };

  return (
    <div className="relative bg-surface rounded-lg border border-border">
      {/* Graph Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-muted-foreground font-mono">
          Zoom: {(zoomLevel * 100)?.toFixed(0)}%
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={handleZoomIn}>
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomOut}>
            <Icon name="ZoomOut" size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleResetZoom}>
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Graph Stats */}
      <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>{graphStats?.nodes} nodes</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>{graphStats?.edges} edges</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>{graphStats?.clusters} clusters</span>
          </div>
        </div>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
          <div className="flex items-center space-x-2 text-foreground">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} />
            </div>
            <span className="text-sm font-medium">Analyzing network...</span>
          </div>
        </div>
      )}
      {/* SVG Container */}
      <svg
        ref={svgRef}
        width="100%"
        height="600"
        viewBox="0 0 800 600"
        className="w-full h-full"
      />
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-xs font-medium text-foreground mb-2">Node Types</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>Threat Actor</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Campaign</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Content</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;