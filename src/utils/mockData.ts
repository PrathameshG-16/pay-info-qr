
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
  // Create a structured payment data object that payment apps can parse
  const paymentData = {
    // Payment details
    paymentInfo: {
      orderId: order.id,
      merchantName: "PayQR Store",
      merchantId: "PAYQR-12345",
      amount: order.total.toFixed(2),
      currency: "USD",
      date: new Date(order.date).toLocaleDateString(),
      paymentMethod: order.paymentMethod,
      customerName: order.customerName,
      status: order.status
    },
    // Order details
    orderSummary: {
      subtotal: order.subtotal.toFixed(2),
      tax: order.tax.toFixed(2),
      total: order.total.toFixed(2),
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price.toFixed(2),
        totalPrice: (item.price * item.quantity).toFixed(2)
      }))
    },
    // Payment instructions
    paymentInstructions: {
      acceptedMethods: order.paymentOptions,
      notes: "Payment is due immediately. This QR code expires in 15 minutes."
    }
  };

  // Convert the structured data to JSON string that payment apps can parse
  return JSON.stringify(paymentData);
};
