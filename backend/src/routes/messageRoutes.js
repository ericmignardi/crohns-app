import { Router } from "express";
import {
  sendMessage,
  getMessages,
  getUsers,
} from "../controllers/messageController.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router = Router();

router.post("/:id", protectRoutes, sendMessage);
router.get("/:id", protectRoutes, getMessages);
router.get("/users", protectRoutes, getUsers);

export default router;
