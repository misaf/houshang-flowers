"use client";

import React, { createContext, useContext } from "react";
import type { CartItem } from "@/modules/cart";
import { usePersistentState } from "@/shared/hooks/use-persistent-state";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = usePersistentState<Order[]>("orders", []);

  const addOrder = (orderData: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      date: new Date().toISOString(),
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
