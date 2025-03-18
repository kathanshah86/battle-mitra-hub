
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type UserRole = 'admin' | 'user';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string, code?: string) => Promise<void>;
  signOut: () => Promise<void>;
  setupTwoFactor: () => Promise<string>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
};

// List of admin emails - in a real application, this would be stored in the database
const ADMIN_EMAILS = ['admin@battlemitra.com'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Determine if user is admin
  const checkIfAdmin = (email: string | undefined): boolean => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const isAdmin = checkIfAdmin(session.user.email);
        setUserRole(isAdmin ? 'admin' : 'user');
      }
      
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const isAdmin = checkIfAdmin(session.user.email);
          setUserRole(isAdmin ? 'admin' : 'user');
        } else {
          setUserRole('user');
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Please check your email for a confirmation link",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signIn = async (email: string, password: string, code?: string) => {
    try {
      // Check if 2FA is required for admins
      const isAdminLogin = checkIfAdmin(email);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // For admin logins, verify 2FA if code is provided
      if (isAdminLogin && code) {
        const verified = await verifyTwoFactor(code);
        if (!verified) {
          await signOut();
          throw new Error("Invalid 2FA code");
        }
      }
      
      toast({
        title: "Welcome back",
        description: isAdminLogin ? "You've signed in as an administrator" : "You have successfully signed in",
      });
      
      if (isAdminLogin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUserRole('user');
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Mock 2FA functions (in a real app, these would use actual 2FA libraries)
  const setupTwoFactor = async (): Promise<string> => {
    // This would normally generate a QR code and setup actual 2FA
    return "MOCK2FASECRET";
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    // For demonstration, any 6-digit code is valid
    return code.length === 6 && /^\d+$/.test(code);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        loading,
        isAdmin: userRole === 'admin',
        signUp,
        signIn,
        signOut,
        setupTwoFactor,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
