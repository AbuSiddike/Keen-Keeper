import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-emerald-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
