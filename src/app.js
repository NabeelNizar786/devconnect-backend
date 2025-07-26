const express = require("express");
const app = express();
const PORT = 3000;
const { isAdminAuth } = require("./middlewares/auth");

app.use("/admin", isAdminAuth);

app.get("/admin/getAllUsers", (req, res) => {
  try {
    throw new Error("err");
  } catch (error) {
    res.status(500).send("Error");
  }
  res.send("data send");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
