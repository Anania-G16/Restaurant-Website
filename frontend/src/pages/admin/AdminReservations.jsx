function AdminReservations() {
  const reservations = [
    { id: 1, name: "Michael", date: "2025-01-20", time: "18:00", guests: 4 },
    { id: 2, name: "Anna", date: "2025-01-21", time: "20:00", guests: 2 },
  ];

  return (
    <div>
      <h1>Reservations</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.guests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReservations;
