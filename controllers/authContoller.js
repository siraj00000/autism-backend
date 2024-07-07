const mongooose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/data");
const UserModel = mongooose.model("Users");

module.exports.CreateUser = async (req, res) => {
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
  const { childImageFile } = req.file.filename;

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
    });
    res.status(200).send({ message: "User registered successfully" });
  } catch (error) {
    console.log("register server error >> ", error);
    res.status(500).send({ message: error });
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
          data: { name: isUser.name, email: isUser.email },
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
    const { id } = req.body;
    console.log(id);
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
