

const MenuCard = ({ item }) => {
  return (
    <div className="menu-card">
      <h3>{item.title}</h3>
      <p>{item.description.substring(0, 60)}...</p>
      <span className="price">${item.price}</span>
    </div>
  );
};

export default MenuCard;