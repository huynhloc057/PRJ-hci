const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const { addOrder, getAllOrders, getOrder } = require("../controllers/order");

const router = express.Router();

router.post("/add", requireSignin, userMiddleware, addOrder);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);
router.post("/getOrders", requireSignin, userMiddleware, getAllOrders);

module.exports = router;
