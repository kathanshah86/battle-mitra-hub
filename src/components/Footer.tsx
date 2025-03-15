
import { Link } from 'react-router-dom';
import { Trophy, Facebook, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-esports-darker pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-esports-purple" />
              <span className="text-xl font-orbitron font-bold text-white">
                Battle<span className="text-esports-purple">Mitra</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              The ultimate destination for esports tournaments, competitive gaming, and community building.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitch className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tournaments" className="text-gray-400 hover:text-white transition-colors">Tournaments</Link>
              </li>
              <li>
                <Link to="/leaderboards" className="text-gray-400 hover:text-white transition-colors">Leaderboards</Link>
              </li>
              <li>
                <Link to="/live" className="text-gray-400 hover:text-white transition-colors">Live Matches</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">News & Updates</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Games</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games/fps" className="text-gray-400 hover:text-white transition-colors">FPS</Link>
              </li>
              <li>
                <Link to="/games/battle-royale" className="text-gray-400 hover:text-white transition-colors">Battle Royale</Link>
              </li>
              <li>
                <Link to="/games/moba" className="text-gray-400 hover:text-white transition-colors">MOBA</Link>
              </li>
              <li>
                <Link to="/games/sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Battle Mitra. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
