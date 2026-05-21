// 

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiArrowRightLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiMapPinLine,
  RiCustomerService2Line,
  RiCarLine,
  RiSearchLine,
  RiCalendarCheckLine,
} from "react-icons/ri";
import CarCard from "../components/ui/CarCard.jsx";
import useFetch from "../hooks/useFetch.js";

// ---  helpers for animation ------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

// --- copied static data ----
const perks = [
  {
    icon: RiShieldCheckLine,
    title: "Fully Insured",
    desc: "Every vehicle in our fleet comes with comprehensive coverage so you drive with peace of mind.",
  },
  {
    icon: RiTimeLine,
    title: "Flexible Hours",
    desc: "Pick up and drop off at any time that suits you — we work around your schedule.",
  },
  {
    icon: RiMapPinLine,
    title: "City-Wide Pickup",
    desc: "Multiple pickup points across the city. Get the car delivered to your door on request.",
  },
  {
    icon: RiCustomerService2Line,
    title: "24/7 Support",
    desc: "Our team is always on standby. Call, chat, or email — we respond within minutes.",
  },
];

const steps = [
  {
    num: "01",
    icon: RiSearchLine,
    title: "Browse the Fleet",
    desc: "Search by car type, location, or price range. Filter down to exactly what you need.",
  },
  {
    num: "02",
    icon: RiCalendarCheckLine,
    title: "Book Instantly",
    desc: "Pick your dates, add a special note if needed, and confirm your booking in seconds.",
  },
  {
    num: "03",
    icon: RiCarLine,
    title: "Hit the Road",
    desc: "Pick up your car from the agreed location and start your journey. It's that simple.",
  },
];

// ---- component -----
const Home = () => {
  const { data: cars, loading, error } = useFetch("/cars");

  // show first 6 on home page
  const featured = cars?.slice(0, 6) || [];

  return (
    <div className="pt-16">
      {/* -- Hero part --- */}
      <section className="relative min-h-screen flex items-center bg-dark-900 dark:bg-dark-950 overflow-hidden">
        {/* background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* bit orange glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container-custom relative z-10 py-24">
          <div className="max-w-5xl">
            {/* <div className="max-w-full"> */}
            {/* small label */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-brand-400 text-xs font-body font-medium tracking-wide">
                500+ vehicles available now
              </span>
            </motion.div>

            {/* heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Drive the car <br />
              <span className="text-gradient">you deserve.</span>
            </motion.h1>

            {/* subtext */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.2}
              className="font-body text-dark-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Premium rentals with transparent pricing. From city runabouts to
              luxury SUVs — find the perfect vehicle for any trip and book it in
              under two minutes.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.3}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/explore"
                className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3"
              >
                Explore Cars
                <RiArrowRightLine className="text-lg" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-base px-8 py-3 rounded-lg font-body font-medium text-dark-300 hover:text-white border border-dark-700 hover:border-dark-500 transition-all"
              >
                Create an account
              </Link>
            </motion.div>

            {/* stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
              className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-dark-800"
            >
              {[
                ["500+", "Cars in fleet"],
                ["50k+", "Happy renters"],
                ["30+", "Pickup points"],
                ["4.9 ★", "Average rating"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display font-bold text-2xl text-white">
                    {num}
                  </p>
                  <p className="font-body text-xs text-dark-500 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- available cars --- */}
      <section className="py-20 bg-white dark:bg-dark-950">
        <div className="container-custom">
          {/* heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="font-body text-brand-500 text-sm font-medium mb-2 uppercase tracking-widest">
                Our Fleet
              </p>
              <h2 className="section-title">Available Cars</h2>
              <p className="section-subtitle mt-2">
                Hand-picked vehicles ready for your next trip. All prices are
                per day with no hidden fees.
              </p>
            </div>
            <Link
              to="/explore"
              className="btn-outline shrink-0 inline-flex items-center gap-2"
            >
              See all cars <RiArrowRightLine />
            </Link>
          </div>

          {/* loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="spinner" />
              <p className="font-body text-sm text-dark-400">
                Loading vehicles...
              </p>
            </div>
          )}

          {/* error */}
          {error && (
            <div className="text-center py-20">
              <p className="font-body text-dark-500 dark:text-dark-400">
                Could not load cars. Try again later
              </p>
            </div>
          )}

          {/* grid */}
          {!loading && !error && featured.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((car, i) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          )}

          {/* empty state */}
          {!loading && !error && featured.length === 0 && (
            <div className="text-center py-20">
              <RiCarLine className="text-5xl text-dark-300 dark:text-dark-600 mx-auto mb-3" />
              <p className="font-body text-dark-400">
                No cars added yet. Be the first to{" "}
                <Link to="/add-car" className="text-brand-500 hover:underline">
                  add one
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- why drivefleet ----*/}
      <section className="py-20 bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="font-body text-brand-500 text-sm font-medium mb-2 uppercase tracking-widest">
              Why us
            </p>
            <h2 className="section-title">
              Everything you need, <br className="hidden sm:block" />
              nothing you don&apos;t.
            </h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              We built DriveFleet to be the rental platform we always wished
              existed — simple, honest, and fast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                  <perk.icon className="text-brand-500 text-xl" />
                </div>
                <h3 className="font-display font-semibold text-dark-900 dark:text-white mb-2">
                  {perk.title}
                </h3>
                <p className="font-body text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- how it works----*/}
      <section className="py-20 bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="font-body text-brand-500 text-sm font-medium mb-2 uppercase tracking-widest">
              The process
            </p>
            <h2 className="section-title">Renting made simple.</h2>
            <p className="section-subtitle mx-auto text-center mt-3">
              Three steps and you are on the road. No paperwork, no waiting, no
              surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector line — for desktop */}
            <div className="hidden md:block absolute top-8 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* circle on icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <step.icon className="text-brand-500 text-2xl" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-display font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-dark-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-dark-500 dark:text-dark-400 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* bottom cta */}
          <div className="text-center mt-14">
            <Link
              to="/explore"
              className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3"
            >
              Start browsing <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
