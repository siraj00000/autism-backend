const CategoryModel = require("../models/categorySchema");

// Create a category
module.exports.CreateCategory = async (req, res) => {
  try {
    const { title, department, image } = req.body;

    if (!title || !department) {
      return res.status(400).send({ message: "Missing required fields: title and department" });
    }

    const newCategory = new CategoryModel({
      title,
      department,
      image: image || null, // Default to null if image is not provided
    });

    await newCategory.save();

    res.status(201).send({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send({ message: "Error creating category", error });
  }
};

// Show all categories
module.exports.GetAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
   
    res.status(200).send({ message: "Categories fetched successfully", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ message: "Error fetching categories", error });
  }
};

// Get category departments
module.exports.GetCategoryDepartments = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);
    const categoryDepartments = await CategoryModel.findOne({_id: category});

    if (categoryDepartments) {
      return res.status(200).send({ message: "Category departments fetched successfully", data: categoryDepartments });
    }

    res.status(404).send({ message: "No departments found" });
  } catch (error) {
    console.error("Error fetching category departments:", error);
    res.status(500).send({ message: "Error fetching departments", error });
  }
};
