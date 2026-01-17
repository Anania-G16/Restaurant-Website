import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

// Asset Imports
import buffetImg from "../assets/images/buffet.jpg";
import storyVideo1 from "../assets/video/video-2.mp4";
import burgerVideo from "../assets/video/burger.mp4";

// 1. Data Array for Stats
const RESTAURANT_STATS = [
  { id: 1, value: "25", label: "Years of Experience" },
  { id: 2, value: "10", label: "Professional Chefs" },
  { id: 3, value: "55,000", label: "Customers Served" },
  { id: 4, value: "365", label: "Days Open a Year" },
];

function About() {
  return (
    <>
      <Navbar />

      <header className="about-hero">
        <div className="hero">
          <div className="slogan">About us</div>
          <div className="description">
            Everything you need to know about YEA Restaurant
          </div>
        </div>
      </header>

      <main>
        {/* Story Section */}
        <section className="story-container">
          <div className="title">Our Story</div>

          <div className="story story-1">
            <video 
              className="story-video" 
              src={storyVideo1} 
              autoPlay 
              muted 
              loop 
              playsInline
            />
            <p className="story-text">
              YEA Restaurant started as a small local spot with one big dream: to
              bring people together through great food. What began as a humble
              kitchen with a handful of loyal neighbors has grown into a welcoming
              space where everyone from longtime friends to first-time visitors can
              enjoy delicious meals crafted with care.
            </p>
          </div>

          <div className="story">
            <p className="story-text">
              Our menu blends traditional favorites with international flavors,
              reflecting a passion for creativity and quality in every dish. Each
              meal is prepared thoughtfully, ensuring that every bite brings
              comfort, joy, and a little surprise for the taste buds.
            </p>
            <video 
              className="story-video" 
              src={burgerVideo} 
              autoPlay 
              muted 
              loop 
              playsInline
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-container">
          <div className="title">Our Mission and Vision</div>
          <div className="mission">
            At YEA, our mission is simple: to make every meal memorable and every
            guest feel at home. We envision a place where people gather, connect,
            and celebrate life over dishes made with love and care.
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us-container">
          <div className="title">Why Choose Us</div>
          <div className="why-choose-us">
            At YEA, it's not just about the food. It's about the experience. From
            our carefully crafted dishes to the warm, welcoming atmosphere, we make
            every visit special. Whether you're here for a quick bite or a relaxed
            meal with friends, we put heart into everything we serve.
          </div>
        </section>

        {/* Stats Section with Mapping */}
        <section className="stats-section">
          <img src={buffetImg} alt="Buffet background" />
          <div className="overlay"></div>
          
          <div className="stats-container">
            {RESTAURANT_STATS.map((stat) => (
              <div key={stat.id} className="stat">
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;