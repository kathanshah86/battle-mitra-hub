
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { chatService, ChatMessage as ChatMessageType } from "@/services/chatService";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface ChatRoomProps {
  roomId: string;
  roomName: string;
}

const ChatRoom = ({ roomId, roomName }: ChatRoomProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [replyingTo, setReplyingTo] = useState<{ id: string; user: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Load initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await chatService.getChatMessages(roomId);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error loading messages",
          description: "Failed to load chat messages",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Clean up on unmount or room change
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [roomId]);

  // Subscribe to new messages
  useEffect(() => {
    // First unsubscribe from any existing channel
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    // Then subscribe to the current room
    channelRef.current = chatService.subscribeToRoom(roomId, (newMessage) => {
      setMessages(prevMessages => {
        // Check if message already exists to prevent duplicates
        if (prevMessages.some(msg => msg.id === newMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    });
  }, [roomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      await chatService.sendMessage(
        roomId, 
        content,
        user.id,
        replyingTo?.id
      );
      
      // The new message will be received through the subscription
      setReplyingTo(null);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleReply = (messageId: string) => {
    const messageToReply = messages.find(msg => msg.id === messageId);
    if (messageToReply) {
      setReplyingTo({
        id: messageId,
        user: messageToReply.user?.name || "User"
      });
    }
  };

  const handleLike = async (messageId: string, liked: boolean) => {
    if (!user) return;
    
    try {
      const message = messages.find(msg => msg.id === messageId);
      if (message) {
        const newLikesCount = liked ? message.likes + 1 : message.likes - 1;
        await chatService.updateMessage(messageId, { likes: newLikesCount });
        
        // Update the local state
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === messageId ? { ...msg, likes: newLikesCount } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader roomName={roomName} participantCount={23} />
      
      <ScrollArea className="flex-1 p-4 chat-scroll-area" ref={scrollAreaRef}>
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-esports-purple" />
          </div>
        ) : messages.length === 0 ? (
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
                onLike={handleLike}
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
