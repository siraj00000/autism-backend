const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// multer storage
app.use("/uploads", express.static("./uploads/"));
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// db connection function
const { DBConnection } = require("./db/connection");
DBConnection();

// models
require("./models/userSchema");
require("./models/parentScoreSchema");
require("./models/feedbackSchema");
require("./models/categorySchema");
require("./models/centerSchema");


const UserModel = mongoose.model("Users");
const CategoryModel = mongoose.model("Category");

// routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/scoreRoutes"));
app.use(require("./routes/feedbackRoutes"));
app.use(require("./routes/categoryRoutes"));
app.use(require("./routes/centerRoutes"));
app.use(require("./routes/advicesRoutes"));

// register api
app.post(
  "/parent_register",
  upload.single("childImageFile"),
  async (req, res) => {
    const {
      firstName,
      lastName,
      address,
      phone,
      email,
      password,
      childName,
      childAge,
      childGender,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return res.status(200).send({ message: "Email already exists" });
      }
      await UserModel.create({
        firstName,
        lastName,
        address,
        phone,
        email,
        childName,
        childAge,
        childGender,
        password: hashedPassword,
        childImageFile: req.file.filename,
      });
      res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
      console.log("register server error >> ", error);
      res.status(500).send({ message: error });
    }
  }
);

// update profile
app.put(
  "/parents/parent_profile",
  upload.single("childImageFile"),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        address,
        phone,
        email,
        childName,
        childAge,
        childGender,
        password,
      } = req.body;

      // Hash the password if it is provided
      let hashedPassword;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      // Update the user data
      const updateData = {
        firstName,
        lastName,
        address,
        phone,
        email,
        childName,
        childAge,
        childGender,
      };

      if (password) {
        updateData.password = hashedPassword;
      }

      if (req.file) {
        updateData.childImageUrl = `/uploads/${req.file.filename}`;
      }

      const user = await UserModel.findOneAndUpdate({ email }, updateData, {
        new: true,
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

// create category api
app.post("/create-category", upload.single("image"), async (req, res) => {
  try {
    const { title, department } = req.body;

    if (!title || !department) {
      return res
        .status(400)
        .send({ message: "Missing required fields: title and department" });
    }

    const newCategory = new CategoryModel({
      title,
      department,
      image: req.file.filename,
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
