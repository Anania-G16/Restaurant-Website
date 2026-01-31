import { supabase } from "../config/db.js";

/* -------------------- USER CONTACT MESSAGES -------------------- */

// Submit a contact message
export const submitMessage = async (req, res) => {
  const userId = req.user ? req.user.userId : null; // optional user
  const { name, email, message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const { data, error } = await supabase
      .from("contactmessages")
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
// Backend/src/controllers/contactController.js

export const getAllMessages = async (req, res) => {
  try {
    // 1. Double check your table name in Supabase. Is it 'contactmessages'?
    const { data, error } = await supabase
      .from("contactmessages")
      .select("*") // Use "*" first to see if it works at all
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error details:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.json({ messages: data });
  } catch (err) {
    // This catches logic crashes
    console.error("Server Crash Error:", err.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from("contactmessages")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
};
