const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, email, role) => {
  return jwt.sign({ _id, email, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User already exists !",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      let { _id, name, email, role, from, profilePicture, dateOfBirth } =
        newUser;
      const token = await generateJwtToken(_id, email, role);
      // response token and user info
      res.status(201).json({
        token,
        user: { _id, name, email, role, from, profilePicture, dateOfBirth },
      });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.signin = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
      isDisabled: { $ne: true },
    });
    if (existingUser) {
      const isPasswordMatch = await existingUser.authenticate(
        req.body.password
      );
      if (isPasswordMatch) {
        const { _id, name, email, role, profilePicture } = existingUser;
        const accessToken = await generateJwtToken(_id, email, role);
        // response token and user info
        res.status(200).json({
          accessToken,
          user: { _id, name, email, role, profilePicture },
        });
      } else {
        res.status(400).json({ error: "Password incorrect" });
      }
    } else {
      return res.status(400).json({ error: "Email does not exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    message: "Signout successfully ....!",
  });
};

exports.isUserLoggedIn = async (req, res) => {
  try {
    const userObj = await User.findOne({
      _id: req.user._id,
      isDisabled: { $ne: true },
    });
    const { _id, name, email, role, profilePicture } = userObj;
    const user = { _id, name, email, role, profilePicture };
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};
