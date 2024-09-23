const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as needed

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.user.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

const adminAuthMiddleware = async (req, res, next) => {
  try {
    await authMiddleware(req, res, () => {
      if (req.user.role !== "admin") {
        return res.status(403).send({ error: "Access denied. Admin only." });
      }
      next();
    });
  } catch (error) {
    res.status(401).send({ error: "Please authenticate as admin." });
  }
};

module.exports = { authMiddleware, adminAuthMiddleware };
