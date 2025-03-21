
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChatRoomList from "@/components/community/ChatRoomList";
import ChatRoom from "@/components/community/ChatRoom";
import OnlineUsers from "@/components/community/OnlineUsers";

// Mock data
const mockChatRooms = [
  { id: "general", name: "General", type: "general" as const, unread: 3 },
  { id: "tournaments", name: "Tournament Discussion", type: "general" as const },
  { id: "teams", name: "Find Team", type: "team" as const },
  { id: "bgmi-tactics", name: "BGMI Tactics", type: "game" as const, unread: 1 },
  { id: "feedback", name: "Site Feedback", type: "general" as const },
];

const mockMessages = [
  {
    id: "msg1",
    content: "Hi everyone! I'm new here, looking forward to joining some tournaments.",
    timestamp: new Date(Date.now() - 3600000 * 5),
    user: {
      id: "user1",
      name: "Rajesh",
      avatarUrl: "/placeholder.svg"
    },
    likes: 5,
    replies: 2
  },
  {
    id: "msg2",
    content: "Welcome! We have a Free Fire tournament starting soon, you should check it out.",
    timestamp: new Date(Date.now() - 3600000 * 4),
    user: {
      id: "user2",
      name: "Priya",
      avatarUrl: "/placeholder.svg"
    },
    likes: 3,
    replies: 1
  },
  {
    id: "msg3",
    content: "Does anyone here play BGMI? I'm looking for squad members for the upcoming championship.",
    timestamp: new Date(Date.now() - 3600000 * 2),
    user: {
      id: "user3",
      name: "Vikram",
      avatarUrl: "/placeholder.svg"
    },
    likes: 7,
    replies: 4
  },
  {
    id: "msg4",
    content: "The last CODM tournament was amazing. Did you guys see that final match?",
    timestamp: new Date(Date.now() - 3600000),
    user: {
      id: "user4",
      name: "Amit",
      avatarUrl: "/placeholder.svg"
    },
    likes: 10,
    replies: 3
  }
];

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
  const [activeChat, setActiveChat] = useState(mockChatRooms[0]);
  const [showOnlineUsers, setShowOnlineUsers] = useState(true);

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
              <ChatRoomList 
                rooms={mockChatRooms} 
                onSelectRoom={(roomId) => {
                  const room = mockChatRooms.find(r => r.id === roomId);
                  if (room) setActiveChat(room);
                }}
                activeChatId={activeChat.id}
              />
            </div>
            
            {/* Main Chat Area */}
            <div className="lg:col-span-7 h-full">
              <ChatRoom 
                roomId={activeChat.id}
                roomName={activeChat.name}
                initialMessages={mockMessages}
              />
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
