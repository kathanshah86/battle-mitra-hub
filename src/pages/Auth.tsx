
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

type AuthFormValues = {
  email: string;
  password: string;
};

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'login';
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const loginForm = useForm<AuthFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const registerForm = useForm<AuthFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // If already logged in, redirect appropriately
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  // If already logged in, don't render the auth page
  if (user) {
    return null;
  }

  const handleLogin = async (data: AuthFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      await signIn(data.email, data.password);
      
      // Admin login checks are now handled in the useAuth hook and useEffect above
      toast({
        title: "Login successful",
        description: "You are now logged in",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || "Login failed. Please check your credentials.");
      toast({
        title: "Login failed",
        description: "Please check your email and password and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password);
      
      toast({
        title: "Registration successful",
        description: "Please check your email for a confirmation link.",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-background/80 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      {...loginForm.register('email', { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Button type="button" variant="link" className="px-0" onClick={() => navigate('/reset-password')}>
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...loginForm.register('password', { required: true })}
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(handleRegister)}>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>
                    Create a new account to join Battle Mitra
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      {...registerForm.register('email', { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...registerForm.register('password', { required: true, minLength: 6 })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
