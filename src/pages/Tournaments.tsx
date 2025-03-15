
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Filter, Search, X } from "lucide-react";
import { tournaments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FilterState = {
  status: string;
  gameType: string;
  entryFee: string;
  region: string;
  searchQuery: string;
};

const Tournaments = () => {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    gameType: "all",
    entryFee: "all",
    region: "all",
    searchQuery: "",
  });

  // Filter tournaments based on selected filters
  const filteredTournaments = tournaments.filter((tournament) => {
    // Filter by status
    if (filters.status !== "all" && tournament.status !== filters.status) {
      return false;
    }

    // Filter by game type
    if (filters.gameType !== "all" && tournament.gameType !== filters.gameType) {
      return false;
    }

    // Filter by entry fee
    if (filters.entryFee === "free" && tournament.entryFee !== null) {
      return false;
    }
    if (filters.entryFee === "paid" && tournament.entryFee === null) {
      return false;
    }

    // Filter by region
    if (filters.region !== "all" && tournament.region !== filters.region) {
      return false;
    }

    // Filter by search query
    if (
      filters.searchQuery &&
      !tournament.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setFilters({
      status: "all",
      gameType: "all",
      entryFee: "all",
      region: "all",
      searchQuery: "",
    });
  };

  // Get unique regions for filter dropdown
  const regions = [...new Set(tournaments.map((t) => t.region))];

  return (
    <div className="min-h-screen flex flex-col bg-esports-dark">
      <Navbar />

      <div className="flex-1">
        <div className="bg-esports-darker py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                Tournaments
              </h1>
              <p className="text-gray-300">
                Browse through our wide range of tournaments across various games and regions.
                Find the perfect competition to showcase your skills and win amazing prizes.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters Section */}
          <div className="bg-esports-card rounded-lg p-6 mb-8 border border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Filter className="h-5 w-5 text-esports-purple mr-2" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="text-gray-400 border-gray-700 hover:bg-gray-800"
              >
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search tournaments..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="bg-gray-800 border-gray-700 pl-10"
                />
              </div>

              <Select
                value={filters.status}
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.gameType}
                onValueChange={(value) => setFilters({ ...filters, gameType: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Game Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  <SelectItem value="fps">FPS</SelectItem>
                  <SelectItem value="battle-royale">Battle Royale</SelectItem>
                  <SelectItem value="moba">MOBA</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.entryFee}
                onValueChange={(value) => setFilters({ ...filters, entryFee: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Entry Fee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fees</SelectItem>
                  <SelectItem value="free">Free Entry</SelectItem>
                  <SelectItem value="paid">Paid Entry</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.region}
                onValueChange={(value) => setFilters({ ...filters, region: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-400">
              {filteredTournaments.length} tournaments found
            </p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="prize-high">Highest Prize</SelectItem>
                <SelectItem value="prize-low">Lowest Prize</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={tournament.image}
                      alt={tournament.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      {tournament.status === "upcoming" && (
                        <Badge className="bg-esports-blue text-white">Upcoming</Badge>
                      )}
                      {tournament.status === "ongoing" && (
                        <Badge className="bg-green-500 text-white">Ongoing</Badge>
                      )}
                      {tournament.status === "completed" && (
                        <Badge className="bg-gray-600 text-white">Completed</Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <Badge className="bg-esports-purple text-white">{tournament.gameType}</Badge>
                      {tournament.entryFee ? (
                        <Badge variant="outline" className="bg-black/50 border-gray-600 text-white">
                          Entry: {tournament.entryFee}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-black/50 border-green-600 text-green-400">
                          Free Entry
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {tournament.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                      <div>
                        {tournament.status !== "completed" 
                          ? `Starts ${new Date(tournament.startDate).toLocaleDateString()}`
                          : `Ended ${new Date(tournament.endDate).toLocaleDateString()}`
                        }
                      </div>
                      <div>{tournament.format}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Prize Pool</p>
                        <p className="text-esports-yellow font-semibold">
                          {tournament.prizePool}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Participants</p>
                        <p className="text-white">
                          {tournament.participantsCount}/{tournament.maxParticipants}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Region</p>
                        <p className="text-white">{tournament.region}</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${
                        tournament.status === "upcoming"
                          ? "bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90"
                          : tournament.status === "ongoing"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      disabled={tournament.status === "completed"}
                    >
                      <Link to={`/tournaments/${tournament.id}`}>
                        {tournament.status === "upcoming"
                          ? "Register Now"
                          : tournament.status === "ongoing"
                          ? "View Matches"
                          : "View Results"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Trophy className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tournaments found</h3>
                <p className="text-gray-400 mb-6">
                  We couldn't find any tournaments matching your filters.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tournaments;
