import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Verify JWT Token
 */
export const authenticate = async (req, res, next) => {
    try {

        let token = null;

        // Authorization: Bearer <token>
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Cookie
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked."
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
};

/**
 * Admin Only
 */
export const isAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized."
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required."
        });
    }

    next();
};

/**
 * Coach or Admin
 */
export const isCoach = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized."
        });
    }

    if (
        req.user.role !== "coach" &&
        req.user.role !== "admin"
    ) {
        return res.status(403).json({
            success: false,
            message: "Coach access required."
        });
    }

    next();
};

/**
 * Premium Users
 */
export const isPremium = (req, res, next) => {

    if (!req.user.premium) {
        return res.status(403).json({
            success: false,
            message: "Premium membership required."
        });
    }

    next();
};

/**
 * Optional Login
 * Continue even if user is not logged in.
 */
export const optionalAuth = async (req, res, next) => {

    try {

        let token = null;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next();
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (user) {
            req.user = user;
        }

        next();

    } catch {

        next();

    }

};
