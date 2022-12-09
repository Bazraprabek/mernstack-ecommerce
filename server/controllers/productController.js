const Product = require("../models/productModel");

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ msg: "Product not found" });
    console.log(err);
  }
};

const createProducts = async (req, res) => {
  try {
    const { name, price, desc, stack } = req.body;
    const image = req.file.filename;
    if (name && image && price) {
      const products = await Product.create({
        name,
        image,
        price,
        desc,
        stack,
      });
      res.status(200).json(products);
    } else {
      throw new Error("Enter all Fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Fail to create" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      await product.remove();
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Fail to delete" });
  }
};

module.exports = {
  fetchProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
};
