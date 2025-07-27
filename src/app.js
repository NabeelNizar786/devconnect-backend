const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = 3000;

app.post("/signup", async (req, res) => {
  const user = new Use({
    firstName: "Rajesh",
    lastName: "Kaloji",
    emailId: "rajeshkaloji@gmail.com",
    password: "123456",
  });

  try {
    let result = await user.save();
    res.status(200).send({ message: "User Added Successfully", result });
  } catch (err) {
    res.status(404).send("Error While Creating User");
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
