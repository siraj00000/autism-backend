const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image_src: { type: String, required: true },
    isHighCenter: { type: Boolean },
    address: { type: String, required: true },
  },
  {
    collection: "Centers",
  }
);

module.exports = mongoose.model("Centers", centerSchema);
