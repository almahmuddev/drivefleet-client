// 

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { RiCloseLine, RiCalendarLine, RiUserLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

const BookingModal = ({ car, onClose }) => {
  const { user } = useAuth();
  const [driver, setDriver] = useState("no");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const handleBook = async () => {
    setBusy(true);
    try {
      await api.post("/bookings", {
        carId: car._id,
        carName: car.name,
        carImage: car.image,
        dailyPrice: car.dailyPrice,
        totalPrice: car.dailyPrice,
        userEmail: user.email,
        userName: user.displayName,
        driverNeeded: driver === "yes",
        specialNote: note.trim(),
        bookedAt: new Date(),
      });

      toast.success("Booking confirmed!");
      onClose();
    } catch (err) {
      toast.error("Booking failed. Please try again.");
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

        {/* modal part */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* header  */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-100 dark:border-dark-700">
            <div>
              <h2 className="font-display font-bold text-lg text-dark-900 dark:text-white">
                Book this car
              </h2>
              <p className="font-body text-xs text-dark-400 mt-0.5">{car.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-dark-400 hover:text-dark-600 hover:bg-dark-100 dark:hover:bg-dark-700 transition-all"
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>

          {/* body  */}
          <div className="px-6 py-5 space-y-5">
            {/* price summary */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
              <div className="flex items-center gap-2">
                <RiCalendarLine className="text-brand-500" />
                <span className="font-body text-sm text-dark-700 dark:text-dark-300">
                  Booking date
                </span>
              </div>
              <div className="text-right">
                <p className="font-body text-xs text-dark-400">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                </p>
                <p className="font-display font-bold text-brand-500">
                  ${car.dailyPrice} / day
                </p>
              </div>
            </div>

            {/* if driver needed */}
            <div>
              <label className="label flex items-center gap-1.5">
                <RiUserLine className="text-brand-500" />
                Driver needed?
              </label>
              <div className="flex gap-3">
                {["yes", "no"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDriver(val)}
                    className={`flex-1 py-2.5 rounded-lg border font-body text-sm font-medium transition-all ${driver === val
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-dark-200 dark:border-dark-600 text-dark-600 dark:text-dark-300 hover:border-brand-400"
                      }`}
                  >
                    {val === "yes" ? "Yes, I need a driver" : "No, I will drive"}
                  </button>
                ))}
              </div>
            </div>

            {/* for special note */}
            <div>
              <label className="label">Special note (optional)</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Any special requests or notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              disabled={busy}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              {busy ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Now"
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
