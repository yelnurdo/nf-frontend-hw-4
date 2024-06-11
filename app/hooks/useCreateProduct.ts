// app/hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { productAPI } from '../api/axiosInstances';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

const createProduct = async (product: Product): Promise<AxiosResponse<Product>> => {
  return await productAPI.post('/products', product);
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<Product>, Error, Product>({
    mutationFn: createProduct,
    onSuccess: (_, product) => {
      queryClient.invalidateQueries(['categoryProducts', { category: product.category }]);
    },
  });
};
