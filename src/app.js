const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => { 
  try {
    //Validation of data
    validateSignUpData(req);

    const{firstName, lastName, emailId, password} = req.body

    // if (skills?.length > 5) {
    //   throw new Error("skills must be fewer or equal to 5");
    // }

    //encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({firstName, lastName, emailId, password:passwordHash});
    let result = await user.save();
    res.status(200).send({ message: "User Added Successfully", result });
  } catch (err) {
    let error = err.message;
    res.status(404).send({ message: "Error While Creating User", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId})

    if(!user) {
      throw new Error("EmailID doesn't exist!")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if( isPasswordValid) {
      res.status(200).send("Login Successful!")
    } else {
      throw new Error("Incorrect Password!")
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message)
  }
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    console.log(user);

    if (user.length === 0) {
      res.status(404).send({ message: "User Not Found!" });
    }
    res.status(200).send({ message: "User Found", user });
  } catch (error) {
    res.status(404).send("Error while fetching user");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ message: "User List", users });
  } catch (error) {
    res.status(404).send("Error while fetching user");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    let result = await User.findByIdAndDelete(userId);
    res.status(200).send({ message: "User Successfully Deleted!" }, result);
  } catch (error) {
    res.status(500).send({ message: "Error while deleting user", error });
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "password",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (req.body?.skills.length > 5) {
      throw new Error("skills must be fewer or equal to 5");
    }
    let result = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.status(200).send({ message: "User successfully updated!", result });
  } catch (err) {
    let error = err.message;
    res.status(500).send({ message: "Error while Updating user", error });
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established ...!");
    app.listen(PORT, () => {
      console.log("Server Connection Started Succesfully");
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed!");
  });

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Error:" + err.message);
  }
});
