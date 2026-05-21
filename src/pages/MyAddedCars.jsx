// 

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  RiCarLine, RiEditLine, RiDeleteBinLine,
  RiMapPinLine, RiGroupLine, RiCheckLine, RiCloseLine,
} from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import UpdateCarModal from "../components/ui/UpdateCarModal";
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal";

const MyAddedCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cars", { params: { email: user.email } });
      setCars(res.data);
    } catch {
      toast.error("Could not load your cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/cars/${deleteCar._id}`);
      toast.success("Car deleted.");
      setDeleteCar(null);
      loadCars();
    } catch {
      toast.error("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark-950">
      <div className="container-custom">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-body text-brand-500 text-sm font-medium mb-2 uppercase tracking-widest">
              My listings
            </p>
            <h1 className="section-title">My Added Cars</h1>
            <p className="section-subtitle mt-2">
              Manage the cars you have listed for rent.
            </p>
          </div>
          <Link to="/add-car" className="btn-primary shrink-0 inline-flex items-center gap-2">
            <RiCarLine /> Add new car
          </Link>
        </div>

        {/* loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="spinner" />
            <p className="font-body text-sm text-dark-400">Loading your cars...</p>
          </div>
        )}

        {/* empty car */}
        {!loading && cars.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <RiCarLine className="text-6xl text-dark-300 dark:text-dark-600 mb-4" />
            <h3 className="font-display font-semibold text-dark-700 dark:text-dark-300 mb-2">
              No cars listed yet
            </h3>
            <p className="font-body text-sm text-dark-400 mb-6 max-w-xs">
              You have not added any cars. Click the button above to list your first vehicle.
            </p>
            <Link to="/add-car" className="btn-primary">
              Add your first car
            </Link>
          </div>
        )}


        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, i) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="card flex flex-col"
              >
                {/* image */}
                <div className="relative h-44 overflow-hidden bg-dark-100 dark:bg-dark-700">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3">
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
                </div>

                {/* content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-dark-900 dark:text-white leading-snug">
                      {car.name}
                    </h3>
                    <span className="badge bg-dark-100 dark:bg-dark-700 text-dark-500 dark:text-dark-300 shrink-0">
                      {car.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-body text-dark-500 dark:text-dark-400 mb-3">
                    <span className="flex items-center gap-1">
                      <RiGroupLine className="text-brand-500" /> {car.seats} seats
                    </span>
                    <span className="flex items-center gap-1">
                      <RiMapPinLine className="text-brand-500" /> {car.location}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-dark-100 dark:border-dark-700">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display font-bold text-lg text-brand-500">
                        ${car.dailyPrice}
                        <span className="font-body text-xs text-dark-400 font-normal ml-1">/ day</span>
                      </span>
                      <span className="font-body text-xs text-dark-400">
                        {car.bookingCount || 0} bookings
                      </span>
                    </div>

                    {/* action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditCar(car)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-brand-400 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 font-body text-sm font-medium transition-all"
                      >
                        <RiEditLine /> Update
                      </button>
                      <button
                        onClick={() => setDeleteCar(car)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-body text-sm font-medium transition-all"
                      >
                        <RiDeleteBinLine /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* update modal */}
      {editCar && (
        <UpdateCarModal
          car={editCar}
          onClose={() => setEditCar(null)}
          onUpdated={loadCars}
        />
      )}

      {/* delete confirm modal */}
      {deleteCar && (
        <DeleteConfirmModal
          carName={deleteCar.name}
          busy={deleting}
          onConfirm={handleDelete}
          onClose={() => setDeleteCar(null)}
        />
      )}
    </div>
  );
};

export default MyAddedCars;
