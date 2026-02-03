import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await api.getProductDetail(id);
        setProduct(data);
      } catch (err) {
        setError('No se pudo cargar la información del producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { product, loading, error };
};