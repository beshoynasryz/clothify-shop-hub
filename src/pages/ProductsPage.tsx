
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { ChevronDown, Filter } from 'lucide-react';

const ProductsPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState(category || 'all');

  // Update active category when route parameter changes
  useEffect(() => {
    setActiveCategory(category || 'all');
  }, [category]);

  // Format category name for display
  const formatCategoryName = (cat: string): string => {
    if (cat === 'all') return 'All Products';
    return cat.charAt(0).toUpperCase() + cat.slice(1) + 's';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-2">
          {formatCategoryName(activeCategory)}
        </h1>
        {searchQuery && (
          <p className="text-gray-600">
            Search results for: <span className="font-medium">"{searchQuery}"</span>
          </p>
        )}
      </div>

      {/* Mobile filters toggle */}
      <button
        className="md:hidden flex items-center justify-between w-full bg-white p-4 rounded-md shadow-sm mb-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex items-center">
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
        </div>
        <ChevronDown
          size={18}
          className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
        />
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside
          className={`md:w-64 flex-shrink-0 bg-white rounded-md shadow-sm p-4 md:block ${
            showFilters ? 'block' : 'hidden'
          }`}
        >
          <div className="mb-6">
            <h3 className="font-semibold text-brand-dark mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className={`block p-2 rounded-md ${
                    activeCategory === 'all'
                      ? 'bg-brand text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/products/hoodie"
                  className={`block p-2 rounded-md ${
                    activeCategory === 'hoodie'
                      ? 'bg-brand text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Hoodies
                </a>
              </li>
              <li>
                <a
                  href="/products/jeans"
                  className={`block p-2 rounded-md ${
                    activeCategory === 'jeans'
                      ? 'bg-brand text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Jeans
                </a>
              </li>
              <li>
                <a
                  href="/products/accessory"
                  className={`block p-2 rounded-md ${
                    activeCategory === 'accessory'
                      ? 'bg-brand text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-brand-dark mb-3">Price Range</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand focus:border-brand focus:ring-brand"
                />
                <span className="ml-2 text-gray-600">Under $50</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand focus:border-brand focus:ring-brand"
                />
                <span className="ml-2 text-gray-600">$50 - $100</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand focus:border-brand focus:ring-brand"
                />
                <span className="ml-2 text-gray-600">Over $100</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-brand-dark mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-brand focus:border-brand focus:ring-brand"
                />
                <span className="ml-2 text-gray-600">In Stock</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-grow">
          <ProductGrid category={activeCategory} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
