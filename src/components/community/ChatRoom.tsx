
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  user: User;
  likes: number;
  replies: number;
}

interface ChatRoomProps {
  roomId: string;
  roomName: string;
  initialMessages?: Message[];
}

const ChatRoom = ({ roomId, roomName, initialMessages = [] }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [replyingTo, setReplyingTo] = useState<{ id: string; user: string } | null>(null);
  
  // Mock current user
  const currentUser: User = {
    id: "current-user",
    name: "You",
    avatarUrl: "/placeholder.svg"
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    const scrollArea = document.querySelector('.chat-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      user: currentUser,
      likes: 0,
      replies: 0
    };
    
    setMessages([...messages, newMessage]);
    setReplyingTo(null);
  };

  const handleReply = (messageId: string) => {
    const messageToReply = messages.find(msg => msg.id === messageId);
    if (messageToReply) {
      setReplyingTo({
        id: messageId,
        user: messageToReply.user.name
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader roomName={roomName} participantCount={23} />
      
      <ScrollArea className="flex-1 p-4 chat-scroll-area">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
      />
    </div>
  );
};

export default ChatRoom;
