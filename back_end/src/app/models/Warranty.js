const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Warranty = new Schema(
  {
    manager_id: { type: String },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    warrantyCode: { type: String, required: true },
    deletedAt: { type: Date },
    status: { type: String },
  },
  {
    id: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("Warranty", Warranty);
