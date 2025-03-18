
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Wallet, 
  Settings, 
  Shield, 
  LogOut, 
  Menu, 
  X,
  Sun,
  Moon,
  Bell
} from 'lucide-react';

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/admin/tournaments', icon: <Trophy className="h-5 w-5" />, label: 'Tournaments' },
    { path: '/admin/users', icon: <Users className="h-5 w-5" />, label: 'Users' },
    { path: '/admin/payments', icon: <Wallet className="h-5 w-5" />, label: 'Payments' },
    { path: '/admin/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
    { path: '/admin/security', icon: <Shield className="h-5 w-5" />, label: 'Security' },
  ];
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would toggle the actual dark/light mode
  };

  return (
    <div className="min-h-screen bg-esports-darker text-white flex">
      {/* Sidebar */}
      <aside 
        className={`bg-esports-card fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 border-r border-gray-800`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 flex items-center justify-between border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/b336d175-874a-4fce-a78d-6cb2d1f49ecc.png" 
                alt="Battle Mitra Logo" 
                className="h-10 w-auto" 
              />
              <span className="font-orbitron text-xl">Admin Panel</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Nav Links */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-esports-purple text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <span className="ml-3 text-sm text-gray-300">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-esports-card h-16 border-b border-gray-800 flex items-center px-4 md:px-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {navItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-esports-red rounded-full"></span>
              </Button>
              
              <div className="text-right">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-esports-darker to-esports-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
