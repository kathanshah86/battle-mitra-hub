
import { Tournament } from "@/types";
import TournamentCard from "./TournamentCard";
import NoTournamentsFound from "./NoTournamentsFound";

interface TournamentsListProps {
  tournaments: Tournament[];
  resetFilters: () => void;
}

const TournamentsList = ({ tournaments, resetFilters }: TournamentsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))
      ) : (
        <NoTournamentsFound resetFilters={resetFilters} />
      )}
    </div>
  );
};

export default TournamentsList;
