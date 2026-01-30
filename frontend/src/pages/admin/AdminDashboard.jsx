import "../../styles/AdminDashboard.css"
function AdminDashboard() {
  return (
    <div>
      <h1 className="dash-h1">Admin Dashboard</h1>

      <ul>
        <li>Total Orders: 24</li>
        <li>Total Reservations: 12</li>
        <li>Menu Items: 8</li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
