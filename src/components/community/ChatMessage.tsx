
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, MessageSquare, Flag } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/services/chatService";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  message: ChatMessageType;
  onReply: (messageId: string) => void;
  onLike?: (messageId: string, liked: boolean) => void;
}

const ChatMessage = ({ message, onReply, onLike }: ChatMessageProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (onLike) {
      const newLiked = !liked;
      setLiked(newLiked);
      onLike(message.id, newLiked);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "some time ago";
    }
  };

  return (
    <Card className="p-4 bg-esports-card border-gray-800 mb-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.user?.avatar_url} alt={message.user?.name || ''} />
          <AvatarFallback className="bg-esports-purple text-white">
            {getInitials(message.user?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">{message.user?.name || 'Unknown User'}</p>
              <p className="text-xs text-gray-400">
                {formatTime(message.created_at)}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <Flag className="h-4 w-4" />
              <span className="sr-only">Report</span>
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-gray-200">{message.content}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${liked ? 'text-esports-purple' : 'text-gray-400'}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{message.likes || 0}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-400"
              onClick={() => onReply(message.id)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Reply</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatMessage;
