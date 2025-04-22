
import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockProducts = [
    { id: 1, name: 'Classic Zip Hoodie', category: 'Hoodies', price: 49.99, stock: 24 },
    { id: 2, name: 'Premium Slim Jeans', category: 'Jeans', price: 59.99, stock: 18 },
    { id: 3, name: 'Casual Leather Belt', category: 'Accessories', price: 29.99, stock: 32 },
    { id: 4, name: 'Winter Beanie', category: 'Accessories', price: 19.99, stock: 15 },
    { id: 5, name: 'Oversized Pullover Hoodie', category: 'Hoodies', price: 54.99, stock: 27 },
    { id: 6, name: 'Distressed Denim Jeans', category: 'Jeans', price: 64.99, stock: 12 },
  ];

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input 
          type="text"
          placeholder="Search products..."
          className="pl-10 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.stock > 20 ? 'bg-green-100 text-green-800' :
                    product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
