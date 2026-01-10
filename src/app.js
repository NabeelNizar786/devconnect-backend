const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

app.use("/", authRouter),
  app.use("/", profileRouter),
  app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established ...!");
    app.listen(process.env.PORT || PORT, () => {
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
