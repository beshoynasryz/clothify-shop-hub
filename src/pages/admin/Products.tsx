
import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Define product interface
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  colors?: string[];
  sizes?: string[];
}

// Mock categories
const categories = ['Hoodies', 'Jeans', 'Accessories'];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Classic Zip Hoodie', category: 'Hoodies', price: 49.99, stock: 24, colors: ['Black', 'Gray', 'Navy'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Premium Slim Jeans', category: 'Jeans', price: 59.99, stock: 18, colors: ['Blue', 'Black', 'Gray'], sizes: ['28', '30', '32', '34', '36'] },
    { id: 3, name: 'Casual Leather Belt', category: 'Accessories', price: 29.99, stock: 32, colors: ['Brown', 'Black'], sizes: ['S', 'M', 'L'] },
    { id: 4, name: 'Winter Beanie', category: 'Accessories', price: 19.99, stock: 15, colors: ['Black', 'Gray', 'Red'], sizes: ['One Size'] },
    { id: 5, name: 'Oversized Pullover Hoodie', category: 'Hoodies', price: 54.99, stock: 27, colors: ['Black', 'Gray', 'White'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
    { id: 6, name: 'Distressed Denim Jeans', category: 'Jeans', price: 64.99, stock: 12, colors: ['Blue', 'Light Blue'], sizes: ['28', '30', '32', '34'] },
  ]);

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open edit modal with product data
  const handleEditProduct = (product: Product) => {
    setCurrentProduct({...product});
    setIsEditModalOpen(true);
  };

  // Add a new product
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      name: 'New Product',
      category: categories[0],
      price: 0,
      stock: 0,
    };
    
    setCurrentProduct(newProduct);
    setIsEditModalOpen(true);
  };

  // Delete a product
  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  // Save product changes
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    // Update existing product or add new one
    if (products.some(p => p.id === currentProduct.id)) {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      toast.success('Product updated successfully');
    } else {
      setProducts([...products, currentProduct]);
      toast.success('Product added successfully');
    }
    
    setIsEditModalOpen(false);
    setCurrentProduct(null);
  };

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    
    const { name, value, type } = e.target as HTMLInputElement;
    let parsedValue: string | number | boolean = value;
    
    if (type === 'number') {
      parsedValue = name === 'price' ? parseFloat(value) : parseInt(value);
    }
    
    setCurrentProduct({
      ...currentProduct,
      [name]: parsedValue
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button 
          className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark transition-colors flex items-center gap-2"
          onClick={handleAddProduct}
        >
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
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
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-900"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {products.some(p => p.id === currentProduct.id) ? 'Edit' : 'Add'} Product
            </h2>
            
            <form onSubmit={handleSaveProduct}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={currentProduct.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentProduct.description || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
