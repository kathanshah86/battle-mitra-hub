
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Tournaments from './pages/Tournaments';
import TournamentDetail from './pages/TournamentDetail';
import Live from './pages/Live';
import Leaderboards from './pages/Leaderboards';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Support from './pages/Support';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Wallet from './pages/Wallet';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import AdminTournaments from './pages/admin/Tournaments';
import Users from './pages/admin/Users';
import Payments from './pages/admin/Payments';
import Settings from './pages/admin/Settings';
import Security from './pages/admin/Security';
import AdminLayout from './pages/admin/AdminLayout';

// Components
import RequireAdmin from './components/admin/RequireAdmin';
import TournamentDetails from './components/tournaments/TournamentDetails';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:id" element={<TournamentDetails />} />
        <Route path="/live" element={<Live />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile/:id?" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/wallet" element={<Wallet />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }>
          <Route index element={<Dashboard />} />
          <Route path="tournaments" element={<AdminTournaments />} />
          <Route path="users" element={<Users />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="security" element={<Security />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
