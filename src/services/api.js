import axios from 'axios';

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

const apiClient = axios.create({
  baseURL: 'https://itx-frontend-test.onrender.com',
  timeout: 10000,
});

const getCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
};

const fetchWithCache = async (url, cacheKey) => {
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await apiClient.get(url);
    setCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const api = {

  getProducts: () => fetchWithCache('/api/product', 'products_list'),

  getProductDetail: (id) => fetchWithCache(`/api/product/${id}`, `product_detail_${id}`),

  addToCart: async (payload) => {
    try {
      const response = await apiClient.post('/api/cart', payload);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
};