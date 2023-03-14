const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Store = new Schema(
  {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    storeCode: { type: String, required: true },
    deletedAt: { type: Date },
    status: { type: String },
  },
  {
    id: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("Store", Store);
