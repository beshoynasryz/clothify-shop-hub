
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-brand-dark mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-brand-dark mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary inline-block py-3 px-8">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
