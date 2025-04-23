
import { useState } from "react";

export type OrderStatus = "Processing" | "Shipped" | "Completed";

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
}

const initialOrders: Order[] = [
  { id: 'ORD001', customer: 'John Doe', date: '2025-04-18', total: 129.99, status: 'Completed', items: 3 },
  { id: 'ORD002', customer: 'Jane Smith', date: '2025-04-19', total: 89.95, status: 'Processing', items: 2 },
  { id: 'ORD003', customer: 'Bob Johnson', date: '2025-04-20', total: 199.50, status: 'Completed', items: 5 },
  { id: 'ORD004', customer: 'Alice Brown', date: '2025-04-21', total: 74.99, status: 'Shipped', items: 1 },
  { id: 'ORD005', customer: 'David Wilson', date: '2025-04-22', total: 145.50, status: 'Processing', items: 3 },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  function addOrder(order: Omit<Order, "id">) {
    const nextId =
      "ORD" +
      String(
        Math.max(0, ...orders.map((o) => parseInt(o.id.replace("ORD", "")))) + 1
      ).padStart(3, "0");
    setOrders([{ id: nextId, ...order }, ...orders]);
    return nextId;
  }

  function updateOrder(id: string, updates: Omit<Order, "id">) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { id, ...updates } : order
      )
    );
  }

  function deleteOrder(id: string) {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
  };
}
