import React, { useState, useEffect } from 'react';
import "../styles/menu.css";
import { MOCK_MENU_DATA } from './MockData'; 

function Menu() {
  const [menuItems, setMenuItems] = useState({ specials: [], healthy: [] });
  const [loading, setLoading] = useState(true);
  
  // State for the notification
  const [toast, setToast] = useState({ show: false, message: "" });

  // Update this URL to match your friend's backend address
  const API_URL = "http://localhost:5000/api/cart";

  useEffect(() => {
    // Setting menu from MockData
    setMenuItems(MOCK_MENU_DATA);
    setLoading(false)
  }, []);

  // --- BACKEND LOGIC (NO IMG SENT) ---
  const addToCart = async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1 
        }),
      });

      if (response.ok) {
        // Trigger the Toast on success
        setToast({ show: true, message: `Added ${product.name} successfully!` });
      } else {
        // Handle backend errors (like 400 or 500)
        setToast({ show: true, message: "Could not add item. Try again." });
      }
    } catch (error) {
      console.error("Backend Error:", error);
      setToast({ show: true, message: "Server error. Check backend connection." });
    } finally {
      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3000);
    }
  };

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
            <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );

  if (loading) return null;

  return (
    <main className="menu-main">
      {/* Notification Popup */}
      {toast.show && (
        <div className="cart-toast">
          {toast.message}
        </div>
      )}

      <div>
        <p className="menu-type">Our Specials</p>
        {renderSection(menuItems.specials)}
      </div>

      <div>
        <p className="menu-type">Vegetables and Healthy</p>
        {renderSection(menuItems.healthy)}
      </div>
    </main>
  );
}

export default Menu;