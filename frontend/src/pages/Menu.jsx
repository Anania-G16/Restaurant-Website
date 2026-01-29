import React, { useState, useEffect } from 'react';
import "../styles/menu.css";
import { MOCK_MENU_DATA } from './MockData'; // Import your real items

function Menu() {
  const [menuItems, setMenuItems] = useState({ specials: [], healthy: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is instant. No fake waiting.
    setMenuItems(MOCK_MENU_DATA);
    setLoading(false);
  }, []);

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

  if (loading) return null; // Or a simple spinner

  return (
    <>
      <header className="menu-header">
        <div className="hero">
          <h1>MENU</h1>
          <p>A Meal that Stands the Test of Time</p>
        </div>
      </header>

      <main className="menu-main">
        <div>
          <p className="menu-type">Our Specials</p>
          {renderSection(menuItems.specials)}
        </div>

        <div>
          <p className="menu-type">Vegetables and Healthy</p>
          {renderSection(menuItems.healthy)}
        </div>
      </main>
    </>
  );
}

export default Menu;