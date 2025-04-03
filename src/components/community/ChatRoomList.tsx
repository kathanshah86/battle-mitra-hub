
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search, Plus, Hash, Users, Gamepad2 } from "lucide-react";
import { ChatRoom } from "@/services/chatService";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  onSelectRoom: (roomId: string) => void;
  activeChatId: string;
}

const ChatRoomList = ({ rooms, onSelectRoom, activeChatId }: ChatRoomListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRooms = searchTerm 
    ? rooms.filter(room => room.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : rooms;

  // Group rooms by type
  const generalRooms = filteredRooms.filter(room => room.type === 'general');
  const gameRooms = filteredRooms.filter(room => room.type === 'game');
  const teamRooms = filteredRooms.filter(room => room.type === 'team');

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'general':
        return <Hash className="h-4 w-4 text-gray-400" />;
      case 'team':
        return <Users className="h-4 w-4 text-gray-400" />;
      case 'game':
        return <Gamepad2 className="h-4 w-4 text-gray-400" />;
      default:
        return <Hash className="h-4 w-4 text-gray-400" />;
    }
  };

  const renderRoomButtons = (rooms: ChatRoom[]) => {
    return rooms.map((room) => (
      <Button
        key={room.id}
        variant="ghost"
        className={`w-full justify-start ${
          activeChatId === room.id
            ? "bg-esports-purple/20 text-esports-purple"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
        onClick={() => onSelectRoom(room.id)}
      >
        <span className="flex items-center">
          {getRoomIcon(room.type)}
          <span className="ml-2">{room.name}</span>
        </span>
        {room.unread && (
          <span className="ml-auto bg-esports-purple text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
            {room.unread}
          </span>
        )}
      </Button>
    ));
  };

  return (
    <div className="h-full flex flex-col bg-esports-darker border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search channels"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-esports-card border-gray-700"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {generalRooms.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-400">PUBLIC CHANNELS</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-1">
                {renderRoomButtons(generalRooms)}
              </div>
            </>
          )}
          
          {gameRooms.length > 0 && (
            <>
              <h3 className="text-sm font-medium text-gray-400 mt-6 mb-2">GAME CHANNELS</h3>
              <div className="space-y-1">
                {renderRoomButtons(gameRooms)}
              </div>
            </>
          )}
          
          {teamRooms.length > 0 && (
            <>
              <h3 className="text-sm font-medium text-gray-400 mt-6 mb-2">TEAM CHANNELS</h3>
              <div className="space-y-1">
                {renderRoomButtons(teamRooms)}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatRoomList;
