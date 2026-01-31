import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";
import chefImage from "../assets/images/contact chef.png";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token"); // Get token if user is logged in

    try {
      const response = await axios.post(
        "http://localhost:5000/contact", // Verify this matches your server.js mount point
        {
          name: formData.name,
          email: formData.email,
          message: formData.message, // Your controller expects: name, email, message
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Optional auth
          },
        },
      );

      if (response.status === 201) {
        alert(
          "Thank you for contacting YEA Restaurant! Your message was saved.",
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert(
        err.response?.data?.error ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="contact-main">
        <section className="container">
          <div className="form-box">
            <h1>Contact Us</h1>
            <p>We would love to hear from you</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              <div className="reservation-link-box">
                <span>Want to book a table? </span>
                <Link
                  to="/reservation"
                  className="direct-res-link"
                  style={{
                    color: "#b3860f",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Reserve it Here &rarr;
                </Link>
              </div>
            </form>
          </div>

          <div className="contact-image">
            <img src={chefImage} alt="Our friendly chef" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
