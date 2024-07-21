const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/data");
const UserModel = require("../models/userSchema");

module.exports.CreateUser = async (req, res) => {
  try {
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
      childImageFile
    } = req.body;

    if (!firstName || !lastName || !address || !phone || !email || !password || !childName || !childAge || !childGender) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      firstName,
      lastName,
      address,
      phone,
      email,
      password: hashedPassword,
      childName,
      childAge,
      childGender,
      childImageFile
    });

    res.status(201).send({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register server error >>", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


module.exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return res.status().send({ message: "Email does not exists" });
    }
    if (await bcrypt.compare(password, isUser.password)) {
      const accessToken = jwt.sign({ email: isUser.email }, SECRET_KEY, {
        expiresIn: "24hr",
      });

      if (res.status(201)) {
        return res.status(200).send({
          message: "Login Successfull",
          data: isUser,
          accessToken,
        });
      } else {
        return res.status(401).send({ message: "Invalid email or password" });
      }
    }
    res.status(201).send({ message: "Invalid email or password" });
  } catch (error) {
    console.log("login server error >> ", error);
    res.status(500).send({ message: error });
  }
};

// get profile
module.exports.GetParentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const findProfile = await UserModel.findById({ _id: id });

    if (findProfile) {
      return res
        .status(200)
        .send({ message: "Parent Profile", data: findProfile });
    }
    res.status(404).send({ message: "Parent Profile Not Found" });
  } catch (error) {
    console.log("GetParentProfile error >> ", error);
    res.status(500).send({ message: "Error Getting profile" });
  }
};
