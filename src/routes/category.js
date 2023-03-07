const express = require("express");
const {
  addCategory,
  getCategories,
  updateCategories,
  getCategoryById,
} = require("../controllers/category");
const {
  requireSignin,
  adminMiddleware,
  uploadCloud,
} = require("../common-middleware");

const router = express.Router();

router.post(
  "/add",
  requireSignin,
  uploadCloud.array("categoryImage"),
  addCategory
);
router.get("/getCategories", getCategories);
router.post("/getCateById", getCategoryById);

module.exports = router;
