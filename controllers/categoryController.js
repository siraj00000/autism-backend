const mongoose = require("mongoose");
const CategoryModel = mongoose.model("Category");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "./uploads/" });

// create a category
module.exports.CreateCategory = async (req, res) => {
  try {
    const { title, department } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !department) {
      return res
        .status(400)
        .send({ message: "Missing required fields: title and department" });
    }

    const newCategory = new CategoryModel({
      title,
      department,
      image,
    });

    await newCategory.save();

    res.status(201).send({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send({ message: "Error creating category" });
  }
};

// show all categories
module.exports.GetAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    const categoryData = categories.map((category) => ({
      // Include only relevant category properties (e.g., name, description, etc.)
      id: category._id,
      name: category.name,
      // ... other relevant properties
    }));
    res
      .status(200)
      .send({ message: "Categories fetched!", categories: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ message: "Error fetching categories", error });
  }
};

// get category departments
module.exports.GetCategoryDepartments = async (req, res) => {
  try {
    const { category } = req.params;
    const category_departments = await CategoryModel.find({
      category: category,
    });
    if (category_departments.length) {
      return res
        .status(200)
        .send({ message: "category departments", data: category_departments });
    }
    res.status(200).send({ message: "No departments found." });
  } catch (error) {
    console.error("Error GetCategoryDepartments :", error);
    res.status(500).send({ message: "Error fetching departments >>", error });
  }
};
