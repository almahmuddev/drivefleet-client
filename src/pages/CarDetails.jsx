// 

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine, RiGroupLine, RiCheckLine,
  RiCloseLine, RiArrowLeftLine, RiCalendarLine,
} from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import BookingModal from "../components/ui/BookingModal";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data: car, loading, error } = useFetch(`/cars/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950 pt-16">
        <div className="text-center">
          <div className="spinner mx-auto mb-3" />
          <p className="font-body text-sm text-dark-400">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950 pt-16">
        <div className="text-center">
          <p className="font-body text-dark-500 mb-4">Car not found.</p>
          <Link to="/explore" className="btn-primary">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const handleBookClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark-950">
      <div className="container-custom">
        {/* use back link */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 font-body text-sm text-dark-500 dark:text-dark-400 hover:text-brand-500 transition-colors mb-8"
        >
          <RiArrowLeftLine /> Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden bg-dark-100 dark:bg-dark-800 h-72 lg:h-auto"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80";
              }}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className="badge bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300">
                {car.type}
              </span>
              {car.available ? (
                <span className="badge-available">
                  <RiCheckLine /> Available
                </span>
              ) : (
                <span className="badge-unavailable">
                  <RiCloseLine /> Unavailable
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              {car.name}
            </h1>

            {/* price  */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl font-bold text-brand-500">
                ${car.dailyPrice}
              </span>
              <span className="font-body text-dark-400">per day</span>
            </div>

            {/* quick stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: RiGroupLine, label: "Seats", value: `${car.seats} people` },
                { icon: RiMapPinLine, label: "Pickup", value: car.location },
                { icon: RiCalendarLine, label: "Bookings", value: `${car.bookingCount || 0} trips` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-dark-400">{item.label}</p>
                    <p className="font-body text-sm font-medium text-dark-800 dark:text-dark-200">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* description */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-dark-900 dark:text-white mb-2">
                About this car
              </h3>
              <p className="font-body text-dark-500 dark:text-dark-400 leading-relaxed text-sm">
                {car.description}
              </p>
            </div>

            {/* booking button */}
            <button
              onClick={handleBookClick}
              disabled={!car.available}
              className={`w-full py-3.5 rounded-xl font-body font-semibold text-base transition-all ${car.available
                  ? "btn-primary"
                  : "bg-dark-100 dark:bg-dark-700 text-dark-400 cursor-not-allowed"
                }`}
            >
              {car.available ? "Book Now" : "Currently Unavailable"}
            </button>

            {!user && car.available && (
              <p className="font-body text-xs text-dark-400 text-center mt-3">
                You need to{" "}
                <Link to="/login" className="text-brand-500 hover:underline">
                  sign in
                </Link>{" "}
                to book this car.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* booking modal */}
      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CarDetails;
