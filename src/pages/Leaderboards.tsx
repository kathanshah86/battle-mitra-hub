
import { useState } from "react";
import { User, Medal, Search, Filter } from "lucide-react";
import Trophy from "@/components/Trophy";
import { players } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Leaderboards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");

  // Filter players based on search query
  const filteredPlayers = players.filter((player) =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-esports-dark">
      <Navbar />

      <div className="flex-1">
        <div className="bg-esports-darker py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                Leaderboards
              </h1>
              <p className="text-gray-300">
                Track the top performing players across all games and tournaments.
                Will you make it to the top of the rankings?
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="global" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <TabsList className="bg-esports-card mb-4 md:mb-0">
                <TabsTrigger value="global">Global</TabsTrigger>
                <TabsTrigger value="fps">FPS</TabsTrigger>
                <TabsTrigger value="battle-royale">Battle Royale</TabsTrigger>
                <TabsTrigger value="moba">MOBA</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border-gray-700 pl-10 w-full sm:w-[250px]"
                  />
                </div>

                <Select
                  value={gameFilter}
                  onValueChange={setGameFilter}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 w-full sm:w-[180px]">
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="valorant">Valorant</SelectItem>
                    <SelectItem value="apex">Apex Legends</SelectItem>
                    <SelectItem value="lol">League of Legends</SelectItem>
                    <SelectItem value="fifa">FIFA 23</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="global" className="mt-0">
              <Card className="bg-esports-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-esports-purple mr-2" />
                    Global Rankings
                  </CardTitle>
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
                        {filteredPlayers.map((player) => (
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
                              <div className="flex items-center">
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
                              </div>
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
            </TabsContent>

            <TabsContent value="fps" className="mt-0">
              <Card className="bg-esports-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-esports-purple mr-2" />
                    FPS Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <p className="text-gray-400">FPS rankings coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="battle-royale" className="mt-0">
              <Card className="bg-esports-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-esports-purple mr-2" />
                    Battle Royale Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <p className="text-gray-400">Battle Royale rankings coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moba" className="mt-0">
              <Card className="bg-esports-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-esports-purple mr-2" />
                    MOBA Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <p className="text-gray-400">MOBA rankings coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sports" className="mt-0">
              <Card className="bg-esports-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-esports-purple mr-2" />
                    Sports Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <p className="text-gray-400">Sports rankings coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboards;
