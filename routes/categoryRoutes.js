const express = require("express");

const {
  CreateCategory,
  GetAllCategories,
  GetCategoryDepartments,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/create-category", CreateCategory);
router.get("/categories", GetAllCategories);
router.get("/categories/:category", GetCategoryDepartments);

module.exports = router;
