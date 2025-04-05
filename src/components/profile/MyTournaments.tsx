
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { tournaments } from "@/data/mockData";
import { tournamentService } from "@/services/tournamentService";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface MyTournamentsProps {
  userId?: string;
}

const MyTournaments = ({ userId }: MyTournamentsProps) => {
  const { user } = useAuth();
  const [registeredTournaments, setRegisteredTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const effectiveUserId = userId || user?.id;
      if (!effectiveUserId) return;
      
      try {
        setLoading(true);
        
        // Fetch regular tournament registrations
        const { data: regularRegistrations, error } = await supabase
          .from('tournament_registrations')
          .select('tournament_id, registration_date')
          .eq('user_id', effectiveUserId);
          
        if (error) throw error;
        
        // Fetch BGMI tournament registrations
        const bgmiRegistrations = await tournamentService.getUserRegistrations(effectiveUserId);
        
        // Combine registrations into one format
        const allRegistrationIds = [
          ...(regularRegistrations || []).map(reg => reg.tournament_id),
          ...(bgmiRegistrations || []).map(reg => reg.tournament_id)
        ];
        
        // Match with tournament details
        const matchedTournaments = tournaments
          .filter(tournament => allRegistrationIds.includes(tournament.id))
          .map(tournament => {
            const regularReg = regularRegistrations?.find(reg => reg.tournament_id === tournament.id);
            const bgmiReg = bgmiRegistrations?.find(reg => reg.tournament_id === tournament.id);
            
            return {
              ...tournament,
              registrationDate: regularReg?.registration_date || bgmiReg?.registration_date || new Date().toISOString()
            };
          });
          
        setRegisteredTournaments(matchedTournaments);
      } catch (error) {
        console.error("Error fetching tournament registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [userId, user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Tournaments</CardTitle>
          <CardDescription>Tournaments you've registered for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-esports-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (registeredTournaments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Tournaments</CardTitle>
          <CardDescription>Tournaments you've registered for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Trophy className="w-12 h-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Tournaments Yet</h3>
            <p className="text-gray-500 mb-6">You haven't registered for any tournaments yet.</p>
            <Button asChild>
              <Link to="/tournaments">Browse Tournaments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tournaments</CardTitle>
        <CardDescription>Tournaments you've registered for</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registeredTournaments.map((tournament) => (
            <div key={tournament.id} className="flex flex-col md:flex-row gap-4 items-start p-4 bg-esports-card rounded-lg border border-gray-800">
              <div className="h-24 w-32 rounded overflow-hidden flex-shrink-0">
                <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-esports-purple">{tournament.gameType}</Badge>
                  {tournament.status === "upcoming" && (
                    <Badge className="bg-esports-blue">Upcoming</Badge>
                  )}
                  {tournament.status === "ongoing" && (
                    <Badge className="bg-green-500">Live</Badge>
                  )}
                  {tournament.status === "completed" && (
                    <Badge className="bg-gray-500">Completed</Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{tournament.title}</h3>
                
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-2 text-sm text-gray-400">
                  Registered on {new Date(tournament.registrationDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTournaments;
