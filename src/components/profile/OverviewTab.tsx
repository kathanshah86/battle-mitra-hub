
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, Youtube, Globe, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  profile: any;
}

const OverviewTab = ({ profile }: OverviewTabProps) => {
  // Function to render social media icons based on URL
  const renderSocialIcon = (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) {
      return <Twitter className="h-5 w-5 text-blue-400" />;
    } else if (url.includes('instagram.com')) {
      return <Instagram className="h-5 w-5 text-pink-500" />;
    } else if (url.includes('youtube.com')) {
      return <Youtube className="h-5 w-5 text-red-500" />;
    } else if (url.includes('github.com')) {
      return <Github className="h-5 w-5 text-gray-800" />;
    } else {
      return <Globe className="h-5 w-5 text-purple-500" />;
    }
  };

  // Mock social links for demonstration
  const socialLinks = profile?.social_links || [
    { platform: 'Website', url: 'https://gamer.example.com' },
    { platform: 'Twitter', url: 'https://twitter.com/gamertag' },
    { platform: 'Instagram', url: 'https://instagram.com/gamertag' }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-2">Bio</h4>
            <p className="text-gray-700">{profile?.bio || "hello my name is kathan"}</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-lg mb-2">Game Experience</h4>
            <p className="text-gray-700">
              {profile?.game_experience || "1 year"}
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-lg mb-2">Social</h4>
            {socialLinks && socialLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {socialLinks.map((link: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex justify-start items-center gap-2 w-full"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {renderSocialIcon(link.url)}
                      <span>{link.platform}</span>
                    </a>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No social links available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
