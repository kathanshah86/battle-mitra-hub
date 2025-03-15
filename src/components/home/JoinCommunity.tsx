
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JoinCommunity = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-esports-purple/20 to-esports-blue/20 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579124443347-2fff3057596e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=60')] bg-cover bg-center opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Join the Battle Mitra Community
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of an active community of gamers, compete in tournaments, win prizes, and make friends along the way.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-esports-card bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
              <div className="w-12 h-12 bg-esports-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-esports-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Gamers</h3>
              <p className="text-gray-400">
                Find teammates, make friends, and build your network in the gaming community.
              </p>
            </div>
            
            <div className="bg-esports-card bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
              <div className="w-12 h-12 bg-esports-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-esports-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Win Prizes</h3>
              <p className="text-gray-400">
                Compete in tournaments with cash prizes, gaming gear, and more exclusive rewards.
              </p>
            </div>
            
            <div className="bg-esports-card bg-opacity-50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
              <div className="w-12 h-12 bg-esports-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-esports-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Improve Your Skills</h3>
              <p className="text-gray-400">
                Compete against the best and learn from top players to enhance your gameplay.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="text-lg h-12 px-8 bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity shadow-lg">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button asChild variant="outline" className="text-lg h-12 px-8 border-esports-purple text-white hover:bg-esports-purple/10">
              <Link to="/tournaments">Browse Tournaments</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
