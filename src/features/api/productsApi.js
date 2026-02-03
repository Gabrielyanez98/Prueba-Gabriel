import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CACHE_TIME = 3600;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itx-frontend-test.onrender.com/api/' }),
  keepUnusedDataFor: CACHE_TIME,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'product',
      keepUnusedDataFor: CACHE_TIME,
    }),
    getProductDetail: builder.query({
      query: (id) => `product/${id}`,
      keepUnusedDataFor: CACHE_TIME,
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: 'cart',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductDetailQuery, 
  useAddToCartMutation 
} = productsApi;
