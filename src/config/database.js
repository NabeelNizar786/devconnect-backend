const mongoose = require("mongoose");

const connectDB = async() => {
  await mongoose.connect(
    "mongodb+srv://newdata:newdata@node1.f0qsp5r.mongodb.net/devConnect"
  );
};

module.exports = connectDB;
