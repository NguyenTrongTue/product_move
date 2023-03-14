const multer = require("multer");

const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const uploadProductImage = multer({ storage: productImageStorage });
module.exports = { uploadProductImage };
