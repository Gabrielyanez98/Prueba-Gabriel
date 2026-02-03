import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.');
        return err;
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};