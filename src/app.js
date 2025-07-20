const express = require("express");
const app = express();
const PORT = 3000;

app.get("/profile", (req, res) => {
  res.send({ username: "nabeel", job: "developer" });
});

app.post("/profile", (req, res) => {
  res.send("profile fetched successfully");
});

app.delete("/profile", (req, res) => {
  res.send("profile deleted successfully");
});

app.patch("/profile", (req, res) => {
    res.send("profile updated successfully")
})



app.listen(PORT, () => console.log(`listening on ${PORT}`));
