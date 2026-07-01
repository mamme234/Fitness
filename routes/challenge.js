import express from "express";
import {
    getAllChallenges,
    getChallengeById,
    joinChallenge,
    updateProgress,
    completeChallenge,
    getUserChallenges,
    getLeaderboard
} from "../controllers/challengeController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * =========================
 * CHALLENGE ROUTES
 * =========================
 */

// Get all challenges
router.get("/", authenticate, getAllChallenges);

// Get single challenge
router.get("/:id", authenticate, getChallengeById);

// Join a challenge
router.post("/:id/join", authenticate, joinChallenge);

// Update challenge progress
router.put("/:id/progress", authenticate, updateProgress);

// Complete challenge
router.post("/:id/complete", authenticate, completeChallenge);

// Get user challenges
router.get("/user/all", authenticate, getUserChallenges);

// Leaderboard
router.get("/:id/leaderboard", authenticate, getLeaderboard);

export default router;
