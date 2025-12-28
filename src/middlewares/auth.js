const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login");
    }

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedToken;

    const userInfo = await User.findById(_id);

    if (!userInfo) {
      throw new Error("Invalid User");
    }

    req.user = userInfo;

    next();
  } catch (error) {
    res.status(401).send("ERROR:" + error.message);
  }
};

module.exports = {
  userAuth,
};
