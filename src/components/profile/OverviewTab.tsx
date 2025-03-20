
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, Youtube, Globe, Github, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatSocialLink } from "@/utils/profile-utils";

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
      return <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />;
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
            <p className="text-gray-700 dark:text-gray-300">{profile?.bio || "hello my name is kathan"}</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-lg mb-2">Game Experience</h4>
            <p className="text-gray-700 dark:text-gray-300">
              {profile?.game_experience || "1 year"}
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-lg mb-2">Social</h4>
            {socialLinks && socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-full transition-colors"
                  >
                    {renderSocialIcon(link.url)}
                    <span className="font-medium">{formatSocialLink(link.url)}</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No social links available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
