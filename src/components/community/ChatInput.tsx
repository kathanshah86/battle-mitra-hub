
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  replyingTo?: {
    id: string;
    user: string;
  } | null;
  onCancelReply?: () => void;
}

const ChatInput = ({ onSendMessage, replyingTo, onCancelReply }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-esports-card border-t border-gray-800 p-4 sticky bottom-0">
      {replyingTo && (
        <div className="mb-2 bg-esports-darker p-2 rounded-md flex justify-between items-center">
          <p className="text-sm text-gray-300">
            Replying to <span className="text-esports-purple font-medium">{replyingTo.user}</span>
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-gray-400 hover:text-white p-0"
            onClick={onCancelReply}
          >
            Cancel
          </Button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Textarea
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[60px] resize-none bg-esports-darker border-gray-700 focus:border-esports-purple"
          />
          <div className="absolute bottom-2 left-2 flex gap-2">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <Image className="h-5 w-5" />
              <span className="sr-only">Upload image</span>
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <Smile className="h-5 w-5" />
              <span className="sr-only">Emoji</span>
            </Button>
          </div>
        </div>
        <Button type="submit" className="bg-esports-purple hover:bg-esports-purple/90">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
