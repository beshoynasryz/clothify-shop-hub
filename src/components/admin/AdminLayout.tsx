
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

const AdminLayout = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState('dashboard');

  // Update active page based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin') setActivePage('dashboard');
    else if (path.includes('/admin/products')) setActivePage('products');
    else if (path.includes('/admin/orders')) setActivePage('orders');
    else if (path.includes('/admin/users')) setActivePage('users');
    else if (path.includes('/admin/settings')) setActivePage('settings');
  }, [location.pathname]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { id: 'products', label: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
    { id: 'users', label: 'Users', icon: <Users size={20} />, path: '/admin/users' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card shadow-md">
        <div className="p-6 border-b flex justify-between items-center">
          <Link to="/admin" className="text-xl font-bold text-foreground">Admin Panel</Link>
          <ThemeToggle />
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                    activePage === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-foreground'
                  }`}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-background text-foreground">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
