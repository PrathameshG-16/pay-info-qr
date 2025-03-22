
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Order, generateQRData } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface QRCodeCardProps {
  order: Order;
  className?: string;
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({ order, className }) => {
  const [isScanned, setIsScanned] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const qrData = generateQRData(order);
  
  // Demo animation for QR code scanning
  const simulateScan = () => {
    setShowAnimation(true);
    
    setTimeout(() => {
      setShowAnimation(false);
      setIsScanned(true);
      
      // Reset after a few seconds for demo purposes
      setTimeout(() => {
        setIsScanned(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div 
      className={cn(
        "rounded-2xl glassmorphism p-6 flex flex-col items-center text-center transition-all duration-500 ease-subtle",
        isScanned ? "bg-green-50/80 dark:bg-green-950/30 border-green-200 dark:border-green-800/40" : "",
        className
      )}
    >
      <div className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Scan to Pay
      </div>
      
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden p-3 bg-white shadow-soft mb-6 transition-all duration-300",
          showAnimation ? "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-green-200/50 after:to-transparent after:animate-shimmer" : "",
          isScanned ? "ring-2 ring-green-500/50" : ""
        )}
        onClick={simulateScan}
      >
        <div className={cn(
          "transition-all duration-500",
          isScanned ? "opacity-70" : "opacity-100"
        )}>
          <QRCodeSVG 
            value={qrData}
            size={200}
            level="H"
            fgColor={isScanned ? "#10b981" : "#000000"}
            className="rounded-md"
          />
        </div>
        
        {isScanned && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 animate-fade-in">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="text-sm font-medium text-green-700 mt-2">Scanned Successfully</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{order.id}</h3>
        <p className="text-sm text-muted-foreground">
          Total Amount: <span className="font-medium text-foreground">${order.total.toFixed(2)}</span>
        </p>
      </div>
      
      <button
        onClick={simulateScan}
        className={cn(
          "mt-6 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          isScanned 
            ? "bg-green-500 text-white hover:bg-green-600" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {isScanned ? "Payment Confirmed" : "Tap to Simulate Scan"}
      </button>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          {isScanned 
            ? "Payment has been processed successfully" 
            : "Scan with your banking app or payment service"}
        </p>
        <p className="mt-1 text-xs opacity-80">
          Enhanced QR contains full payment and order details
        </p>
      </div>
    </div>
  );
};

export default QRCodeCard;
