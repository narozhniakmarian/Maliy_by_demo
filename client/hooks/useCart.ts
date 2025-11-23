import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

const STORAGE_KEY = "lure_cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const saveToStorage = useCallback((newItems: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    }
  }, []);

  const addItem = useCallback(
    (product: Omit<CartItem, "quantity">) => {
      setItems((prevItems) => {
        const existing = prevItems.find((item) => item.id === product.id);
        let newItems: CartItem[];

        if (existing) {
          newItems = prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          newItems = [...prevItems, { ...product, quantity: 1 }];
        }

        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prevItems) => {
        const newItems = prevItems.filter((item) => item.id !== id);
        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      setItems((prevItems) => {
        if (quantity <= 0) {
          return prevItems.filter((item) => item.id !== id);
        }
        const newItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        );
        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, [saveToStorage]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  };
}
