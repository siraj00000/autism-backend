const express = require("express");
const {
  CreateFeedback,
  GetFeedbacks,
} = require("../controllers/feedbackController");
const router = express.Router();

router.post("/parents/Feedback/create", CreateFeedback);
router.get("/parents/advices", GetFeedbacks);

module.exports = router;
