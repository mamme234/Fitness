import express from "express";
import {
    getAllNutrition,
    getNutritionById,
    searchNutrition,
    getByCategory,
    getByMealType,
    getPremiumNutrition
} from "../controllers/nutritionController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * =========================
 * NUTRITION ROUTES
 * =========================
 */

// Get all nutrition items
router.get("/", authenticate, getAllNutrition);

// Search foods
router.get("/search", authenticate, searchNutrition);

// Get premium nutrition
router.get("/premium", authenticate, getPremiumNutrition);

// Get by category (Breakfast, Lunch, etc.)
router.get("/category/:category", authenticate, getByCategory);

// Get by meal type (Bulking, Cutting, etc.)
router.get("/meal/:type", authenticate, getByMealType);

// Get single nutrition item
router.get("/:id", authenticate, getNutritionById);

export default router;
