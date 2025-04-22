
import { products as allProducts, Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
  maxItems?: number;
}

const ProductGrid = ({ category, searchQuery, maxItems }: ProductGridProps) => {
  // Filter products based on category and search query
  const filterProducts = (): Product[] => {
    let filteredProducts = allProducts;
    
    // Filter by category if specified
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category.toLowerCase()
      );
    }
    
    // Filter by search query if specified
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Limit the number of products if maxItems is specified
    if (maxItems && maxItems > 0) {
      filteredProducts = filteredProducts.slice(0, maxItems);
    }
    
    return filteredProducts;
  };

  const filteredProducts = filterProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full py-10 text-center">
          <p className="text-gray-500 text-lg">No products found.</p>
          {searchQuery && (
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
