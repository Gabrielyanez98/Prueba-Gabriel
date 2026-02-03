import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem('itx_cart_count');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('itx_cart_count', cartCount.toString());
  }, [cartCount]);

  const updateCartCount = (amountToAdd) => {
    setCartCount(prevCount => prevCount + amountToAdd);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};