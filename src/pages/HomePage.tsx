import { Link } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { ShieldCheck, Award, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-light py-16 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Elevate Your Style With Quality Essentials
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Discover our collection of premium hoodies, jeans, and accessories designed for comfort and style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Shop All Products
              </Link>
              <Link to="/products/hoodie" className="btn-outline">
                Explore Hoodies
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"
              alt="Featured Collection"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center text-brand-dark mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products/hoodie" className="group">
              <div className="relative rounded-lg overflow-hidden h-80">
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
                  alt="Hoodies"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Hoodies</h3>
                    <span className="inline-block bg-white text-brand-dark py-2 px-4 rounded-md text-sm font-medium">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/products/jeans" className="group">
              <div className="relative rounded-lg overflow-hidden h-80">
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80"
                  alt="Jeans"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Jeans</h3>
                    <span className="inline-block bg-white text-brand-dark py-2 px-4 rounded-md text-sm font-medium">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/products/accessory" className="group">
              <div className="relative rounded-lg overflow-hidden h-80">
                <img
                  src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Accessories"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                    <span className="inline-block bg-white text-brand-dark py-2 px-4 rounded-md text-sm font-medium">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Are Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center text-brand-dark mb-12">How We Are</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-brand-dark">Our Story</h3>
              <p className="text-gray-600 leading-relaxed">
                We started with a simple mission: to create high-quality, comfortable clothing that looks great and lasts long. 
                Our journey began with a small collection of hoodies, and today we're proud to offer a wide range of clothing 
                essentials that help you express your style.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-brand-dark">Our Values</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-brand mt-1">•</span>
                  <span>Quality materials and craftsmanship in every piece</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand mt-1">•</span>
                  <span>Sustainable and ethical production practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand mt-1">•</span>
                  <span>Customer satisfaction as our top priority</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center text-brand-dark mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">
                Every piece is crafted with premium materials and undergoes strict quality checks.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Service</h3>
              <p className="text-gray-600">
                Dedicated support team and hassle-free returns within 30 days.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Value</h3>
              <p className="text-gray-600">
                Competitive prices without compromising on quality or style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-brand-dark">Featured Products</h2>
            <Link to="/products" className="text-brand hover:text-brand-dark font-medium">
              View All →
            </Link>
          </div>
          <ProductGrid maxItems={4} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-brand text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, special offers, and exclusive discounts.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-3 rounded-l-md border-0 text-gray-900 focus:outline-none focus:ring-1 focus:ring-brand"
              required
            />
            <button
              type="submit"
              className="bg-brand-dark p-3 rounded-r-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
