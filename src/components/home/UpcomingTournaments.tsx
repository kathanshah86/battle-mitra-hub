
import { Link } from "react-router-dom";
import { ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tournaments } from "@/data/mockData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UpcomingTournaments = () => {
  // Filter upcoming tournaments
  const upcomingTournaments = tournaments.filter(
    (tournament) => tournament.status === "upcoming"
  ).slice(0, 4); // Limit to 4 tournaments

  return (
    <section className="py-16 bg-esports-dark">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Trophy className="text-esports-purple h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">Upcoming Tournaments</h2>
          </div>
          <Link
            to="/tournaments"
            className="flex items-center text-esports-purple hover:text-esports-purple/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingTournaments.map((tournament) => (
            <Card 
              key={tournament.id} 
              className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={tournament.image}
                  alt={tournament.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <Badge className="bg-esports-purple text-white">{tournament.gameType}</Badge>
                  {tournament.entryFee ? (
                    <Badge variant="outline" className="bg-black/50 border-gray-600 text-white">
                      Entry: {tournament.entryFee}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-black/50 border-green-600 text-green-400">
                      Free Entry
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold line-clamp-1">{tournament.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                  <div>Starts {new Date(tournament.startDate).toLocaleDateString()}</div>
                  <div>{tournament.format}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Prize Pool</p>
                    <p className="text-esports-yellow font-semibold">{tournament.prizePool}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Participants</p>
                    <p className="text-white">{tournament.participantsCount}/{tournament.maxParticipants}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90">
                  <Link to={`/tournaments/${tournament.id}`}>Register Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTournaments;
