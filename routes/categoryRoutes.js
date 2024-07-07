const express = require("express");
// const categoriesController = require("./controllers/categoriesController");
const {
  CreateCategory,
  GetAllCategories,
  GetCategoryDepartments,
} = require("../controllers/categoryController");
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });

const router = express.Router();

// router.post("/create-category", upload.single("image"), CreateCategory);
router.get("/show-categories", GetAllCategories);
router.get("/get-category-department/:category", GetCategoryDepartments);

module.exports = router;
