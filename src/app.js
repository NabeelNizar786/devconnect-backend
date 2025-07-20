const express = require("express");
const app = express();
const PORT = 3000;

app.get("/profile/:userId/:user/:password", (req, res) => {
  console.log(req.params.userId);
  const userDetails = req.params;
  res.send(userDetails);
});

app.post("/profile", (req, res) => {
  res.send("profile fetched successfully");
});

app.delete("/profile", (req, res) => {
  res.send("profile deleted successfully");
});

app.patch("/profile", (req, res) => {
  res.send("profile updated successfully");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
