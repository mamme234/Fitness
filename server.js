import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Database
import connectDatabase from "./config/database.js";

// Routes
import authRoutes from "./routes/auth.js";
import workoutRoutes from "./routes/workout.js";
import exerciseRoutes from "./routes/exercise.js";
import challengeRoutes from "./routes/challenge.js";
import progressRoutes from "./routes/progress.js";
import nutritionRoutes from "./routes/nutrition.js";

dotenv.config();

// Initialize app
const app = express();

/**
 * =========================
 * MIDDLEWARES
 * =========================
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

/**
 * =========================
 * DATABASE CONNECTION
 * =========================
 */
connectDatabase();

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Gym App API is running 🚀"
    });
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/nutrition", nutritionRoutes);

/**
 * =========================
 * ERROR HANDLING
 * =========================
 */
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});

/**
 * =========================
 * START SERVER
 * =========================
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("======================================");
    console.log(`🚀 Gym App Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log("======================================");
});
