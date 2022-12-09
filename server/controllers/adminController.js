const User = require("../models/userModel");

const fetchUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

const fetchUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userdata = await User.findById(id).select("-password");
    res.status(200).json(userdata);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    if (name && email) {
      const user = await User.findById(id);
      const userEmail = user.email;
      const checkEmail = await User.findOne({
        $and: [{ email }, { email: { $ne: userEmail } }],
      });
      if (!checkEmail) {
        const updated = await User.findByIdAndUpdate(id, {
          name,
          email,
        }).select("-password");
        res.status(200).json(updated);
      } else {
        throw new Error("Email already registered");
      }
    } else {
      throw new Error("Enter all fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Update Fail" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      throw new Error("Delete Fail");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Delete Fail" });
  }
};

module.exports = { fetchUser, fetchUserById, updateUser, deleteUser };
