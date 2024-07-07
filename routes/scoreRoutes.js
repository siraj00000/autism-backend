const express = require("express");
const {
  PostParentScore,
  DeleteParentScore,
  GetParentScore,
} = require("../controllers/parentScoreController");
const router = express.Router();

router.post("/create-score", PostParentScore);
router.delete("/parents/delete_score/:scoreId", DeleteParentScore);
router.get("/parents/my_scores/:parentId", GetParentScore);

module.exports = router;
