
import { useState } from "react";
import { Link } from "react-router-dom";
import { news } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(news.map((item) => item.category.toLowerCase())))];
  
  const filteredNews = activeCategory === "all" 
    ? news 
    : news.filter(item => item.category.toLowerCase() === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-esports-dark">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-8 text-white">
            Latest News & Updates
          </h1>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-esports-darker border border-gray-800 mb-6">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="data-[state=active]:bg-esports-purple data-[state=active]:text-white"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <Card 
                  key={item.id} 
                  className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300 overflow-hidden group h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-esports-purple text-white">{item.category}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="py-4 flex-grow">
                    <div className="text-sm text-gray-400 mb-2">
                      {item.date} • By {item.author}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-esports-purple transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Link 
                      to={`/news/${item.id}`} 
                      className="text-esports-purple hover:text-esports-purple/80 text-sm font-medium flex items-center"
                    >
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                No news found in this category.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default News;
