const mongoose = require("mongoose");

const DB = `${process.env.DB_URL}/${process.env.DB_NAME}`;

// Connect to MongoDB database using Mongoose
mongoose
  .connect(DB)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// Server build
if (process.env.NODE_ENV === "production") {
  // Further Processes
  console.log("Mongo DB Is Connected In Production!");
}
