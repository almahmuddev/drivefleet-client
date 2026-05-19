// 

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";
import api from "../../api";

const types = ["Sedan", "SUV", "Hatchback", "Luxury", "Convertible", "Pickup"];

const UpdateCarModal = ({ car, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    dailyPrice:  car.dailyPrice,
    description: car.description,
    available:   car.available,
    image:       car.image,
    type:        car.type,
    location:    car.location,
  });
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.patch(`/cars/${car._id}`, {
        ...form,
        dailyPrice: Number(form.dailyPrice),
      });
      toast.success("Car updated!");
      onUpdated();
      onClose();
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark-950/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* header part */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-100 dark:border-dark-700 sticky top-0 bg-white dark:bg-dark-800 z-10">
            <div>
              <h2 className="font-display font-bold text-lg text-dark-900 dark:text-white">
                Update Car
              </h2>
              <p className="font-body text-xs text-dark-400 mt-0.5 truncate max-w-xs">
                {car.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-dark-400 hover:text-dark-600 hover:bg-dark-100 dark:hover:bg-dark-700 transition-all"
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>

          {/* form for info */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Daily price ($)</label>
                <input
                  type="number"
                  name="dailyPrice"
                  className="input-field"
                  min="1"
                  value={form.dailyPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="label">Type</label>
                <select
                  name="type"
                  className="input-field"
                  value={form.type}
                  onChange={handleChange}
                >
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                name="image"
                className="input-field"
                value={form.image}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Pickup location</label>
              <input
                type="text"
                name="location"
                className="input-field"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Description</label>
              <textarea
                name="description"
                className="input-field resize-none"
                rows={3}
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* availability toggle */}
            <div className="flex items-center gap-3">
              <div
                onClick={() =>
                  setForm((p) => ({ ...p, available: !p.available }))
                }
                className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
                  form.available ? "bg-brand-500" : "bg-dark-300 dark:bg-dark-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    form.available ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="font-body text-sm text-dark-700 dark:text-dark-300">
                Available for booking
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 btn-outline">
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                {busy ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpdateCarModal;
