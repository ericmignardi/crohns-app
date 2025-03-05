import jwt from "jsonwebtoken";
import { sql } from "../lib/db.js";

export const protectRoutes = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No Token Provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    const user = await sql`
    SELECT * FROM users WHERE id = ${decoded.user.id} LIMIT 1;`;
    if (user.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    req.user = user[0];
    next();
  } catch (error) {
    console.log("Error in protectRoutes: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
