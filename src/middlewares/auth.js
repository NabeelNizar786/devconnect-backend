const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    } 

    let decodedToken = jwt.verify(token, "DEVCONNECT@2025");

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
