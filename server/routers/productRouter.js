const express = require("express");
const {
  fetchProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  getProduct,
} = require("../controllers/productController");
const { Protected } = require("../middlewares/auth");
const router = express();
const multer = require("multer");

// Multer File Upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(fetchProducts);
router.route("/:id").get(getProduct);
router.route("/create").post(Protected, upload.single("image"), createProducts);
router.route("/update/:id").put(Protected, updateProducts);
router.route("/delete/:id").delete(Protected, deleteProducts);

module.exports = router;
