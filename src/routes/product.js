const express = require("express");
const {
  addProduct,
  getProductById,
  getProductDetailsBySlug,
  getProducts,
  updateProduct,
  searchByProductName,
  getProductByCategory,
  addProductReview,
  getNewestProduct,
} = require("../controllers/product");
const {
  requireSignin,
  userMiddleware,
  uploadCloud,
} = require("../common-middleware");
const router = express.Router();

router.post(
  "/add",
  requireSignin,
  uploadCloud.array("productPictures"),
  addProduct
);
router.get("/getProducts", getProducts);
router.get("/getNewestProducts", getNewestProduct);
router.post(
  "/addProductReview",
  requireSignin,
  userMiddleware,
  addProductReview
);
router.get("/getById", getProductById);
router.post("/searchByProductName", searchByProductName);
router.get("/getProductsByCategory/:categoryId", getProductByCategory);

router.get("/:slug", getProductDetailsBySlug);

module.exports = router;
