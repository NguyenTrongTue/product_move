const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../util/verifyToken");

const siteController = require("../app/controllers/SiteController");

const Product = require("../app/models/Product");
const Factory = require("../app/models/Factory");
const Store = require("../app/models/Store");
const Warranty = require("../app/models/Warranty");
const Order = require("../app/models/Order");
const User = require("../app/models/User");
const Customer = require("../app/models/Customer");
const WarrantyInvoice = require("../app/models/WarrantyInvoice");

router.post(
  "/products/create",
  siteController(Product).createModel
);
router.delete(
  "/products/:id",
  verifyToken,
  verifyAdmin,
  siteController(Product).deleteModel
);
router.put(
  "/products/update/:id",
  verifyToken,
  verifyAdmin,
  siteController(Product).updateModel
);

router.get("/products/:id", verifyToken, siteController(Product).showModel);
router.get("/products", verifyToken, siteController(Product).showAllModel);

router.post(
  "/users/create",
  verifyToken,
  verifyAdmin,
  siteController(User).createUser
);
router.delete(
  "/users/:id",
  verifyToken,
  verifyAdmin,
  siteController(User).deleteModel
);
router.put(
  "/users/update/:id",
  verifyToken,
  verifyAdmin,
  siteController(User).updateModel
);
router.get(
  "/users/:id",
  verifyToken,
  verifyAdmin,
  siteController(User).showModel
);
router.get("/users", verifyToken, siteController(User).showAllModel);

router.post(
  "/factories/create",
  verifyToken,
  verifyAdmin,
  siteController(Factory).createModel
);
router.put(
  "/factories/update/:id",
  verifyToken,
  verifyAdmin,
  siteController(Factory).updateModel
);
router.get(
  "/factories/:id",
  verifyToken,
  verifyAdmin,

  siteController(Factory).showModel
);
router.delete(
  "/factories/:id",
  verifyToken,
  verifyAdmin,
  siteController(Factory).deleteModel
);
router.get(
  "/factories",
  verifyToken,
  verifyAdmin,
  siteController(Factory).showAllModel
);

router.post(
  "/stores/create",
  verifyToken,
  verifyAdmin,
  siteController(Store).createModel
);
router.put(
  "/stores/update/:id",
  verifyToken,
  verifyAdmin,
  siteController(Store).updateModel
);
router.get(
  "/stores/:id",
  verifyToken,
  verifyAdmin,
  siteController(Store).showModel
);
router.delete(
  "/stores/:id",
  verifyToken,
  verifyAdmin,
  siteController(Store).deleteModel
);
router.get(
  "/stores",

  verifyToken,
  siteController(Store).showAllModel
);

router.post(
  "/warranties/create",

  verifyToken,
  siteController(Warranty).createModel
);
router.put(
  "/warranties/update/:id",

  verifyToken,
  siteController(Warranty).updateModel
);
router.get(
  "/warranties/:id",

  verifyToken,
  siteController(Warranty).showModel
);
router.delete(
  "/warranties/:id",

  verifyToken,
  siteController(Warranty).deleteModel
);
router.get(
  "/warranties",

  verifyToken,
  siteController(Warranty).showAllModel
);

router.delete("/orders/:id", verifyToken, siteController(Order).deleteModel);

router.get("/orders/:id", verifyToken, siteController(Order).showModel);
router.get("/orders", verifyToken, siteController(Order).showAllModel);

router.delete(
  "/customers/:id",
  verifyToken,
  siteController(Customer).deleteModel
);

router.get("/customers/:id", verifyToken, siteController(Customer).showModel);
router.get("/customers", verifyToken, siteController(Customer).showAllModel);

router.get(
  "/warranty_invoice/:id",
  verifyToken,
  siteController(WarrantyInvoice).showModel
);
router.get(
  "/warranty_invoice",
  verifyToken,
  siteController(WarrantyInvoice).showAllModel
);
module.exports = router;
