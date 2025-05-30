import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { chatService, ChatMessage as ChatMessageType } from "@/services/chat";
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
  const [isConnected, setIsConnected] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const messagesLoadedRef = useRef(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionAttemptsRef = useRef(0);

  useEffect(() => {
    setMessages([]);
    setLoading(true);
    setLoadingError(null);
    setIsConnected(false);
    messagesLoadedRef.current = false;
    connectionAttemptsRef.current = 0;
    
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId || messagesLoadedRef.current) return;
      
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
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
      }, 8000);
      
      try {
        setLoading(true);
        setLoadingError(null);
        
        const data = await chatService.getChatMessages(roomId);
        setMessages(data);
        messagesLoadedRef.current = true;
        connectionAttemptsRef.current = 0;
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoadingError("Failed to load chat messages");
        
        connectionAttemptsRef.current += 1;
        
        const retryDelay = Math.min(2000 * connectionAttemptsRef.current, 10000);
        
        if (connectionAttemptsRef.current <= 3) {
          toast({
            title: "Retrying connection",
            description: `Attempting to reconnect (${connectionAttemptsRef.current}/3)...`,
            variant: "default"
          });
          
          setTimeout(() => {
            fetchMessages();
          }, retryDelay);
        } else {
          toast({
            title: "Error loading messages",
            description: "Failed to load chat messages. Please try refreshing.",
            variant: "destructive"
          });
        }
      } finally {
        setLoading(false);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
      }
    };

    if (roomId) {
      fetchMessages();
    }
  }, [roomId, toast, loading]);

  useEffect(() => {
    if (!roomId || !messagesLoadedRef.current) return;
    
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    try {
      channelRef.current = chatService.subscribeToRoom(roomId, (newMessage) => {
        setMessages(prevMessages => {
          if (prevMessages.some(msg => msg.id === newMessage.id)) {
            return prevMessages;
          }
          return [...prevMessages, newMessage];
        });
      });
      
      setIsConnected(true);
    } catch (error) {
      console.error("Error subscribing to room:", error);
      setIsConnected(false);
      toast({
        title: "Connection error",
        description: "Failed to connect to chat room. Please refresh the page.",
        variant: "destructive"
      });
    }
  }, [roomId, toast, messagesLoadedRef.current]);

  useEffect(() => {
    if (scrollAreaRef.current && !loading && messages.length > 0) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, loading]);

  const handleSendMessage = async (content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      const newMessage = await chatService.sendMessage(
        roomId, 
        content,
        user.id,
        replyingTo?.id
      );
      
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

  const connectionStatus = () => {
    if (!messagesLoadedRef.current) return null;
    
    if (!isConnected) {
      return (
        <div className="fixed bottom-20 right-6 bg-red-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
          Disconnected
        </div>
      );
    }
    return null;
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
      {connectionStatus()}
    </div>
  );
};

export default ChatRoom;
