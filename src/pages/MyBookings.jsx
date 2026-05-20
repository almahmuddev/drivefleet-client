// 

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiCalendarLine,
  RiCarLine,
  RiUserLine,
  RiFileTextLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings", {
          params: { email: user.email },
        });
        setBookings(res.data);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.email]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark-950">
      <div className="container-custom">
        {/* header */}
        <div className="mb-10">
          <p className="font-body text-brand-500 text-sm font-medium mb-2 uppercase tracking-widest">
            Your trips
          </p>
          <h1 className="section-title">My Bookings</h1>
          <p className="section-subtitle mt-2">
            All your car rental bookings in one place.
          </p>
        </div>

        {/* loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="spinner" />
            <p className="font-body text-sm text-dark-400">
              Loading your bookings...
            </p>
          </div>
        )}

        {/* show empty */}
        {!loading && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RiCarLine className="text-6xl text-dark-300 dark:text-dark-600 mb-4" />
            <h3 className="font-display font-semibold text-dark-700 dark:text-dark-300 mb-2">
              No bookings yet
            </h3>
            <p className="font-body text-sm text-dark-400 max-w-xs mb-6">
              You have not booked any cars yet. Browse our fleet and find your
              perfect ride.
            </p>
            <a href="/explore" className="btn-primary">
              Explore Cars
            </a>
          </div>
        )}

        {/* booking list */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking, i) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="card p-0 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Car image */}
                  <div className="sm:w-48 h-40 sm:h-auto bg-dark-100 dark:bg-dark-700 flex-shrink-0 overflow-hidden">
                    <img
                      src={booking.carImage}
                      alt={booking.carName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80";
                      }}
                    />
                  </div>

                  {/* info: */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <h3 className="font-display font-bold text-lg text-dark-900 dark:text-white">
                        {booking.carName}
                      </h3>
                      {/* total price badge */}
                      <div className="flex items-center gap-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-3 py-1.5 rounded-lg shrink-0">
                        <RiMoneyDollarCircleLine />
                        <span className="font-display font-bold text-sm">
                          ${booking.totalPrice}
                        </span>
                        <span className="font-body text-xs opacity-70">total</span>
                      </div>
                    </div>

                    {/* details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* booking date */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-dark-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <RiCalendarLine className="text-brand-500 text-sm" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-dark-400 mb-0.5">
                            Booking date
                          </p>
                          <p className="font-body text-sm font-medium text-dark-800 dark:text-dark-200">
                            {formatDate(booking.bookedAt)}
                          </p>
                        </div>
                      </div>

                      {/* driver info */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-dark-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <RiUserLine className="text-brand-500 text-sm" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-dark-400 mb-0.5">
                            Driver
                          </p>
                          <p className="font-body text-sm font-medium text-dark-800 dark:text-dark-200">
                            {booking.driverNeeded ? "Driver included" : "Self drive"}
                          </p>
                        </div>
                      </div>

                      {/* special note */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-dark-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <RiFileTextLine className="text-brand-500 text-sm" />
                        </div>
                        <div>
                          <p className="font-body text-xs text-dark-400 mb-0.5">
                            Note
                          </p>
                          <p className="font-body text-sm font-medium text-dark-800 dark:text-dark-200">
                            {booking.specialNote || "No special note"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
