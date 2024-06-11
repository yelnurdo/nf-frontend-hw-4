'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '../app/api/services/productService';

const CategoryList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });

  if (isLoading) return <div className="text-center mt-10">Loading categories...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading categories</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data?.map((category: string) => (
          <Link key={category} href={`/category/${category}`} passHref legacyBehavior>
            <a className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100 transition">
              <div className="text-center text-xl font-bold">{category}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;