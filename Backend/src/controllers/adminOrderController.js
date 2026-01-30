import { supabase } from "../config/db.js";

/* -------------------- ADMIN ORDER CONTROLLERS -------------------- */

// Get all orders (with items and user info)
export const getAllOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from("Orders")
      .select(
        `
        id,
        user_id,
        status,
        total_price,
        created_at,
        updated_at,
        OrderItems(id, menu_item_id, quantity, price),
        Users(name, email)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = [
    "pending",
    "confirmed",
    "preparing",
    "completed",
    "cancelled",
  ];
  if (!status || !validStatuses.includes(status))
    return res.status(400).json({ error: "Invalid status" });

  try {
    const { data, error } = await supabase
      .from("Orders")
      .update({ status, updated_at: new Date() })
      .eq("id", id)
      .select()
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order status updated", order: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status" });
  }
};
