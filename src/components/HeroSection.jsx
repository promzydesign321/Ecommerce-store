import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[80vh] items-center">

          {/* Left — Text Content */}
          <div className="py-16 lg:py-24 pr-0 lg:pr-12 order-2 lg:order-1">
            {/* Label */}
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium mb-6">
              New Collection 2025
            </p>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-charcoal leading-[1.1] mb-6">
              Elegance in{" "}
              <span className="italic font-normal text-gold">Every</span>
              <br />
              Thread
            </h1>

            {/* Subtext */}
            <p className="text-sm text-muted leading-relaxed max-w-md mb-10 font-light">
              Discover our curated collection of premium Abayas and modest gowns,
              crafted for the modern Muslim woman who never compromises on grace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300"
              >
                Shop Collection
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://wa.me/2349024128360"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-charcoal px-8 py-4 text-xs tracking-widest uppercase font-medium border border-beige hover:border-charcoal transition-colors duration-300"
              >
                Order via WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-beige">
              {[
                { number: "500+", label: "Happy Customers" },
                { number: "100+", label: "Designs" },
                { number: "5★", label: "Rated" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl font-semibold text-charcoal">{stat.number}</p>
                  <p className="text-[10px] tracking-widest uppercase text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="relative order-1 lg:order-2 h-72 sm:h-96 lg:h-full lg:min-h-[80vh]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
              alt="Elegant modest fashion"
              className="w-full h-full object-cover object-top"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent lg:bg-gradient-to-r lg:from-cream/20 lg:to-transparent" />

            {/* Floating card */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-4 shadow-lg">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted">Featured</p>
              <p className="font-serif text-base text-charcoal mt-0.5">Midnight Noir Abaya</p>
              <p className="text-sm font-semibold text-gold mt-1">₦45,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
