// 

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine,
  RiGroupLine,
  RiArrowRightLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

const CarCard = ({ car }) => {
  const {
    _id,
    name,
    type,
    dailyPrice,
    image,
    seats,
    location,
    available,
    bookingCount,
  } = car;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card-hover flex flex-col"
    >
      {/* image brought it from outside via link*/}
      <div className="relative overflow-hidden h-48 bg-dark-100 dark:bg-dark-700">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80";
          }}
        />
        {/* available badge */}
        <div className="absolute top-3 left-3">
          {available ? (
            <span className="badge-available">
              <RiCheckLine /> Available
            </span>
          ) : (
            <span className="badge-unavailable">
              <RiCloseLine /> Unavailable
            </span>
          )}
        </div>
        {/* type badge */}
        <div className="absolute top-3 right-3">
          <span className="badge bg-dark-900/70 text-white backdrop-blur-sm">
            {type}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-dark-900 dark:text-white mb-3 leading-snug">
          {name}
        </h3>

        {/* details row */}
        <div className="flex items-center gap-4 text-sm font-body text-dark-500 dark:text-dark-400 mb-4">
          <span className="flex items-center gap-1">
            <RiGroupLine className="text-brand-500" />
            {seats} seats
          </span>
          <span className="flex items-center gap-1">
            <RiMapPinLine className="text-brand-500" />
            {location}
          </span>
        </div>

        {/* price + button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-100 dark:border-dark-700">
          <div>
            <span className="font-display font-bold text-xl text-brand-500">
              ${dailyPrice}
            </span>
            <span className="font-body text-xs text-dark-400 ml-1">/ day</span>
          </div>
          <Link
            to={`/cars/${_id}`}
            className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-brand-500 hover:text-brand-600 transition-colors group"
          >
            View Details
            <RiArrowRightLine className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
