const express = require("express");
const { LoginUser, GetParentProfile, CreateUser } = require("../controllers/authContoller");
const router = express.Router();

router.post("/register", CreateUser);
router.post("/parent_login", LoginUser);
router.get("/parents/get-parent-profile/:id", GetParentProfile);
// router.put("/parents/parent_profile", UpdateProfile);

module.exports = router;
