import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [error, setError] = useState("");

  const MENU_API_URL = "http://localhost:5000/menu";
  // backend route for adding to cart is /orders/cart
  const ORDER_API_URL = "http://localhost:5000/orders/cart";

  // fetch function (exposed so we can retry on failures)
  const fetchMenu = async () => {
    setLoading(true);
    setError("");
    try {
      let response;
      try {
        response = await axios.get(MENU_API_URL);
      } catch (err) {
        // fallback: try with trailing slash if server routes were registered with a trailing slash
        if (err.response && err.response.status === 404) {
          response = await axios.get(MENU_API_URL + "/");
        } else {
          throw err;
        }
      }

      console.log("GET /menu response:", response.status, response.data);

      if (!response.data || !Array.isArray(response.data.menu)) {
        console.error("Unexpected /menu response shape:", response.data);
        setError("Unexpected response from server. Check backend logs.");
        setMenuItems([]);
        return;
      }

      setMenuItems(response.data.menu);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to fetch menu",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addToCart = async (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setToast({ show: true, message: "Please log in to order food!" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
      return;
    }

    try {
      const response = await axios.post(
        ORDER_API_URL,
        {
          menu_item_id: item.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  // Show error screen if fetch failed
  if (!loading && error)
    return (
      <div
        className="menu-main"
        style={{ color: "white", textAlign: "center" }}
      >
        <h2>Failed to load menu</h2>
        <p>{error}</p>
        <button onClick={fetchMenu} className="retry-btn">
          Retry
        </button>
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
