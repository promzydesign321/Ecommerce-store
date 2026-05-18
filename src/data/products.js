// Dummy product data for XYZ Collection
// Replace images with real ones when connecting Supabase

export const products = [
  {
    id: 1,
    name: "Midnight Noir Abaya",
    slug: "midnight-noir-abaya",
    price: 45000,
    category: "Abaya",
    description:
      "An exquisite full-length abaya crafted from premium Japanese crepe fabric. Features delicate floral embroidery along the neckline and cuffs, offering a perfect blend of modesty and luxury. The flowing silhouette gracefully complements every body type. Ideal for formal occasions and evening gatherings.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Japanese Crepe",
  },
  {
    id: 2,
    name: "Pearl White Abaya",
    slug: "pearl-white-abaya",
    price: 38000,
    category: "Abaya",
    description:
      "A breathtakingly elegant ivory-white abaya made from soft chiffon. The flowing silhouette is adorned with subtle silver thread details, creating a timeless and graceful look. Perfect for nikah ceremonies, Eid celebrations, or any special occasion where you want to radiate pure elegance.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    badge: "New Arrival",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    material: "Soft Chiffon",
  },
  {
    id: 3,
    name: "Rose Gold Evening Gown",
    slug: "rose-gold-evening-gown",
    price: 52000,
    category: "Evening Gown",
    description:
      "A stunning modest evening gown in a warm rose gold tone. Features a high neckline, long sleeves, and a gracefully flowing skirt. Crafted from premium satin fabric with delicate beadwork at the waist. Perfect for weddings, formal events, and special celebrations.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    badge: "Featured",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Premium Satin",
  },
  {
    id: 4,
    name: "Classic Beige Abaya",
    slug: "classic-beige-abaya",
    price: 35000,
    category: "Abaya",
    description:
      "A versatile and elegant beige abaya made from high-quality linen blend. The relaxed yet refined silhouette makes it perfect for both casual outings and semi-formal occasions. Minimalist button details at the cuffs add a sophisticated touch. A wardrobe staple that never goes out of style.",
    image: "https://images.unsplash.com/photo-1558171813-1f7fa7030cf1?auto=format&fit=crop&w=600&q=80",
    badge: null,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Linen Blend",
  },
  {
    id: 5,
    name: "Emerald Luxury Abaya",
    slug: "emerald-luxury-abaya",
    price: 48000,
    category: "Abaya",
    description:
      "A rich emerald green abaya that radiates luxury and sophistication. Crafted from premium velvet with intricate gold embellishments along the collar and hemline. A statement piece for those who appreciate the finest in modest fashion.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
    badge: "Premium",
    inStock: true,
    sizes: ["M", "L", "XL"],
    material: "Premium Velvet",
  },
  {
    id: 6,
    name: "Silver Silk Gown",
    slug: "silver-silk-gown",
    price: 55000,
    category: "Evening Gown",
    description:
      "An ultra-luxurious silver silk gown with long sleeves and a modest yet glamorous silhouette. The soft fabric drapes beautifully, creating an ethereal and elegant look. An unforgettable choice for formal events and galas.",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80",
    badge: "Limited Edition",
    inStock: false,
    sizes: ["S", "M", "L"],
    material: "Pure Silk",
  },
];

export const categories = [
  {
    id: 1,
    name: "Abayas",
    description: "Timeless elegance in every stitch",
    count: 4,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Evening Gowns",
    description: "Sophisticated modest evening wear",
    count: 2,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Modest Wear",
    description: "Everyday grace and style",
    count: 8,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Fatimah Al-Rashid",
    location: "Lagos, Nigeria",
    comment:
      "XYZ Collection never disappoints. The Midnight Noir Abaya I ordered was beyond my expectations — the quality is absolutely stunning.",
    rating: 5,
    avatar: "F",
  },
  {
    id: 2,
    name: "Aisha Muhammad",
    location: "Abuja, Nigeria",
    comment:
      "Finally a brand that understands modest fashion without compromising on elegance. I ordered via WhatsApp and it was so easy!",
    rating: 5,
    avatar: "A",
  },
  {
    id: 3,
    name: "Mariam Yusuf",
    location: "Kano, Nigeria",
    comment:
      "The Pearl White Abaya was perfect for my sister's wedding. Everyone kept asking where I got it from. Highly recommend!",
    rating: 5,
    avatar: "M",
  },
];
