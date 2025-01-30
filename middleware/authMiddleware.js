const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
    try {
        const token = await req?.cookies?.token || null;
        const privateKey = process.env.PRIVATE_KEY;
        if (!token) {
            return res.status(401).json({
                message: "UnAuthorized user"
            })
        }
        const isValidToken = await jwt.verify(token, privateKey);
        if (!isValidToken) {
            return res.status(401).json({
                message: "UnAuthorized user"
            })
        }
        if (isValidToken) {
            const decodedToken = await jwt.decode(token);
            const loggedInUser = await User.findOne({ where: { id: decodedToken?.id } });
            req.user = loggedInUser;
        }
        next();
    } catch (err) {
        return res.status(401).json({
            message: "UnAuthorized user", err
        })
    }
}

module.exports = authMiddleware;