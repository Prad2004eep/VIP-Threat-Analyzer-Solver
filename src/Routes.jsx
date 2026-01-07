import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import EvidenceCollectionInterface from './pages/evidence-collection-interface';
import ThreatIntelligenceCommandCenter from './pages/threat-intelligence-command-center';
import CampaignAnalysisDashboard from './pages/campaign-analysis-dashboard';
import ExecutiveRiskSummary from './pages/executive-risk-summary';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import LandingPage from './pages/LandingPage.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Start with Landing page as default */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes - require authentication */}
        <Route path="/evidence-collection-interface" element={
          <ProtectedRoute>
            <EvidenceCollectionInterface />
          </ProtectedRoute>
        } />
        <Route path="/threat-intelligence-command-center" element={
          <ProtectedRoute>
            <ThreatIntelligenceCommandCenter />
          </ProtectedRoute>
        } />
        <Route path="/campaign-analysis-dashboard" element={
          <ProtectedRoute>
            <CampaignAnalysisDashboard />
          </ProtectedRoute>
        } />
        <Route path="/executive-risk-summary" element={
          <ProtectedRoute>
            <ExecutiveRiskSummary />
          </ProtectedRoute>
        } />

        {/* Public Auth Routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;