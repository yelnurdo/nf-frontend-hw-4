import CategoryList from '../components/CategoryList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Categories</h1>
      <CategoryList />
    </div>
  );
}
