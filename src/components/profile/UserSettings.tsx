
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Settings, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/utils/profile-utils";

interface UserSettingsProps {
  user: any;
  profile: any;
  setProfile: (profile: any) => void;
}

const UserSettings = ({ user, profile, setProfile }: UserSettingsProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const updatedProfile = {
        username: formData.get('username') as string,
        bio: formData.get('bio') as string,
        game_experience: formData.get('experience') as string,
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', profile.id);
        
      if (error) throw error;
      
      // Update local state
      setProfile({ ...profile, ...updatedProfile });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
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
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue={profile?.username || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" defaultValue={profile?.bio || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || "User"} />
                    <AvatarFallback>{getInitials(profile)}</AvatarFallback>
                  </Avatar>
                  <Input id="avatar" type="file" disabled />
                  <p className="text-sm text-gray-500">(Avatar upload coming soon)</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Game Experience</Label>
                <Textarea id="experience" name="experience" defaultValue={profile?.game_experience || ""} />
              </div>
              
              <Button type="submit" className="mt-2" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
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

export default UserSettings;
