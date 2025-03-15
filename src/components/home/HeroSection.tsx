
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-esports-darker overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-esports-purple/20 to-esports-blue/20 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=60')] bg-cover bg-center opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-esports-purple">
            Compete. Dominate. <span className="text-esports-purple">Conquer.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the ultimate esports tournament platform. Participate in competitions, climb the leaderboards, and win amazing prizes.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="text-lg h-12 px-8 bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity shadow-lg">
              <Link to="/tournaments">Join a Tournament Now!</Link>
            </Button>
            <Button asChild variant="outline" className="text-lg h-12 px-8 border-esports-purple text-white hover:bg-esports-purple/10">
              <Link to="/browse">Browse Tournaments</Link>
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="bg-esports-card rounded-lg p-4 border border-gray-800">
              <p className="text-2xl md:text-3xl font-bold text-esports-purple">500+</p>
              <p className="text-gray-400 text-sm">Tournaments</p>
            </div>
            <div className="bg-esports-card rounded-lg p-4 border border-gray-800">
              <p className="text-2xl md:text-3xl font-bold text-esports-blue">50k+</p>
              <p className="text-gray-400 text-sm">Players</p>
            </div>
            <div className="bg-esports-card rounded-lg p-4 border border-gray-800">
              <p className="text-2xl md:text-3xl font-bold text-esports-green">₹1M+</p>
              <p className="text-gray-400 text-sm">Prize Pool</p>
            </div>
            <div className="bg-esports-card rounded-lg p-4 border border-gray-800">
              <p className="text-2xl md:text-3xl font-bold text-esports-orange">20+</p>
              <p className="text-gray-400 text-sm">Games</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-esports-dark to-transparent"></div>
    </div>
  );
};

export default HeroSection;
