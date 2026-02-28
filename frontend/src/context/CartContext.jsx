import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

const normalizeCartItem = (rawItem) => {
  const sourceItem = rawItem?.data || rawItem;
  if (!sourceItem || typeof sourceItem !== 'object') {
    return null;
  }

  const normalizedId = sourceItem._id || sourceItem.id;
  if (!normalizedId) {
    return null;
  }

  const normalizedQuantity = Number(rawItem?.quantity || sourceItem?.quantity || 1);

  return {
    ...sourceItem,
    _id: normalizedId,
    quantity: Number.isFinite(normalizedQuantity) && normalizedQuantity > 0 ? normalizedQuantity : 1,
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) {
      return [];
    }

    try {
      const parsedCart = JSON.parse(savedCart);
      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart
        .map((item) => normalizeCartItem(item))
        .filter(Boolean);
    } catch (error) {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const normalizedProduct = normalizeCartItem({ ...product, quantity });
    if (!normalizedProduct) {
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === normalizedProduct._id);

      if (existingItem) {
        // Update quantity if item exists
        return prev.map((item) =>
          item._id === normalizedProduct._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prev, normalizedProduct];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
