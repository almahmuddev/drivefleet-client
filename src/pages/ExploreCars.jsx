// 

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiSearchLine, RiFilterLine, RiCarLine } from "react-icons/ri";
import CarCard from "../components/ui/CarCard";
import api from "../api";

const types = ["All", "Sedan", "SUV", "Hatchback", "Luxury"];

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (type !== "All") params.type = type;

      const res = await api.get("/cars", { params });
      setCars(res.data);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // fetch on type change immediately
  useEffect(() => {
    fetchCars();
  }, [type]);

  // debounce search`s input
  useEffect(() => {
    const timer = setTimeout(() => fetchCars(), 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark-950">
      <div className="container-custom">
        {/* header */}
        <div className="mb-10">
          <p className="font-body text-brand-500 text-sm font-medium mb-2 uppercase tracking-widest">
            Full fleet
          </p>
          <h1 className="section-title">Explore Cars</h1>
          <p className="section-subtitle mt-2">
            Browse all available vehicles. Use the search or filter to find exactly what you need.
          </p>
        </div>

        {/* search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400 text-lg" />
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search by car name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type filter */}
          <div className="relative sm:w-48">
            <RiFilterLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400 text-lg pointer-events-none" />
            <select
              className="input-field pl-10 appearance-none cursor-pointer"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All types" : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="spinner" />
            <p className="font-body text-sm text-dark-400">Loading cars...</p>
          </div>
        )}

        {/* result */}
        {!loading && cars.length > 0 && (
          <>
            <p className="font-body text-sm text-dark-500 dark:text-dark-400 mb-6">
              {cars.length} vehicle{cars.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, i) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* empty state */}
        {!loading && cars.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RiCarLine className="text-6xl text-dark-300 dark:text-dark-600 mb-4" />
            <h3 className="font-display font-semibold text-dark-700 dark:text-dark-300 mb-2">
              No cars found
            </h3>
            <p className="font-body text-sm text-dark-400 max-w-xs">
              Try a different search term or clear the filter to see all cars.
            </p>
            <button
              onClick={() => { setSearch(""); setType("All"); }}
              className="btn-outline mt-6"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCars;
