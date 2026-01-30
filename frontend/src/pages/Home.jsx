import { Link } from "react-router-dom";
import "../styles/home.css";
import "../App.css";

// Assets
import heroImage from "../assets/images/cropped.png";
import story1 from "../assets/images/story1.jpg";
import story2 from "../assets/images/story2.jpg";
import burger from "../assets/images/inferno burger.jpg";
import steak from "../assets/images/steak.jpg";
import chicken from "../assets/images/chicken.jpg";
import pizza from "../assets/images/pizza.jpg";
import sarah from "../assets/images/sarah.jpg";
import daniel from "../assets/images/daniel.jpg";
import john from "../assets/images/john.jpg";

// 1. Data Arrays (Easier to manage than hardcoded HTML)
const SPECIAL_DISHES = [
  {
    id: 1,
    image: burger,
    title: "Inferno Crunch Burger",
    desc: "Spicy, crispy, and loaded with bold flavor in every bite.",
    price: "$24.99",
  },
  {
    id: 2,
    image: steak,
    title: "Smoky Volcano Steak",
    desc: "Char-grilled, juicy, and bursting with deep smoky flavor.",
    price: "$39.99",
  },
  {
    id: 3,
    image: chicken,
    title: "Golden Ember Chicken",
    desc: "Tender, fire-kissed, and wrapped in rich savory seasoning.",
    price: "$44.99",
  },
  {
    id: 4,
    image: pizza,
    title: "Fiery Margherita Pizza",
    desc: "Classic pizza with a spicy twist and bubbling golden cheese.",
    price: "$34.99",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amanda Nunes",
    role: "Love the simplicity",
    img: sarah,
    text: "YEA Restaurant offers an unforgettable dining experience. The food is fresh and flavorful, and the staff makes you feel welcome.",
  },
  {
    id: 2,
    name: "Georges St-Pierre",
    role: "Excellent Designs",
    img: daniel,
    text: "Dining at YEA Restaurant is always a pleasure. The chefs clearly care about quality and the portions are generous.",
  },
  {
    id: 3,
    name: "Dustin Poirier",
    role: "Efficient and Reliable",
    img: john,
    text: "From start to finish, YEA Restaurant exceeds expectations. The atmosphere is cozy yet lively and the meals are packed with flavor.",
  },
];

function Home() {
  return (
    <>
       <main>
        {/* Hero Section */}
        <section className="hero-container">
          <div className="hero-text">
            <p className="slogan">
              It's Not <span className="yellow-text">Just Food</span>, It's An
              Experience
            </p>
            <p className="description">
              Delicious meals, fresh ingredients, and a dining experience made
              to impress.
            </p>
            <div className="buttons-container">
              <Link to="/reservation" className="book-table">
                Book a Table
              </Link>
              <Link to="/menu" className="explore-more book-table">
                Explore More
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={heroImage} alt="rotating food" className="hero-image" />
          </div>
        </section>

        {/* Story Section */}
        <section className="story-container">
          <div className="welcome">Welcome to YEA Restaurant</div>
          <div className="discover">
            <span className="discover-text">Discover our Story</span>
          </div>
          <p className="story-text">
            YEA Restaurant started as a small local spot with a big passion for
            good food. Today, it has grown into a warm and welcoming dining
            place known for serving delicious traditional and international
            dishes.
          </p>
          <div className="story-image-container">
            <img src={story1} alt="outside" className="story-image" />
            <img src={story2} alt="pizza" className="story-image" />
          </div>
        </section>

        {/* Special Dishes Section (Mapping Example) */}
        <section className="special-dishes-container">
          <div className="special-dishes-title">Our Special Dishes</div>
          <div className="special-dishes-subtitle">Our Chefs Specialties</div>

          <div className="grid-container">
            {SPECIAL_DISHES.map((dish) => (
              <div key={dish.id} className="special-dishes-card">
                <div className="special-dishes-card-image">
                  <img src={dish.image} alt={dish.title} />
                </div>
                <div className="special-dishes-card-text">
                  <div className="dish">
                    <div className="special-dishes-card-title">
                      {dish.title}
                    </div>
                    <div className="special-dishes-card-description">
                      {dish.desc}
                    </div>
                  </div>
                  <div className="special-dishes-card-description">
                    {dish.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="discover-menu-container">
            <Link to="/menu" className="discover-menu">
              Discover Our Menu &rarr;
            </Link>
          </div>
        </section>

        {/* Testimonials Section (Mapping Example) */}
        <section className="testimonial__container">
          <h1 className="testimonal-title">What our customers say</h1>
          <div className="section__grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="section__card">
                <h4>{t.role}</h4>
                <p>"{t.text}"</p>
                <img src={t.img} alt={t.name} />
                <h5>{t.name}</h5>
              </div>
            ))}
          </div>
        </section>
      </main>

  
    </>
  );
}

export default Home;
