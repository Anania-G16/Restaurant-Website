// src/testSupabase.js
import { supabase } from "./config/supabase.js";

async function testDB() {
  const { data, error } = await supabase.from("test_table").select("*");

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Fetched data:", data);
  }
}

testDB();
