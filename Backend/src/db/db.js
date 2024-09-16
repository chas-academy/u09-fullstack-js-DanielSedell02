require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");

    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    console.log(`Connected to database: ${db.databaseName}`);
    console.log(`Users collection: ${usersCollection.collectionName}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
