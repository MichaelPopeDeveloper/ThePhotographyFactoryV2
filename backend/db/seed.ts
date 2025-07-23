import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { hash } from "https://deno.land/x/bcrypt/mod.ts";

try {
  const db = new DB("./backend/db/main.db");
  const username = "michaelpopedeveloper@gmail.com";
  const password = "123";
  const hashedPassword = await hash(password);

  await db.query(
    "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  
  console.log("Admin user created or already exists.");
  db.close();
} catch (err) {
  console.error("Error seeding database:", err);
} 