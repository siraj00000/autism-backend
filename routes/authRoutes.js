const express = require("express");
const { LoginUser, GetParentProfile } = require("../controllers/authContoller");
const router = express.Router();

router.post("/parent_login", LoginUser);
router.get("/parents/get-parent-profile", GetParentProfile);
// router.put("/parents/parent_profile", UpdateProfile);

module.exports = router;
