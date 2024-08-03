const express = require("express");
const {
  CreateFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();

router.post("/parents/Feedback/create", CreateFeedback);

module.exports = router;
