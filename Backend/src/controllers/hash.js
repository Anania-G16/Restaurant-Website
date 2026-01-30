import bcrypt from "bcrypt";

const password = "admin123"; // your plain password

const hashedPassword = await bcrypt.hash(password, 10);

console.log("Hashed password:", hashedPassword);
