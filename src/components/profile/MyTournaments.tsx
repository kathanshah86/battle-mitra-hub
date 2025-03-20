
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Medal, Users } from "lucide-react";

interface MyTournamentsProps {
  userId: string;
}

const MyTournaments = ({ userId }: MyTournamentsProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch tournaments from database
    // For demo, we'll use mock data
    const fetchTournaments = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Generate mock tournament data
        const mockTournaments = [
          {
            id: "t1",
            title: "BGMI Pro League",
            status: "active",
            startDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
            prizePool: "₹10,000",
            entryFee: "₹50",
            registered: true,
            game: "BGMI",
            format: "Squad",
            position: 5
          },
          {
            id: "t2",
            title: "Free Fire Cup",
            status: "upcoming",
            startDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
            prizePool: "₹5,000",
            entryFee: "Free",
            registered: true,
            game: "Free Fire",
            format: "Duo",
            position: null
          },
          {
            id: "t3",
            title: "COD Mobile Championship",
            status: "past",
            startDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
            prizePool: "₹15,000",
            entryFee: "₹100",
            registered: true,
            game: "COD Mobile",
            format: "Solo",
            position: 1
          },
          {
            id: "t4",
            title: "Valorant Invitational",
            status: "upcoming",
            startDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
            prizePool: "₹25,000",
            entryFee: "₹200",
            registered: true,
            game: "Valorant",
            format: "Team",
            position: null
          },
          {
            id: "t5",
            title: "PUBG Mobile Open",
            status: "past",
            startDate: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
            prizePool: "₹8,000",
            entryFee: "₹75",
            registered: true,
            game: "PUBG Mobile",
            format: "Squad",
            position: 3
          }
        ];
        
        setTournaments(mockTournaments);
        setLoading(false);
      }, 1000);
    };
    
    fetchTournaments();
  }, [userId]);
  
  // Filter tournaments based on the active tab
  const filteredTournaments = tournaments.filter(tournament => {
    if (activeTab === "active") return tournament.status === "active";
    if (activeTab === "upcoming") return tournament.status === "upcoming";
    if (activeTab === "past") return tournament.status === "past";
    return true;
  });
  
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Button 
          variant={activeTab === "upcoming" ? "default" : "outline"} 
          onClick={() => setActiveTab("upcoming")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Upcoming
        </Button>
        <Button 
          variant={activeTab === "active" ? "default" : "outline"} 
          onClick={() => setActiveTab("active")}
        >
          <Trophy className="mr-2 h-4 w-4" />
          Active
        </Button>
        <Button 
          variant={activeTab === "past" ? "default" : "outline"} 
          onClick={() => setActiveTab("past")}
        >
          <Medal className="mr-2 h-4 w-4" />
          Past
        </Button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredTournaments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <div className="mb-4">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tournaments found</h3>
                <p>You haven't registered for any {activeTab} tournaments yet.</p>
                <Button className="mt-4" asChild>
                  <Link to="/tournaments">Browse Tournaments</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredTournaments.map(tournament => (
                <Card key={tournament.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold mb-2">{tournament.title}</h3>
                        {tournament.status === "past" && tournament.position && (
                          <Badge 
                            variant={tournament.position === 1 ? "default" : "secondary"}
                            className={tournament.position === 1 ? "bg-amber-500" : ""}
                          >
                            {tournament.position === 1 ? "Winner" : `Position #${tournament.position}`}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1 text-amber-500" />
                          {tournament.prizePool}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-blue-500" />
                          {tournament.format}
                        </div>
                        <div>
                          {tournament.status === "upcoming" ? (
                            <span className="text-green-600">Starts {new Date(tournament.startDate).toLocaleDateString()}</span>
                          ) : tournament.status === "active" ? (
                            <span className="text-blue-600">In Progress</span>
                          ) : (
                            <span className="text-gray-500">Ended {new Date(tournament.startDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end p-4 bg-gray-50 border-t md:border-t-0 md:border-l">
                      <Button asChild>
                        <Link to={`/tournaments/${tournament.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTournaments;
