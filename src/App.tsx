
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useSupabaseInit } from '@/hooks/useSupabaseInit';

// Import Pages
import Index from '@/pages/Index';
import Tournaments from '@/pages/Tournaments';
import TournamentDetail from '@/pages/TournamentDetail';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Live from '@/pages/Live';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Leaderboards from '@/pages/Leaderboards';
import Support from '@/pages/Support';
import Community from '@/pages/Community';
import Profile from '@/pages/Profile';
import Wallet from '@/pages/Wallet';

// Import Admin Pages
import AdminLayout from '@/pages/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Payments from '@/pages/admin/Payments';
import Security from '@/pages/admin/Security';
import Settings from '@/pages/admin/Settings';
import AdminTournaments from '@/pages/admin/Tournaments';
import Users from '@/pages/admin/Users';

// Import Auth Provider
import { AuthProvider } from '@/hooks/useAuth';
import RequireAdmin from '@/components/admin/RequireAdmin';

// Import Layout Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import './App.css';

const App = () => {
  const { initialized, initializing } = useSupabaseInit();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-esports-dark text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-transparent border-esports-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Checking database connection...</p>
        </div>
      </div>
    );
  }

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-esports-dark text-white">
        <div className="text-center max-w-md p-6 bg-esports-card rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4">Database Setup Required</h1>
          <p className="mb-6">
            The required database tables haven't been created yet. Please run the SQL setup script in the Supabase dashboard.
          </p>
          <div className="bg-gray-800 p-4 rounded text-left mb-6 overflow-auto max-h-60">
            <pre className="text-xs text-gray-300">
              <code>
                -- Create profiles table, chat_rooms, chat_messages, etc.
                -- See the README or contact developer for the full SQL setup
              </code>
            </pre>
          </div>
          <p className="text-sm text-gray-400">
            Contact the administrator if you need assistance.
          </p>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/tournaments/:id" element={<TournamentDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/live" element={<Live />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/support" element={<Support />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />

              {/* Admin Routes */}
              <Route element={<RequireAdmin />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="tournaments" element={<AdminTournaments />} />
                  <Route path="users" element={<Users />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="security" element={<Security />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  );
};

export default App;
