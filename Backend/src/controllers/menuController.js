import { supabase } from "../config/db.js";

//ADMIN CONTROLLERS

// Add new menu item
export const addMenuItem = async (req, res) => {
  const { name, description, price, category_id, image_url, available } =
    req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const { data, error } = await supabase
      .from("menuitems")
      .insert([
        {
          name,
          description,
          price,
          category_id: category_id || null,
          image_url: image_url || null,
          available: available !== undefined ? available : true,
        },
      ])
      .select();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Menu item added successfully", menuItem: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

// Update menu item
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id, image_url, available } =
    req.body;

  if (!id) return res.status(400).json({ error: "Menu item ID is required" });

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;
  if (price !== undefined) updates.price = price;
  if (category_id !== undefined) updates.category_id = category_id;
  if (image_url !== undefined) updates.image_url = image_url;
  if (available !== undefined) updates.available = available;

  try {
    const { data, error } = await supabase
      .from("menuitems")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Menu item not found" });

    res.json({ message: "Menu item updated successfully", menuItem: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

// Delete menu item (soft delete by setting available = false)
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("menuitems")
      .update({ available: false })
      .eq("id", id)
      .select()
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Menu item not found" });

    res.json({
      message: "Menu item deleted (soft) successfully",
      menuItem: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

/* -------------------- MENU CATEGORY ADMIN CONTROLLERS -------------------- */

// Add new category
export const addMenuCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name)
    return res.status(400).json({ error: "Category name is required" });

  try {
    const { data, error } = await supabase
      .from("menucategories")
      .insert([{ name, description: description || null }])
      .select();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Category added successfully", category: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add category" });
  }
};

// Update category
export const updateMenuCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;

  try {
    const { data, error } = await supabase
      .from("menucategories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated successfully", category: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete category
export const deleteMenuCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("menucategories")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted successfully", category: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

// GET /menu → public
export const getMenuItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("menuitems")
      .select(`id, name, description, price, image_url, available, category_id`)
      .eq("available", true);

    if (error) throw error;

    res.json({ menu: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// GET /menu/:id → public
export const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("menuitems")
      .select(`id, name, description, price, image_url, available, category_id`)
      .eq("id", id)
      .eq("available", true)
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Menu item not found" });

    res.json({ menuItem: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

// GET /menu/categories → public
export const getMenuCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("menucategories")
      .select("id, name, description");

    if (error) throw error;

    res.json({ categories: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
