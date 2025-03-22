
import { Order } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  order: Order;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order, className }) => {
  return (
    <div className={cn("rounded-2xl glassmorphism p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-xs font-medium",
          order.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
          order.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
        )}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-medium">{order.id}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Customer</span>
          <span className="font-medium">{order.customerName}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Date</span>
          <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="border-t border-border pt-4 mb-6">
        <h3 className="text-sm font-medium mb-4">Items</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">{item.quantity}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
              </div>
              <span className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
