import React, { useState, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Upload, X, FileImage, Check, AlertCircle, User, LogIn, Zap, Save, Eye } from 'lucide-react';

const EvidenceUploader = ({ onEvidenceUploaded, className = '' }) => {
  const { user, signIn } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [isGeneratingMetadata, setIsGeneratingMetadata] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Generate comprehensive evidence metadata from uploaded file
  const generateEvidenceMetadata = (file, dimensions = null) => {
    const now = new Date();
    const evidenceId = `evidence-${Date.now().toString().slice(-6)}`;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    // Generate mock SHA-256 hash
    const generateMockHash = () => {
      const chars = '0123456789abcdef';
      let hash = 'sha256:';
      for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
      }
      return hash + '...';
    };

    // Generate authenticity score (random for demo)
    const authenticityScore = Math.floor(Math.random() * 100) + 1;

    // Determine collector name
    const collectorName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Agent Smith';

    return {
      // Basic Information
      id: evidenceId,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      type: isVideo ? 'video' : isImage ? 'image' : 'file',
      platform: 'Web Upload',
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      resolution: dimensions ? `${dimensions.width}x${dimensions.height}` : 'Unknown',
      collector: collectorName,
      fileName: file.name,
      mimeType: file.type,

      // Verification Status
      verification: {
        authenticityScore: `${authenticityScore}%`,
        legalStatus: authenticityScore > 70 ? 'admissible' : 'under_review',
        verificationDate: now.toISOString()
      },

      // Hash & Integrity
      hash: {
        sha256: generateMockHash(),
        generatedAt: now.toISOString()
      },

      // Timestamps
      timestamps: {
        collectionTime: now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }),
        uploadDate: now.toISOString(),
        lastModified: now.toISOString()
      },

      // Description
      description: `${isVideo ? 'Video' : 'Image'} file uploaded via Evidence Collection Interface. File type: ${fileExtension.toUpperCase()}. Awaiting analysis and verification.`,

      // Tags
      tags: [
        'uploaded',
        isVideo ? 'video' : 'image',
        fileExtension,
        'web-upload',
        authenticityScore > 70 ? 'verified' : 'pending-verification'
      ],

      // Chain of Custody
      chainOfCustody: [
        {
          action: 'Evidence Collected',
          timestamp: now.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }),
          user: collectorName,
          notes: 'Initial evidence collection from web upload interface'
        },
        {
          action: 'Hash Generated',
          timestamp: new Date(now.getTime() + 60000).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }),
          user: 'System',
          notes: 'SHA-256 hash generated for integrity verification'
        },
        {
          action: 'Verification Started',
          timestamp: new Date(now.getTime() + 300000).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }),
          user: 'Agent Martinez',
          notes: 'Authenticity verification process initiated'
        },
        {
          action: 'Legal Review',
          timestamp: new Date(now.getTime() + 1800000).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }),
          user: 'Legal Team',
          notes: 'Legal admissibility assessment completed'
        }
      ],

      // Additional metadata for internal use
      uploadedBy: user?.email || 'Anonymous',
      status: 'active',
      category: 'uploaded_evidence',
      source: 'Web Upload Interface'
    };
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = async (files) => {
    if (!user) {
      setShowSignIn(true);
      return;
    }

    setIsUploading(true);

    try {
      const newPendingFiles = [];

      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.warn(`Skipping non-image file: ${file.name}`);
          continue;
        }

        // Create object URL for preview
        const previewUrl = URL.createObjectURL(file);

        // Get image dimensions
        const dimensions = await getImageDimensions(file);

        const pendingFile = {
          id: `pending_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          file,
          previewUrl,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          dimensions,
          uploadDate: new Date().toISOString(),
          status: 'uploaded',
          hasMetadata: false
        };

        newPendingFiles.push(pendingFile);
      }

      setPendingFiles(prev => [...prev, ...newPendingFiles]);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to get image dimensions
  const getImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve({ width: null, height: null });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = Array.from(event.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signIn(signInData.email, signInData.password);
      if (!error) {
        setShowSignIn(false);
        setSignInData({ email: '', password: '' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleGenerateMetadata = async (pendingFile) => {
    setIsGeneratingMetadata(true);

    try {
      // Simulate metadata generation process with multiple stages
      await new Promise(resolve => setTimeout(resolve, 1000)); // Hash generation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Verification
      await new Promise(resolve => setTimeout(resolve, 1000)); // Legal review

      // Generate comprehensive metadata with dimensions
      const evidenceMetadata = generateEvidenceMetadata(pendingFile.file, pendingFile.dimensions);

      // Create final evidence item with all metadata
      const evidenceItem = {
        ...evidenceMetadata,
        file: pendingFile.file,
        previewUrl: pendingFile.previewUrl,
        dimensions: pendingFile.dimensions,
        uploadStatus: 'completed',
        hasMetadata: true,
        // Add gallery-specific properties
        thumbnail: pendingFile.previewUrl,
        url: pendingFile.previewUrl,
        isUploaded: true,
        dateAdded: new Date().toISOString()
      };

      // Add to uploaded files
      setUploadedFiles(prev => [...prev, evidenceItem]);

      // Remove from pending files
      setPendingFiles(prev => prev.filter(f => f.id !== pendingFile.id));

      // Notify parent component to add to gallery
      if (onEvidenceUploaded) {
        onEvidenceUploaded(evidenceItem);
      }

      console.log('Generated comprehensive metadata:', evidenceItem);

    } catch (error) {
      console.error('Error generating metadata:', error);
    } finally {
      setIsGeneratingMetadata(false);
    }
  };

  const handleGenerateAllMetadata = async () => {
    setIsGeneratingMetadata(true);

    try {
      for (const pendingFile of pendingFiles) {
        await handleGenerateMetadata(pendingFile);
        // Small delay between processing files
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error generating all metadata:', error);
    } finally {
      setIsGeneratingMetadata(false);
    }
  };

  const removeUploadedFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const removePendingFile = (fileId) => {
    setPendingFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove && fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter(file => file.id !== fileId);
    });
  };

  if (!isExpanded) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full p-4"
          size="lg"
        >
          <Upload className="h-6 w-6 mr-2" />
          Upload Evidence
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="bg-card border border-border rounded-lg shadow-xl w-96 max-h-[600px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <div className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Upload Evidence</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {/* User Status */}
          {user ? (
            <div className="flex items-center space-x-2 text-sm text-text-secondary bg-success/10 p-2 rounded">
              <Check className="h-4 w-4 text-success" />
              <span>Signed in as {user.email}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-sm text-warning bg-warning/10 p-2 rounded">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span>Sign in required to upload evidence</span>
            </div>
          )}

          {/* Sign In Form */}
          {!user && showSignIn && (
            <form onSubmit={handleSignIn} className="space-y-3 border border-border rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <LogIn className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Quick Sign In</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={signInData.email}
                onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded text-sm"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signInData.password}
                onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded text-sm"
                required
              />
              <div className="flex space-x-2">
                <Button type="submit" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSignIn(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              user 
                ? 'border-primary/50 hover:border-primary cursor-pointer' 
                : 'border-muted cursor-not-allowed opacity-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={user ? handleDrop : undefined}
            onClick={user ? () => fileInputRef.current?.click() : () => setShowSignIn(true)}
          >
            <FileImage className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground mb-1">
              {user ? 'Drop images here or click to browse' : 'Sign in to upload evidence'}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, GIF, WebP
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={!user}
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="flex items-center space-x-2 text-sm text-primary">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Processing uploads...</span>
            </div>
          )}

          {/* Metadata Generation Progress */}
          {isGeneratingMetadata && (
            <div className="flex items-center space-x-2 text-sm text-primary">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Generating metadata...</span>
            </div>
          )}

          {/* Pending Files - Awaiting Metadata Generation */}
          {pendingFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">Uploaded Files</h4>
                {pendingFiles.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateAllMetadata}
                    disabled={isGeneratingMetadata}
                    className="text-xs"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Generate All
                  </Button>
                )}
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {pendingFiles.map((file) => (
                  <div key={file.id} className="border border-border rounded-lg p-3 bg-muted/30">
                    <div className="flex items-start space-x-3">
                      {/* File Preview */}
                      <div className="flex-shrink-0">
                        <img
                          src={file.previewUrl}
                          alt={file.fileName}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.fileName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                          {file.dimensions && ` • ${file.dimensions.width}×${file.dimensions.height}`}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleGenerateMetadata(file)}
                            disabled={isGeneratingMetadata}
                            className="text-xs"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Generate Metadata
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePendingFile(file.id)}
                            className="text-xs text-destructive hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Evidence Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Evidence with Metadata</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.slice(-5).map((file) => (
                  <div key={file.id} className="border border-success/30 rounded-lg p-2 bg-success/5">
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <img
                          src={file.previewUrl}
                          alt={file.title}
                          className="w-8 h-8 object-cover rounded border"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-success">
                          <Check className="h-3 w-3" />
                          <span>Metadata Generated</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            // This would open the evidence in the main view
                            if (onEvidenceUploaded) {
                              onEvidenceUploaded(file);
                            }
                          }}
                          className="h-6 w-6"
                          title="View Evidence"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeUploadedFile(file.id)}
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          title="Remove"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {user && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidenceUploader;
