
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Edit } from "lucide-react";
import { getInitials } from "@/utils/profile-utils";

interface ProfileHeaderProps {
  profile: any;
  stats: {
    tournamentsWon: number;
    tournamentsPlayed: number;
    bestRank: string;
    totalEarnings: number;
  };
  isOwnProfile: boolean;
  setActiveTab: (tab: string) => void;
}

const ProfileHeader = ({ profile, stats, isOwnProfile, setActiveTab }: ProfileHeaderProps) => {
  return (
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
          <Button variant="outline" onClick={() => setActiveTab("settings")} size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
