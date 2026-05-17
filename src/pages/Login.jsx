// 


import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { RiEyeLine, RiEyeOffLine, RiGoogleFill, RiCarLine } from "react-icons/ri";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, pass);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.code === "auth/invalid-credential"
        ? "Invalid email or password."
        : "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-16 bg-white dark:bg-dark-950">
      {/* Left panel — brand side */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-dark-900 dark:bg-dark-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
            <RiCarLine className="text-white text-lg" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Drive<span className="text-brand-500">Fleet</span>
          </span>
        </Link>

        {/* Quote block */}
        <div className="relative z-10">
          <p className="font-display text-4xl font-bold text-white leading-snug mb-4">
            Your next journey <br />
            starts here.
          </p>
          <p className="font-body text-dark-400 text-sm leading-relaxed max-w-xs">
            Thousands of premium vehicles ready for pickup. Transparent pricing,
            zero hidden fees.
          </p>
        </div>

        {/* Bottom stat strip */}
        <div className="flex gap-8 relative z-10">
          {[["500+", "Cars available"], ["50k+", "Happy renters"], ["4.9★", "Avg rating"]].map(
            ([num, label]) => (
              <div key={label}>
                <p className="font-display font-bold text-xl text-white">{num}</p>
                <p className="font-body text-xs text-dark-500">{label}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Right panel — form side */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <RiCarLine className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-dark-900 dark:text-white">
              Drive<span className="text-brand-500">Fleet</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-dark-900 dark:text-white mb-1">
            Welcome back
          </h1>
          <p className="font-body text-dark-500 dark:text-dark-400 text-sm mb-8">
            Sign in to your account to continue
          </p>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-700 dark:text-dark-200 font-body font-medium text-sm hover:bg-dark-50 dark:hover:bg-dark-700 transition-all disabled:opacity-50 mb-6"
          >
            <RiGoogleFill className="text-lg text-[#4285F4]" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700" />
            <span className="font-body text-xs text-dark-400">or sign in with email</span>
            <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="input-field pr-11"
                  placeholder="Enter your password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 transition-colors p-1"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full justify-center flex items-center gap-2 mt-2"
            >
              {busy ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="font-body text-sm text-dark-500 dark:text-dark-400 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
