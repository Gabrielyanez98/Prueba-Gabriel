import { useState } from 'react';
import { api } from '../services/api';

export const useCart = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const addProductToCart = async (productId, colorCode, storageCode) => {
    try {
      setIsAdding(true);
      setError(null);
      
      const payload = {
        id: productId,
        colorCode: parseInt(colorCode),
        storageCode: parseInt(storageCode)
      };

      const response = await api.addToCart(payload);

      return response.count; 
    } catch (err) {
      setError('No se pudo añadir el producto al carrito.');
      return err;
    } finally {
      setIsAdding(false);
    }
  };

  return { addProductToCart, isAdding, error };
};