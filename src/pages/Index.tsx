
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import QRCodeCard from '@/components/QRCodeCard';
import OrderSummary from '@/components/OrderSummary';
import PaymentDetails from '@/components/PaymentDetails';
import { mockOrder } from '@/utils/mockData';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(mockOrder);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      
      <main className="container pt-24 pb-16 px-4 sm:px-6">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading payment details...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-balance">Payment Request</h1>
                <p className="text-muted-foreground">
                  Complete your payment by scanning the QR code
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 animate-fade-in animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <QRCodeCard order={order} />
              </div>
              
              <div className="lg:col-span-4 animate-fade-in animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <OrderSummary order={order} />
              </div>
              
              <div className="lg:col-span-4 animate-fade-in animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <PaymentDetails order={order} />
              </div>
            </div>
          </>
        )}
      </main>
      
      <footer className="py-6 border-t border-border/40 backdrop-blur-sm bg-background/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2023 PayQR. All rights reserved.</p>
          <p className="text-xs mt-1">Secure payments powered by PayQR technology</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
