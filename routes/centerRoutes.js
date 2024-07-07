const express = require("express");
const {
  ShowAllCenters,
  GetHighCenters,
  FindByAddress,
} = require("../controllers/centersController");
const router = express.Router();

router.get("/parents/centers", ShowAllCenters);
router.get("/parents/high_centers/:isHighCenter", GetHighCenters);
router.get("/parents/center/address/:address", FindByAddress);

module.exports = router;
