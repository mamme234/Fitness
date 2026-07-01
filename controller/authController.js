import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, comparePassword, validatePassword } from "../utils/hashPassword.js";

/**
 * =========================
 * REGISTER USER
 * =========================
 */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            telegramId
        } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { telegramId }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        // Validate password
        const passwordCheck = validatePassword(password);

        if (!passwordCheck.valid) {
            return res.status(400).json({
                success: false,
                message: passwordCheck.message
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            telegramId
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                telegramId: user.telegramId
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed.",
            error: error.message
        });
    }
};


/**
 * =========================
 * LOGIN USER
 * =========================
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const isMatch = await comparePassword(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                premium: user.premium,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed.",
            error: error.message
        });
    }
};


/**
 * =========================
 * TELEGRAM LOGIN
 * =========================
 */
export const telegramLogin = async (req, res) => {
    try {
        const {
            telegramId,
            firstName,
            username
        } = req.body;

        if (!telegramId) {
            return res.status(400).json({
                success: false,
                message: "Telegram ID required."
            });
        }

        let user = await User.findOne({ telegramId });

        if (!user) {
            user = await User.create({
                telegramId,
                firstName,
                username
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Telegram login successful.",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Telegram login failed.",
            error: error.message
        });
    }
};
