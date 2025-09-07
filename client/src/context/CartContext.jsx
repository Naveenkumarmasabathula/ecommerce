// client/src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
        const isItemInCart = prevItems.find((cartItem) => cartItem.id === item.id);
        if (isItemInCart) {
          return prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prevItems, { ...item, quantity: 1 }];
      });
  };



const removeFromCart = (itemId) => {
    // ✅ ADD THIS LINE FOR TESTING
    console.log('Attempting to remove item with ID:', itemId);
  
    const itemToRemove = cartItems.find(item => item.id === itemId);
  
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
  
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} removed from cart!`);
    }
  };
  const updateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) => {
        if (quantity <= 0) {
            return prevItems.filter((item) => item.id !== itemId);
        }
        return prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
        );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider> // 👈 FIX THIS LINE
  );
};

export default CartContext;