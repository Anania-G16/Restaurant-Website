import "../../styles/AdminMessages.css"
function AdminMessages() {
  const messages = [
    { id: 1, name: "Ali", email: "ali@gmail.com", message: "Great food!" },
    { id: 2, name: "Mona", email: "mona@gmail.com", message: "Loved the service" },
  ];

  return (
    <div>
      <h1 className="admin-mes-h1">Customer Messages</h1>

      {messages.map(msg => (
        <div
          key={msg.id}
          className="admin-mes-container"
        >
          <h4>{msg.name} ({msg.email})</h4>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminMessages;
