
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Trophy, Medal, Wallet, Settings, User, Edit, Users, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Helper function to get initials from profile data
const getInitials = (profile: any) => {
  if (!profile) return "U";
  return (profile.username || profile.id.substring(0, 2) || "U").substring(0, 2).toUpperCase();
};

const Profile = () => {
  const { id: profileId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    tournamentsWon: 0,
    tournamentsPlayed: 0,
    bestRank: "-",
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Check if viewing own profile
  const isOwnProfile = !profileId || (user && profileId === user.id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If no profileId is provided, use the current user's ID
        const targetId = profileId || (user ? user.id : null);
        
        if (!targetId) {
          if (!authLoading) {
            setError("Please log in to view your profile");
          }
          return;
        }
        
        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', targetId)
          .single();
          
        if (profileError) {
          if (profileError.code === 'PGRST116') {
            // Profile not found
            setError("Profile not found");
          } else {
            console.error("Error fetching profile:", profileError);
            setError("Error loading profile data");
          }
          return;
        }
        
        // Set profile data
        setProfile(profileData || {
          id: targetId,
          username: user?.email?.split('@')[0] || "User",
          bio: "No bio yet",
          avatar_url: null
        });
        
        // Get tournament stats
        // For demo purposes we're using mock data
        // In a real app, you'd fetch this from your tournaments database
        setStats({
          tournamentsWon: Math.floor(Math.random() * 5),
          tournamentsPlayed: 5 + Math.floor(Math.random() * 10),
          bestRank: "#" + (1 + Math.floor(Math.random() * 20)),
          totalEarnings: 100 + Math.floor(Math.random() * 900)
        });
      } catch (error) {
        console.error("Error in profile page:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
      fetchProfile();
    }
  }, [profileId, user, authLoading]);

  // Error state handling
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error === "Profile not found" ? "Profile Not Found" : "Error"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error === "Profile not found" 
              ? "The profile you're looking for doesn't exist or may have been removed." 
              : error}
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 max-w-6xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <AvatarImage src={profile?.avatar_url} alt={profile?.username || "User"} />
          <AvatarFallback className="text-lg bg-primary/10 text-primary">
            {getInitials(profile)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-1">{profile?.username || "User"}</h1>
          <p className="text-gray-500 mb-3">Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            <Badge variant="secondary" className="px-3 py-1">
              <Trophy className="h-3.5 w-3.5 mr-1" />
              Competitor
            </Badge>
            {stats.tournamentsWon > 0 && (
              <Badge variant="default" className="px-3 py-1 bg-amber-500">
                <Medal className="h-3.5 w-3.5 mr-1" />
                Champion
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 max-w-2xl">{profile?.bio || "No bio available"}</p>
        </div>
        
        {isOwnProfile && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/settings')} size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center">
            <Trophy className="h-8 w-8 text-amber-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Tournaments Won</p>
              <h3 className="text-2xl font-bold">{stats.tournamentsWon}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Tournaments Played</p>
              <h3 className="text-2xl font-bold">{stats.tournamentsPlayed}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <Medal className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Best Rank</p>
              <h3 className="text-2xl font-bold">{stats.bestRank}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <Wallet className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <h3 className="text-2xl font-bold">₹{stats.totalEarnings}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs Navigation */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tournaments">My Tournaments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Bio</h4>
                  <p className="text-gray-600">{profile?.bio || "No bio available"}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-1">Game Experience</h4>
                  <p className="text-gray-600">
                    {profile?.game_experience || "No game experience information available"}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-1">Social</h4>
                  {profile?.social_links ? (
                    <div className="flex gap-2">
                      {/* Render social links here */}
                      <p className="text-gray-600">Social links...</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">No social links available</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tournaments">
          <MyTournaments userId={profile?.id} />
        </TabsContent>
        
        <TabsContent value="settings">
          <UserSettings user={user} profile={profile} />
        </TabsContent>
      </Tabs>
      
      {/* Render outlet for potential nested routes */}
      <Outlet />
    </div>
  );
};

// My Tournaments Component for the tournaments tab
const MyTournaments = ({ userId }: { userId: string }) => {
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

// User Settings Component for the settings tab
const UserSettings = ({ user, profile }: { user: any, profile: any }) => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button 
          variant={activeTab === "profile" ? "default" : "outline"} 
          onClick={() => setActiveTab("profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
        <Button 
          variant={activeTab === "security" ? "default" : "outline"} 
          onClick={() => setActiveTab("security")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Security
        </Button>
        <Button 
          variant={activeTab === "notifications" ? "default" : "outline"} 
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>
      
      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue={profile?.username || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={profile?.bio || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || "User"} />
                    <AvatarFallback>{getInitials(profile)}</AvatarFallback>
                  </Avatar>
                  <Input id="avatar" type="file" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Game Experience</Label>
                <Textarea id="experience" defaultValue={profile?.game_experience || ""} />
              </div>
              
              <Button type="submit" className="mt-2">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "security" && (
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button type="submit" className="mt-2">Update Password</Button>
            </form>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Tournament Reminders</h4>
                  <p className="text-sm text-gray-500">Receive reminders before your tournaments start</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Tournament Alerts</h4>
                  <p className="text-sm text-gray-500">Get notified when new tournaments are announced</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-gray-500">Receive promotional emails and offers</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Match Results</h4>
                  <p className="text-sm text-gray-500">Get notified about match results</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Button className="mt-2">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
