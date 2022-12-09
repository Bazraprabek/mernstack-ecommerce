const express = require("express");
const {
  fetchUser,
  updateUser,
  deleteUser,
  fetchUserById,
} = require("../controllers/adminController");
const { Protected } = require("../middlewares/auth");
const router = express();

router.route("/getdata").get(Protected, fetchUser);
router.route("/getuserdata/:id").get(Protected, fetchUserById);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
