
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tournament } from "@/types";
import { Clock } from "lucide-react";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const getRegistrationEndDate = () => {
    const startDate = new Date(tournament.startDate);
    const regEndDate = new Date(startDate);
    regEndDate.setDate(startDate.getDate() - 1); // Registration closes 1 day before event
    return regEndDate;
  };
  
  const getTimeLeft = () => {
    const now = new Date().getTime();
    const endDate = getRegistrationEndDate().getTime();
    const difference = endDate - now;
    
    if (difference <= 0) return null;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h left`;
    } else if (hours > 0) {
      return `${hours}h left`;
    } else {
      return `Closing soon`;
    }
  };
  
  const timeLeft = tournament.status === "upcoming" ? getTimeLeft() : null;
  
  return (
    <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300 overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img
          src={tournament.image}
          alt={tournament.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-2 right-2">
          {tournament.status === "upcoming" && (
            <Badge className="bg-esports-blue text-white">Upcoming</Badge>
          )}
          {tournament.status === "ongoing" && (
            <Badge className="bg-green-500 text-white">Ongoing</Badge>
          )}
          {tournament.status === "completed" && (
            <Badge className="bg-gray-600 text-white">Completed</Badge>
          )}
        </div>
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
        
        {timeLeft && (
          <div className="absolute bottom-2 right-2">
            <div className="bg-black/70 text-xs px-2 py-1 rounded flex items-center gap-1">
              <Clock className="h-3 w-3 text-esports-purple" />
              <span className="text-white">{timeLeft}</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {tournament.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
          <div>
            {tournament.status !== "completed" 
              ? `Starts ${new Date(tournament.startDate).toLocaleDateString()}`
              : `Ended ${new Date(tournament.endDate).toLocaleDateString()}`
            }
          </div>
          <div>{tournament.format}</div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Prize Pool</p>
            <p className="text-esports-yellow font-semibold">
              {tournament.prizePool}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Participants</p>
            <p className="text-white">
              {tournament.participantsCount}/{tournament.maxParticipants}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Region</p>
            <p className="text-white">{tournament.region}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          className={`w-full ${
            tournament.status === "upcoming"
              ? "bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90"
              : tournament.status === "ongoing"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <Link to={`/tournaments/${tournament.id}`}>
            {tournament.status === "upcoming"
              ? "View Details"
              : tournament.status === "ongoing"
              ? "View Matches"
              : "View Results"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TournamentCard;
