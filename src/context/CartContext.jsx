import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContextInstance";

const CART_STORAGE_KEY = "cart-items";
const WISHLIST_STORAGE_KEY = "wishlist-items";

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readStorage(CART_STORAGE_KEY, []),
  );
  const [wishlistItems, setWishlistItems] = useState(() =>
    readStorage(WISHLIST_STORAGE_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    toast.info("Removed from cart");
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (productId) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) {
        toast.info("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlistItems.includes(productId);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    subtotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
