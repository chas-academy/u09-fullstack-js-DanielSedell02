require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User"); // Adjust this path if needed

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI);

async function setAdminUser() {
  try {
    // Replace 'user@example.com' with the email of the user you want to make admin
    const user = await User.findOne({ email: "Daniel.admin@gmail.com" });

    if (!user) {
      console.log("User not found");
      return;
    }

    user.role = "admin";
    await user.save();

    console.log(`User ${user.username} has been set as admin`);
  } catch (error) {
    console.error("Error setting admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
}

setAdminUser();
