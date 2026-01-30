import { supabase } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 1. REGISTER: Creates a user and hashes the password
export const register = async (req, res) => {
  // Ensure we extract 'name' (sent as 'name' from our updated Register.jsx)
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password_hash: hashedPassword,
          role: "customer", // Default role for new signups
        },
      ])
      .select();

    if (error) {
      // Handle unique constraint violation (email already exists)
      if (error.code === "23505") {
        return res.status(400).json({ error: "Email already registered" });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: { id: data[0].id, name: data[0].name, email: data[0].email },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 2. LOGIN: Verifies credentials and returns Token + Role
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    // Check if user exists
    if (error || !data) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, data.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create JWT including the ROLE in the payload
    const token = jwt.sign(
      { userId: data.id, role: data.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // CRITICAL: Return the role so the frontend can navigate correctly
    res.json({
      token,
      role: data.role,
      user: {
        name: data.name,
        email: data.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
};
