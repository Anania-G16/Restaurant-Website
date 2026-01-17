function AdminMessages() {
  const messages = [
    { id: 1, name: "Ali", email: "ali@gmail.com", message: "Great food!" },
    { id: 2, name: "Mona", email: "mona@gmail.com", message: "Loved the service" },
  ];

  return (
    <div>
      <h1>Customer Messages</h1>

      {messages.map(msg => (
        <div
          key={msg.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{msg.name} ({msg.email})</h4>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminMessages;
