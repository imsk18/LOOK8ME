const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const isBlacklisted = await redis.get(
            `blacklist:${token}`
        );

        if (isBlacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token has been revoked."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        console.error("Auth error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

module.exports = authUser;