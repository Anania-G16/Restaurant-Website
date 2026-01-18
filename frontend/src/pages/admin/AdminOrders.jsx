import { useState } from "react";

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
      <h1>Manage Menu</h1>

      {/* Add Menu Item */}
      <form onSubmit={addItem} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      {/* Menu List */}
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminMenu;
