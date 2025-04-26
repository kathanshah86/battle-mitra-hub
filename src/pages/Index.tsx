
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import UpcomingTournaments from "@/components/home/UpcomingTournaments";
import LiveMatches from "@/components/home/LiveMatches";
import SponsorsSection from "@/components/home/SponsorsSection";
import TopPlayers from "@/components/home/TopPlayers";
import NewsSection from "@/components/home/NewsSection";
import JoinCommunity from "@/components/home/JoinCommunity";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-12">
          <UpcomingTournaments />
          <LiveMatches />
        </div>
        
        <SponsorsSection />
        <TopPlayers />
        <NewsSection />
        <JoinCommunity />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
