
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="product-card overflow-hidden rounded-lg bg-white">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-60 w-full object-cover object-center group-hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-brand-dark group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-gray-500 capitalize">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium text-brand-dark">${product.price.toFixed(2)}</p>
            {product.stock > 0 ? (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
