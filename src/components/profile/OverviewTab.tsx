
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OverviewTabProps {
  profile: any;
}

const OverviewTab = ({ profile }: OverviewTabProps) => {
  return (
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
  );
};

export default OverviewTab;
