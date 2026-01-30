import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/cart";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const total = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(String(item.price).replace('$', ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const updateQuantity = async (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty })
      });
      if (response.ok) {
        setCartItems(cartItems.map(i => i.id === id ? { ...i, quantity: newQty } : i));
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // This is the ONE main function for the whole order
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      const response = await fetch(`${API_URL}/checkout`, { method: 'POST' });

      if (response.ok) {
        setToast({ show: true, message: "Order Successful! Your food is being prepared." });
        setCartItems([]); // Clear UI after ordering
        setTimeout(() => setToast({ show: false, message: "" }), 4000);
      }
    } catch (err) {
      setToast({ show: true, message: "Error placing order. Please try again." });
    }
  };

  if (loading) return <div className="cart-page"><p>Checking your order...</p></div>;

  return (
    <section className="cart-page">
      {/* Success/Error Toast */}
      {toast.show && <div className="cart-toast">{toast.message}</div>}

      <div className="cart-card">
        <h2 className="cart-title">Your Order Summary</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <p>Looks like you haven't picked anything yet.</p>
            <Link to="/menu" className="return-link">Back to Menu</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-meta">{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                    </div>
                  </div>
                  <div className="item-actions">
                    <span className="item-subtotal">
                      ${(parseFloat(String(item.price).replace('$', '')) * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-checkout-section">
              <div className="total-row">
                <span>Total Amount</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>
              
              {/* THIS IS THE ONLY ORDER BUTTON */}
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