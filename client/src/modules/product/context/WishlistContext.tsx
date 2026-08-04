import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

interface WishlistContextType {
  wishlistIds: string[];
  addToWishlist: (productId: string | number) => void;
  removeFromWishlist: (productId: string | number) => void;
  toggleWishlist: (productId: string | number) => void;
  isWishlisted: (productId: string | number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "aaramly_wishlist_v1";

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(String);
        }
      }
    } catch {
      // ignore error
    }
    return ["prod-1"]; // Default sample wishlist item for demo
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore error
    }
  }, [wishlistIds]);

  const addToWishlist = (productId: string | number) => {
    const strId = String(productId);
    setWishlistIds((prev) => (prev.includes(strId) ? prev : [...prev, strId]));
  };

  const removeFromWishlist = (productId: string | number) => {
    const strId = String(productId);
    setWishlistIds((prev) => prev.filter((id) => String(id) !== strId));
  };

  const toggleWishlist = (productId: string | number) => {
    const strId = String(productId);
    if (wishlistIds.includes(strId)) {
      removeFromWishlist(strId);
    } else {
      addToWishlist(strId);
    }
  };

  const isWishlisted = (productId: string | number) => {
    const strId = String(productId);
    return wishlistIds.includes(strId);
  };

  const wishlistCount = useMemo(() => wishlistIds.length, [wishlistIds]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
