const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WarrantyInvoice = new Schema(
  {
    customerNumber: { type: Number },
    productCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    description: { type: String },
    errorName: { type: String },
    storeCode: { type: String, default: "" },
    warrantyCode: { type: String, default: "" },
    deletedAt: { type: Date },
  },
  {
    id: false,
    timestamps: true,
  }
);



module.exports = mongoose.model("WarrantyInvoice", WarrantyInvoice);
