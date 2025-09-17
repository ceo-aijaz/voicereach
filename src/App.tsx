import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import Analytics from "./pages/Analytics";
import Onboarding from "./pages/Onboarding";
import Pricing from "./pages/PricingPage";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import FacebookConnect from "./pages/FacebookConnect";
import Campaigns from "./pages/Campaigns";
import CampaignBuilder from "./pages/CampaignBuilder";
import VoiceCloning from "./pages/VoiceCloning";
import Settings from "./pages/Settings";
import Upgrade from "./pages/Upgrade";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Affiliate from "./pages/Affiliate";
import Blogs from "./pages/Blogs";
import Documentation from "./pages/Documentation";
import Tutorials from "./pages/Tutorials";
import Support from "./pages/Support";
import Status from "./pages/Status";
import Changelog from "./pages/Changelog";
import Career from "./pages/Career";
import Press from "./pages/Press";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login/admin" element={<AdminAuth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/support" element={<Support />} />
              <Route path="/status" element={<Status />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/career" element={<Career />} />
              <Route path="/press" element={<Press />} />
              
              {/* Protected Routes */}
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
              <Route path="/facebook" element={<ProtectedRoute><FacebookConnect /></ProtectedRoute>} />
              <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
              <Route path="/campaign-builder" element={<ProtectedRoute><CampaignBuilder /></ProtectedRoute>} />
              <Route path="/voice" element={<ProtectedRoute><VoiceCloning /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;