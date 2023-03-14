const express = require("express");
const router = express.Router();
const { verifyToken } = require("../util/verifyToken");

const factoryController = require("../app/controllers/FactoryController");

router.post("/import/:factory", verifyToken, factoryController.import);
router.post("/export/:factory", verifyToken, factoryController.export);

router.get(
  "/statistical/product",
  verifyToken,
  factoryController.statisticProduct
);
router.get("/warehouse/product", verifyToken, factoryController.show);
router.get("/invoices", verifyToken, factoryController.showAll);

module.exports = router;
