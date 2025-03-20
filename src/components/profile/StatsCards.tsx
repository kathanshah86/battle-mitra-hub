
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
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all">
        <CardContent className="p-6 flex items-center">
          <div className="bg-amber-500/10 p-3 rounded-full mr-4">
            <Trophy className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tournaments Won</p>
            <h3 className="text-2xl font-bold">{stats.tournamentsWon}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all">
        <CardContent className="p-6 flex items-center">
          <div className="bg-blue-500/10 p-3 rounded-full mr-4">
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tournaments Played</p>
            <h3 className="text-2xl font-bold">{stats.tournamentsPlayed}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all">
        <CardContent className="p-6 flex items-center">
          <div className="bg-purple-500/10 p-3 rounded-full mr-4">
            <Medal className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Best Rank</p>
            <h3 className="text-2xl font-bold">{stats.bestRank}</h3>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 hover:shadow-lg transition-all">
        <CardContent className="p-6 flex items-center">
          <div className="bg-green-500/10 p-3 rounded-full mr-4">
            <Wallet className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
            <h3 className="text-2xl font-bold">₹{stats.totalEarnings}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
