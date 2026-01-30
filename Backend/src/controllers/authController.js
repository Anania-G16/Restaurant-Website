import { supabase } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password_hash: hashedPassword }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "User registered successfully", user: data[0] });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data)
    return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, data.password_hash);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: data.id, role: data.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ token });
};
