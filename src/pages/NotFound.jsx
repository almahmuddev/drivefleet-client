import { Link } from "react-router-dom";
import { RiCarLine, RiArrowLeftLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-dark-950">
      <RiCarLine className="text-brand-500 text-7xl mb-6 opacity-30" />
      <h1 className="font-display text-8xl font-bold text-dark-200 dark:text-dark-700 mb-2">404</h1>
      <h2 className="font-display text-2xl font-semibold text-dark-900 dark:text-white mb-3">Page Not Found</h2>
      <p className="font-body text-dark-500 dark:text-dark-400 mb-8 max-w-sm">
        Looks like this road leads nowhere. The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <RiArrowLeftLine /> Back to Home
      </Link>
    </div>
  );
};
export default NotFound;
