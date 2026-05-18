// Reusable Button component with multiple style variants

const Button = ({ children, variant = "primary", onClick, type = "button", className = "", disabled = false }) => {
  // Define style variants
  const variants = {
    primary:
      "bg-charcoal text-white hover:bg-gold hover:text-white border border-charcoal hover:border-gold",
    outline:
      "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-white",
    gold:
      "bg-gold text-white hover:bg-charcoal border border-gold hover:border-charcoal",
    ghost:
      "bg-transparent text-charcoal hover:text-gold underline underline-offset-4",
    whatsapp:
      "bg-green-600 text-white hover:bg-green-700 border border-green-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-6 py-3 rounded-none
        font-sans text-sm font-medium tracking-widest uppercase
        transition-all duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
