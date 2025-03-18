
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoTournamentsFoundProps {
  resetFilters: () => void;
}

const NoTournamentsFound = ({ resetFilters }: NoTournamentsFoundProps) => {
  return (
    <div className="col-span-full text-center py-12">
      <Trophy className="h-16 w-16 text-gray-700 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">No tournaments found</h3>
      <p className="text-gray-400 mb-6">
        We couldn't find any tournaments matching your filters.
      </p>
      <Button onClick={resetFilters}>Reset Filters</Button>
    </div>
  );
};

export default NoTournamentsFound;
