import { useState } from "react";
import "../../styles/AdminMenu.css"

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Burger", price: 25 },
    { id: 2, name: "Pizza", price: 35 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function addItem(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      name,
      price,
    };

    setMenuItems([...menuItems, newItem]);
    setName("");
    setPrice("");
  }

  function deleteItem(id) {
    setMenuItems(menuItems.filter(item => item.id !== id));
  }

  return (
    <div>
      <h1 className="admin-menu-h1">Manage Menu</h1>

      {/* Add Menu Item */}
      <form onSubmit={addItem} className="admin-menu-form" >
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="admin-menu-input"
        />
        </div>
        <button type="submit" className="admin-menu-add">Add Item</button>
      </form>

      {/* Menu List */}
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => deleteItem(item.id)} className="admin-menu-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminMenu;
