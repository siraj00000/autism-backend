const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    advise: { type: String, required: true },
    childCase: { type: String, required: true },
    date: { type: String, required: true },
    childAge: { type: Number, required: true },
    childGender: { type: Number, required: true },
    parent_id: { type: String, required: true },
  },
  {
    collection: "ParentScore",
  }
);

module.exports = mongoose.model("ParentScore", ScoreSchema);
