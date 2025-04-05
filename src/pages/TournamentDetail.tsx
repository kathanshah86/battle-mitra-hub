import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Trophy, Users, AlertCircle, Clock, MapPin, Check, Users2, Flame, Zap } from "lucide-react";
import { tournaments } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useBackendServices } from "@/hooks/use-backend-services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WalletPaymentDialog from "@/components/wallet/WalletPaymentDialog";
import CountdownTimer from "@/components/tournaments/CountdownTimer";
import { tournamentService } from "@/services/tournamentService";

const TournamentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createPayment } = useBackendServices();
  
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showGameIdDialog, setShowGameIdDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [gameUsername, setGameUsername] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const getRegistrationEndDate = () => {
    if (!tournament) return new Date();
    const startDate = new Date(tournament.startDate);
    const regEndDate = new Date(startDate);
    regEndDate.setDate(startDate.getDate() - 1); // Registration closes 1 day before event
    return regEndDate;
  };
  
  const isRegistrationEnding = () => {
    if (!tournament) return false;
    const now = new Date();
    const endDate = getRegistrationEndDate();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 1 && diffDays > 0;
  };
  
  useEffect(() => {
    const foundTournament = tournaments.find(t => t.id === id);
    
    if (foundTournament) {
      setTournament(foundTournament);
    } else {
      toast({
        title: "Tournament not found",
        description: "The requested tournament could not be found.",
        variant: "destructive"
      });
      navigate("/tournaments");
    }
    
    setLoading(false);
    
    if (user) {
      checkRegistrationStatus();
    }
  }, [id, user]);
  
  const checkRegistrationStatus = async () => {
    if (!id || !user?.id) return;
    
    try {
      console.log("Checking registration status for tournament:", id, "user:", user.id);
      const isRegistered = await tournamentService.checkRegistration(id, user.id);
      setIsRegistered(isRegistered);
      console.log("Registration status:", isRegistered);
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };
  
  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to register for tournaments.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    
    if (isRegistered) {
      toast({
        title: "Already registered",
        description: "You are already registered for this tournament.",
      });
      return;
    }
    
    if (tournament.entryFee) {
      setShowGameIdDialog(true);
    } else {
      setShowGameIdDialog(true);
    }
  };
  
  const initiatePayment = async () => {
    try {
      setShowGameIdDialog(false);
      setShowPaymentDialog(true);
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive"
      });
    }
  };
  
  const handlePaymentConfirm = async () => {
    setShowPaymentDialog(false);
    handleCompleteRegistration();
  };
  
  const handleCompleteRegistration = async () => {
    if (!id || !user?.id || !gameUsername.trim()) {
      toast({
        title: "Registration error",
        description: "Missing required information to complete registration.",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitLoading(true);
    
    try {
      await tournamentService.registerForTournament(id, user.id, gameUsername);
      setShowGameIdDialog(false);
      setIsRegistered(true);
      
      toast({
        title: "Registration successful!",
        description: `You have successfully registered for ${tournament?.title || 'the tournament'}!`,
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Failed to complete registration",
        variant: "destructive"
      });
    } finally {
      setSubmitLoading(false);
    }
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    
    if (paymentSuccess === 'true') {
      setShowGameIdDialog(true);
      
      window.history.replaceState({}, document.title, `/tournaments/${id}`);
    }
  }, []);
  
  const handleGameIdSubmit = () => {
    if (!gameUsername.trim()) {
      toast({
        title: "Game username required",
        description: "Please enter your in-game username to complete registration.",
        variant: "destructive"
      });
      return;
    }
    
    if (tournament.entryFee) {
      initiatePayment();
    } else {
      handleCompleteRegistration();
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-esports-dark flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-700 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!tournament) {
    return (
      <div className="min-h-screen bg-esports-dark flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Tournament Not Found</h2>
            <p className="text-gray-400 mb-6">The tournament you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/tournaments")}>Back to Tournaments</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const shouldUse24HourCountdown = tournament?.id === '7';
  
  return (
    <div className="min-h-screen bg-esports-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="relative h-[300px] md:h-[400px]">
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-esports-dark to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-esports-purple text-white">{tournament.gameType}</Badge>
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
                  
                  <h1 className="text-3xl md:text-4xl font-bold">{tournament.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-300">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>
                        {tournament.participantsCount}/{tournament.maxParticipants} Participants
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{tournament.region}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex flex-col items-end mb-3">
                    <span className="text-sm text-gray-300">Prize Pool</span>
                    <span className="text-xl md:text-2xl text-esports-yellow font-bold">{tournament.prizePool}</span>
                  </div>
                  
                  {tournament.status === "upcoming" && (
                    <Button 
                      className={`w-full md:w-auto ${
                        isRegistered 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90"
                      }`}
                      onClick={handleRegister}
                      disabled={isRegistered}
                    >
                      {isRegistered ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Already Registered
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </Button>
                  )}
                  
                  {tournament.status === "ongoing" && (
                    <Button>
                      View Matches
                    </Button>
                  )}
                  
                  {tournament.status === "completed" && (
                    <Button>
                      View Results
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {tournament.status === "upcoming" && (
            <div className="mb-6 max-w-xl mx-auto">
              {!isRegistered ? (
                <CountdownTimer 
                  targetDate={tournament.startDate}
                  label="Tournament starts in"
                  showAlert={isRegistrationEnding()}
                  showRegisterButton={true}
                  tournamentId={tournament.id}
                  overrideHours={shouldUse24HourCountdown ? 24 : undefined}
                />
              ) : (
                <CountdownTimer 
                  targetDate={tournament.startDate} 
                  label="Tournament starts in"
                  showAlert={isRegistrationEnding()}
                  overrideHours={shouldUse24HourCountdown ? 24 : undefined}
                />
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <Card className="bg-esports-card border-gray-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tournament Details</h3>
                  <p className="text-gray-300">
                    {tournament.description}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-esports-card border-gray-800 h-full">
                <CardContent className="pt-6 h-full flex flex-col justify-center">
                  <div className="flex items-center mb-2">
                    <Flame className="text-esports-yellow h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Tournament Format</h3>
                  </div>
                  
                  <div className="flex flex-col space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium text-white">{tournament.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entry Fee:</span>
                      <span className="font-medium text-white">{tournament.entryFee || "Free Entry"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team Size:</span>
                      <span className="font-medium text-white">{tournament.teamSize || "Solo"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-esports-card border-gray-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">About the Tournament</h3>
                  <p className="text-gray-300 mb-6">
                    {tournament.description || `Join ${tournament.title}, the premier ${tournament.gameType} tournament hosted by Battle Mitra. 
                    Compete against the best players in ${tournament.region} and prove your skills.
                    This ${tournament.format} tournament will feature intensive matchups and exciting gameplay.`}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-esports-darker rounded-lg p-4">
                      <h4 className="text-esports-purple font-semibold mb-2">Format</h4>
                      <p className="text-gray-300">{tournament.format}</p>
                    </div>
                    <div className="bg-esports-darker rounded-lg p-4">
                      <h4 className="text-esports-purple font-semibold mb-2">Entry Fee</h4>
                      <p className="text-gray-300">{tournament.entryFee || "Free Entry"}</p>
                    </div>
                    <div className="bg-esports-darker rounded-lg p-4">
                      <h4 className="text-esports-purple font-semibold mb-2">Region</h4>
                      <p className="text-gray-300">{tournament.region}</p>
                    </div>
                    <div className="bg-esports-darker rounded-lg p-4">
                      <h4 className="text-esports-purple font-semibold mb-2">Organizer</h4>
                      <p className="text-gray-300">{tournament.organizer || "Battle Mitra"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-esports-card border-gray-800 col-span-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Trophy className="h-5 w-5 text-esports-yellow mr-2" />
                      <h3 className="text-xl font-semibold">Key Highlights</h3>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Compete for a prize pool of {tournament.prizePool}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Professional tournament management and fair play monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Exclusive in-game rewards for participants</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Live streaming of featured matches</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-esports-card border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Clock className="h-5 w-5 text-esports-blue mr-2" />
                      <h3 className="text-xl font-semibold">Timeline</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="border-l-2 border-esports-purple pl-4 pb-4">
                        <p className="text-sm text-gray-400">Registration Opens</p>
                        <p className="font-medium">{new Date(tournament.startDate).toLocaleDateString()}</p>
                      </li>
                      <li className="border-l-2 border-esports-purple pl-4 pb-4">
                        <p className="text-sm text-gray-400">Registration Closes</p>
                        <p className="font-medium">{new Date(new Date(tournament.startDate).setDate(new Date(tournament.startDate).getDate() + 2)).toLocaleDateString()}</p>
                      </li>
                      <li className="border-l-2 border-esports-purple pl-4 pb-4">
                        <p className="text-sm text-gray-400">Tournament Starts</p>
                        <p className="font-medium">{new Date(tournament.startDate).toLocaleDateString()}</p>
                      </li>
                      <li className="border-l-2 border-esports-purple pl-4">
                        <p className="text-sm text-gray-400">Finals & Prize Distribution</p>
                        <p className="font-medium">{new Date(tournament.endDate).toLocaleDateString()}</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="space-y-6">
              <Card className="bg-esports-card border-gray-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tournament Rules</h3>
                  
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h4 className="text-white font-semibold mb-2">General Rules</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>All participants must register with their authentic game account.</li>
                        <li>Players must be at least 13 years of age to participate.</li>
                        <li>Players from {tournament.region} region only.</li>
                        <li>Be respectful to other players and tournament officials.</li>
                        <li>Decisions made by tournament admins are final.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Match Rules</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Players must be ready 15 minutes before their scheduled match time.</li>
                        <li>No-shows will result in automatic disqualification after a 10-minute grace period.</li>
                        <li>In case of disconnection, players have 5 minutes to rejoin before forfeiting.</li>
                        <li>Screen recording/streaming of matches is encouraged but not mandatory.</li>
                        <li>Match results must be reported within 10 minutes of completion.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Fair Play Policy</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Any form of cheating, hacking, or exploiting will result in immediate disqualification.</li>
                        <li>Account sharing is strictly prohibited.</li>
                        <li>Collusion between players will result in disqualification of all involved parties.</li>
                        <li>Toxicity, hate speech, or harassment will not be tolerated.</li>
                        <li>Battle Mitra reserves the right to disqualify players for any misconduct.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Technical Requirements</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Players are responsible for their own internet connection stability.</li>
                        <li>The latest version of the game must be installed.</li>
                        <li>Discord is required for communication with tournament officials.</li>
                        <li>In-game settings must conform to tournament standards.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-6">
              <Card className="bg-esports-card border-gray-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tournament Schedule</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-esports-purple font-semibold mb-3">Qualification Phase</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-esports-darker rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Round 1 - Group Stage</span>
                            <span className="text-sm text-gray-400">{new Date(tournament.startDate).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            Players will be divided into groups of 4 to compete in a round-robin format.
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-400">Time: 2:00 PM - 6:00 PM</div>
                            <div className="text-gray-400">Matches: 3 per player</div>
                          </div>
                        </div>
                        
                        <div className="bg-esports-darker rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Round 2 - Knockout</span>
                            <span className="text-sm text-gray-400">{new Date(new Date(tournament.startDate).setDate(new Date(tournament.startDate).getDate() + 1)).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            Top 2 players from each group advance to the knockout stage.
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-400">Time: 2:00 PM - 8:00 PM</div>
                            <div className="text-gray-400">Matches: BO3 format</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-esports-purple font-semibold mb-3">Finals Phase</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-esports-darker rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Semi-Finals</span>
                            <span className="text-sm text-gray-400">{new Date(new Date(tournament.endDate).setDate(new Date(tournament.endDate).getDate() - 1)).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            Top 4 players compete in a single elimination bracket.
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-400">Time: 4:00 PM - 7:00 PM</div>
                            <div className="text-gray-400">Matches: BO5 format</div>
                          </div>
                        </div>
                        
                        <div className="bg-esports-darker rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Grand Finals</span>
                            <span className="text-sm text-gray-400">{new Date(tournament.endDate).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            The final showdown between the top 2 players.
                          </p>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-400">Time: 6:00 PM - 9:00 PM</div>
                            <div className="text-gray-400">Matches: BO7 format</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-esports-purple font-semibold mb-3">Special Events</h4>
                      <div className="bg-esports-darker rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Awards Ceremony</span>
                          <span className="text-sm text-gray-400">{new Date(tournament.endDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Prize distribution and closing ceremony after the Grand Finals.
                        </p>
                        <div className="mt-2 text-sm text-gray-400">
                          Time: 9:30 PM - 10:30 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prizes" className="space-y-6">
              <Card className="bg-esports-card border-gray-800">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Prize Distribution</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-[#FFD700]/20 to-transparent rounded-lg border border-[#FFD700]/30">
                      <div className="bg-gradient-to-r from-[#FFD700] to-[#FFC800] text-black text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-3">1</div>
                      <h4 className="text-[#FFD700] font-bold text-lg mb-1">1st Place</h4>
                      <p className="text-2xl font-bold mb-2">₹{parseInt(tournament.prizePool.replace(/[^0-9]/g, ''), 10) * 0.6}</p>
                      <p className="text-sm text-gray-400 text-center">60% of Prize Pool + Champion Trophy</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-[#C0C0C0]/20 to-transparent rounded-lg border border-[#C0C0C0]/30">
                      <div className="bg-gradient-to-r from-[#C0C0C0] to-[#A0A0A0] text-black text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-3">2</div>
                      <h4 className="text-[#C0C0C0] font-bold text-lg mb-1">2nd Place</h4>
                      <p className="text-2xl font-bold mb-2">₹{parseInt(tournament.prizePool.replace(/[^0-9]/g, ''), 10) * 0.3}</p>
                      <p className="text-sm text-gray-400 text-center">30% of Prize Pool + Silver Medal</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-[#CD7F32]/20 to-transparent rounded-lg border border-[#CD7F32]/30">
                      <div className="bg-gradient-to-r from-[#CD7F32] to-[#A0522D] text-black text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-3">3</div>
                      <h4 className="text-[#CD7F32] font-bold text-lg mb-1">3rd Place</h4>
                      <p className="text-2xl font-bold mb-2">₹{parseInt(tournament.prizePool.replace(/[^0-9]/g, ''), 10) * 0.1}</p>
                      <p className="text-sm text-gray-400 text-center">10% of Prize Pool + Bronze Medal</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Additional Rewards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-esports-darker rounded-lg p-4">
                        <h5 className="font-medium mb-1">MVP Award</h5>
                        <p className="text-sm text-gray-300">Special recognition and in-game cosmetic items for the Most Valuable Player.</p>
                      </div>
                      <div className="bg-esports-darker rounded-lg p-4">
                        <h5 className="font-medium mb-1">Participation Rewards</h5>
                        <p className="text-sm text-gray-300">All participants receive exclusive in-game items and Battle Mitra profile badges.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Dialog open={showGameIdDialog} onOpenChange={setShowGameIdDialog}>
        <DialogContent className="bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle>Complete Your Registration</DialogTitle>
            <DialogDescription>
              Please enter your in-game username to complete the registration process.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gameUsername">In-Game Username</Label>
              <Input
                id="gameUsername"
                value={gameUsername}
                onChange={(e) => setGameUsername(e.target.value)}
                placeholder="Enter your game username"
                className="bg-esports-darker border-gray-700"
              />
            </div>
            <p className="text-sm text-gray-400">
              This username will be used to identify you in the tournament. Make sure it matches your in-game name exactly.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGameIdDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleGameIdSubmit} 
              disabled={submitLoading}
              className="bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90"
            >
              {submitLoading ? "Registering..." : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {tournament && (
        <WalletPaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          tournamentName={tournament.title}
          username={gameUsername}
          entryFee={tournament.entryFee || "0"}
          onConfirmPayment={handlePaymentConfirm}
          onCancel={() => {
            setShowPaymentDialog(false);
            setShowGameIdDialog(true);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default TournamentDetail;
