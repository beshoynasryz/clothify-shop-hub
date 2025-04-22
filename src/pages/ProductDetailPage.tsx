
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Find product by ID
  const product = products.find(p => p.id === Number(id));
  
  // State for product options
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Handle image navigation
  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  // Handle quantity changes
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };
  
  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-brand-dark mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-brand transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Image Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          
          {/* Thumbnail Navigation */}
          {product.images.length > 1 && (
            <div className="flex mt-4 space-x-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`border-2 rounded-md overflow-hidden w-16 h-16 ${
                    currentImageIndex === index ? 'border-brand' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <span className="text-sm text-brand capitalize">{product.category}</span>
            <h1 className="text-3xl font-bold text-brand-dark mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-brand">${product.price.toFixed(2)}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-brand-dark mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 rounded-md ${
                      selectedSize === size
                        ? 'bg-brand text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-brand-dark mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 rounded-md ${
                      selectedColor === color
                        ? 'bg-brand text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Material Information */}
          {product.material && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-brand-dark mb-2">Material</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-brand-dark mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-300">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                +
              </button>
              <span className="ml-3 text-sm text-gray-600">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center btn-primary gap-2 text-lg py-3 px-8"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <Link to="/cart" className="btn-outline text-lg py-3 px-8 text-center">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
