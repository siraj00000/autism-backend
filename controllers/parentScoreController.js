const { MongoGridFSChunkError } = require("mongodb");
const mongoose = require("mongoose");
const ScoreModel = mongoose.model("ParentScore");

module.exports.PostParentScore = async (req, res) => {
  try {
    const { score, advise, childCase, date, childAge, childGender, parent_id } =
      req.body;

    const newScore = new ScoreModel({
      score,
      advise,
      childCase,
      date,
      childAge,
      childGender,
      parent_id,
    });

    await newScore.save();

    res
      .status(201)
      .send({ message: "Score created successfully", score: newScore });
  } catch (error) {
    console.error("Error creating score:", error);
    res.status(500).send({ message: "Error creating score" });
  }
};

module.exports.DeleteParentScore = async (req, res) => {
  try {
    const { scoreId } = req.params;

    const deletedScore = await ScoreModel.findByIdAndDelete(scoreId);

    if (!deletedScore) {
      return res.status(404).send({ message: "Score not found" });
    }

    res.status(200).send({ message: "Score deleted successfully" });
  } catch (error) {
    console.error("Error deleting score:", error);
    res.status(500).send({ message: "Error deleting score" });
  }
};

module.exports.GetParentScore = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parentScores = await ScoreModel.find({ _id: parentId });

    if (!parentScores.length) {
      return res
        .status(200)
        .send({ message: "No scores found for this parent" });
    }

    res.status(200).send({
      message: "Fetched parent scores successfully",
      scores: parentScores,
    });
  } catch (error) {
    console.error("Error fetching parent scores:", error);
    res.status(500).send({ message: "Error fetching parent scores" });
  }
};
