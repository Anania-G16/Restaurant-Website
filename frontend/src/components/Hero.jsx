import { Link } from "react-router-dom";
import "../styles/hero.css"; // Assuming your CSS is in the styles folder
import heroImg from "../assets/images/cropped.png";

function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <p className="slogan">
          It's Not <span className="yellow-text">Just Food</span>, It's An
          Experience
        </p>
        <p className="description">
          Delicious meals, fresh ingredients, and a dining experience made to
          impress.
        </p>
        
        <div className="buttons-container">
          {/* Use Link instead of <a> for internal navigation */}
          <Link to="/contact" className="book-table">
            Book a Table
          </Link>
          <Link to="/menu" className="explore-more book-table">
            Explore More
          </Link>
        </div>
      </div>

      <div className="hero-image-container">
        <img
          className="hero-image"
          src={heroImg}
          alt="rotating food"
        />
      </div>
    </section>
  );
}

export default Hero;