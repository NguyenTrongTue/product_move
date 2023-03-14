const express = require("express");
const router = express.Router();
const { verifyToken } = require("../util/verifyToken");

const warrantyController = require("../app/controllers/WarrantyController");

router.put(
  "/warranty_invoice/return/store/:id",
  verifyToken,
  warrantyController.returnProductToStore
);
router.put(
  "/warranty_invoice/return/factory/:id",
  verifyToken,
  warrantyController.returnProductToFactory
);

router.get(
  "/statistical/product",
  verifyToken,
  warrantyController.statisticProduct
);

router.get("/warehouse/:id", verifyToken, warrantyController.show);
router.get("/warehouse/", verifyToken, warrantyController.showAll);

module.exports = router;
