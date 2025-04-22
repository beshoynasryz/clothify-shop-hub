
import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', slug: 'electronics' },
    { id: 2, name: 'Clothing', description: 'Fashion and apparel', slug: 'clothing' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setCurrentCategory({
      id: Math.max(0, ...categories.map(c => c.id)) + 1,
      name: '',
      description: '',
      slug: '',
    });
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory({ ...category });
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Category deleted successfully');
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCategory) return;

    if (categories.some(c => c.id === currentCategory.id)) {
      setCategories(categories.map(c => 
        c.id === currentCategory.id ? currentCategory : c
      ));
      toast.success('Category updated successfully');
    } else {
      setCategories([...categories, currentCategory]);
      toast.success('Category added successfully');
    }
    
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button 
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
          onClick={handleAddCategory}
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="bg-card shadow-md rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {categories.map(category => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{category.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Modal */}
      {isModalOpen && currentCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {categories.some(c => c.id === currentCategory.id) ? 'Edit' : 'Add'} Category
            </h2>
            
            <form onSubmit={handleSaveCategory}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input
                    type="text"
                    value={currentCategory.name}
                    onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})}
                    className="w-full p-2 border rounded-md bg-background"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={currentCategory.description}
                    onChange={e => setCurrentCategory({...currentCategory, description: e.target.value})}
                    className="w-full p-2 border rounded-md bg-background"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    value={currentCategory.slug}
                    onChange={e => setCurrentCategory({...currentCategory, slug: e.target.value})}
                    className="w-full p-2 border rounded-md bg-background"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
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

export default Categories;
