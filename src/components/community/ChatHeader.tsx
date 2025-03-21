
import { Button } from "@/components/ui/button";
import { InfoIcon, Users } from "lucide-react";

interface ChatHeaderProps {
  roomName: string;
  participantCount: number;
  onShowInfo?: () => void;
  onShowParticipants?: () => void;
}

const ChatHeader = ({ 
  roomName, 
  participantCount, 
  onShowInfo, 
  onShowParticipants 
}: ChatHeaderProps) => {
  return (
    <div className="h-16 px-4 border-b border-gray-800 flex items-center justify-between bg-esports-darker">
      <div>
        <h2 className="text-lg font-semibold">{roomName}</h2>
        <p className="text-sm text-gray-400">{participantCount} participants</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={onShowParticipants}
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={onShowInfo}
        >
          <InfoIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
