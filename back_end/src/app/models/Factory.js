const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Factory = new Schema(
  {
    manager_id: { type: String },
    factoryCode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String },
    deletedAt: { type: Date },
  },
  {
    id: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("Factory", Factory);
