const express = require("express");
const {
  ShowAllCenters,
  GetHighCenters,
  FindByAddress,
} = require("../controllers/centersController");
const router = express.Router();

router.get("/parents/centers", ShowAllCenters);
router.get("/parents/high_centers", GetHighCenters);
router.get("/parents/center/address", FindByAddress);

module.exports = router;
