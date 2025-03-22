
import { useState } from "react";
import { toast } from "sonner";
import { Order } from "@/utils/mockData";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CreditCard, Wallet, Building, BanknoteIcon } from "lucide-react";

interface PaymentFormProps {
  order: Order;
  className?: string;
  onUpdateCustomerName: (name: string) => void;
  onUpdatePaymentMethod: (method: string) => void;
}

const PaymentForm = ({ 
  order, 
  className,
  onUpdateCustomerName,
  onUpdatePaymentMethod
}: PaymentFormProps) => {
  const [customerName, setCustomerName] = useState(order.customerName);
  const [paymentMethod, setPaymentMethod] = useState(order.paymentMethod);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomerName(customerName);
    onUpdatePaymentMethod(paymentMethod);
    toast.success("Payment information updated");
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-4 w-4" />;
      case "Digital Wallet":
        return <Wallet className="h-4 w-4" />;
      case "Bank Transfer":
        return <Building className="h-4 w-4" />;
      case "Cash":
        return <BanknoteIcon className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("rounded-2xl glassmorphism p-6", className)}>
      <h2 className="text-xl font-semibold mb-4">Your Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customer-name">Your Name</Label>
          <Input
            id="customer-name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="grid grid-cols-1 gap-2"
          >
            {order.paymentOptions.map((method) => (
              <div 
                key={method}
                className={cn(
                  "flex items-center space-x-2 rounded-md border p-3 transition-colors",
                  paymentMethod === method ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                <RadioGroupItem value={method} id={`payment-${method}`} />
                <Label 
                  htmlFor={`payment-${method}`}
                  className="flex items-center gap-2 cursor-pointer font-normal flex-1"
                >
                  {getPaymentIcon(method)}
                  {method}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full">
          Update Payment Information
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
