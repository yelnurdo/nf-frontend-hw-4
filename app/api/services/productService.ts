// app/api/services/productService.ts
import { productAPI, fileAPI } from '../axiosInstances';

export const fetchAllProducts = async () => {
  const { data } = await productAPI.get('/products');
  return data;
};

export const fetchAllCategories = async () => {
  const { data } = await productAPI.get('/products/categories');
  return data;
};

export const fetchProductsByCategory = async (category: string) => {
  const { data } = await productAPI.get(`/products/category/${category}`);
  return data;
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await fileAPI.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
