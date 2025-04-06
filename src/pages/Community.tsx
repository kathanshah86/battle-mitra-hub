
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChatRoomList from "@/components/community/ChatRoomList";
import ChatRoom from "@/components/community/ChatRoom";
import OnlineUsers from "@/components/community/OnlineUsers";
import { chatService, ChatRoom as ChatRoomType } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for online users until we implement user presence
const mockOnlineUsers = [
  { id: "user1", name: "Rajesh", status: "online" as const, game: "BGMI" },
  { id: "user2", name: "Priya", status: "online" as const },
  { id: "user3", name: "Vikram", status: "away" as const },
  { id: "user4", name: "Amit", status: "online" as const, game: "Free Fire" },
  { id: "user5", name: "Neha", status: "offline" as const },
  { id: "user6", name: "Suresh", status: "online" as const },
  { id: "user7", name: "Divya", status: "offline" as const },
  { id: "user8", name: "Karan", status: "online" as const }
];

const Community = () => {
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [activeChat, setActiveChat] = useState<ChatRoomType | null>(null);
  const [showOnlineUsers, setShowOnlineUsers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);

  // Initialize from local storage if available
  useEffect(() => {
    // Try to recover active chat from localStorage
    const savedChatId = localStorage.getItem('activeChat');
    if (savedChatId) {
      // We'll populate this once we fetch the rooms
      console.log('Found saved chat:', savedChatId);
    }
  }, []);

  const fetchChatRooms = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Add a shorter timeout for better UX
      const timeoutId = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setError("Loading took too long. Please refresh and try again.");
          toast({
            title: "Loading timeout",
            description: "Chat rooms took too long to load. Please try again.",
            variant: "destructive"
          });
        }
      }, 3000); // 3 seconds timeout (reduced from 5)
      
      const rooms = await chatService.getChatRooms();
      
      // Clear timeout as we've got data
      clearTimeout(timeoutId);
      
      if (rooms.length === 0) {
        setError("No chat rooms found");
      } else {
        setChatRooms(rooms);
        
        // Try to restore the previously active chat
        const savedChatId = localStorage.getItem('activeChat');
        if (savedChatId) {
          const savedRoom = rooms.find(r => r.id === savedChatId);
          if (savedRoom) {
            setActiveChat(savedRoom);
          } else {
            // Fall back to first room if saved room not found
            setActiveChat(rooms[0]);
          }
        } else if (!activeChat) {
          // Set the first room as active by default if no active chat
          setActiveChat(rooms[0]);
        }
      }
      
      // Reset retry count on success
      setRetryCount(0);
    } catch (err) {
      console.error("Failed to fetch chat rooms:", err);
      setError("Failed to load chat rooms. Please try again later.");
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
      
      // Only show toast for first few errors to avoid spamming
      if (retryCount < 2) {
        toast({
          title: "Error loading chat rooms",
          description: "Please refresh and try again",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast, loading, activeChat, retryCount, user]);

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchChatRooms();
    }
  }, [user, fetchChatRooms]);

  // Auto-retry with shorter delay
  useEffect(() => {
    if (error && retryCount > 0 && retryCount < 3) {
      // Shorter timeout for better UX (max 5 seconds)
      const timeout = Math.min(1000 * Math.pow(1.5, retryCount - 1), 5000);
      console.log(`Will retry in ${timeout}ms`);
      
      const retryTimer = setTimeout(() => {
        console.log(`Auto-retrying fetch (attempt ${retryCount})...`);
        fetchChatRooms();
      }, timeout);
      
      return () => clearTimeout(retryTimer);
    }
  }, [error, retryCount, fetchChatRooms]);

  // Handle room selection
  const handleRoomSelect = (roomId: string) => {
    const room = chatRooms.find(r => r.id === roomId);
    if (room) {
      console.log("Selected room:", room.name);
      setActiveChat(room);
      
      // Save active chat to localStorage
      localStorage.setItem('activeChat', room.id);
      
      // Reset any errors when changing rooms
      setError(null);
    }
  };

  // Login screen if not authenticated
  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-esports-dark flex items-center justify-center">
          <Card className="w-full max-w-md bg-esports-card border-gray-800 p-6 text-center">
            <h2 className="text-2xl font-bold font-orbitron mb-4">Join the Community</h2>
            <p className="text-gray-300 mb-6">
              Log in to chat with other gamers, find teammates, and discuss tournaments.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="border-gray-700" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-esports-purple to-esports-blue" asChild>
                <Link to="/auth?tab=register">Create Account</Link>
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  const renderRoomsSection = () => {
    if (loading && chatRooms.length === 0) {
      return (
        <div className="h-full flex flex-col bg-esports-darker p-4">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );
    }
    
    if (error && chatRooms.length === 0) {
      return (
        <div className="h-full flex items-center justify-center bg-esports-darker p-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={fetchChatRooms}
              className="border-gray-700 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <ChatRoomList 
        rooms={chatRooms} 
        onSelectRoom={handleRoomSelect}
        activeChatId={activeChat?.id || ""}
      />
    );
  };

  const renderChatSection = () => {
    if (loading && chatRooms.length === 0) {
      return (
        <div className="h-full flex flex-col bg-esports-card">
          <div className="h-16 px-4 border-b border-gray-800 flex items-center bg-esports-darker">
            <Skeleton className="h-8 w-1/4" />
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-800">
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      );
    }
    
    if (error && chatRooms.length === 0) {
      return (
        <div className="h-full flex items-center justify-center bg-esports-card">
          <div className="text-center">
            <p className="text-gray-400 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={fetchChatRooms}
              className="border-gray-700 flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      );
    }
    
    if (!activeChat) {
      return (
        <div className="h-full flex items-center justify-center bg-esports-card">
          <p className="text-gray-400">Select a chat room to start messaging</p>
        </div>
      );
    }
    
    return (
      <ChatRoom 
        roomId={activeChat.id}
        roomName={activeChat.name}
      />
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-esports-dark">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold font-orbitron mb-6">Community Chat</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-[calc(100vh-220px)] rounded-lg overflow-hidden border border-gray-800">
            {/* Chat Room List - Left Sidebar */}
            <div className="lg:col-span-2 h-full">
              {renderRoomsSection()}
            </div>
            
            {/* Main Chat Area */}
            <div className="lg:col-span-7 h-full">
              {renderChatSection()}
            </div>
            
            {/* Online Users - Right Sidebar */}
            {showOnlineUsers && (
              <div className="hidden lg:block lg:col-span-3 h-full">
                <OnlineUsers users={mockOnlineUsers} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Community;
