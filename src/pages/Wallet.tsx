import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WalletPaymentDialog from "@/components/wallet/WalletPaymentDialog";
import PaymentMethodSelector from "@/components/wallet/PaymentMethodSelector";
import { 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  IndianRupee, 
  AlertCircle 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const WalletPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showAddFunds, setShowAddFunds] = useState(false);
  
  // Mock wallet balance and transactions
  const walletBalance = 500;
  const transactions = [
    { id: 1, type: "deposit", amount: 200, date: "2024-03-20", status: "completed", description: "Added funds" },
    { id: 2, type: "withdrawal", amount: 50, date: "2024-03-19", status: "completed", description: "Tournament entry fee" },
    { id: 3, type: "deposit", amount: 350, date: "2024-03-18", status: "completed", description: "Added funds" },
  ];

  const handleAddFunds = (amount: number) => {
    toast({
      title: "Processing payment",
      description: `Adding ₹${amount} to your wallet.`,
    });
    setShowAddFunds(false);
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-esports-dark flex items-center justify-center">
          <Card className="w-full max-w-md bg-esports-card border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-orbitron">Authentication Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">Please log in to access your wallet.</p>
              <Button className="bg-gradient-to-r from-esports-purple to-esports-blue">
                Login to Continue
              </Button>
            </CardContent>
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
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold font-orbitron mb-8 text-white">
            Wallet
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-esports-card border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Wallet className="h-6 w-6 mr-2 text-esports-purple" />
                    <h3 className="text-lg font-semibold">Balance</h3>
                  </div>
                </div>
                <p className="text-3xl font-bold mb-4">₹{walletBalance}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-esports-purple to-esports-blue"
                  onClick={() => setShowAddFunds(true)}
                >
                  Add Funds
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-esports-card border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 mr-2 text-esports-purple" />
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                </div>
                <p className="text-gray-400 mb-4">Manage your payment methods</p>
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                  Manage Methods
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-esports-card border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 mr-2 text-esports-purple" />
                  <h3 className="text-lg font-semibold">Need Help?</h3>
                </div>
                <p className="text-gray-400 mb-4">Contact our support team</p>
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-esports-card border-gray-800 overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
              
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="bg-esports-darker border border-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-esports-purple data-[state=active]:text-white">All</TabsTrigger>
                  <TabsTrigger value="deposits" className="data-[state=active]:bg-esports-purple data-[state=active]:text-white">Deposits</TabsTrigger>
                  <TabsTrigger value="withdrawals" className="data-[state=active]:bg-esports-purple data-[state=active]:text-white">Withdrawals</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between border-b border-gray-800 pb-4">
                        <div className="flex items-center">
                          {transaction.type === 'deposit' ? (
                            <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
                              <ArrowDownLeft className="h-5 w-5 text-green-500" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                              <ArrowUpRight className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-400">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount}
                          </p>
                          <p className="text-xs text-gray-400 uppercase">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="deposits" className="mt-4">
                  <div className="space-y-4">
                    {transactions
                      .filter(t => t.type === 'deposit')
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between border-b border-gray-800 pb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
                              <ArrowDownLeft className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-400">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-500">+₹{transaction.amount}</p>
                            <p className="text-xs text-gray-400 uppercase">{transaction.status}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="withdrawals" className="mt-4">
                  <div className="space-y-4">
                    {transactions
                      .filter(t => t.type === 'withdrawal')
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between border-b border-gray-800 pb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                              <ArrowUpRight className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-400">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-red-500">-₹{transaction.amount}</p>
                            <p className="text-xs text-gray-400 uppercase">{transaction.status}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      {/* Add Funds Dialog */}
      {showAddFunds && (
        <WalletPaymentDialog
          open={showAddFunds}
          onOpenChange={setShowAddFunds}
          tournamentName="Add Funds"
          username={user?.email || ""}
          entryFee={0}
          onConfirmPayment={() => handleAddFunds(100)}
          onCancel={() => setShowAddFunds(false)}
        />
      )}
    </>
  );
};

export default WalletPage;
