const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email, provide valid mail Id" + value);
        }
      },
    },
    password: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password" + value);
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not matching with allowed values");
        }
      },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
      type: String,
      default: "Hi this is me",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (userPassword) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(userPassword, hashedPassword);

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
