
import { Link } from "react-router-dom";
import { User, ChevronRight, Medal } from "lucide-react";
import { players } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TopPlayers = () => {
  // Get top 5 players
  const topPlayers = players.slice(0, 5);

  return (
    <section className="py-16 bg-esports-dark">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <User className="text-esports-purple h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">Top Players</h2>
          </div>
          <Link
            to="/leaderboards"
            className="flex items-center text-esports-purple hover:text-esports-purple/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="px-4 py-3 text-gray-400 font-medium">Rank</th>
                    <th className="px-4 py-3 text-gray-400 font-medium">Player</th>
                    <th className="px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Win Rate</th>
                    <th className="px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Tournaments</th>
                    <th className="px-4 py-3 text-gray-400 font-medium text-right">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.map((player) => (
                    <tr 
                      key={player.id} 
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {player.rank === 1 ? (
                            <Medal className="h-5 w-5 text-yellow-500 mr-1" />
                          ) : player.rank === 2 ? (
                            <Medal className="h-5 w-5 text-gray-400 mr-1" />
                          ) : player.rank === 3 ? (
                            <Medal className="h-5 w-5 text-amber-600 mr-1" />
                          ) : (
                            <span className="text-gray-500 font-medium mr-1">{player.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/players/${player.id}`} className="flex items-center">
                          <img 
                            src={player.avatar} 
                            alt={player.username} 
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium text-white">{player.username}</p>
                            <p className="text-xs text-gray-400">
                              {player.team ? player.team : 'No Team'} • {player.country}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2 mr-2 max-w-24">
                            <div 
                              className="bg-esports-purple h-2 rounded-full" 
                              style={{ width: `${player.winRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{player.winRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="font-medium text-esports-purple">{player.tournamentWins}</span> 
                        <span className="text-gray-400"> wins</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-green-400">
                        ${player.earnings.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TopPlayers;
