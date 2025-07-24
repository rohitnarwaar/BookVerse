import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center animate-fade-in space-y-4">
        <h1 className="text-5xl font-playfair font-bold text-primary">404</h1>
        <p className="text-lg text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block bg-gradient-primary text-primary-foreground px-5 py-2 rounded-lg shadow-primary hover:opacity-90 transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
