
import { useState } from "react";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PaymentMethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("upi");

  return (
    <Card className="bg-esports-darker border-gray-700 p-4">
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={setSelectedMethod}
        className="space-y-3"
      >
        <div className={`flex items-start space-x-3 rounded-md p-3 cursor-pointer ${
          selectedMethod === "upi" ? "bg-esports-card" : "hover:bg-esports-card/50"
        }`}>
          <RadioGroupItem value="upi" id="upi" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer mb-2">
              <Smartphone className="h-4 w-4" />
              <span>UPI</span>
            </Label>
            {selectedMethod === "upi" && (
              <div className="mt-2">
                <Input 
                  placeholder="Enter UPI ID (e.g. name@bank)" 
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            )}
          </div>
        </div>

        <div className={`flex items-start space-x-3 rounded-md p-3 cursor-pointer ${
          selectedMethod === "card" ? "bg-esports-card" : "hover:bg-esports-card/50"
        }`}>
          <RadioGroupItem value="card" id="card" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="h-4 w-4" />
              <span>Credit/Debit Card</span>
            </Label>
            {selectedMethod === "card" && (
              <div className="text-xs text-gray-400 mt-1">
                You'll be redirected to secure payment gateway
              </div>
            )}
          </div>
        </div>

        <div className={`flex items-start space-x-3 rounded-md p-3 cursor-pointer ${
          selectedMethod === "netbanking" ? "bg-esports-card" : "hover:bg-esports-card/50"
        }`}>
          <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
              <Landmark className="h-4 w-4" />
              <span>Net Banking</span>
            </Label>
            {selectedMethod === "netbanking" && (
              <div className="text-xs text-gray-400 mt-1">
                Choose from all major banks
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
    </Card>
  );
};

export default PaymentMethodSelector;
