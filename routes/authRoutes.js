const express = require("express");
const { LoginUser, GetParentProfile, CreateUser, UpdateProfile } = require("../controllers/authContoller");
const router = express.Router();

router.post("/parent_register", CreateUser);
router.post("/parent_login", LoginUser);
router.get("/parents/get-parent-profile/:id", GetParentProfile);
router.put("/parents/parent_profile/:id", UpdateProfile);

module.exports = router;
