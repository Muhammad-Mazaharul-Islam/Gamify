import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (game, currency) => {
    const existingItem = cart.find(
      item => item.gameId === game.id && item.currencyId === currency.id
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.gameId === game.id && item.currencyId === currency.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        gameId: game.id,
        gameName: game.name,
        currencyId: currency.id,
        currencyName: currency.name,
        price: currency.price,
        quantity: 1
      }]);
    }
    
    toast.success(`Added ${currency.name} to cart!`);
  };

  const removeFromCart = (gameId, currencyId) => {
    setCart(cart.filter(
      item => !(item.gameId === gameId && item.currencyId === currencyId)
    ));
  };

  const updateQuantity = (gameId, currencyId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(gameId, currencyId);
      return;
    }
    setCart(cart.map(item =>
      item.gameId === gameId && item.currencyId === currencyId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
