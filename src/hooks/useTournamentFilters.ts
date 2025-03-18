
import { useState, useMemo } from "react";
import { Tournament } from "@/types";

export type FilterState = {
  status: string;
  gameType: string;
  entryFee: string;
  region: string;
  searchQuery: string;
};

const INITIAL_FILTERS: FilterState = {
  status: "all",
  gameType: "all",
  entryFee: "all",
  region: "all",
  searchQuery: "",
};

export function useTournamentFilters(tournaments: Tournament[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Get unique regions for filter dropdown
  const regions = useMemo(() => {
    return [...new Set(tournaments.map((t) => t.region))];
  }, [tournaments]);

  // Filter tournaments based on selected filters
  const filteredTournaments = useMemo(() => {
    return tournaments.filter((tournament) => {
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
  }, [tournaments, filters]);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return {
    filters,
    setFilters,
    resetFilters,
    filteredTournaments,
    regions
  };
}
