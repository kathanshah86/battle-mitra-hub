
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Medal, Wallet } from "lucide-react";

interface StatsCardsProps {
  stats: {
    tournamentsWon: number;
    tournamentsPlayed: number;
    bestRank: string;
    totalEarnings: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
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
  );
};

export default StatsCards;
