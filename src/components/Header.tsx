
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  
  // Change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-subtle py-4 px-6",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-soft" 
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-semibold">QR</span>
          </div>
          <h1 className="text-lg font-medium">PayQR</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Dashboard</a>
          <a href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Payments</a>
          <a href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">History</a>
          <a href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Support</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v.01"/>
              <path d="M12 8v4"/>
            </svg>
          </button>
          
          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground text-xs font-semibold">AJ</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
