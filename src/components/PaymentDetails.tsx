
import { Order } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PaymentDetailsProps {
  order: Order;
  className?: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order, className }) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 15,
    seconds: 0
  });
  
  useEffect(() => {
    // Countdown timer for payment expiration (for demo)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className={cn(
      "rounded-2xl glassmorphism p-6",
      className
    )}>
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      
      <div className="space-y-4">
        <div className="bg-secondary/50 rounded-lg p-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Amount Due</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              ${order.total.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground ml-2">USD</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Payment Method</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span className="font-medium text-sm">{order.paymentMethod}</span>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Expires In</span>
            <div className="font-medium text-sm">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Payment Instructions</span>
          <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
            <li>Open your banking app</li>
            <li>Scan the QR code</li>
            <li>Confirm the payment amount</li>
            <li>Complete the transaction</li>
          </ol>
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>Payment ID: {order.id}-PMT</p>
          <p className="mt-1">This QR code will expire in {timeLeft.minutes} minutes and {timeLeft.seconds} seconds.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
