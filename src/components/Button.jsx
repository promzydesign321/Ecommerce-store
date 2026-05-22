// Reusable Button component with multiple style variants

const Button = ({ children, variant = "primary", onClick, type = "button", className = "", disabled = false }) => {
  // Define style variants
  const variants = {
    primary:
      "bg-gold text-black hover:bg-transparent hover:text-gold border border-gold hover:border-gold font-semibold",
    outline:
      "bg-transparent text-white border border-white hover:bg-gold hover:text-black hover:border-gold font-medium",
    gold:
      "bg-gold text-black hover:bg-black hover:text-gold border border-gold hover:border-gold font-semibold",
    ghost:
      "bg-transparent text-gold hover:text-gold-light underline underline-offset-4 font-medium",
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
