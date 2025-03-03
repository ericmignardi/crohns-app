import { sql } from "../lib/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !username || !password)
      return res.status(400).json({ message: "All Fields Required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password Must Be At Least 6 Characters" });
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} OR username = ${username} LIMIT 1;`;
    if (existingUser.length > 0)
      return res.status(400).json({ message: "Credentials Already In Use" });
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await sql`
      INSERT INTO users (first_name, last_name, email, username, password) 
      VALUES (${first_name}, ${last_name}, ${email}, ${username}, ${hashedPassword}) 
      RETURNING id, first_name, last_name, email, username;`;

    // Sign JWT with the entire user object
    const token = jwt.sign({ user: user[0] }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in the cookie
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
      sameSite: "Strict",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Ensure cookies are sent only on HTTPS in production
    });

    console.log("User Registered Successfully");
    res.status(201).json(user[0]); // Return the full user object to the client
  } catch (error) {
    console.log("Error in register: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json({ message: "All Fields Required" });
    const user = await sql`
      SELECT * FROM users WHERE username = ${username} LIMIT 1;`;
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });
    const isPasswordValid = await bcryptjs.compare(password, user[0].password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    // Sign JWT with the entire user object
    const token = jwt.sign({ user: user[0] }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in the cookie
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
      sameSite: "Strict",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Ensure cookies are sent only on HTTPS in production
    });

    console.log("User Logged In Successfully");
    res.status(200).json(user[0]); // Return the full user object to the client
  } catch (error) {
    console.log("Error in login: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: "0" });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verify = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in verify: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
