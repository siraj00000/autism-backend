const FeedbackModel = require("../models/feedbackSchema");

module.exports.CreateFeedback = async (req, res) => {
  try {
    const { feedback, feedback_author } = req.body;

    if (!feedback || !feedback_author) {
      return res.status(400).send({
        message: "Missing required fields: feedback and feedback_author",
      });
    }

    const newFeedback = new FeedbackModel({
      feedback,
      feedback_author,
    });

    await newFeedback.save();

    res.status(200).send({
      message: "Feedback created successfully",
      data: newFeedback
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).send({ message: "Error creating feedback" });
  }
};

module.exports.GetFeedbacks = async (req, res) => {
  try {
    const allFeedbacks = await FeedbackModel.find();

    if (!allFeedbacks.length) {
      return res.status(200).send({ message: "No feedbacks found" }); // Explicit message
    }

    res.status(200).send({
      message: "Fetched all feedbacks successfully",
      feedbacks: allFeedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).send({ message: "Error fetching feedbacks" });
  }
};
