import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EvidenceUploader from './components/EvidenceUploader';
import EvidenceTree from './components/EvidenceTree';
import EvidenceGallery from './components/EvidenceGallery';
import EvidenceMetadata from './components/EvidenceMetadata';
import EvidenceTimeline from './components/EvidenceTimeline';
import EvidenceLightbox from './components/EvidenceLightbox';
import ChainOfCustodyPanel from './components/ChainOfCustodyPanel';

const EvidenceCollectionInterface = () => {
  const [selectedCase, setSelectedCase] = useState('case-1');
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [activeView, setActiveView] = useState('gallery'); // gallery, timeline, custody
  const [evidenceTypeFilter, setEvidenceTypeFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxEvidence, setLightboxEvidence] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [uploadedEvidence, setUploadedEvidence] = useState([]);

  const cases = [
    { id: 'case-1', name: 'Executive Alpha - Impersonation Campaign', status: 'active', evidenceCount: 12 },
    { id: 'case-2', name: 'Executive Beta - Deepfake Campaign', status: 'active', evidenceCount: 8 },
    { id: 'case-3', name: 'Executive Gamma - Coordinated Attack', status: 'closed', evidenceCount: 15 }
  ];

  const evidenceTypes = [
    { value: 'all', label: 'All Types', count: 35 },
    { value: 'screenshot', label: 'Screenshots', count: 18 },
    { value: 'video', label: 'Videos', count: 7 },
    { value: 'document', label: 'Documents', count: 6 },
    { value: 'social_post', label: 'Social Posts', count: 4 }
  ];

  const verificationStatuses = [
    { value: 'all', label: 'All Status', count: 35 },
    { value: 'verified', label: 'Verified', count: 28 },
    { value: 'pending', label: 'Pending', count: 5 },
    { value: 'suspicious', label: 'Suspicious', count: 2 }
  ];

  const handleEvidenceSelect = (evidence) => {
    setSelectedEvidence(evidence);
  };

  const handleLightboxOpen = (evidence) => {
    setLightboxEvidence(evidence);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
    setLightboxEvidence(null);
  };

  const handleEvidenceUpdate = (updatedEvidence) => {
    setSelectedEvidence(updatedEvidence);
    // In a real implementation, this would update the evidence in the backend
    console.log('Evidence updated:', updatedEvidence);
  };

  const handleEvidenceUploaded = (newEvidence) => {
    // Add to uploaded evidence list
    setUploadedEvidence(prev => [...prev, newEvidence]);

    // Automatically select the newly uploaded evidence for metadata viewing
    setSelectedEvidence(newEvidence);

    console.log('New evidence uploaded:', newEvidence);
  };

  const exportEvidencePackage = () => {
    // In a real implementation, this would generate a court-ready evidence package
    console.log('Exporting evidence package for case:', selectedCase);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'closed':
        return 'text-muted-foreground bg-muted/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <>
      <Helmet>
        <title>Evidence Collection Interface - Aura Shield</title>
        <meta name="description" content="Digital forensics and evidence management platform for threat investigation and documentation" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Custom Header for Evidence Page */}
        <Header />

        {/* Top Controls Bar */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Scale" size={24} className="text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Evidence Collection Interface</h1>
              </div>
              
              {/* Case Selector */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-muted-foreground">Case:</label>
                <select
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e?.target?.value)}
                  className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {cases?.map((case_) => (
                    <option key={case_?.id} value={case_?.id}>
                      {case_?.name} ({case_?.evidenceCount} items)
                    </option>
                  ))}
                </select>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(cases?.find(c => c?.id === selectedCase)?.status)}`}>
                  {cases?.find(c => c?.id === selectedCase)?.status}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Evidence Type Filter */}
              <select
                value={evidenceTypeFilter}
                onChange={(e) => setEvidenceTypeFilter(e?.target?.value)}
                className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {evidenceTypes?.map((type) => (
                  <option key={type?.value} value={type?.value}>
                    {type?.label} ({type?.count})
                  </option>
                ))}
              </select>

              {/* Verification Filter */}
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e?.target?.value)}
                className="bg-input border border-border rounded px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {verificationStatuses?.map((status) => (
                  <option key={status?.value} value={status?.value}>
                    {status?.label} ({status?.count})
                  </option>
                ))}
              </select>

              {/* Export Button */}
              <Button variant="default" onClick={exportEvidencePackage}>
                <Icon name="Package" size={16} className="mr-2" />
                Export Package
              </Button>

              {/* Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Icon name={sidebarCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-screen" style={{ height: 'calc(100vh - 128px)' }}>
          {/* Left Sidebar - Evidence Tree */}
          <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0' : 'w-80'} overflow-hidden`}>
            <div className="w-80 h-full p-4">
              <EvidenceTree
                selectedCase={selectedCase}
                onEvidenceSelect={handleEvidenceSelect}
                selectedEvidence={selectedEvidence}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* View Toggle */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex items-center space-x-1">
                <Button
                  variant={activeView === 'gallery' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('gallery')}
                >
                  <Icon name="Grid3X3" size={16} className="mr-2" />
                  Gallery
                </Button>
                <Button
                  variant={activeView === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('timeline')}
                >
                  <Icon name="Clock" size={16} className="mr-2" />
                  Timeline
                </Button>
                <Button
                  variant={activeView === 'custody' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('custody')}
                >
                  <Icon name="Shield" size={16} className="mr-2" />
                  Chain of Custody
                </Button>
              </div>
            </div>

            {/* Content Views */}
            <div className="flex-1 p-4">
              {activeView === 'gallery' && (
                <EvidenceGallery
                  evidenceItems={uploadedEvidence}
                  selectedEvidence={selectedEvidence}
                  onEvidenceSelect={handleEvidenceSelect}
                  onLightboxOpen={handleLightboxOpen}
                />
              )}
              
              {activeView === 'timeline' && (
                <EvidenceTimeline
                  onEvidenceSelect={handleEvidenceSelect}
                />
              )}
              
              {activeView === 'custody' && (
                <ChainOfCustodyPanel
                  evidence={selectedEvidence}
                />
              )}
            </div>
          </div>

          {/* Right Sidebar - Evidence Metadata */}
          <div className="w-96 h-full p-4">
            <EvidenceMetadata
              evidence={selectedEvidence}
              onUpdate={handleEvidenceUpdate}
            />
          </div>
        </div>
      </div>
      {/* Lightbox */}
      <EvidenceLightbox
        evidence={lightboxEvidence}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNext={() => {
          // In a real implementation, this would navigate to the next evidence item
          console.log('Next evidence');
        }}
        onPrevious={() => {
          // In a real implementation, this would navigate to the previous evidence item
          console.log('Previous evidence');
        }}
      />

      {/* Evidence Uploader - Fixed position at bottom-right */}
      <EvidenceUploader
        onEvidenceUploaded={handleEvidenceUploaded}
      />
    </>
  );
};

export default EvidenceCollectionInterface;