import { Outlet, Link } from "react-router-dom";
import "../../styles/AdminLayout.css";
function AdminLayout() {
  return (
    <div className="layout-aside-container">
      {/* Sidebar */}
      <aside className="admin-layout-aside">
        <h2>Admin</h2>
        <nav className="layout-nav">
          <Link to="/admin" style={{ color: "#fff" }}>
            Dashboard
          </Link>
          <Link to="/admin/menu" style={{ color: "#fff" }}>
            Menu
          </Link>
          <Link to="/admin/orders" style={{ color: "#fff" }}>
            Orders
          </Link>
          <Link to="/admin/reservations" style={{ color: "#fff" }}>
            Reservations
          </Link>
          <Link to="/admin/messages" style={{ color: "#fff" }}>
            Messages
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
