const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: null },
    department: { type: String, requied: true },
  },
  {
    collection: "Category",
  }
);

mongoose.model("Category", categorySchema);
