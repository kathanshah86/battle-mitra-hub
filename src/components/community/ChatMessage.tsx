
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, MessageSquare, Flag } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    timestamp: Date;
    user: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    likes: number;
    replies: number;
  };
  onReply: (messageId: string) => void;
}

const ChatMessage = ({ message, onReply }: ChatMessageProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(message.likes);

  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1);
      setLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    }
  };

  return (
    <Card className="p-4 bg-esports-card border-gray-800 mb-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.user.avatarUrl} alt={message.user.name} />
          <AvatarFallback className="bg-esports-purple text-white">
            {message.user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-white">{message.user.name}</p>
              <p className="text-xs text-gray-400">
                {message.timestamp.toLocaleString()}
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
              <span>{likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-400"
              onClick={() => onReply(message.id)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{message.replies}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatMessage;
