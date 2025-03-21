
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  status: 'online' | 'away' | 'offline';
  game?: string;
}

interface OnlineUsersProps {
  users: User[];
}

const OnlineUsers = ({ users }: OnlineUsersProps) => {
  // Filter and sort users: online first, then away, then offline
  const sortedUsers = [...users].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-esports-darker border-l border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold">Online Users</h2>
        <p className="text-sm text-gray-400">{users.filter(u => u.status === 'online').length} online</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {sortedUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-esports-purple text-white">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-esports-darker ${getStatusClass(user.status)}`} />
              </div>
              <div>
                <p className="font-medium text-white">{user.name}</p>
                {user.game && user.status === 'online' && (
                  <p className="text-xs text-gray-400">Playing {user.game}</p>
                )}
                {user.status === 'away' && (
                  <p className="text-xs text-gray-400">Away</p>
                )}
                {user.status === 'offline' && (
                  <p className="text-xs text-gray-400">Offline</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OnlineUsers;
