
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Trophy, LayoutDashboard, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UserMenu = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  if (!user) return null;
  
  const userInitials = user.email 
    ? user.email.substring(0, 2).toUpperCase() 
    : 'U';
    
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging you out",
        variant: "destructive",
      });
    }
  };
    
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-primary/10">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Admin Panel link - moved to top of menu for admin users */}
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard" className="cursor-pointer flex w-full items-center bg-esports-purple/10 text-esports-purple font-medium" onClick={() => setIsOpen(false)}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex w-full items-center" onClick={() => setIsOpen(false)}>
            <UserCircle className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/my-tournaments" className="cursor-pointer flex w-full items-center" onClick={() => setIsOpen(false)}>
            <Trophy className="mr-2 h-4 w-4" />
            My Tournaments
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer flex w-full items-center" onClick={() => setIsOpen(false)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
