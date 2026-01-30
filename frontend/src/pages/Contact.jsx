import { useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

// Asset Imports
import chefImage from "../assets/images/contact chef.png";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert(
      "Thank you for contacting YEA Restaurant! We will get back to you soon.",
    );
  };

  return (
    <>
      <main className="contact-main">
        <section className="container">
          <div className="form-box">
            <h1>Contact Us</h1>
            <p>We would love to hear from you</p>

            {/* ------------------------------------ */}

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

              <button type="submit">Send Message</button>
              {/* --- Added Reservation Link Here --- */}
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
    </>
  );
}

export default Contact;
