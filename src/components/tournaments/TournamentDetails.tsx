
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/components/ui/use-toast';
import Trophy from '@/components/Trophy';
import { cn } from '@/lib/utils';

// Mock tournament data - would normally come from an API
const mockTournaments = [
  {
    id: "1",
    title: "Battle Royale Championship",
    gameType: "battle-royale",
    entryFee: "₹500",
    status: "upcoming",
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    format: "5v5 Teams",
    prizePool: "₹50,000",
    participantsCount: 42,
    maxParticipants: 64,
    region: "Asia",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Join the ultimate Battle Royale tournament and compete against the best teams in Asia. Form your squad of 5 and battle for glory and prizes!",
    rules: "Standard battle royale rules apply. Teams of 5 will compete in multiple rounds. Points are awarded for placement and eliminations.",
    schedule: [
      { name: "Registration Deadline", date: "2025-05-18" },
      { name: "Group Stage", date: "2025-05-20" },
      { name: "Semifinals", date: "2025-05-21" },
      { name: "Finals", date: "2025-05-22" }
    ],
    organizer: "GamersHub Asia"
  },
  {
    id: "2",
    title: "MOBA Masters Tournament",
    gameType: "moba",
    entryFee: "",
    status: "ongoing",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    format: "5v5 Teams",
    prizePool: "₹100,000",
    participantsCount: 32,
    maxParticipants: 32,
    region: "Global",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The biggest MOBA tournament of the year with teams from around the world competing for the championship title and prize pool.",
    rules: "Double elimination bracket. Best-of-three matches in early rounds, best-of-five for semifinals and finals.",
    schedule: [
      { name: "Group Stage", date: "2025-05-10 to 2025-05-12" },
      { name: "Quarterfinals", date: "2025-05-13" },
      { name: "Semifinals", date: "2025-05-14" },
      { name: "Finals", date: "2025-05-15" }
    ],
    organizer: "World Esports Federation"
  }
];

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<any | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedTournament = mockTournaments.find(t => t.id === id);
    setTournament(fetchedTournament || null);
  }, [id]);

  if (!tournament) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-esports-purple mb-4"></div>
          <h2 className="text-xl font-semibold">Loading tournament details...</h2>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${tournament.title}`,
      });
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Calculate registration status and deadline
  const today = new Date();
  const startDate = new Date(tournament.startDate);
  const registrationDeadline = tournament.schedule ? 
    new Date(tournament.schedule.find((s: any) => s.name.includes('Registration'))?.date || tournament.startDate) : 
    startDate;
  
  const daysLeft = Math.ceil((registrationDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isRegistrationOpen = today < registrationDeadline;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Tournament Image & Basic Info */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <AspectRatio ratio={3/1}>
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-esports-dark via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="flex items-center mb-3">
            <div className={cn(
              "text-xs font-semibold py-1 px-3 rounded-full mr-3",
              tournament.status === 'upcoming' ? "bg-esports-blue text-white" :
              tournament.status === 'ongoing' ? "bg-esports-green text-white" :
              "bg-gray-700 text-white"
            )}>
              {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
            </div>
            <div className="text-xs font-medium py-1 px-3 rounded-full bg-esports-dark/80 text-white border border-esports-purple/30">
              {tournament.gameType}
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-orbitron font-bold text-white mb-2">{tournament.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Format:</span> {tournament.format}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Region:</span> {tournament.region}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Dates:</span> {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Details & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-gray-800 mb-6 pb-1">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`flex items-center px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' 
                ? 'text-esports-purple border-b-2 border-esports-purple' 
                : 'text-gray-400 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('schedule')} 
              className={`flex items-center px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'schedule' 
                ? 'text-esports-purple border-b-2 border-esports-purple' 
                : 'text-gray-400 hover:text-white'}`}
            >
              Schedule
            </button>
            <button 
              onClick={() => setActiveTab('rules')} 
              className={`flex items-center px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'rules' 
                ? 'text-esports-purple border-b-2 border-esports-purple' 
                : 'text-gray-400 hover:text-white'}`}
            >
              Rules
            </button>
            <button 
              onClick={() => setActiveTab('participants')} 
              className={`flex items-center px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'participants' 
                ? 'text-esports-purple border-b-2 border-esports-purple' 
                : 'text-gray-400 hover:text-white'}`}
            >
              Participants
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-esports-card p-6 rounded-lg neon-border">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-orbitron font-bold mb-4">About This Tournament</h2>
                  <p className="text-gray-300 leading-relaxed">{tournament.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tournament Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-esports-darker p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Organizer</div>
                      <div className="font-medium">{tournament.organizer}</div>
                    </div>
                    <div className="bg-esports-darker p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Format</div>
                      <div className="font-medium">{tournament.format}</div>
                    </div>
                    <div className="bg-esports-darker p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Region</div>
                      <div className="font-medium">{tournament.region}</div>
                    </div>
                    <div className="bg-esports-darker p-4 rounded-lg">
                      <div className="text-sm text-gray-400">Entry Fee</div>
                      <div className="font-medium">{tournament.entryFee || 'Free Entry'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h2 className="text-xl font-orbitron font-bold mb-4">Tournament Schedule</h2>
                <div className="space-y-4">
                  {tournament.schedule?.map((event: any, index: number) => (
                    <div key={index} className="flex items-start p-4 bg-esports-darker rounded-lg">
                      <div className="bg-esports-purple/20 text-esports-purple p-3 rounded-lg mr-4">
                        <span className="block text-center font-semibold">
                          {new Date(event.date.split(' ')[0]).getDate()}
                        </span>
                        <span className="block text-center text-sm">
                          {new Date(event.date.split(' ')[0]).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{event.name}</h3>
                        <p className="text-gray-400 text-sm">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div>
                <h2 className="text-xl font-orbitron font-bold mb-4">Tournament Rules</h2>
                <div className="bg-esports-darker p-5 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed">{tournament.rules}</p>
                </div>
              </div>
            )}

            {activeTab === 'participants' && (
              <div>
                <h2 className="text-xl font-orbitron font-bold mb-4">Registered Participants</h2>
                <div className="bg-esports-darker p-5 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg">
                      <span className="text-esports-purple font-semibold">{tournament.participantsCount}</span>
                      <span className="text-gray-400"> / {tournament.maxParticipants} participants</span>
                    </div>
                    <div className="w-1/2 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-esports-purple" 
                        style={{ width: `${(tournament.participantsCount / tournament.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Simulate participant list - would be real data in a production app */}
                  <div className="text-center py-8 text-gray-400">
                    <p>Sign in to view the full list of participants</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tournament Status Card */}
          <div className="bg-esports-card p-6 rounded-lg neon-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium">Tournament Status</h3>
              <div className={cn(
                "text-xs font-semibold py-1 px-3 rounded-full",
                tournament.status === 'upcoming' ? "bg-esports-blue text-white" :
                tournament.status === 'ongoing' ? "bg-esports-green text-white" :
                "bg-gray-700 text-white"
              )}>
                {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
              </div>
            </div>
            
            <div className="space-y-4">
              {tournament.status === 'upcoming' && isRegistrationOpen && (
                <div className="text-center bg-esports-darker p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Registration closes in</div>
                  <div className="text-xl font-orbitron font-bold text-esports-purple">
                    {daysLeft > 0 ? `${daysLeft} days` : 'Less than 24 hours'}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Start Date</div>
                  <div className="font-medium">{formatDate(tournament.startDate)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">End Date</div>
                  <div className="font-medium">{formatDate(tournament.endDate)}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Prize Pool Card */}
          <div className="bg-esports-card p-6 rounded-lg neon-border">
            <div className="flex items-center mb-4">
              <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="font-medium">Prize Pool</h3>
            </div>
            <div className="text-center bg-esports-darker p-6 rounded-lg mb-4">
              <div className="text-3xl font-orbitron font-bold text-yellow-400">
                {tournament.prizePool}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-yellow-400 text-esports-dark w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2">1</div>
                  <div>1st Place</div>
                </div>
                <div className="font-medium text-yellow-400">₹30,000</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-400 text-esports-dark w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2">2</div>
                  <div>2nd Place</div>
                </div>
                <div className="font-medium">₹15,000</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-amber-700 text-esports-dark w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2">3</div>
                  <div>3rd Place</div>
                </div>
                <div className="font-medium">₹5,000</div>
              </div>
            </div>
          </div>
          
          {/* Registration Card - Only show for upcoming tournaments */}
          {tournament.status === 'upcoming' && (
            <div className="bg-esports-card p-6 rounded-lg neon-border">
              <h3 className="font-medium mb-4">Registration</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <span className="text-esports-purple font-semibold">{tournament.participantsCount}</span>
                  <span className="text-gray-400"> / {tournament.maxParticipants}</span>
                </div>
                <div className="text-sm text-gray-400">{tournament.maxParticipants - tournament.participantsCount} slots left</div>
              </div>
              <div className="mb-6 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-esports-purple" 
                  style={{ width: `${(tournament.participantsCount / tournament.maxParticipants) * 100}%` }}
                ></div>
              </div>
              
              <button
                onClick={handleRegister}
                disabled={!isRegistrationOpen || isRegistering}
                className={`w-full py-3 px-6 rounded-md font-medium transition-all ${
                  isRegistrationOpen
                    ? 'bg-gradient-to-r from-esports-purple to-esports-blue text-white hover:opacity-90'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isRegistering ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                    Registering...
                  </span>
                ) : isRegistrationOpen ? (
                  'Register Now'
                ) : (
                  'Registration Closed'
                )}
              </button>
              
              {tournament.entryFee && (
                <div className="text-center mt-3 text-sm text-gray-400">
                  Entry Fee: <span className="text-white">{tournament.entryFee}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Share Tournament */}
          <div className="bg-esports-card p-6 rounded-lg neon-border">
            <h3 className="font-medium mb-4">Share Tournament</h3>
            <div className="flex space-x-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </button>
              <button className="bg-sky-500 hover:bg-sky-600 p-3 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
