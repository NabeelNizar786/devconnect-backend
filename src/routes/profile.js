const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    let userInfo = req.user;
    res.status(200).send(userInfo);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = profileRouter;
