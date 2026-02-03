import { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import Search from '../../components/Search/Search';
import Item from '../../components/Item/Item';

const ProductListPage = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter((p) =>
      p.brand.toLowerCase().includes(term) ||
      p.model.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <Search value={searchTerm} onChange={setSearchTerm} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            imgUrl={product.imgUrl}
            brand={product.brand}
            model={product.model}
            price={product.price}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl mt-8">
          <p className="text-gray-500 text-lg">
            No products found matching &quot;{searchTerm}&quot;
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;