
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { chatService, ChatMessage as ChatMessageType } from "@/services/chatService";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const messagesLoadedRef = useRef(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial messages with improved error handling
  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId || messagesLoadedRef.current) return;
      
      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      // Set up timeout to prevent endless loading
      loadingTimeoutRef.current = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setLoadingError("Loading took too long. Please try refreshing.");
          toast({
            title: "Loading timeout",
            description: "Chat messages took too long to load. Please try again.",
            variant: "destructive"
          });
        }
      }, 6000); // 6 seconds timeout (reduced from 10)
      
      try {
        setLoading(true);
        setLoadingError(null);
        
        const data = await chatService.getChatMessages(roomId);
        setMessages(data);
        messagesLoadedRef.current = true;
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoadingError("Failed to load chat messages");
        toast({
          title: "Error loading messages",
          description: "Failed to load chat messages. Please try refreshing.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
      }
    };

    if (roomId) {
      messagesLoadedRef.current = false;
      fetchMessages();
    }

    // Clean up on unmount or room change
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
      
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    };
  }, [roomId, toast]);

  // Subscribe to new messages with improved error handling
  useEffect(() => {
    if (!roomId) return;
    
    // First unsubscribe from any existing channel
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    try {
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
    } catch (error) {
      console.error("Error subscribing to room:", error);
      toast({
        title: "Connection error",
        description: "Failed to connect to chat room. Please refresh the page.",
        variant: "destructive"
      });
    }
    
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, [roomId, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current && !loading) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, loading]);

  const handleSendMessage = async (content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      console.log("Sending message to room:", roomId);
      const newMessage = await chatService.sendMessage(
        roomId, 
        content,
        user.id,
        replyingTo?.id
      );
      
      console.log("Message sent successfully:", newMessage);
      
      // Add the message to local state to ensure UI updates immediately
      setMessages(prev => {
        if (prev.some(msg => msg.id === newMessage.id)) {
          return prev;
        }
        return [...prev, newMessage];
      });
      
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
        const newLikesCount = liked ? (message.likes || 0) + 1 : Math.max(0, (message.likes || 0) - 1);
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

  const renderChatContent = () => {
    if (loading) {
      return (
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (loadingError) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="mb-4">{loadingError}</p>
            <Button 
              onClick={() => {
                messagesLoadedRef.current = false;
                setLoading(true);
                setLoadingError(null);
                chatService.getChatMessages(roomId)
                  .then(data => {
                    setMessages(data);
                    messagesLoadedRef.current = true;
                  })
                  .catch(err => {
                    console.error("Retry error:", err);
                    setLoadingError("Failed to load messages again. Please try later.");
                  })
                  .finally(() => setLoading(false));
              }}
              className="px-4 py-2 bg-esports-purple rounded-md text-white hover:bg-esports-purple/90 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }
    
    if (messages.length === 0) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      );
    }
    
    return (
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
    );
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader roomName={roomName} participantCount={23} />
      
      <ScrollArea className="flex-1 p-4 chat-scroll-area" ref={scrollAreaRef}>
        {renderChatContent()}
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
