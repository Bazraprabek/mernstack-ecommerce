const express = require("express");
const {
  userLogin,
  userSignup,
  getUserData,
} = require("../controllers/userController");
const { Protected } = require("../middlewares/auth");
const router = express();

router.route("/getdata").get(Protected, getUserData);
router.route("/login").post(userLogin);
router.route("/signup").post(userSignup);
router.route("/logout").get((req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send({ msg: "Logout" });
});

module.exports = router;
