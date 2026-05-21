// 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { RiCarLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const types = ["Sedan", "SUV", "Hatchback", "Luxury", "Convertible", "Pickup"];

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    name: "",
    dailyPrice: "",
    type: "Sedan",
    image: "",
    seats: "",
    location: "",
    description: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/cars", {
        ...form,
        dailyPrice: Number(form.dailyPrice),
        seats: Number(form.seats),
        ownerEmail: user.email,
        ownerName: user.displayName,
        bookingCount: 0,
        addedAt: new Date(),
      });
      toast.success("Car listed successfully!");
      navigate("/my-added-cars");
    } catch {
      toast.error("Failed to add car. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-dark-950">
      <div className="container-custom max-w-2xl">
        {/* header part */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <RiCarLine className="text-brand-500 text-xl" />
            </div>
            <p className="font-body text-brand-500 text-sm font-medium uppercase tracking-widest">
              New listing
            </p>
          </div>
          <h1 className="section-title">Add a Car</h1>
          <p className="section-subtitle mt-2">
            Fill in the details below to list your car for rent.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          onSubmit={handleSubmit}
          className="card p-8 space-y-6"
        >
          {/* car name */}
          <div>
            <label className="label">Car name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="e.g. Toyota Camry XSE"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* price + type row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Daily rent price ($)</label>
              <input
                type="number"
                name="dailyPrice"
                className="input-field"
                placeholder="e.g. 65"
                min="1"
                value={form.dailyPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Car type</label>
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

          {/*  image link */}
          <div>
            <label className="label">Image URL</label>
            <input
              type="url"
              name="image"
              className="input-field"
              placeholder="https://i.ibb.co/your-image.jpg"
              value={form.image}
              onChange={handleChange}
              required
            />
            <p className="font-body text-xs text-dark-400 mt-1.5">
              Upload your image to{" "}
              <a
                href="https://imgbb.com"
                target="_blank"
                rel="noreferrer"
                className="text-brand-500 hover:underline"
              >
                imgbb.com
              </a>{" "}
              and paste the direct link here.
            </p>
          </div>

          {/* seats + location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Seat capacity</label>
              <input
                type="number"
                name="seats"
                className="input-field"
                placeholder="e.g. 5"
                min="1"
                max="20"
                value={form.seats}
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
                placeholder="e.g. Dhaka, Bangladesh"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* description for that car */}
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              className="input-field resize-none"
              rows={4}
              placeholder="Describe the car — features, condition, highlights..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* cars availability */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setForm((p) => ({ ...p, available: !p.available }))}
              className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 ${form.available ? "bg-brand-500" : "bg-dark-300 dark:bg-dark-600"
                }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form.available ? "translate-x-5" : "translate-x-0.5"
                  }`}
              />
            </div>
            <span className="font-body text-sm text-dark-700 dark:text-dark-300">
              Available for booking
            </span>
          </div>

          {/* submit btn */}
          <button
            type="submit"
            disabled={busy}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            {busy ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding car...
              </>
            ) : (
              "Add Car"
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddCar;
