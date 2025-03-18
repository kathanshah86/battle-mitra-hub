
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface RequireAdminProps {
  children: ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { user, isAdmin, loading } = useAuth();
  
  // If still loading auth state, show nothing
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-esports-darker">
      <div className="animate-pulse text-esports-purple font-orbitron">Authenticating...</div>
    </div>;
  }
  
  // If not logged in, redirect to login
  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please log in to access the admin panel",
      variant: "destructive",
    });
    return <Navigate to="/auth" replace />;
  }
  
  // If logged in but not admin, redirect to home with error
  if (!isAdmin) {
    toast({
      title: "Access denied",
      description: "You don't have permission to access the admin panel",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }
  
  // User is logged in and is an admin
  return <>{children}</>;
};

export default RequireAdmin;
