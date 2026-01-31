import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminReservation.css";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // This should match the prefix you used in server.js for these routes
  // For example: app.use("/admin/reservations", adminResRoutes)
  const ADMIN_RES_URL = "http://localhost:5000/admin/reservations";

  useEffect(() => {
    const fetchAllReservations = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(ADMIN_RES_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Assuming your controller returns { reservations: [...] }
        console.log("RAW DATA FROM SERVER:", response.data.reservations[0]);
        setReservations(response.data.reservations || []);
      } catch (err) {
        console.error("Error fetching admin reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReservations();
  }, []);

  if (loading)
    return (
      <div className="admin-res-container">
        <p>Fetching Guest List...</p>
      </div>
    );

  return (
    <div className="admin-res-container">
      <h1 className="admin-res-h1">All User Reservations</h1>

      <table className="admin-res-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
          </tr>
        </thead>

        <tbody>
          {reservations.length > 0 ? (
            reservations.map((r) => (
              <tr key={r.id}>
                {/* Accessing the nested Users data from your controller join */}
                <td>{r.Users?.name || "Anonymous"}</td>
                <td>{r.Users?.email || "N/A"}</td>
                <td>{new Date(r.reservation_time).toLocaleDateString()}</td>
                <td>
                  {new Date(r.reservation_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{r.guest_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No reservations found in the system.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReservations;
