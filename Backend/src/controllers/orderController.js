import { supabase } from "../config/db.js";

/* -------------------- USER CART & orders -------------------- */

// Get current cart (pending order)
// Replace the getCart function in orderController.js
export const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("id, total_price")
      .eq("user_id", userId)
      .eq("status", "pending")
      .single();

    if (orderError || !orderData)
      return res.json({ cart: { items: [], totalPrice: 0 } });

    // Fetch items AND join with menuitems table to get name, img, etc.
    const { data: items, error: itemsError } = await supabase
      .from("orderitems")
      .select(
        `
        id, 
        menu_item_id, 
        quantity, 
        price,
        menuitems (name, image_url, price)
      `,
      )
      .eq("order_id", orderData.id);

    if (itemsError) throw itemsError;

    res.json({
      cart: {
        orderId: orderData.id,
        totalPrice: orderData.total_price,
        items,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  const userId = req.user.userId;
  const { menu_item_id, quantity } = req.body;

  if (!menu_item_id || !quantity || quantity < 1)
    return res
      .status(400)
      .json({ error: "Menu item ID and valid quantity are required" });

  try {
    // Check if pending order exists
    let { data: pendingOrder, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "pending")
      .single();

    // If no pending order, create one
    if (!pendingOrder) {
      const { data, error: createError } = await supabase
        .from("orders")
        .insert([{ user_id: userId, total_price: 0 }])
        .select()
        .single();

      if (createError) throw createError;
      pendingOrder = data;
    }

    // Get menu item price
    const { data: menuItem, error: menuError } = await supabase
      .from("menuitems")
      .select("price, available")
      .eq("id", menu_item_id)
      .single();

    if (menuError || !menuItem || !menuItem.available)
      return res
        .status(404)
        .json({ error: "Menu item not found or unavailable" });

    const price = menuItem.price * quantity;

    // Insert into orderitems
    const { data: orderItem, error: insertError } = await supabase
      .from("orderitems")
      .insert([
        {
          order_id: pendingOrder.id,
          menu_item_id,
          quantity,
          price,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    // Update total_price in orders table
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({ total_price: pendingOrder.total_price + price })
      .eq("id", pendingOrder.id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({ message: "Item added to cart", cart: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// Update quantity or remove item from cart
export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (quantity !== undefined && quantity < 0)
    return res.status(400).json({ error: "Quantity must be 0 or more" });

  try {
    // Get the cart item
    const { data: cartItem, error } = await supabase
      .from("orderitems")
      .select("id, price, quantity, order_id")
      .eq("id", itemId)
      .single();

    if (error || !cartItem)
      return res.status(404).json({ error: "Cart item not found" });

    const oldTotal = cartItem.price;

    if (quantity === 0) {
      // Remove item
      const { error: deleteError } = await supabase
        .from("orderitems")
        .delete()
        .eq("id", itemId);
      if (deleteError) throw deleteError;
    } else {
      // Update quantity and price
      const unitPrice = cartItem.price / cartItem.quantity;
      const newPrice = unitPrice * quantity;

      const { data, error: updateError } = await supabase
        .from("orderitems")
        .update({ quantity, price: newPrice })
        .eq("id", itemId)
        .select()
        .single();

      if (updateError) throw updateError;
    }

    // Update total_price in orders table
    const { data: orderData, error: orderError } = await supabase
      .from("orderitems")
      .select("order_id, SUM(price) as total_price")
      .eq("order_id", cartItem.order_id)
      .single();

    let totalPrice = orderData ? orderData.total_price : 0;

    await supabase
      .from("orders")
      .update({ total_price: totalPrice })
      .eq("id", cartItem.order_id);

    res.json({ message: "Cart updated successfully", totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Checkout / place order
export const checkoutOrder = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find pending order
    const { data: pendingOrder, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "pending")
      .single();

    if (error || !pendingOrder)
      return res.status(400).json({ error: "No items in cart" });

    // Update status to confirmed
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({ status: "confirmed", updated_at: new Date() })
      .eq("id", pendingOrder.id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({ message: "Order placed successfully", order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// View order history
export const getOrderHistory = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        "id, status, total_price, created_at, orderitems(id, menu_item_id, quantity, price)",
      )
      .eq("user_id", userId)
      .neq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
};
