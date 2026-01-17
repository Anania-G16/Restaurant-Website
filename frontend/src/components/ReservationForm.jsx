import { useState } from "react";

function ReservationForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Reservation Data:", formData);

    alert("Reservation submitted! (Frontend only)");

    setFormData({
      date: "",
      time: "",
      guests: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "40px auto",
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
        placeholder="Number of guests"
        value={formData.guests}
        onChange={handleChange}
        required
      />

      <button type="submit">Reserve</button>
    </form>
  );
}

export default ReservationForm;
