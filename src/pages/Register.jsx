// 


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiGoogleFill,
  RiCarLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

// Password rules we check against
const rules = [
  { id: "upper",  label: "One uppercase letter",  test: (p) => /[A-Z]/.test(p) },
  { id: "lower",  label: "One lowercase letter",  test: (p) => /[a-z]/.test(p) },
  { id: "length", label: "At least 6 characters", test: (p) => p.length >= 6 },
];

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [photo, setPhoto]     = useState("");
  const [pass, setPass]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy]       = useState(false);
  const [touched, setTouched] = useState(false); // show rules 

  const passValid = rules.every((r) => r.test(pass));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!passValid) return; // block submit if rules fail

    setBusy(true);
    try {
      await register(name, email, pass, photo);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      const msg =
        err.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    try {
      await googleLogin();
      toast.success("Account created with Google!");
      navigate("/");
    } catch {
      toast.error("Google sign-up failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-16 bg-white dark:bg-dark-950">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-dark-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
            <RiCarLine className="text-white text-lg" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Drive<span className="text-brand-500">Fleet</span>
          </span>
        </Link>

        <div className="relative z-10">
          <p className="font-display text-4xl font-bold text-white leading-snug mb-4">
            Join thousands of <br />
            happy renters.
          </p>
          <p className="font-body text-dark-400 text-sm leading-relaxed max-w-xs">
            Create your free account and get access to our full fleet. No
            subscription required.
          </p>
        </div>

        <div className="flex gap-8 relative z-10">
          {[["Free", "To register"], ["Instant", "Booking"], ["24/7", "Support"]].map(
            ([num, label]) => (
              <div key={label}>
                <p className="font-display font-bold text-xl text-white">{num}</p>
                <p className="font-body text-xs text-dark-500">{label}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Right form panel */}
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
            Create account
          </h1>
          <p className="font-body text-dark-500 dark:text-dark-400 text-sm mb-8">
            Fill in your details to get started
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
            <span className="font-body text-xs text-dark-400">or fill in the form</span>
            <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">Full name</label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
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

            {/* Photo URL */}
            <div>
              <label className="label">
                Photo URL{" "}
                <span className="text-dark-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                className="input-field"
                placeholder="https://example.com/photo.jpg"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                autoComplete="photo"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className={`input-field pr-11 ${
                    touched && !passValid
                      ? "border-red-400 focus:ring-red-400"
                      : ""
                  }`}
                  placeholder="Create a password"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setTouched(true);
                  }}
                  required
                  autoComplete="new-password"
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

              {/* Password rules — shows when user starts typing */}
              {touched && pass.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 space-y-1"
                >
                  {rules.map((rule) => {
                    const ok = rule.test(pass);
                    return (
                      <li
                        key={rule.id}
                        className={`flex items-center gap-2 text-xs font-body transition-colors ${
                          ok
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {ok ? (
                          <RiCheckLine className="flex-shrink-0" />
                        ) : (
                          <RiCloseLine className="flex-shrink-0" />
                        )}
                        {rule.label}
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full justify-center flex items-center gap-2 mt-2"
            >
              {busy ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="font-body text-sm text-dark-500 dark:text-dark-400 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
