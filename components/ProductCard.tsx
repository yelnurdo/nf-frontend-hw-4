// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="mb-4">
        <Image src={product.image} alt={product.title} width={300} height={300} className="rounded" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-xl text-gray-800 mb-2">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
};

export default ProductCard;
