import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Abaya", "Evening Gown", "Modest Wear"];

  // Fetch all products from Supabase
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <MainLayout>
      {/* ── Page Header ── */}
      <div className="bg-beige py-14 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-2">Browse</p>
        <h1 className="font-serif text-5xl text-charcoal font-light">Our Collection</h1>
        <p className="text-sm text-muted mt-3 tracking-wide">
          {loading ? "..." : `${products.length} pieces of curated modest fashion`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="text-xs tracking-widest uppercase text-muted mr-2">Filter:</span>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-medium border transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-charcoal text-white border-charcoal"
                  : "bg-transparent text-charcoal border-beige hover:border-charcoal"
              }`}
            >
              {filter}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted">
            {loading ? "..." : `${filteredProducts.length} items`}
          </span>
        </div>

        {/* ── Product Grid ── */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-xs tracking-widest uppercase text-muted">Loading collection...</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </MainLayout>
  );
};

export default ProductsPage;

