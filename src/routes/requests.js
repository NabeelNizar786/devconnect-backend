const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.status(200).send("request sent successful!");
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = requestRouter;