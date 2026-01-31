import { useState } from "react";
import axios from "axios";

function ReservationForm({ onRefresh }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      setLoading(false);
      return;
    }

    try {
      // Ensure date and time are joined correctly for a Timestamp
      const combinedDateTime = `${formData.date}T${formData.time}:00`;

      await axios.post(
        "http://localhost:5000/reservations",
        {
          guest_count: Number(formData.guests),
          reservation_time: combinedDateTime,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert("Table Reserved!");
      setFormData({ date: "", time: "", guests: "" });

      if (onRefresh) onRefresh(); // Reload the list if the function exists
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Reservation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="guests"
        placeholder="How many guests?"
        value={formData.guests}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={loading}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        {loading ? "Saving..." : "Reserve Now"}
      </button>
    </form>
  );
}

export default ReservationForm;
