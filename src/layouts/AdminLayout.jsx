import Sidebar from "../components/Sidebar";

// AdminLayout wraps all admin pages with the Sidebar
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-warm-gray">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
