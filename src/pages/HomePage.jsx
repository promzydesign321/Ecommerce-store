import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import { categories, testimonials } from "../data/products";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only first 3 featured products from Supabase
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">Handpicked For You</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal font-light">Featured Collection</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-xs tracking-widest uppercase text-muted">Loading featured pieces...</p>
          </div>
        ) : (
          <ProductGrid products={featuredProducts} />
        )}

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 text-xs tracking-widest uppercase font-medium text-charcoal border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors duration-300"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>


      {/* ── Divider Banner ── */}
      <div className="bg-charcoal py-10 text-center">
        <p className="font-serif text-2xl md:text-3xl italic text-white font-light">
          "Modesty is not a limit — it's a statement."
        </p>
        <p className="text-xs tracking-[0.3em] uppercase text-gold mt-3">XYZ Collection</p>
      </div>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">Browse By</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal font-light">Our Categories</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              className="group relative overflow-hidden aspect-[4/5] bg-warm-gray rounded-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/50 transition-colors duration-300" />
              {/* Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="font-serif text-2xl font-light">{cat.name}</h3>
                <p className="text-xs tracking-widest uppercase mt-1 text-white/70">{cat.description}</p>
                <span className="mt-4 text-[10px] tracking-widest uppercase border-b border-white/60 pb-0.5 text-white/80 group-hover:border-gold group-hover:text-gold transition-colors duration-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WhatsApp CTA Banner ── */}
      <section className="bg-gradient-to-br from-[#121212] to-[#1C1C1C] border-y border-gold/10 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">Easy Ordering</p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-4">
            Order in 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            {[
              { step: "01", title: "Browse", desc: "Find your perfect piece from our collection" },
              { step: "02", title: "Select", desc: "Choose your size and preferred style" },
              { step: "03", title: "Message Us", desc: "Send us a WhatsApp message to place your order" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="font-serif text-4xl text-gold/40 font-light">{item.step}</p>
                <h4 className="font-serif text-xl text-charcoal mt-1">{item.title}</h4>
                <p className="text-xs text-muted mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/2349024128360"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-12 bg-green-700 text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-green-800 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat With Us on WhatsApp
          </a>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">Kind Words</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal font-light">Customer Love</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-warm-gray p-8 border border-beige rounded-sm shadow-sm hover:border-gold/30 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>
              {/* Quote */}
              <p className="text-sm text-muted leading-relaxed italic">"{t.comment}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-serif text-lg font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-muted">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
