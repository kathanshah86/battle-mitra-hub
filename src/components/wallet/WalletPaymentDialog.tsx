
import { useState } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface WalletPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentName: string;
  username: string;
  entryFee: number | string;
  onConfirmPayment: () => void;
  onCancel: () => void;
}

const WalletPaymentDialog = ({
  open,
  onOpenChange,
  tournamentName,
  username,
  entryFee,
  onConfirmPayment,
  onCancel
}: WalletPaymentDialogProps) => {
  const [paymentTab, setPaymentTab] = useState<string>("wallet");
  const walletBalance = 1000; // Mocked wallet balance - would come from user data in a real app
  const numericFee = typeof entryFee === 'string' 
    ? parseInt(entryFee.replace(/[^0-9]/g, ''), 10) 
    : entryFee;
  
  const hasEnoughBalance = walletBalance >= numericFee;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-esports-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Payment Confirmation</DialogTitle>
          <DialogDescription>
            Complete your registration for <span className="font-semibold text-white">{tournamentName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-md bg-esports-darker p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Tournament</span>
              <span className="font-medium">{tournamentName}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Game Username</span>
              <span className="font-medium">{username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Entry Fee</span>
              <span className="font-medium text-esports-yellow">₹{numericFee}</span>
            </div>
          </div>

          <Tabs defaultValue="wallet" value={paymentTab} onValueChange={setPaymentTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="wallet" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>Wallet</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Payment</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet" className="mt-0">
              <Card className="bg-esports-darker border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Wallet Balance</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-semibold">₹{walletBalance}</span>
                    {!hasEnoughBalance && (
                      <Badge variant="destructive" className="mt-1">Insufficient Balance</Badge>
                    )}
                  </div>
                </div>
                
                {!hasEnoughBalance && (
                  <Button className="w-full bg-gradient-to-r from-esports-purple to-esports-blue">
                    Add Money
                  </Button>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0">
              <PaymentMethodSelector />
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="bg-gray-700" />

        <DialogFooter className="flex sm:justify-between gap-3 sm:gap-0">
          <Button variant="outline" onClick={onCancel} className="border-gray-700 hover:bg-gray-800">
            Back
          </Button>
          <Button 
            className="bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90"
            disabled={paymentTab === "wallet" && !hasEnoughBalance}
            onClick={onConfirmPayment}
          >
            Pay & Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletPaymentDialog;
