// src/api/products.ts
import api from './api';

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const addProduct = async (productData: { name: string; price: number; description: string }) => {
  const response = await api.post('/products', productData);
  return response.data;
};
