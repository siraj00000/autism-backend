const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    feedback: { type: String, required: true },
    feedback_author: { type: String, required: true },
  },
  {
    collection: "Feedbacks",
  }
);

module.exports = mongoose.model("Feedbacks", FeedbackSchema);
