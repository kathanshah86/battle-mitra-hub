
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  PhoneCall, 
  Mail, 
  MapPin,
  Search,
  ChevronDown
} from "lucide-react";

const Support = () => {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    });
  };

  const faqs = [
    {
      question: "How do I register for a tournament?",
      answer: "To register for a tournament, navigate to the tournament page, click the 'Register Now' button, and follow the instructions. You'll need to have a Battle Mitra account and sufficient wallet balance if there's an entry fee."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, net banking, and popular digital wallets for adding funds to your Battle Mitra wallet. All tournament registrations and purchases are made through your wallet balance."
    },
    {
      question: "How are prizes distributed?",
      answer: "Prize distribution varies by tournament. Cash prizes are credited directly to your Battle Mitra wallet, usually within 24-48 hours after the tournament concludes. You can then withdraw the funds to your linked bank account."
    },
    {
      question: "What if I face technical issues during a tournament?",
      answer: "If you encounter technical issues during a tournament, take screenshots of the problem, and contact our support team immediately through the 'Report Issue' button in the tournament interface. Our team will assist you promptly."
    },
    {
      question: "Can I cancel my tournament registration and get a refund?",
      answer: "You can cancel your registration up to 12 hours before the tournament starts. The entry fee will be refunded to your wallet. Cancellations made less than 12 hours before the start time are not eligible for refunds."
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-esports-dark">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-8 text-white">
            Support Center
          </h1>

          <Tabs defaultValue="faq" className="mb-8">
            <TabsList className="bg-esports-darker border border-gray-800 mb-6">
              <TabsTrigger 
                value="faq" 
                className="data-[state=active]:bg-esports-purple data-[state=active]:text-white"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger 
                value="contact" 
                className="data-[state=active]:bg-esports-purple data-[state=active]:text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger 
                value="guides" 
                className="data-[state=active]:bg-esports-purple data-[state=active]:text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Help Guides
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <Card className="bg-esports-card border-gray-800 overflow-hidden mb-8">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search FAQs..."
                        className="pl-10 bg-esports-darker border-gray-700"
                      />
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-800 rounded-lg overflow-hidden"
                      >
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer p-4 bg-esports-darker hover:bg-gray-800 transition-colors">
                            <h3 className="font-medium text-white">{faq.question}</h3>
                            <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="p-4 border-t border-gray-800 text-gray-300">
                            <p>{faq.answer}</p>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center p-6 bg-esports-card border border-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-gray-400 mb-4">Our support team is here to help you.</p>
                <Button className="bg-gradient-to-r from-esports-purple to-esports-blue">
                  Contact Support
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-esports-card border-gray-800 col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <Input id="name" className="bg-esports-darker border-gray-700" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <Input id="email" type="email" className="bg-esports-darker border-gray-700" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject
                        </label>
                        <Input id="subject" className="bg-esports-darker border-gray-700" />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <Textarea 
                          id="message" 
                          rows={5} 
                          className="bg-esports-darker border-gray-700" 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-esports-purple to-esports-blue"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="bg-esports-card border-gray-800">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Reach out to us through the following channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-esports-purple/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="h-5 w-5 text-esports-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-400">support@battlemitra.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-esports-purple/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <PhoneCall className="h-5 w-5 text-esports-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-gray-400">+91 1234 567890</p>
                        <p className="text-xs text-gray-500">Mon-Fri, 10AM-7PM IST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-esports-purple/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-esports-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium">Office Address</h4>
                        <p className="text-gray-400">
                          Battle Mitra Gaming Pvt. Ltd.<br />
                          123 Cyber Hub, Sector 21<br />
                          Gurugram, Haryana 122001
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Getting Started Guide</CardTitle>
                    <CardDescription>Learn the basics of using Battle Mitra</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      This guide covers account creation, profile setup, and how to join your first tournament.
                    </p>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Tournament Rules</CardTitle>
                    <CardDescription>Understanding tournament formats and rules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Learn about different tournament formats, scoring systems, and competitive rules.
                    </p>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Payment & Withdrawals</CardTitle>
                    <CardDescription>Managing your Battle Mitra wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Everything you need to know about adding funds and withdrawing winnings.
                    </p>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Technical Requirements</CardTitle>
                    <CardDescription>Device and connection specifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Recommended hardware, internet requirements, and supported browsers.
                    </p>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Game Integration</CardTitle>
                    <CardDescription>Connecting game accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      How to link your game accounts for seamless tournament participation.
                    </p>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-esports-card border-gray-800 hover:border-esports-purple/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Community Guidelines</CardTitle>
                    <CardDescription>Rules for fair play and conduct</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">
                      Our code of conduct and guidelines for a positive gaming community.
                    </p>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Support;
