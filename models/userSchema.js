const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    childName: { type: String, required: true },
    childAge: { type: String, required: true },
    childGender: { type: String, required: true },
    childImageFile: { type: String, required: true },
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", userSchema);
