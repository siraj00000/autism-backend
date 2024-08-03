const express = require("express");
const {
  FindByAddress,
} = require("../controllers/centersController");
const router = express.Router();

router.get("/parents/center/address", FindByAddress);

module.exports = router;
