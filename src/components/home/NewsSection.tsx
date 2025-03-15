
import { Link } from "react-router-dom";
import { Newspaper, ChevronRight } from "lucide-react";
import { news } from "@/data/mockData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NewsSection = () => {
  return (
    <section className="py-16 bg-esports-darker">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Newspaper className="text-esports-purple h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">Latest News</h2>
          </div>
          <Link
            to="/news"
            className="flex items-center text-esports-purple hover:text-esports-purple/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card 
              key={item.id} 
              className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300 overflow-hidden group"
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
              
              <CardContent className="py-4">
                <div className="text-sm text-gray-400 mb-2">
                  {item.date} • By {item.author}
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-esports-purple transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">{item.excerpt}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
