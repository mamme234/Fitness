import Workout from "../models/Workout.js";
import User from "../models/User.js";

/**
 * CREATE WORKOUT
 */
export const createWorkout = async (req, res) => {
    try {
        const userId = req.user.id;

        const workout = await Workout.create({
            user: userId,
            ...req.body
        });

        res.status(201).json({
            success: true,
            workout
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Create workout failed",
            error: error.message
        });
    }
};

/**
 * GET WEEKLY WORKOUTS
 */
export const getWeeklyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id });

        res.json({
            success: true,
            workouts
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET BY DAY
 */
export const getWorkoutByDay = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            user: req.user.id,
            day: req.params.day
        });

        res.json({ success: true, workout });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * START WORKOUT
 */
export const startWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        workout.startedAt = new Date();
        await workout.save();

        res.json({ success: true, workout });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * COMPLETE EXERCISE
 */
export const completeExercise = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        const ex = workout.exercises.id(req.params.exerciseId);
        ex.completed = true;

        await workout.save();

        res.json({ success: true, workout });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * FINISH WORKOUT
 */
export const finishWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        workout.completedAt = new Date();
        workout.isCompleted = true;

        await workout.save();

        await User.findByIdAndUpdate(req.user.id, {
            $inc: { completedWorkouts: 1 }
        });

        res.json({ success: true, workout });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * HISTORY
 */
export const workoutHistory = async (req, res) => {
    try {
        const workouts = await Workout.find({
            user: req.user.id,
            isCompleted: true
        });

        res.json({ success: true, workouts });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE WORKOUT
 */
export const deleteWorkout = async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
