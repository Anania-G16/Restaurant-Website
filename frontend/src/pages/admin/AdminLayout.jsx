import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#222",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Admin</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/admin" style={{ color: "#fff" }}>Dashboard</Link>
          <Link to="/admin/menu" style={{ color: "#fff" }}>Menu</Link>
          <Link to="/admin/orders" style={{ color: "#fff" }}>Orders</Link>
          <Link to="/admin/reservations" style={{ color: "#fff" }}>Reservations</Link>
          <Link to="/admin/messages" style={{ color: "#fff" }}>Messages</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
