import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminMessages.css";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/contact";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI automatically by filtering out the deleted message
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id),
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the message.");
    }
  };

  if (loading) return <p className="admin-loading">Loading Messages...</p>;

  return (
    <div className="admin-messages-page">
      <h1 className="admin-mes-h1">Customer Inbox</h1>

      <div className="messages-grid">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="admin-mes-container">
              <div className="msg-header">
                <strong>{msg.name}</strong>
                <span className="msg-email"> ({msg.email})</span>
              </div>
              <p className="msg-body">{msg.message}</p>
              <div className="msg-footer">
                <small>
                  {new Date(msg.created_at).toLocaleDateString()} at{" "}
                  {new Date(msg.created_at).toLocaleTimeString()}
                </small>
                {/* --- DELETE BUTTON --- */}
                <button
                  className="delete-msg-btn"
                  onClick={() => handleDelete(msg.id)}
                  style={{
                    marginLeft: "auto",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages found in database.</p>
        )}
      </div>
    </div>
  );
}

export default AdminMessages;
