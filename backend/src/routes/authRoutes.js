import { Router } from "express";
import {
  register,
  login,
  logout,
  verify,
  update,
} from "../controllers/authController.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", protectRoutes, verify);
router.put("/update", protectRoutes, update);

export default router;
