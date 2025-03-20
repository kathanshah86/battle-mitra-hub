
import { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Import components
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsCards from "@/components/profile/StatsCards";
import OverviewTab from "@/components/profile/OverviewTab";
import MyTournaments from "@/components/profile/MyTournaments";
import UserSettings from "@/components/profile/UserSettings";
import CreateProfileForm from "@/components/profile/CreateProfileForm";

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
  const [showCreateProfile, setShowCreateProfile] = useState(false);

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
            // Profile not found, but if it's the user's own profile, show create form
            if (isOwnProfile) {
              setShowCreateProfile(true);
              setError(null);
            } else {
              setError("Profile not found");
            }
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
  }, [profileId, user, authLoading, isOwnProfile]);

  // Handle profile creation
  const handleProfileCreated = (newProfile: any) => {
    setProfile(newProfile);
    setShowCreateProfile(false);
  };

  // Create Profile Form
  if (showCreateProfile && isOwnProfile) {
    return <CreateProfileForm onProfileCreated={handleProfileCreated} />;
  }

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
      <ProfileHeader 
        profile={profile} 
        stats={stats} 
        isOwnProfile={isOwnProfile} 
        setActiveTab={setActiveTab} 
      />

      {/* Stats Cards */}
      <StatsCards stats={stats} />
      
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
        
        <TabsContent value="overview">
          <OverviewTab profile={profile} />
        </TabsContent>
        
        <TabsContent value="tournaments">
          <MyTournaments userId={profile?.id} />
        </TabsContent>
        
        <TabsContent value="settings">
          <UserSettings user={user} profile={profile} setProfile={setProfile} />
        </TabsContent>
      </Tabs>
      
      {/* Render outlet for potential nested routes */}
      <Outlet />
    </div>
  );
};

export default Profile;
