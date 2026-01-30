import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });

  const MENU_API_URL = "http://localhost:5000/menu";
  // Verify this matches your server.js route prefix (e.g., /api/orders or /orders)
  const ORDER_API_URL = "http://localhost:5000/orders/add";

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(MENU_API_URL);
        setMenuItems(response.data.menu || []);
      } catch (error) {
        console.error("Database connection error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addToCart = async (item) => {
    // 1. Get the token saved during login
    const token = localStorage.getItem("token");

    // 2. Security Check: Redirect or alert if not logged in
    if (!token) {
      setToast({ show: true, message: "Please log in to order food!" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
      return;
    }

    try {
      // 3. Send data to your orderController.addToCart
      const response = await axios.post(
        ORDER_API_URL,
        {
          menu_item_id: item.id, // Matches your controller's req.body
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Required by your authMiddleware
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setToast({ show: true, message: `Added ${item.name} to cart!` });
      }
    } catch (err) {
      console.error("Cart Error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.error || "Failed to add item.";
      setToast({ show: true, message: errorMsg });
    } finally {
      // Hide toast after 3 seconds
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    }
  };

  if (loading)
    return (
      <div
        className="menu-main"
        style={{ color: "white", textAlign: "center" }}
      >
        Loading Menu...
      </div>
    );

  return (
    <main className="menu-main">
      {/* Dynamic Notification */}
      {toast.show && <div className="cart-toast">{toast.message}</div>}

      <p className="menu-type">Our Menu</p>

      <section className="menu">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item.id} className="food-container">
              <div className="pic-container">
                <img
                  src={item.image_url || "https://via.placeholder.com/150"}
                  alt={item.name}
                />
              </div>
              <div className="food-text">
                <div className="food-name">{item.name}</div>
                <div className="food-description">{item.description}</div>
                <div className="price">${item.price}</div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              color: "white",
              padding: "40px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h2>No items found in the database.</h2>
            <p>Admin, please add items to the menuitems table.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Menu;
