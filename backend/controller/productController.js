import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc get all products
// @route /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

// @desc get single products
// @route /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

export { getProducts, getProductById };
