import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit with real Supabase Auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        throw authError;
      }

      if (data?.user) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-semibold tracking-wider text-charcoal">XYZ</h1>
          <p className="text-xs tracking-[0.3em] uppercase text-muted mt-1">Collection · Admin</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-beige p-10 shadow-sm">
          <h2 className="font-serif text-2xl text-charcoal mb-1">Welcome Back</h2>
          <p className="text-xs text-muted tracking-wide mb-8">Sign in to manage your store</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-none text-xs tracking-wide mb-6">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="admin@xyzcollection.com"
                className="w-full border border-beige px-4 py-3 text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold transition-colors duration-200 bg-cream"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-beige px-4 py-3 text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:border-gold transition-colors duration-200 bg-cream"
                disabled={loading}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-white py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Note */}
          <p className="text-xs text-muted text-center mt-6">
            Authentication is powered securely by Supabase.
          </p>
        </div>

        {/* Back to store */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors duration-300">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

