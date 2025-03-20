
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CreateProfileFormProps {
  onProfileCreated: (profile: any) => void;
}

const CreateProfileForm = ({ onProfileCreated }: CreateProfileFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to create a profile",
          variant: "destructive",
        });
        return;
      }
      
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const bio = formData.get('bio') as string;
      const gameExperience = formData.get('gameExperience') as string;
      
      const newProfile = {
        id: user.id,
        username: username || user.email?.split('@')[0] || "User",
        bio: bio || "No bio yet",
        game_experience: gameExperience || "Beginner",
        avatar_url: null
      };
      
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([newProfile]);
        
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "Profile created",
        description: "Your profile has been created successfully!",
      });
      
      onProfileCreated(newProfile);
      
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast({
        title: "Error creating profile",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Fill out the information below to set up your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username" 
                placeholder="Enter a username" 
                defaultValue={user?.email?.split('@')[0] || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gameExperience">Gaming Experience</Label>
              <Textarea 
                id="gameExperience" 
                name="gameExperience" 
                placeholder="Share your gaming background..."
                rows={3}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfileForm;
