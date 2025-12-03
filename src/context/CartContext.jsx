import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '' });

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setAlert({ open: true, message: `${product.name} agregado al carrito` });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, alert, setAlert }}>
      {children}
    </CartContext.Provider>
  );
};
