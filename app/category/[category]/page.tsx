// app/category/[category]/page.tsx
'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductsByCategory } from '@/app/api/services/productService';
import ProductCard from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import ProductCreateModal from '@/components/ProductCreateModal';

const CategoryPage = () => {
  const { category } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['categoryProducts', category],
    queryFn: () => fetchProductsByCategory(category as string),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <div className="text-center mt-10">Loading products...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading products</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Products in {category}</h1>
      <div className="text-center mb-8">
        <button
          onClick={openModal}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Product
        </button>
      </div>
      {isModalOpen && <ProductCreateModal closeModal={closeModal} />}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
