import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/menu.css";

// Asset Imports
import img9 from "../assets/images/image_9.jpg";
import img13 from "../assets/images/image_13.jpg";
import img12 from "../assets/images/image_12.jpg";
import img10 from "../assets/images/image_10.jpg";
import veg1 from "../assets/images/imaget_1.webp";
import veg2 from "../assets/images/imaget_2.webp";
import veg3 from "../assets/images/imaget_3.webp";
import veg4 from "../assets/images/imaget_4.webp";
import veg6 from "../assets/images/imaget_6.webp";
import veg7 from "../assets/images/imaget_7.webp";

// 1. Centralized Menu Data
const MENU_DATA = {
  specials: [
    { id: 1, name: "Creamy Pasta", price: "$85.00", img: img9, desc: "Creamy pasta coated in rich garlic sauce, offering a smooth, warm flavor." },
    { id: 2, name: "Roasted Vegetables", price: "$70.00", img: img13, desc: "Roasted vegetables seasoned with light spices, creating a tender, earthy taste." },
    { id: 3, name: "Herbed Pizza", price: "$100.00", img: img12, desc: "Stone-baked pizza layered with fresh herbs and melted cheese." },
    { id: 4, name: "Grilled Chicken", price: "$120.00", img: img10, desc: "Fresh herbs blend with tender chicken for a rich, balanced flavor." },
  ],
  healthy: [
    { id: 5, name: "Enchiladas", price: "$100.00", img: veg3, desc: "Stuffed with meat, cheese, and sauce. Served with rice and beans." },
    { id: 6, name: "Nachos", price: "$100.00", img: veg4, desc: "Loaded with meat, queso, beans, sour cream, and guacamole." },
    { id: 7, name: "Salads", price: "$100.00", img: veg6, desc: "Loaded with meat, rice, beans, lettuce, and cotija cheese." },
    { id: 8, name: "Tacos", price: "$100.00", img: veg7, desc: "Filled with meat, cheese, lettuce, and pico de gallo." },
    { id: 9, name: "Burrito", price: "$100.00", img: veg1, desc: "Stuffed with meat, cheese, rice, beans, and extra sauce." },
    { id: 10, name: "Kid's Meal", price: "$100.00", img: veg2, desc: "Healthy, wholesome portions for little mouths." },
  ]
};

function Menu() {
  // Helper function to render a menu section
  const renderSection = (items) => (
    <section className="menu">
      {items.map((item) => (
        <div key={item.id} className="food-container">
          <div className="pic-container">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="food-text">
            <div className="food-name">{item.name}</div>
            <div className="food-description">{item.desc}</div>
            <div className="price">{item.price}</div>
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <>
      <Navbar />
      <header className="menu-header">
        <div className="hero">
          <h1>MENU</h1>
          <p>A Meal that Stands the Test of Time</p>
        </div>
      </header>

      <main className="menu-main">
        <div>
          <p className="menu-type">Our Specials</p>
          {renderSection(MENU_DATA.specials)}
        </div>

        <div>
          <p className="menu-type">Vegetables and Healthy</p>
          {renderSection(MENU_DATA.healthy)}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Menu;