import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { supabase } from "../supabaseClient";

// Format price
const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    badge: "",
    in_stock: true,
    material: "",
    sizes: "S, M, L, XL",
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch all products from Supabase on mount
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchErr) throw fetchErr;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please check database permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open Add modal
  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      badge: "",
      in_stock: true,
      material: "Premium Crepe",
      sizes: "S, M, L, XL",
    });
    setImageFile(null);
    setError(null);
    setShowModal(true);
  };

  // Open Edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      badge: product.badge || "",
      in_stock: product.in_stock,
      material: product.material,
      sizes: product.sizes.join(", "),
    });
    setImageFile(null);
    setError(null);
    setShowModal(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setError(null);
      try {
        const { error: deleteErr } = await supabase.from("products").delete().eq("id", id);
        if (deleteErr) throw deleteErr;
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  // Handle form submit (Add or Edit with image upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      let imageUrl = editingProduct?.image || "";

      // 1. Upload new image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        // Retrieve Public URL
        const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      if (!imageUrl) {
        throw new Error("Product image is required. Please select a photo.");
      }

      // Convert sizes string to array
      const sizesArray = form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const productPayload = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        image: imageUrl,
        badge: form.badge || null,
        in_stock: form.in_stock,
        sizes: sizesArray,
        material: form.material || "Premium Crepe",
      };

      if (editingProduct) {
        // Edit Mode
        const { data, error: updateError } = await supabase
          .from("products")
          .update(productPayload)
          .eq("id", editingProduct.id)
          .select();

        if (updateError) throw updateError;
      } else {
        // Create Mode
        const { data, error: insertError } = await supabase
          .from("products")
          .insert([productPayload])
          .select();

        if (insertError) throw insertError;
      }

      // Refresh list & close modal
      await fetchProducts();
      setShowModal(false);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong while saving the product.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* Error alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-none text-sm tracking-wide mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Products", value: loading ? "..." : products.length, icon: "📦" },
          { label: "In Stock", value: loading ? "..." : products.filter((p) => p.in_stock).length, icon: "✅" },
          { label: "Out of Stock", value: loading ? "..." : products.filter((p) => !p.in_stock).length, icon: "⚠️" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-beige p-6 rounded-sm shadow-sm">
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-3xl font-serif font-semibold text-charcoal">{stat.value}</p>
            <p className="text-xs tracking-widest uppercase text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Products Table ── */}
      <div className="bg-white border border-beige rounded-sm shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-beige">
          <div>
            <h2 className="font-serif text-xl text-charcoal">All Products</h2>
            <p className="text-xs text-muted mt-0.5">{loading ? "Loading catalog..." : `${products.length} total products`}</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 text-xs tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300"
          >
            <span className="text-lg leading-none">+</span>
            Add Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
              <p className="text-xs tracking-widest uppercase text-muted">Loading products from Supabase...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-sm tracking-widest uppercase mb-4">No products found in database</p>
              <button
                onClick={openAddModal}
                className="bg-charcoal text-white px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-gold transition-colors"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-warm-gray border-b border-beige">
                <tr>
                  {["Image", "Name", "Category", "Price", "Status", "Actions"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-[10px] tracking-widest uppercase text-muted font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-beige">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-warm-gray/50 transition-colors duration-150">
                    {/* Image */}
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-sm bg-warm-gray"
                      />
                    </td>
                    {/* Name */}
                    <td className="px-6 py-4">
                      <p className="font-serif text-sm text-charcoal">{product.name}</p>
                      {product.badge && (
                        <span className="inline-block text-[9px] text-white bg-gold tracking-widest uppercase px-1.5 py-0.5 rounded-none mt-1">
                          {product.badge}
                        </span>
                      )}
                    </td>
                    {/* Category */}
                    <td className="px-6 py-4 text-xs text-muted tracking-wide">{product.category}</td>
                    {/* Price */}
                    <td className="px-6 py-4 text-sm font-semibold text-charcoal">{formatPrice(product.price)}</td>
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full ${
                        product.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-400"}`} />
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-200 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-xs tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors duration-200 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Add/Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="bg-white w-full max-w-lg shadow-xl rounded-sm">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-beige">
              <h3 className="font-serif text-xl text-charcoal">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted hover:text-charcoal transition-colors"
                disabled={submitLoading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Name */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Product Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Midnight Noir Abaya"
                  className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  disabled={submitLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Price (₦)</label>
                  <input
                    required
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. 45000"
                    className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                    disabled={submitLoading}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Category</label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors bg-white"
                    disabled={submitLoading}
                  >
                    <option value="">Select Category</option>
                    <option value="Abaya">Abaya</option>
                    <option value="Evening Gown">Evening Gown</option>
                    <option value="Modest Wear">Modest Wear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Material */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Material</label>
                  <input
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    placeholder="e.g. Soft Chiffon"
                    className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                    disabled={submitLoading}
                  />
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Badge (Optional)</label>
                  <input
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Best Seller, New"
                    className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                    disabled={submitLoading}
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Sizes (Comma separated)</label>
                <input
                  required
                  value={form.sizes}
                  onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                  placeholder="e.g. S, M, L, XL"
                  className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  disabled={submitLoading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Description</label>
                <textarea
                  required
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product..."
                  className="w-full border border-beige px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  disabled={submitLoading}
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted mb-1.5">Product Image</label>
                {editingProduct && !imageFile && (
                  <p className="text-xs text-muted mb-2">
                    Current: <a href={editingProduct.image} target="_blank" rel="noreferrer" className="text-gold underline">View current image</a> (Upload below to change it)
                  </p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required={!editingProduct}
                  className="w-full border border-beige px-4 py-2 text-sm focus:outline-none focus:border-gold text-muted"
                  disabled={submitLoading}
                />
              </div>

              {/* In Stock toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="in_stock"
                  checked={form.in_stock}
                  onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                  className="w-4 h-4 accent-gold"
                  disabled={submitLoading}
                />
                <label htmlFor="in_stock" className="text-xs tracking-widest uppercase text-charcoal font-medium cursor-pointer">
                  Product In Stock / Available
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4 border-t border-beige">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-charcoal text-white py-3 text-xs tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : editingProduct ? (
                    "Save Changes"
                  ) : (
                    "Add Product"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitLoading}
                  className="flex-1 border border-beige text-charcoal py-3 text-xs tracking-widest uppercase font-medium hover:border-charcoal transition-colors duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboardPage;
