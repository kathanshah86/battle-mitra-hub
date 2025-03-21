
import { useParams, Link } from "react-router-dom";
import { news } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const newsItem = news.find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!newsItem) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-esports-dark flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">News article not found</h2>
            <Link to="/news">
              <Button variant="default">Back to News</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-esports-dark">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <Link 
              to="/news"
              className="inline-flex items-center text-esports-purple hover:text-esports-purple/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </div>

          <div className="bg-esports-card border border-gray-800 rounded-lg overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-esports-purple text-white mb-4">{newsItem.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{newsItem.title}</h1>
                <div className="flex items-center text-gray-300 text-sm">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {newsItem.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    By {newsItem.author}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                {newsItem.excerpt}
              </p>
              
              {/* Placeholder content since we don't have full content in mockData */}
              <div className="text-gray-300 space-y-4">
                <p>
                  {newsItem.content || `${newsItem.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Praesent euismod, nisl eget tempus ultricies, nunc nisl ultricies nunc, quis 
                  ultricies nisl nisl eget tempus ultricies, nunc nisl ultricies nunc, quis.`}
                </p>
                <p>
                  Morbi pharetra ante nibh, ac hendrerit ante pulvinar vel. Integer lacinia magna vel 
                  ante aliquam, id dignissim lorem pharetra. Nullam ultricies felis ut magna luctus, 
                  non dapibus dolor ultrices. Vivamus vel sagittis metus, a finibus sem.
                </p>
                <p>
                  Suspendisse potenti. Phasellus vitae lorem nisi. Vivamus maximus facilisis odio, 
                  id viverra velit facilisis non. Donec et ex aliquet, sollicitudin justo at, 
                  elementum nulla. Etiam sit amet elit id odio gravida volutpat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsDetail;
