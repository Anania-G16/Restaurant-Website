import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Using axios for easier header management
import "../styles/cart.css";

function Cart() {
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const [toast, setToast] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(true);

  // Updated URLs to match your Order Routes
  const API_URL = "http://localhost:5000/orders";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Correcting the path to match your controller's res.json structure
      if (response.data.cart) {
        setCartData(response.data.cart);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, currentQty, delta) => {
    const token = localStorage.getItem("token");
    const newQty = currentQty + delta;
    if (newQty < 0) return; // controller handles 0 as delete

    try {
      const response = await axios.patch(
        `${API_URL}/cart/${itemId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 200) {
        fetchCart(); // Refresh data to get new total price from DB
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (cartData.items.length === 0) return;

    try {
      const response = await axios.post(
        `${API_URL}/checkout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        setToast({
          show: true,
          message: "Order Successful! Your food is being prepared.",
        });
        setCartData({ items: [], totalPrice: 0 }); // Clear UI
        setTimeout(() => setToast({ show: false, message: "" }), 4000);
      }
    } catch (err) {
      setToast({
        show: true,
        message: "Error placing order. Please try again.",
      });
    }
  };

  if (loading)
    return (
      <div className="cart-page">
        <p>Checking your order...</p>
      </div>
    );

  return (
    <section className="cart-page">
      {toast.show && <div className="cart-toast">{toast.message}</div>}

      <div className="cart-card">
        <h2 className="cart-title">Your Order Summary</h2>

        {cartData.items.length === 0 ? (
          <div className="empty-cart-state">
            <p>Looks like you haven't picked anything yet.</p>
            <Link to="/menu" className="return-link">
              Back to Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartData.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    {/* Accessing nested menuitem data from the SQL Join */}
                    <h4 className="item-name">{item.menuitems.name}</h4>
                    <p className="item-meta">${item.menuitems.price} each</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity, -1)
                        }
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity, 1)
                        }
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-actions">
                    <span className="item-subtotal">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity, -item.quantity)
                      }
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-checkout-section">
              <div className="total-row">
                <span>Total Amount</span>
                <span className="total-amount">
                  ${cartData.totalPrice.toFixed(2)}
                </span>
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder}>
                PLACE ORDER
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
