
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { Input } from "@/components/ui/input";

interface AddFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (amount: number) => void;
}

const AddFundsDialog = ({
  open,
  onOpenChange,
  onSubmit
}: AddFundsDialogProps) => {
  const [paymentTab, setPaymentTab] = useState<string>("payment");
  const [amount, setAmount] = useState<number>(100);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };

  const handleSubmit = () => {
    onSubmit(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-esports-card border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Select amount and payment method
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-md bg-esports-darker p-4 mb-4">
            <div className="flex flex-col space-y-4">
              <label className="text-gray-400">Amount (₹)</label>
              <Input 
                type="number" 
                value={amount} 
                onChange={handleAmountChange}
                className="bg-gray-800 border-gray-700"
                min={100}
              />
            </div>
          </div>

          <Tabs defaultValue="payment" value={paymentTab} onValueChange={setPaymentTab} className="w-full">
            <TabsList className="grid grid-cols-1 mb-4">
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Payment Method</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="mt-0">
              <PaymentMethodSelector />
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="bg-gray-700" />

        <DialogFooter className="flex sm:justify-between gap-3 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-700 hover:bg-gray-800">
            Cancel
          </Button>
          <Button 
            className="bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90"
            onClick={handleSubmit}
          >
            Add ₹{amount}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
