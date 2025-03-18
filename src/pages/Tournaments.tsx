
import { useState } from "react";
import { tournaments } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TournamentsHeader from "@/components/tournaments/TournamentsHeader";
import TournamentFilters from "@/components/tournaments/TournamentFilters";
import TournamentSorter from "@/components/tournaments/TournamentSorter";
import TournamentsList from "@/components/tournaments/TournamentsList";
import { useTournamentFilters } from "@/hooks/useTournamentFilters";

const Tournaments = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    filteredTournaments,
    regions
  } = useTournamentFilters(tournaments);

  return (
    <div className="min-h-screen flex flex-col bg-esports-dark">
      <Navbar />

      <div className="flex-1">
        <TournamentsHeader 
          title="Tournaments"
          description="Browse through our wide range of tournaments across various games and regions. Find the perfect competition to showcase your skills and win amazing prizes."
        />

        <div className="container mx-auto px-4 py-8">
          <TournamentFilters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            regions={regions}
          />

          <TournamentSorter resultsCount={filteredTournaments.length} />

          <TournamentsList
            tournaments={filteredTournaments}
            resetFilters={resetFilters}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tournaments;
