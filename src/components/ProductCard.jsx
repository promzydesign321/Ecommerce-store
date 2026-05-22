import { Link } from "react-router-dom";

// Format price as Nigerian Naira
const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-warm-gray rounded-sm overflow-hidden border border-beige hover:border-gold/30 shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gold text-black text-[10px] tracking-widest uppercase px-2.5 py-1 font-semibold">
            {product.badge}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-gold font-medium border border-gold/30 px-4 py-2">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 border-t border-beige">
        {/* Category */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-1">{product.category}</p>

        {/* Name */}
        <h3 className="font-serif text-lg text-charcoal leading-tight mb-2">{product.name}</h3>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-sans text-sm font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="text-[10px] tracking-widest uppercase font-medium text-charcoal border-b border-charcoal hover:text-gold hover:border-gold transition-colors duration-300 pb-0.5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
