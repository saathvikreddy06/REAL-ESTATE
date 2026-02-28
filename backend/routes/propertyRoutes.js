import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createProperty,
  deleteProperty,
  getProperties,
  updateProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.post("/", protect, createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;
