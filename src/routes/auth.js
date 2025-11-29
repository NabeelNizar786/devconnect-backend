const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // if (skills?.length > 5) {
    //   throw new Error("skills must be fewer or equal to 5");
    // }

    //encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    let result = await user.save();
    res.status(200).send({ message: "User Added Successfully", result });
  } catch (err) {
    let error = err.message;
    res.status(404).send({ message: "Error While Creating User", error });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("EmailID doesn't exist!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJwt();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 2 * 60 * 1000),
      });
      res.status(200).send("Login Successful!");
    } else {
      throw new Error("Incorrect Password!");
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.status(200).send("User Logout Successfull!")
})

module.exports = authRouter