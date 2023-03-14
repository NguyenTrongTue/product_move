const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true },
    productLine: { type: String, required: true },
    productCode: { type: String, required: true },
    chip: { type: String, required: true },
    ram: { type: String, required: true },
    pin: { type: String, required: true },
    camera: { type: String, required: true },
    capacity: { type: String, required: true },
    screen: { type: String, required: true },
    images: { type: [String] },
    warrantyPeriod: { type: Number },
    quantityInStock: { type: Number },
    price: { type: Number },
    deletedAt: { type: Date },
  },
  {
    id: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
