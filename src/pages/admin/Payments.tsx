
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { 
  Wallet, 
  CreditCard, 
  DollarSign, 
  RefreshCcw, 
  CheckCircle, 
  Clock, 
  Ban,
  Download,
  ExternalLink,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  Filter
} from "lucide-react";

const AdminPayments = () => {
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const refundForm = useForm();
  
  // Mock data - in a real app, this would come from your backend
  const transactions = [
    {
      id: "TXN-12345",
      user: "Rahul Sharma",
      amount: "₹500",
      date: "2023-09-15",
      type: "tournament_entry",
      tournament: "Battle Royale Championship",
      status: "completed",
      payment_method: "credit_card"
    },
    {
      id: "TXN-12346",
      user: "Priya Patel",
      amount: "₹300",
      date: "2023-09-16",
      type: "tournament_entry",
      tournament: "League Masters Cup",
      status: "completed",
      payment_method: "wallet"
    },
    {
      id: "TXN-12347",
      user: "Amit Kumar",
      amount: "₹1,000",
      date: "2023-09-17",
      type: "wallet_deposit",
      tournament: "-",
      status: "completed",
      payment_method: "upi"
    },
    {
      id: "TXN-12348",
      user: "Sneha Gupta",
      amount: "₹2,500",
      date: "2023-09-17",
      type: "prize_payout",
      tournament: "CS:GO Pro Series",
      status: "pending",
      payment_method: "bank_transfer"
    },
    {
      id: "TXN-12349",
      user: "Deepak Singh",
      amount: "₹400",
      date: "2023-09-18",
      type: "tournament_entry",
      tournament: "CS:GO Pro Series",
      status: "failed",
      payment_method: "credit_card"
    }
  ];
  
  const openRefundDialog = (transaction: any) => {
    setSelectedTransaction(transaction);
    setRefundDialogOpen(true);
  };
  
  const handleRefund = () => {
    toast({
      title: "Refund Initiated",
      description: `Refund for transaction ${selectedTransaction?.id} has been initiated.`,
    });
    setRefundDialogOpen(false);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-esports-green text-white">
          <CheckCircle className="mr-1 h-3 w-3" />
          Completed
        </span>;
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-esports-yellow text-black">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </span>;
      case "failed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-esports-red text-white">
          <Ban className="mr-1 h-3 w-3" />
          Failed
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-white">
          Unknown
        </span>;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tournament_entry":
        return <CreditCard className="h-4 w-4 text-esports-blue" />;
      case "wallet_deposit":
        return <ArrowUpCircle className="h-4 w-4 text-esports-green" />;
      case "prize_payout":
        return <ArrowDownCircle className="h-4 w-4 text-esports-yellow" />;
      default:
        return <DollarSign className="h-4 w-4 text-esports-purple" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payment & Wallet Management</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Transactions
        </Button>
      </div>

      {/* Payment Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-esports-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹87,500</div>
            <p className="text-xs text-muted-foreground">
              +11% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-esports-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹32,150</div>
            <p className="text-xs text-muted-foreground">
              Across 325 active wallets
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-esports-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹15,500</div>
            <p className="text-xs text-muted-foreground">
              8 transactions awaiting approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payments & Wallet Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid grid-cols-3 bg-esports-card">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="wallet">User Wallets</TabsTrigger>
          <TabsTrigger value="payouts">Prize Payouts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10 bg-esports-card border-gray-800"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-esports-card border-gray-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="bg-esports-card border-gray-800">
                <Clock className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="rounded-md border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-esports-card">
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="bg-esports-card border-gray-800">
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTypeIcon(transaction.type)}
                        <span className="ml-2 capitalize">{transaction.type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.tournament}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        
                        {transaction.status === "completed" && transaction.type === "tournament_entry" && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openRefundDialog(transaction)}
                          >
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {transaction.status === "pending" && (
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="wallet" className="space-y-4">
          <div className="bg-esports-card p-8 rounded-lg border border-gray-800 text-center">
            <Wallet className="mx-auto h-12 w-12 text-esports-blue mb-4" />
            <h3 className="text-xl font-bold mb-2">User Wallet Management</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              View and manage user wallet balances, handle deposits and withdrawals, and track wallet activities.
            </p>
            <Button>
              View User Wallets
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payouts" className="space-y-4">
          <div className="bg-esports-card p-8 rounded-lg border border-gray-800 text-center">
            <DollarSign className="mx-auto h-12 w-12 text-esports-yellow mb-4" />
            <h3 className="text-xl font-bold mb-2">Prize Payout Management</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Manage tournament prize distributions, approve payouts, and track payment status to winners.
            </p>
            <Button>
              View Pending Payouts
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Refund Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-esports-blue" />
              Process Refund
            </DialogTitle>
            <DialogDescription>
              You are about to refund this transaction to the user's account.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <>
              <div className="bg-esports-darker p-4 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">User:</span>
                  <span className="font-medium">{selectedTransaction.user}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="font-medium">{selectedTransaction.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tournament:</span>
                  <span className="font-medium">{selectedTransaction.tournament}</span>
                </div>
              </div>
              
              <Form {...refundForm}>
                <FormField
                  control={refundForm.control}
                  name="refundReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for refund</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Tournament canceled, user request, etc."
                          className="bg-esports-darker border-gray-700"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Form>
              
              <div className="bg-esports-darker p-4 rounded-md text-sm">
                <p className="font-medium">Note:</p>
                <p className="text-muted-foreground">Refunds will be processed to the user's Battle Mitra wallet. The user will be notified via email when the refund is completed.</p>
              </div>
              
              <DialogFooter className="gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setRefundDialogOpen(false)}
                  className="bg-esports-darker border-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRefund}
                >
                  Process Refund
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;
