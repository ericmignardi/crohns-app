import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { sql } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import recipeIngredientRoutes from "./routes/recipeIngredientRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { app, server } from "./lib/socket.js";
import path from "path";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/recipe-ingredients", recipeIngredientRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

async function initDb() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    profile_pic TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
    await sql`
    CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(255) NOT NULL,
    preparation_time VARCHAR(25) NOT NULL,
    cooking_time VARCHAR(25) NOT NULL,
    type VARCHAR(25) NOT NULL,
    image VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`;
    await sql`
    CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(25) NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE);`;
    await sql`
    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE);`;
    console.log("Successfully Initialized Database");
  } catch (error) {
    console.log("Error in initDb: ", error);
  }
}

initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});
