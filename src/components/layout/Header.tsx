
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brand-dark">
            BNE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-brand-dark">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-brand-dark">
              All Products
            </Link>
            <Link to="/products/hoodie" className="text-gray-600 hover:text-brand-dark">
              Hoodies
            </Link>
            <Link to="/products/jeans" className="text-gray-600 hover:text-brand-dark">
              Jeans
            </Link>
            <Link to="/products/accessory" className="text-gray-600 hover:text-brand-dark">
              Accessories
            </Link>
          </nav>

          {/* Desktop Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand"
              >
                <Search size={18} />
              </button>
            </form>

            <Link to="/cart" className="text-gray-600 hover:text-brand-dark relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="text-gray-600 hover:text-brand-dark flex items-center space-x-1">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Signed in as</p>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-brand-dark">
                <User size={24} />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-brand-dark focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-brand-dark py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 hover:text-brand-dark py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/products/hoodie"
                className="text-gray-600 hover:text-brand-dark py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Hoodies
              </Link>
              <Link
                to="/products/jeans"
                className="text-gray-600 hover:text-brand-dark py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Jeans
              </Link>
              <Link
                to="/products/accessory"
                className="text-gray-600 hover:text-brand-dark py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  to="/cart"
                  className="flex items-center justify-between py-2 text-gray-600 hover:text-brand-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <ShoppingCart size={18} className="mr-2" /> Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="flex items-center py-2 text-gray-600 hover:text-brand-dark"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2" /> Account
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center py-2 text-gray-600 hover:text-brand-dark"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center py-2 text-gray-600 hover:text-brand-dark"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center py-2 text-gray-600 hover:text-brand-dark"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center py-2 text-gray-600 hover:text-brand-dark"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" /> Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
