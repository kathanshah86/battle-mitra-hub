
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import UpcomingTournaments from "@/components/home/UpcomingTournaments";
import LiveMatches from "@/components/home/LiveMatches";
import SponsorsSection from "@/components/home/SponsorsSection";
import TopPlayers from "@/components/home/TopPlayers";
import NewsSection from "@/components/home/NewsSection";
import JoinCommunity from "@/components/home/JoinCommunity";
import Footer from "@/components/Footer";
import { StrategyAssistant } from "@/components/game/StrategyAssistant";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold">Get Better at Your Game</h2>
              <p className="text-muted-foreground">
                Need help improving your gameplay? Try our AI Strategy Assistant to get personalized tips and advice.
              </p>
              <StrategyAssistant />
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 shadow-lg">
              <img src="/placeholder.svg" alt="Strategy" className="w-full h-auto rounded" />
            </div>
          </div>
          
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
