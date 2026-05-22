import { useState } from "react";
import Sidebar from "../components/Sidebar";

// AdminLayout wraps all admin pages with the Sidebar
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-warm-gray text-charcoal">
      {/* Mobile Top Navigation Header */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-black text-white border-b border-beige sticky top-0 z-45 w-full">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-xl tracking-wider text-white">XYZ</h2>
          <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 bg-gold text-black font-semibold rounded-none">
            Admin
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-white hover:text-gold transition-colors focus:outline-none"
          aria-label="Open Sidebar"
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Sidebar Component with responsive states */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 w-full max-w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
