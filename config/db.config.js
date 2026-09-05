const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://harripere1_db_user:x0AgxlpXlRzFKB6n@cluster0.uxxibid.mongodb.net/?appName=Cluster0");
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database failed to connect", error);
    process.exit(1);
  }
}

module.exports = connectDB