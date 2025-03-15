
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import UpcomingTournaments from "@/components/home/UpcomingTournaments";
import LiveMatches from "@/components/home/LiveMatches";
import TopPlayers from "@/components/home/TopPlayers";
import NewsSection from "@/components/home/NewsSection";
import JoinCommunity from "@/components/home/JoinCommunity";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-esports-dark">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <UpcomingTournaments />
        <LiveMatches />
        <TopPlayers />
        <NewsSection />
        <JoinCommunity />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
