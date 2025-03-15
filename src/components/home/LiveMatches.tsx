
import { Link } from "react-router-dom";
import { Signal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { liveMatches } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LiveMatches = () => {
  // Filter live matches
  const currentLiveMatches = liveMatches.filter(
    (match) => match.status === "live"
  );

  return (
    <section className="py-16 bg-gradient-to-b from-esports-dark to-esports-darker">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Signal className="text-red-500 h-6 w-6 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">Live Matches</h2>
          </div>
          <Link
            to="/live"
            className="flex items-center text-esports-purple hover:text-esports-purple/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentLiveMatches.length > 0 ? (
            currentLiveMatches.map((match) => (
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
                        <a href={match.stream} target="_blank" rel="noopener noreferrer">
                          Watch Stream
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400 mb-4">No live matches currently. Check back later!</p>
              <Button asChild variant="outline">
                <Link to="/tournaments">Browse Upcoming Tournaments</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
