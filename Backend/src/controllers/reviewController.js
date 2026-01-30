import { supabase } from "../config/db.js";

/* -------------------- USER reviews -------------------- */

// Submit a review for a menu item
export const submitReview = async (req, res) => {
  const userId = req.user.userId;
  const { menu_item_id, rating, comment } = req.body;

  if (!menu_item_id || !rating || rating < 1 || rating > 5)
    return res
      .status(400)
      .json({ error: "Valid menu item and rating (1-5) are required" });

  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        { user_id: userId, menu_item_id, rating, comment: comment || null },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "Review submitted", review: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit review" });
  }
};

// Get all reviews for a menu item (public)
export const getReviewsForMenuItem = async (req, res) => {
  const { menu_item_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, user_id, rating, comment, created_at, users(name)")
      .eq("menu_item_id", menu_item_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ reviews: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
