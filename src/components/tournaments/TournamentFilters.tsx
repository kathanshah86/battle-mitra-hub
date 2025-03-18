
import { useState } from "react";
import { X, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterState = {
  status: string;
  gameType: string;
  entryFee: string;
  region: string;
  searchQuery: string;
};

interface TournamentFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  regions: string[];
}

const TournamentFilters = ({ 
  filters, 
  setFilters, 
  resetFilters, 
  regions 
}: TournamentFiltersProps) => {
  return (
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
  );
};

export default TournamentFilters;
