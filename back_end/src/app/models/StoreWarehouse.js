const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StoreWarehouse = new Schema(
  {
    storeWarehouseCode: { type: String, required: true },
    productCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    errorQuantity: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    totalError: { type: Number, default: 0, default: 0 },
    description: { type: String, default: "" },
    deletedAt: { type: Date },
  },
  {
    id: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("StoreWarehouse", StoreWarehouse);
