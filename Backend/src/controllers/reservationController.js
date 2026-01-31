import { supabase } from "../config/db.js";

/* -------------------- USER reservations -------------------- */

// Make a reservation
export const createReservation = async (req, res) => {
  const userId = req.user.userId;
  const { table_number, guest_count, reservation_time } = req.body;

  if (!guest_count || !reservation_time)
    return res
      .status(400)
      .json({ error: "Guest count and reservation time are required" });

  try {
    // 1. Build the object dynamically
    const insertData = {
      user_id: userId,
      guest_count: parseInt(guest_count), // Force integer
      reservation_time: reservation_time,
    };

    // Only add table_number if it's a valid number, otherwise let DB handle NULL
    if (table_number && !isNaN(table_number)) {
      insertData.table_number = parseInt(table_number);
    }

    // 2. Insert into Supabase
    const { data, error } = await supabase
      .from("reservations")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "Reservation created", reservation: data });
  } catch (err) {
    console.error("Server Crash:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user reservations
export const getUserReservations = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", userId)
      .order("reservation_time", { ascending: true });

    if (error) throw error;

    res.json({ reservations: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

/* -------------------- ADMIN reservations -------------------- */

// Get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*, users(name, email)")
      .order("reservation_time", { ascending: true });

    if (error) throw error;

    res.json({ reservations: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// Update reservation status
export const updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["reserved", "seated", "cancelled"];
  if (!status || !validStatuses.includes(status))
    return res.status(400).json({ error: "Invalid status" });

  try {
    const { data, error } = await supabase
      .from("reservations")
      .update({ status, updated_at: new Date() })
      .eq("id", id)
      .select()
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Reservation not found" });

    res.json({ message: "Reservation status updated", reservation: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update reservation" });
  }
};
