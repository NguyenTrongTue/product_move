const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Customer = new Schema(
  {
    customerNumber: { type: Number },
    fullName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    deletedAt: { type: Date },
  },
  {
    id: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", Customer);
