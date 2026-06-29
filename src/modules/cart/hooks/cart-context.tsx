"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/modules/products";
import { usePersistentState } from "@/shared/hooks/use-persistent-state";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  /** Cart drawer visibility — lifted here so any component (e.g. an
   *  add-to-cart toast action) can open it without prop-drilling. */
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = usePersistentState<CartItem[]>("cart", []);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback(
    (product: Product) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    },
    [setItems]
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart, setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const getTotalPrice = useCallback(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const getTotalItems = useCallback(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isCartOpen,
      setCartOpen,
      openCart,
      closeCart,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isCartOpen,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
