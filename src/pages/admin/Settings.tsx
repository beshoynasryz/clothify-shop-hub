
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Initial mock data for site settings
const initialNavItems = [
  { id: 1, label: 'Home', path: '/', isActive: true },
  { id: 2, label: 'All Products', path: '/products', isActive: true },
  { id: 3, label: 'Hoodies', path: '/products/hoodie', isActive: true },
  { id: 4, label: 'Jeans', path: '/products/jeans', isActive: true },
  { id: 5, label: 'Accessories', path: '/products/accessory', isActive: true },
];

const initialFooterLinks = [
  { id: 1, section: 'Shop', label: 'Hoodies', path: '/products/hoodie', isActive: true },
  { id: 2, section: 'Shop', label: 'Jeans', path: '/products/jeans', isActive: true },
  { id: 3, section: 'Shop', label: 'Accessories', path: '/products/accessory', isActive: true },
  { id: 4, section: 'Shop', label: 'All Products', path: '/products', isActive: true },
  { id: 5, section: 'Company', label: 'About Us', path: '/about', isActive: true },
  { id: 6, section: 'Company', label: 'Contact', path: '/contact', isActive: true },
  { id: 7, section: 'Company', label: 'Terms & Conditions', path: '/terms', isActive: true },
  { id: 8, section: 'Company', label: 'Privacy Policy', path: '/privacy', isActive: true },
];

// Initial categories
const initialCategories = [
  { id: 1, name: 'Hoodies', slug: 'hoodie', description: 'Comfortable hoodies for all seasons', isActive: true },
  { id: 2, name: 'Jeans', slug: 'jeans', description: 'Stylish jeans for everyday wear', isActive: true },
  { id: 3, name: 'Accessories', slug: 'accessory', description: 'Complete your look with our accessories', isActive: true },
];

// Initial products
const initialProducts = [
  { 
    id: 1, 
    name: 'Classic Zip Hoodie', 
    category: 'Hoodies', 
    price: 49.99, 
    stock: 24,
    description: 'A comfortable classic zip hoodie that goes with everything.',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 28,
    isActive: true
  },
  { 
    id: 2, 
    name: 'Premium Slim Jeans', 
    category: 'Jeans', 
    price: 59.99, 
    stock: 18,
    description: 'High-quality slim fit jeans for a modern look.',
    colors: ['Blue', 'Black', 'Gray'],
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.7,
    reviewCount: 42,
    isActive: true
  },
  { 
    id: 3, 
    name: 'Casual Leather Belt', 
    category: 'Accessories', 
    price: 29.99, 
    stock: 32,
    description: 'A versatile leather belt that completes any outfit.',
    colors: ['Brown', 'Black'],
    sizes: ['S', 'M', 'L'],
    rating: 4.3,
    reviewCount: 19,
    isActive: true 
  },
];

// Fake reviews for products
const initialReviews = [
  { id: 1, productId: 1, userName: 'John D.', rating: 5, comment: 'Love this hoodie! Super comfortable and warm.', date: '2023-11-15' },
  { id: 2, productId: 1, userName: 'Sarah M.', rating: 4, comment: 'Great quality, but runs a bit large.', date: '2023-10-28' },
  { id: 3, productId: 2, userName: 'Mike T.', rating: 5, comment: 'Perfect fit, very comfortable jeans.', date: '2023-11-05' },
  { id: 4, productId: 2, userName: 'Emma L.', rating: 4, comment: 'Good quality denim, would buy again!', date: '2023-10-14' },
  { id: 5, productId: 3, userName: 'Chris P.', rating: 4, comment: 'Nice belt, good quality leather.', date: '2023-11-02' },
];

type EditingState = {
  navItems: typeof initialNavItems;
  footerLinks: typeof initialFooterLinks;
  categories: typeof initialCategories;
  products: typeof initialProducts;
  reviews: typeof initialReviews;
};

const Settings = () => {
  const [editingState, setEditingState] = useState<EditingState>({
    navItems: initialNavItems,
    footerLinks: initialFooterLinks,
    categories: initialCategories,
    products: initialProducts,
    reviews: initialReviews,
  });
  
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Clothing Store',
    storeEmail: 'contact@clothingstore.com',
    currency: 'USD',
    tax: 7.5,
    enableReviews: true,
    enableWishlist: true,
    maintenanceMode: false,
  });

  // Form for general store settings
  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setStoreSettings({
      ...storeSettings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Generic function to update an item in any of our state arrays
  const updateItem = <T extends { id: number }>(
    collection: T[],
    id: number,
    updatedFields: Partial<T>
  ): T[] => {
    return collection.map(item => 
      item.id === id ? { ...item, ...updatedFields } : item
    );
  };

  // Generic function to add an item to any of our state arrays
  const addItem = <T extends { id: number }>(
    collection: T[],
    newItem: Omit<T, 'id'>
  ): T[] => {
    const newId = Math.max(0, ...collection.map(item => item.id)) + 1;
    return [...collection, { ...(newItem as T), id: newId }];
  };

  // Generic function to delete an item from any of our state arrays
  const deleteItem = <T extends { id: number }>(
    collection: T[],
    id: number
  ): T[] => {
    return collection.filter(item => item.id !== id);
  };

  // Handle navbar item updates
  const handleNavItemChange = (id: number, field: string, value: string | boolean) => {
    setEditingState({
      ...editingState,
      navItems: updateItem(editingState.navItems, id, { [field]: value } as any)
    });
  };

  // Handle adding a new navbar item
  const handleAddNavItem = () => {
    const newNavItem = {
      label: 'New Link',
      path: '/',
      isActive: true
    };
    
    setEditingState({
      ...editingState,
      navItems: addItem(editingState.navItems, newNavItem as any)
    });
  };

  // Handle deleting a navbar item
  const handleDeleteNavItem = (id: number) => {
    setEditingState({
      ...editingState,
      navItems: deleteItem(editingState.navItems, id)
    });
  };

  // Handle footer link updates
  const handleFooterLinkChange = (id: number, field: string, value: string | boolean) => {
    setEditingState({
      ...editingState,
      footerLinks: updateItem(editingState.footerLinks, id, { [field]: value } as any)
    });
  };

  // Handle adding a new footer link
  const handleAddFooterLink = () => {
    const newFooterLink = {
      section: 'Shop',
      label: 'New Link',
      path: '/',
      isActive: true
    };
    
    setEditingState({
      ...editingState,
      footerLinks: addItem(editingState.footerLinks, newFooterLink as any)
    });
  };

  // Handle deleting a footer link
  const handleDeleteFooterLink = (id: number) => {
    setEditingState({
      ...editingState,
      footerLinks: deleteItem(editingState.footerLinks, id)
    });
  };

  // Handle category updates
  const handleCategoryChange = (id: number, field: string, value: string | boolean) => {
    setEditingState({
      ...editingState,
      categories: updateItem(editingState.categories, id, { [field]: value } as any)
    });
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    const newCategory = {
      name: 'New Category',
      slug: 'new-category',
      description: 'Description for the new category',
      isActive: true
    };
    
    setEditingState({
      ...editingState,
      categories: addItem(editingState.categories, newCategory as any)
    });
  };

  // Handle deleting a category
  const handleDeleteCategory = (id: number) => {
    setEditingState({
      ...editingState,
      categories: deleteItem(editingState.categories, id)
    });
  };

  // Handle product updates
  const handleProductChange = (id: number, field: string, value: any) => {
    setEditingState({
      ...editingState,
      products: updateItem(editingState.products, id, { [field]: value } as any)
    });
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    const newProduct = {
      name: 'New Product',
      category: 'Hoodies',
      price: 0,
      stock: 0,
      description: 'Description for the new product',
      colors: ['Black'],
      sizes: ['M'],
      rating: 0,
      reviewCount: 0,
      isActive: true
    };
    
    setEditingState({
      ...editingState,
      products: addItem(editingState.products, newProduct as any)
    });
  };

  // Handle deleting a product
  const handleDeleteProduct = (id: number) => {
    setEditingState({
      ...editingState,
      products: deleteItem(editingState.products, id)
    });
    
    // Also delete any reviews for this product
    setEditingState(prevState => ({
      ...prevState,
      reviews: prevState.reviews.filter(review => review.productId !== id)
    }));
  };

  // Handle review updates
  const handleReviewChange = (id: number, field: string, value: any) => {
    setEditingState({
      ...editingState,
      reviews: updateItem(editingState.reviews, id, { [field]: value } as any)
    });
  };

  // Handle adding a new review
  const handleAddReview = () => {
    if (editingState.products.length === 0) {
      toast.error("Cannot add review - no products available");
      return;
    }
    
    const firstProductId = editingState.products[0].id;
    const newReview = {
      productId: firstProductId,
      userName: 'New User',
      rating: 5,
      comment: 'This is a great product!',
      date: new Date().toISOString().split('T')[0]
    };
    
    setEditingState({
      ...editingState,
      reviews: addItem(editingState.reviews, newReview as any)
    });
  };

  // Handle deleting a review
  const handleDeleteReview = (id: number) => {
    setEditingState({
      ...editingState,
      reviews: deleteItem(editingState.reviews, id)
    });
  };

  // Generic save function for all changes
  const handleSaveChanges = () => {
    // In a real application, this would send the data to an API
    // For now, we'll just show a success message
    toast.success("Changes saved successfully");
    console.log("Saved settings:", { storeSettings, editingState });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* General Store Settings */}
        <TabsContent value="general" className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4">Store Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={storeSettings.storeName}
                onChange={handleStoreSettingsChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Email
              </label>
              <input
                type="email"
                name="storeEmail"
                value={storeSettings.storeEmail}
                onChange={handleStoreSettingsChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={storeSettings.currency}
                onChange={handleStoreSettingsChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="tax"
                value={storeSettings.tax}
                onChange={handleStoreSettingsChange}
                min="0"
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableReviews"
                  name="enableReviews"
                  checked={storeSettings.enableReviews}
                  onChange={handleStoreSettingsChange}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label htmlFor="enableReviews" className="ml-2 block text-sm text-gray-700">
                  Enable Product Reviews
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableWishlist"
                  name="enableWishlist"
                  checked={storeSettings.enableWishlist}
                  onChange={handleStoreSettingsChange}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label htmlFor="enableWishlist" className="ml-2 block text-sm text-gray-700">
                  Enable Wishlist
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={storeSettings.maintenanceMode}
                  onChange={handleStoreSettingsChange}
                  className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              Save Settings
            </button>
          </div>
        </TabsContent>

        {/* Navigation Settings */}
        <TabsContent value="navigation" className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Navigation Menu Items</h2>
            <button 
              onClick={handleAddNavItem}
              className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <span>Add Item</span>
            </button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editingState.navItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleNavItemChange(item.id, 'label', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={item.path}
                      onChange={(e) => handleNavItemChange(item.id, 'path', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={(e) => handleNavItemChange(item.id, 'isActive', e.target.checked)}
                      className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <button 
                      onClick={() => handleDeleteNavItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              Save Changes
            </button>
          </div>
        </TabsContent>

        {/* Footer Settings */}
        <TabsContent value="footer" className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Footer Links</h2>
            <button 
              onClick={handleAddFooterLink}
              className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <span>Add Link</span>
            </button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editingState.footerLinks.map(link => (
                <TableRow key={link.id}>
                  <TableCell>
                    <select
                      value={link.section}
                      onChange={(e) => handleFooterLinkChange(link.id, 'section', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Shop">Shop</option>
                      <option value="Company">Company</option>
                      <option value="Support">Support</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleFooterLinkChange(link.id, 'label', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={link.path}
                      onChange={(e) => handleFooterLinkChange(link.id, 'path', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={link.isActive}
                      onChange={(e) => handleFooterLinkChange(link.id, 'isActive', e.target.checked)}
                      className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <button 
                      onClick={() => handleDeleteFooterLink(link.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              Save Changes
            </button>
          </div>
        </TabsContent>

        {/* Categories Management */}
        <TabsContent value="categories" className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Categories</h2>
            <button 
              onClick={handleAddCategory}
              className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <span>Add Category</span>
            </button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editingState.categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell>
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => handleCategoryChange(category.id, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={category.slug}
                      onChange={(e) => handleCategoryChange(category.id, 'slug', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <textarea
                      value={category.description}
                      onChange={(e) => handleCategoryChange(category.id, 'description', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={2}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={category.isActive}
                      onChange={(e) => handleCategoryChange(category.id, 'isActive', e.target.checked)}
                      className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              Save Changes
            </button>
          </div>
        </TabsContent>

        {/* Products Management */}
        <TabsContent value="products" className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <button 
              onClick={handleAddProduct}
              className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <span>Add Product</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editingState.products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        value={product.category}
                        onChange={(e) => handleProductChange(product.id, 'category', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        {editingState.categories.map(category => (
                          <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleProductChange(product.id, 'price', parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                        min="0"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleProductChange(product.id, 'stock', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                        min="0"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={product.rating}
                        onChange={(e) => handleProductChange(product.id, 'rating', parseFloat(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={product.isActive}
                        onChange={(e) => handleProductChange(product.id, 'isActive', e.target.checked)}
                        className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              Save Changes
            </button>
          </div>
        </TabsContent>

        {/* Reviews Management */}
        <TabsContent value="reviews" className="bg-white p-6 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Reviews</h2>
            <button 
              onClick={handleAddReview}
              className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <span>Add Review</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editingState.reviews.map(review => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <select
                        value={review.productId}
                        onChange={(e) => handleReviewChange(review.id, 'productId', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        {editingState.products.map(product => (
                          <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        value={review.userName}
                        onChange={(e) => handleReviewChange(review.id, 'userName', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        value={review.rating}
                        onChange={(e) => handleReviewChange(review.id, 'rating', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <textarea
                        value={review.comment}
                        onChange={(e) => handleReviewChange(review.id, 'comment', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={2}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="date"
                        value={review.date}
                        onChange={(e) => handleReviewChange(review.id, 'date', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              Save Changes
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
