const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    _id: { type: Number },
    customerNumber: { type: String, required: true },
    productCode: { type: String, required: true },
    fullName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    customerPhone: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    storeCode: { type: String },
    status: { type: String },
  },
  {
    id: false,
    timestamps: true,
  }
);


Order.plugin(AutoIncrement, {
  id: "order_id_counter",
  inc_field: "_id",
});

module.exports = mongoose.model("Order", Order);
