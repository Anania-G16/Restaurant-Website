import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminMenu.css";

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const MAX_IMAGE_SIZE_MB = 2; // max image size allowed for upload

  // 1. Fetch menu from DB on load
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/menu");
      // Your controller returns { menu: data }
      setMenuItems(response.data.menu);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setLoading(false);
    }
  };

  // 2. Add Item to DB
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImageDataUrl("");
      setImagePreview("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image is too large. Max size is ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setImageDataUrl("");
    setImagePreview("");
  }

  async function addItem(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (imageFile && imageFile.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image is too large. Max size is ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    try {
      const payload = {
        name,
        price: parseFloat(price),
        image_url: imageDataUrl || null,
      };

      const response = await axios.post(
        "http://localhost:5000/menu",
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Add the new item returned from DB to the list
      setMenuItems([...menuItems, response.data.menuItem]);
      setName("");
      setPrice("");
      setImageFile(null);
      setImageDataUrl("");
      setImagePreview("");
      alert("Item added successfully!");
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add item");
    }
  }

  // 3. Delete (Soft Delete) Item from DB
  async function deleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI: filter out the deleted item
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  }

  if (loading) return <div className="admin-menu-h1">Loading Menu...</div>;

  return (
    <div>
      <h1 className="admin-menu-h1">Manage Menu</h1>

      {/* Add Menu Item Form */}
      <form onSubmit={addItem} className="admin-menu-form">
        <div className="admin-menu-inputs">
          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="admin-menu-input"
          />
          <input
            placeholder="Price"
            type="number"
            min="1"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="admin-menu-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="admin-menu-file"
          />
        </div>

        {imagePreview && (
          <div className="admin-menu-image-preview">
            <img src={imagePreview} alt="Preview" />
            <button type="button" onClick={removeImage} className="admin-menu-remove">
              Remove
            </button>
          </div>
        )}

        <button type="submit" className="admin-menu-add">
          Add Item to Database
        </button>
      </form>

      {/* Menu List */}
      <ul className="admin-menu-list">
        {menuItems.length === 0 ? (
          <p>No items found in menu.</p>
        ) : (
          menuItems.map((item) => (
            <li key={item.id} className="admin-menu-item">
              <img
                src={item.image_url || "https://via.placeholder.com/60"}
                alt={item.name}
                className="admin-menu-thumb"
              />
              <span>
                <strong>{item.name}</strong> - ${item.price}
              </span>
              <button
                onClick={() => deleteItem(item.id)}
                className="admin-menu-delete"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default AdminMenu;
