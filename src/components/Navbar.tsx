
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search, Bell } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-esports-darker/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/b336d175-874a-4fce-a78d-6cb2d1f49ecc.png" 
            alt="Battle Mitra Logo" 
            className="h-14 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/tournaments" className="text-gray-300 hover:text-white transition-colors">
            Tournaments
          </Link>
          <Link to="/leaderboards" className="text-gray-300 hover:text-white transition-colors">
            Leaderboards
          </Link>
          <Link to="/live" className="text-gray-300 hover:text-white transition-colors">
            Live Matches
          </Link>
          <Link to="/news" className="text-gray-300 hover:text-white transition-colors">
            News
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-gray-300 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <Button variant="ghost" className="text-gray-300 hover:text-white" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-esports-darker border-b border-gray-800 animate-slide-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/tournaments" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tournaments
            </Link>
            <Link 
              to="/leaderboards" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboards
            </Link>
            <Link 
              to="/live" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Matches
            </Link>
            <Link 
              to="/news" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>
            <div className="flex space-x-4 pt-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity" asChild>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
