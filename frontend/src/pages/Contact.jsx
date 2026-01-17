import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

// Asset Imports
import chefImage from "../assets/images/contact chef.png";

function Contact() {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for contacting YEA Restaurant! We will get back to you soon.");
    // Here you would typically send the data to an API
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

              <button type="submit">Send Message</button>
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