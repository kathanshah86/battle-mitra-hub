
import { useEffect } from "react";
import { liveMatches } from "@/data/mockData";
import { Signal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Live = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Group matches by status
  const liveMatchesList = liveMatches.filter(match => match.status === "live");
  const upcomingMatchesList = liveMatches.filter(match => match.status === "upcoming");
  const completedMatchesList = liveMatches.filter(match => match.status === "completed");

  return (
    <div className="min-h-screen bg-esports-dark text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-6 flex items-center gap-2">
          <Signal className="text-red-500 h-6 w-6" />
          Live Matches
        </h1>

        {/* Live matches section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Signal className="text-red-500 h-5 w-5 mr-2 animate-pulse" />
            Currently Live
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveMatchesList.length > 0 ? (
              liveMatchesList.map((match) => (
                <Card 
                  key={match.id} 
                  className="bg-esports-card border-gray-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 text-white animate-pulse flex items-center gap-1">
                      <Signal className="h-3 w-3" /> LIVE
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-sm">{match.tournament}</p>
                      <p className="text-xs text-gray-500">{new Date(match.startTime).toLocaleTimeString()}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                          <img
                            src={match.teamA.logo}
                            alt={match.teamA.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-medium truncate max-w-[120px] mx-auto">{match.teamA.name}</p>
                      </div>
                      
                      <div className="text-center px-4">
                        <div className="text-2xl font-bold font-orbitron mb-2">
                          <span className="text-white">{match.teamA.score}</span>
                          <span className="text-gray-500 mx-1">:</span>
                          <span className="text-white">{match.teamB.score}</span>
                        </div>
                        <Badge className="bg-gray-800 text-white">{match.game}</Badge>
                      </div>
                      
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                          <img
                            src={match.teamB.logo}
                            alt={match.teamB.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-medium truncate max-w-[120px] mx-auto">{match.teamB.name}</p>
                      </div>
                    </div>
                    
                    {match.stream && (
                      <div className="mt-6 text-center">
                        <Button asChild className="bg-red-500 hover:bg-red-600">
                          <a href={match.stream} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            Watch Stream <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">No live matches currently. Check back later!</p>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming matches section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Upcoming Matches</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingMatchesList.length > 0 ? (
              upcomingMatchesList.map((match) => (
                <Card 
                  key={match.id} 
                  className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-sm">{match.tournament}</p>
                      <p className="text-xs text-gray-500">{new Date(match.startTime).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                          <img
                            src={match.teamA.logo}
                            alt={match.teamA.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-medium truncate max-w-[120px] mx-auto">{match.teamA.name}</p>
                      </div>
                      
                      <div className="text-center px-4">
                        <div className="text-xl font-semibold font-orbitron mb-2">VS</div>
                        <Badge className="bg-gray-800 text-white">{match.game}</Badge>
                      </div>
                      
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                          <img
                            src={match.teamB.logo}
                            alt={match.teamB.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-medium truncate max-w-[120px] mx-auto">{match.teamB.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">No upcoming matches scheduled.</p>
              </div>
            )}
          </div>
        </section>

        {/* Completed matches section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Completed</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedMatchesList.length > 0 ? (
              completedMatchesList.map((match) => (
                <Card 
                  key={match.id} 
                  className="bg-esports-card border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-sm">{match.tournament}</p>
                      <p className="text-xs text-gray-500">{new Date(match.startTime).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                          <img
                            src={match.teamA.logo}
                            alt={match.teamA.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-medium truncate max-w-[120px] mx-auto">{match.teamA.name}</p>
                      </div>
                      
                      <div className="text-center px-4">
                        <div className="text-2xl font-bold font-orbitron mb-2">
                          <span className={`${match.teamA.score > match.teamB.score ? "text-green-500" : "text-white"}`}>{match.teamA.score}</span>
                          <span className="text-gray-500 mx-1">:</span>
                          <span className={`${match.teamB.score > match.teamA.score ? "text-green-500" : "text-white"}`}>{match.teamB.score}</span>
                        </div>
                        <Badge className="bg-gray-800 text-white">{match.game}</Badge>
                      </div>
                      
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                          <img
                            src={match.teamB.logo}
                            alt={match.teamB.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-medium truncate max-w-[120px] mx-auto">{match.teamB.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-gray-800/50 rounded-lg">
                <p className="text-gray-400">No completed matches yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Live;
