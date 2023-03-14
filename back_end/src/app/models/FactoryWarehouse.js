const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FactoryWarehouse = new Schema(
  {
    factoryWarehouseCode: { type: String, required: true },
    productCode: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    errorQuantity: { type: Number, required: true, default: 0 },
    totalSales: { type: Number, required: true, default: 0 },
    deletedAt: { type: Date },
  },
  {
    id: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("FactoryWarehouse", FactoryWarehouse);
