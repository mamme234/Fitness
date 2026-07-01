import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

/**
 * =========================
 * UPDATE PROGRESS
 * =========================
 */
export const updateProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const challengeId = req.params.id;

        const { progress } = req.body;

        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found."
            });
        }

        const participant = challenge.participants.find(
            (p) => p.user.toString() === userId.toString()
        );

        if (!participant) {
            return res.status(400).json({
                success: false,
                message: "You are not in this challenge."
            });
        }

        participant.progress = progress;

        if (participant.progress >= participant.target) {
            participant.completed = true;
            participant.completedAt = new Date();
        }

        await challenge.save();

        res.status(200).json({
            success: true,
            message: "Progress updated.",
            participant
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update progress.",
            error: error.message
        });
    }
};


/**
 * =========================
 * COMPLETE CHALLENGE
 * =========================
 */
export const completeChallenge = async (req, res) => {
    try {
        const userId = req.user._id;
        const challengeId = req.params.id;

        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found."
            });
        }

        const participant = challenge.participants.find(
            (p) => p.user.toString() === userId.toString()
        );

        if (!participant) {
            return res.status(400).json({
                success: false,
                message: "Not part of this challenge."
            });
        }

        if (participant.completed) {
            return res.status(400).json({
                success: false,
                message: "Already completed."
            });
        }

        participant.completed = true;
        participant.completedAt = new Date();
        participant.xpEarned = challenge.rewards.xp;
        participant.coinsEarned = challenge.rewards.coins;

        await challenge.save();

        // Update user stats
        await User.findByIdAndUpdate(userId, {
            $inc: {
                xp: challenge.rewards.xp,
                coins: challenge.rewards.coins
            }
        });

        res.status(200).json({
            success: true,
            message: "Challenge completed!",
            rewards: challenge.rewards
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to complete challenge.",
            error: error.message
        });
    }
};


/**
 * =========================
 * GET USER CHALLENGES
 * =========================
 */
export const getUserChallenges = async (req, res) => {
    try {
        const userId = req.user._id;

        const challenges = await Challenge.find({
            "participants.user": userId
        });

        res.status(200).json({
            success: true,
            count: challenges.length,
            challenges
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user challenges.",
            error: error.message
        });
    }
};


/**
 * =========================
 * LEADERBOARD
 * =========================
 */
export const getLeaderboard = async (req, res) => {
    try {
        const challengeId = req.params.id;

        const challenge = await Challenge.findById(challengeId)
            .populate("participants.user", "firstName xp coins");

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found."
            });
        }

        const leaderboard = challenge.participants
            .sort((a, b) => b.progress - a.progress)
            .map((p, index) => ({
                rank: index + 1,
                user: p.user,
                progress: p.progress,
                completed: p.completed
            }));

        res.status(200).json({
            success: true,
            leaderboard
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load leaderboard.",
            error: error.message
        });
    }
};
