// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const Home = () => {
  return (
    <div className="pt-16">
      <section className="min-h-screen flex items-center justify-center bg-dark-900 dark:bg-dark-950 text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Drive<span className="text-brand-500">Fleet</span>
          </h1>
          <p className="text-dark-400 font-body text-lg mb-8 max-w-md mx-auto">
            Premium car rentals. Find your perfect vehicle and hit the road today.
          </p>
          <Link to="/explore" className="btn-primary inline-flex items-center gap-2">
            Explore Cars <RiArrowRightLine />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
