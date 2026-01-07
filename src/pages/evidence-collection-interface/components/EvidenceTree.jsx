import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EvidenceTree = ({ selectedCase, onEvidenceSelect, selectedEvidence }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['case-1', 'date-2025-01-15']));
  const [draggedItem, setDraggedItem] = useState(null);

  const evidenceData = [
    {
      id: 'case-1',
      type: 'case',
      name: 'Executive Alpha - Impersonation Campaign',
      children: [
        {
          id: 'date-2025-01-15',
          type: 'date',
          name: 'January 15, 2025',
          children: [
            {
              id: 'platform-twitter',
              type: 'platform',
              name: 'Twitter/X',
              children: [
                {
                  id: 'evidence-1',
                  type: 'evidence',
                  name: 'Fake Profile Screenshot',
                  evidenceType: 'screenshot',
                  verified: true,
                  timestamp: '2025-01-15T14:30:00Z'
                },
                {
                  id: 'evidence-2',
                  type: 'evidence',
                  name: 'Impersonation Tweet',
                  evidenceType: 'social_post',
                  verified: true,
                  timestamp: '2025-01-15T14:45:00Z'
                }
              ]
            },
            {
              id: 'platform-instagram',
              type: 'platform',
              name: 'Instagram',
              children: [
                {
                  id: 'evidence-3',
                  type: 'evidence',
                  name: 'Story Screenshot',
                  evidenceType: 'screenshot',
                  verified: false,
                  timestamp: '2025-01-15T16:20:00Z'
                }
              ]
            }
          ]
        },
        {
          id: 'date-2025-01-14',
          type: 'date',
          name: 'January 14, 2025',
          children: [
            {
              id: 'platform-telegram',
              type: 'platform',
              name: 'Telegram',
              children: [
                {
                  id: 'evidence-4',
                  type: 'evidence',
                  name: 'Coordinated Messages',
                  evidenceType: 'document',
                  verified: true,
                  timestamp: '2025-01-14T09:15:00Z'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'case-2',
      type: 'case',
      name: 'Executive Beta - Deepfake Campaign',
      children: [
        {
          id: 'date-2025-01-12',
          type: 'date',
          name: 'January 12, 2025',
          children: [
            {
              id: 'platform-youtube',
              type: 'platform',
              name: 'YouTube',
              children: [
                {
                  id: 'evidence-5',
                  type: 'evidence',
                  name: 'Deepfake Video',
                  evidenceType: 'video',
                  verified: true,
                  timestamp: '2025-01-12T11:30:00Z'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded?.has(nodeId)) {
      newExpanded?.delete(nodeId);
    } else {
      newExpanded?.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetItem) => {
    e?.preventDefault();
    if (draggedItem && draggedItem?.id !== targetItem?.id) {
      // In a real implementation, this would update the tree structure
      console.log('Moving', draggedItem?.name, 'to', targetItem?.name);
    }
    setDraggedItem(null);
  };

  const getNodeIcon = (type, expanded = false) => {
    switch (type) {
      case 'case':
        return expanded ? 'FolderOpen' : 'Folder';
      case 'date':
        return expanded ? 'CalendarDays' : 'Calendar';
      case 'platform':
        return expanded ? 'Globe' : 'Globe';
      case 'evidence':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getEvidenceTypeIcon = (evidenceType) => {
    switch (evidenceType) {
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

  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedNodes?.has(node?.id);
    const hasChildren = node?.children && node?.children?.length > 0;
    const isSelected = selectedEvidence?.id === node?.id;

    return (
      <div key={node?.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 rounded cursor-pointer transition-colors duration-150 ${
            isSelected 
              ? 'bg-primary/20 text-primary' :'hover:bg-muted/50 text-foreground'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node?.id);
            }
            if (node?.type === 'evidence') {
              onEvidenceSelect(node);
            }
          }}
          draggable={node?.type === 'evidence'}
          onDragStart={(e) => handleDragStart(e, node)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, node)}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
              size={16}
              className="mr-1 text-muted-foreground"
            />
          )}
          
          <Icon
            name={node?.type === 'evidence' ? getEvidenceTypeIcon(node?.evidenceType) : getNodeIcon(node?.type, isExpanded)}
            size={16}
            className={`mr-2 ${
              node?.type === 'evidence' && node?.verified === false 
                ? 'text-warning' :'text-muted-foreground'
            }`}
          />
          
          <span className="text-sm font-medium truncate flex-1">
            {node?.name}
          </span>
          
          {node?.type === 'evidence' && (
            <div className="flex items-center ml-2">
              {node?.verified ? (
                <Icon name="CheckCircle" size={12} className="text-success" />
              ) : (
                <Icon name="AlertCircle" size={12} className="text-warning" />
              )}
            </div>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node?.children?.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredData = selectedCase 
    ? evidenceData?.filter(item => item?.id === selectedCase)
    : evidenceData;

  return (
    <div className="h-full bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Evidence Tree</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop to reorganize evidence items
        </p>
      </div>
      <div className="p-2 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
        {filteredData?.map(node => renderTreeNode(node))}
      </div>
    </div>
  );
};

export default EvidenceTree;