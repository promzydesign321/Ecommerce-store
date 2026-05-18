import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";

// Format price as Nigerian Naira
const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product by ID and then fetch related products
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // Fetch Main Product
        const { data: mainProduct, error: mainError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (mainError) throw mainError;
        setProduct(mainProduct);

        if (mainProduct) {
          // Fetch Related Products (same category, different ID)
          const { data: relatedProducts, error: relatedError } = await supabase
            .from("products")
            .select("*")
            .eq("category", mainProduct.category)
            .neq("id", mainProduct.id)
            .limit(3);

          if (!relatedError) {
            setRelated(relatedProducts || []);
          }
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Handle Loading
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-xs tracking-widest uppercase text-muted">Loading product details...</p>
        </div>
      </MainLayout>
    );
  }

  // Handle product not found
  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-serif text-3xl text-charcoal mb-4">Product Not Found</h2>
          <Link to="/products" className="text-sm text-gold underline underline-offset-4">
            Back to Collection
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Build WhatsApp message
  const whatsappMessage = `Hi! I'd like to order the *${product.name}* priced at ${formatPrice(product.price)}. Please let me know the next steps. Thank you!`;
  const whatsappUrl = `https://wa.me/2349024128360?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <MainLayout>
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-xs text-muted tracking-widest uppercase">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* ── Product Detail ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Image */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-warm-gray">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-gold text-white text-[10px] tracking-widest uppercase px-3 py-1">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right — Info */}
          <div className="flex flex-col justify-center py-4">
            {/* Category */}
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-3">{product.category}</p>

            {/* Name */}
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal font-light leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl font-sans font-semibold text-charcoal mb-6">
              {formatPrice(product.price)}
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-beige mb-6" />

            {/* Description */}
            <p className="text-sm text-muted leading-relaxed mb-8">{product.description}</p>

            {/* Material */}
            <div className="flex items-center gap-4 mb-8 text-sm">
              <span className="text-xs tracking-widest uppercase text-muted">Material:</span>
              <span className="text-charcoal font-medium">{product.material}</span>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase text-muted mb-3">Available Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="border border-beige px-4 py-2 text-xs font-medium text-charcoal tracking-wide hover:border-charcoal transition-colors cursor-pointer"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-8">
              <span className={`w-2 h-2 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-400"}`} />
              <span className="text-xs tracking-widest uppercase text-muted">
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* WhatsApp Order Button */}
            {product.in_stock ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-700 text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-green-800 transition-colors duration-300 w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-3 bg-gray-200 text-gray-400 px-8 py-4 text-sm tracking-widest uppercase font-medium cursor-not-allowed w-full sm:w-auto"
              >
                Currently Unavailable
              </button>
            )}

            {/* Back to shop */}
            <Link
              to="/products"
              className="mt-4 text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors duration-300 text-center sm:text-left"
            >
              ← Back to Collection
            </Link>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-2">You May Also Love</p>
              <h2 className="font-serif text-3xl text-charcoal font-light">Related Pieces</h2>
              <div className="w-12 h-px bg-gold mx-auto mt-4" />
            </div>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;

