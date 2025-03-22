export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentOptions: string[];
}

export const mockOrder: Order = {
  id: "ORD-2023-4872",
  customerName: "Alex Johnson",
  date: new Date().toISOString(),
  items: [
    {
      id: "ITEM-001",
      name: "Premium Headphones",
      quantity: 1,
      price: 249.99
    },
    {
      id: "ITEM-002",
      name: "Wireless Charger",
      quantity: 2,
      price: 39.99
    },
    {
      id: "ITEM-003",
      name: "Phone Case (Black)",
      quantity: 1,
      price: 29.99
    }
  ],
  subtotal: 359.96,
  tax: 28.80,
  total: 388.76,
  paymentMethod: "Credit Card",
  status: "pending",
  paymentOptions: ["Credit Card", "Bank Transfer", "Digital Wallet", "Cash"]
};

export const generateQRData = (order: Order): string => {
  const basicInfo = `ORDER: ${order.id}\nDATE: ${new Date(order.date).toLocaleDateString()}\nAMOUNT: $${order.total.toFixed(2)}`;
  
  const itemsList = order.items.map(item => 
    `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');
  
  return `${basicInfo}\n\n${itemsList}\n\nSUBTOTAL: $${order.subtotal.toFixed(2)}\nTAX: $${order.tax.toFixed(2)}\nTOTAL: $${order.total.toFixed(2)}`;
};
