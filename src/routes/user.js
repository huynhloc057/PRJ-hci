const express = require("express");
const {
  requireSignin,
  userMiddleware,
  uploadCloud,
} = require("../common-middleware");
const { updateUserInfo } = require("../controllers/user");

const router = express.Router();

router.post(
  "/updateUserInfo",
  requireSignin,
  userMiddleware,
  uploadCloud.single("profilePicture"),
  updateUserInfo
);

module.exports = router;
