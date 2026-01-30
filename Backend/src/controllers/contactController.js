import { supabase } from "../config/db.js";

/* -------------------- USER CONTACT MESSAGES -------------------- */

// Submit a contact message
export const submitMessage = async (req, res) => {
  const userId = req.user ? req.user.userId : null; // optional user
  const { name, email, message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const { data, error } = await supabase
      .from("ContactMessages")
      .insert([
        {
          user_id: userId,
          name: name || null,
          email: email || null,
          message,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Message sent successfully", contact: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

/* -------------------- ADMIN CONTACT MESSAGES -------------------- */

// Get all contact messages
export const getAllMessages = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ContactMessages")
      .select(
        "id, user_id, name, email, message, created_at, Users(name, email)",
      )
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ messages: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
