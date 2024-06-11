// app/api/services/productService.ts
import { productAPI } from '../axiosInstances';

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
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    throw new Error('Cloudinary environment variables are not set.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.secure_url;
};
