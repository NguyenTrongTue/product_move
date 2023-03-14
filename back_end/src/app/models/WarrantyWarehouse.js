const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WarrrantyWarehouse = new Schema(
  {
    warrantyWarehouseCode: { type: String },
    productCode: { type: String, required: true },
    fixing: { type: Number, required: true, default: 0 },
    complete: { type: Number, required: true, default: 0 },
    canNotBeFixed: { type: Number, required: true, default: 0 },
    deletedAt: { type: Date },
    description: { type: String },
  },
  {
    id: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("WarrrantyWarehouse", WarrrantyWarehouse);
