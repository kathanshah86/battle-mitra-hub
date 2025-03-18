
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TournamentSorterProps {
  resultsCount: number;
  sortOrder?: string;
  onSortChange?: (value: string) => void;
}

const TournamentSorter = ({ 
  resultsCount, 
  sortOrder = "newest", 
  onSortChange 
}: TournamentSorterProps) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <p className="text-gray-400">
        {resultsCount} tournaments found
      </p>
      <Select 
        defaultValue={sortOrder} 
        onValueChange={onSortChange}
      >
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
  );
};

export default TournamentSorter;
