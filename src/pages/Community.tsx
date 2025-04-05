
import { useState, useEffect } from "react";
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
  const { toast } = useToast();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        setLoading(true);
        const rooms = await chatService.getChatRooms();
        console.log("Fetched chat rooms:", rooms);
        setChatRooms(rooms);
        
        // Set the first room as active by default
        if (rooms.length > 0 && !activeChat) {
          setActiveChat(rooms[0]);
        }
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
        toast({
          title: "Error loading chat rooms",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChatRooms();
    }
  }, [user, toast, activeChat]);

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-esports-dark">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold font-orbitron mb-6">Community Chat</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-[calc(100vh-220px)] rounded-lg overflow-hidden border border-gray-800">
            {/* Chat Room List - Left Sidebar */}
            <div className="lg:col-span-2 h-full">
              {loading ? (
                <div className="h-full flex items-center justify-center bg-esports-darker">
                  <p className="text-gray-400">Loading rooms...</p>
                </div>
              ) : (
                <ChatRoomList 
                  rooms={chatRooms} 
                  onSelectRoom={(roomId) => {
                    const room = chatRooms.find(r => r.id === roomId);
                    if (room) setActiveChat(room);
                  }}
                  activeChatId={activeChat?.id || ""}
                />
              )}
            </div>
            
            {/* Main Chat Area */}
            <div className="lg:col-span-7 h-full">
              {!activeChat ? (
                <div className="h-full flex items-center justify-center bg-esports-card">
                  <p className="text-gray-400">Select a chat room to start messaging</p>
                </div>
              ) : (
                <ChatRoom 
                  roomId={activeChat.id}
                  roomName={activeChat.name}
                />
              )}
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
