import "../../styles/AdminOrder.css"
function AdminOrders() {
  const orders = [
    { id: 1, customer: "John", total: 120, status: "Pending" },
    { id: 2, customer: "Sara", total: 80, status: "Completed" },
  ];

  return (
    <div>
      <h1 className="admin-order-h1">Orders</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
