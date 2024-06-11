// app/productCreate/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories, uploadFile } from '../api/services/productService';
import { useCreateProduct } from '../hooks/useCreateProduct';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductCreatePage = () => {
  const [photos, setPhotos] = useState<{ id: number; src: string; percentCompleted: number }[]>([]);
  const [totalId, setTotalId] = useState<number>(0);
  const { mutate: createProduct } = useCreateProduct();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });
  const router = useRouter();

  useEffect(() => {
    const storedPhotos = localStorage.getItem('photos');
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  const handleFileUpload = async (index: number, file: File) => {
    try {
      const response = await uploadFile(file);
      const { location } = response;
      setPhotos(photos => {
        const updatedPhotos = [...photos];
        updatedPhotos[index].src = location;
        updatedPhotos[index].percentCompleted = 100;
        return updatedPhotos;
      });
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const handleAddPhoto = () => {
    setPhotos([...photos, { id: totalId, src: '', percentCompleted: 0 }]);
    setTotalId(totalId + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { productname, productprice, category } = e.currentTarget.elements as any;
    const images = photos.filter(photo => photo.percentCompleted === 100).map(photo => photo.src);
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    createProduct({
      id: totalId,
      title: productname.value,
      price: parseFloat(productprice.value),
      category: category.value,
      description: `Description for ${category.value}`,
      image: images[0],  // Assuming the first image as the main image
    }, {
      onSuccess: () => {
        router.push(`/category/${category.value}`);
      },
    });

    setPhotos([]);
    localStorage.removeItem('photos');
  };

  if (isLoading) return <div className="text-center mt-10">Loading categories...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading categories</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8">Create a New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productname" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="productname"
              name="productname"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="productprice" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="productprice"
              name="productprice"
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {data?.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            {photos.map((photo, index) => (
              <div key={photo.id} className="flex items-center space-x-4">
                <input
                  type="file"
                  onChange={e => {
                    if (e.target.files) handleFileUpload(index, e.target.files[0]);
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                {photo.src && (
                  <Image src={photo.src} alt="Product Image" width={100} height={100} className="rounded" />
                )}
                <progress value={photo.percentCompleted} max="100" className="w-full"></progress>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPhoto}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Photo
            </button>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreatePage;
