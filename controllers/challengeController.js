import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

export const getAllChallenges = async (req, res) => {
    const data = await Challenge.find();
    res.json({ success: true, data });
};

export const getChallengeById = async (req, res) => {
    const data = await Challenge.findById(req.params.id);
    res.json({ success: true, data });
};

export const joinChallenge = async (req, res) => {
    const challenge = await Challenge.findById(req.params.id);

    challenge.participants.push({
        user: req.user.id,
        progress: 0
    });

    await challenge.save();

    res.json({ success: true });
};

export const updateProgress = async (req, res) => {
    res.json({ success: true, message: "Progress updated" });
};

export const completeChallenge = async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, {
        $inc: { xp: 100 }
    });

    res.json({ success: true });
};

export const getUserChallenges = async (req, res) => {
    const data = await Challenge.find({
        "participants.user": req.user.id
    });

    res.json({ success: true, data });
};

export const getLeaderboard = async (req, res) => {
    const data = await Challenge.findById(req.params.id)
        .populate("participants.user");

    res.json({ success: true, data });
};
