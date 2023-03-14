const express = require("express");
const User = require("../app/models/User");
const { verifyAdmin, verifyToken } = require("../util/verifyToken");
const adminController = require("../app/controllers/AdminController");
const { uploadProductImage } = require("../upload/imageStorage");
const router = express.Router();

router.put(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  adminController(User).updateModel
);

//upload photo
router.post(
  "/upload/image",
  uploadProductImage.single("file"),
  (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
