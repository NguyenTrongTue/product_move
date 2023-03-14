const express = require("express");
const router = express.Router();
const {  verifyToken } = require("../util/verifyToken");

const storeController = require("../app/controllers/StoreController");

router.post("/order/create", verifyToken, storeController.createOrder);
router.post(
  "/warranty_invoice/create",
  verifyToken,
  storeController.createWarrantyInvoice
);
router.put(
  "/warranty_invoice/return/product/:id",
  verifyToken,
  storeController.sendToWarranty
);
router.put(
  "/warranty_invoice/return/customer/:id",
  verifyToken,
  storeController.returnProductToCustomer
);
router.get(
  "/statistical/product",
  verifyToken,
  storeController.statisticProduct
);
router.get("/warehouse/:id", verifyToken, storeController.showWarehouse);
router.get("/warehouse", verifyToken, storeController.showAllWarehouse);

module.exports = router;
