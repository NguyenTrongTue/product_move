const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Invoice = new Schema(
  {
    _id: { type: Number },
    type: { type: String },
    productCode: { type: String, required: true },
    quantity: { type: Number },
    inputCode: { type: String },
    outputCode: { type: String },
    isError: { type: Boolean, default: false },
  },
  {
    id: false,
    timestamps: true,
  }
);


Invoice.plugin(AutoIncrement, {
  id: "invoice_id_counter",
  inc_field: "_id",
});

module.exports = mongoose.model("Invoice", Invoice);
