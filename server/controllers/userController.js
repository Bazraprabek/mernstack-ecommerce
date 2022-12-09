const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const generateToken = require("../config/generateToken");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
          const token = await generateToken(user._id);
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true,
          });
          res.status(200).send({ msg: "Login Successful" });
        } else {
          throw new Error("Invalid Password");
        }
      } else {
        throw new Error("Invalid Email");
      }
    } else {
      throw new Error("Empty Fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Invalid Credentials" });
  }
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ msg: "This email is already registered" });
      }
      const signup = await User.create({ name, email, password });
      if (signup) {
        console.log(signup);
        res.status(200).send({ msg: "Signup Successful" });
      } else {
        throw new Error("Signup Fail");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Signup Fail" });
  }
};

const getUserData = async (req, res) => {
  try {
    const id = req.verifyUserId;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Unauthorized User" });
  }
};

module.exports = { userLogin, userSignup, getUserData };
