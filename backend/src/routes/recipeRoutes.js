import { Router } from "express";
import {
  create,
  read,
  readById,
  update,
  deleteById,
} from "../controllers/recipeController.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router = Router();

router.post("/", protectRoutes, create);
router.get("/", read);
router.get("/:id", protectRoutes, readById);
router.put("/:id", protectRoutes, update);
router.delete("/:id", protectRoutes, deleteById);

export default router;
